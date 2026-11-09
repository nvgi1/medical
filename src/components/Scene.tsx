import { useEffect, useRef, useState } from "react";
import { Minus, Plus, RotateCcw, Pause, Play, Move } from "lucide-react";
import type { Lang } from "../data/content";
import type { BufferGeometry, NormalBufferAttributes, Material } from "three";
type Props = { kind?: string; lang: Lang; compact?: boolean };
export default function Scene({
  kind = "anatomy",
  lang,
  compact = false,
}: Props) {
  const host = useRef<HTMLDivElement>(null),
    api = useRef<
      | {
          zoom: (n: number) => void;
          reset: () => void;
          rotate: (n: number) => void;
          pose: () => void;
        }
      | undefined
    >(undefined),
    pausedRef = useRef(false);
  const [paused, setPaused] = useState(false),
    [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    let cleanup = () => {},
      cancelled = false;
    setReady(false);
    setFailed(false);
    import("three")
      .then((T) => {
        if (cancelled || !host.current) return;
        const el = host.current;
        let r: InstanceType<typeof T.WebGLRenderer>;
        try {
          r = new T.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          });
        } catch {
          setFailed(true);
          return;
        }
        r.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        el.appendChild(r.domElement);
        const scene = new T.Scene(),
          camera = new T.PerspectiveCamera(33, 1, 0.1, 100),
          group = new T.Group();
        camera.position.set(0, 0.2, kind === "anatomy" ? 11.1 : 7.3);
        scene.add(group);
        scene.fog = new T.FogExp2(0x070d12, 0.042);
        const glowCanvas = document.createElement("canvas");
        glowCanvas.width = glowCanvas.height = 256;
        const glowCtx = glowCanvas.getContext("2d");
        if (glowCtx) {
          const paint = glowCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
          paint.addColorStop(0, "rgba(126,240,226,0.6)");
          paint.addColorStop(0.42, "rgba(70,176,180,0.2)");
          paint.addColorStop(1, "rgba(0,0,0,0)");
          glowCtx.fillStyle = paint;
          glowCtx.fillRect(0, 0, 256, 256);
        }
        const glowTexture = new T.CanvasTexture(glowCanvas);
        const halo = new T.Sprite(
          new T.SpriteMaterial({
            map: glowTexture,
            transparent: true,
            opacity: kind === "anatomy" ? 0.5 : 0.2,
            blending: T.AdditiveBlending,
            depthWrite: false,
          }),
        );
        halo.scale.setScalar(kind === "anatomy" ? 6.8 : 3.9);
        halo.position.set(0, kind === "anatomy" ? 0.4 : 0, -2.6);
        scene.add(halo);
        const cyan = 0x63daca;
        const mat = new T.MeshPhysicalMaterial({
          color: 0x234951,
          metalness: 0.6,
          roughness: 0.3,
          transparent: true,
          opacity: 0.85,
        });
        const dark = new T.MeshStandardMaterial({
          color: 0x071a22,
          metalness: 0.6,
          roughness: 0.35,
        });
        const light = new T.MeshStandardMaterial({
          color: 0xb3c7cd,
          metalness: 0.5,
          roughness: 0.28,
        });
        const glow = new T.MeshBasicMaterial({ color: cyan });
        const glass = new T.MeshPhysicalMaterial({
          color: 0xb9e8e2,
          emissive: 0x174c52,
          emissiveIntensity: 0.55,
          metalness: 0.08,
          roughness: 0.16,
          transparent: true,
          opacity: 0.28,
          transmission: 0.72,
          thickness: 0.32,
          ior: 1.28,
          clearcoat: 0.95,
          clearcoatRoughness: 0.12,
          side: T.DoubleSide,
          depthWrite: false,
        });
        function mesh(
          geo: BufferGeometry<NormalBufferAttributes>,
          material: Material,
          x = 0,
          y = 0,
          z = 0,
        ) {
          const m = new T.Mesh(geo, material);
          m.position.set(x, y, z);
          group.add(m);
          return m;
        }
        function box(
          x: number,
          y: number,
          z: number,
          w: number,
          h: number,
          d: number,
          m: Material = mat,
        ) {
          return mesh(new T.BoxGeometry(w, h, d), m, x, y, z);
        }
        function tube(
          points: InstanceType<typeof T.Vector3>[],
          rad = 0.012,
          color = cyan,
        ) {
          return mesh(
            new T.TubeGeometry(
              new T.CatmullRomCurve3(points),
              64,
              rad,
              5,
              false,
            ),
            new T.MeshBasicMaterial({
              color,
              transparent: true,
              opacity: 0.65,
            }),
          );
        }
        const pointMat = new T.PointsMaterial({
          color: cyan,
          size: 0.009,
          transparent: true,
          opacity: 0.35,
          blending: T.AdditiveBlending,
          depthWrite: false,
        });
        function dots(
          geo: BufferGeometry<NormalBufferAttributes>,
          x: number,
          y: number,
          z: number,
          sx = 1,
          sy = 1,
          sz = 1,
        ) {
          const p = new T.Points(geo, pointMat);
          p.position.set(x, y, z);
          p.scale.set(sx, sy, sz);
          group.add(p);
          const wire = new T.LineSegments(
            new T.WireframeGeometry(geo),
            new T.LineBasicMaterial({
              color: cyan,
              transparent: true,
              opacity: 0.045,
            }),
          );
          wire.position.copy(p.position);
          wire.scale.copy(p.scale);
          group.add(wire);
          return p;
        }
        let heart: InstanceType<typeof T.Group> | undefined;
        const limbs: InstanceType<typeof T.Group>[] = [];
        let pulse = 0;
        if (kind === "anatomy") {
          // An intentionally stylized anatomy study; not a clinical anatomical model.
          dots(
            new T.SphereGeometry(0.37, 48, 40),
            0,
            1.72,
            0,
            0.82,
            1.16,
            0.88,
          );
          const glassHead = mesh(
            new T.SphereGeometry(0.37, 48, 40),
            glass,
            0,
            1.72,
            0,
          );
          glassHead.scale.set(0.82, 1.16, 0.88);
          mesh(new T.CylinderGeometry(0.16, 0.2, 0.34, 30), glass, 0, 1.23, 0);
          dots(
            new T.CylinderGeometry(0.16, 0.2, 0.34, 30, 14, true),
            0,
            1.23,
            0,
          );
          const silhouette = new T.CatmullRomCurve3([
            new T.Vector3(0.37, -1.1, 0),
            new T.Vector3(0.46, -0.85, 0),
            new T.Vector3(0.36, -0.48, 0),
            new T.Vector3(0.43, 0.08, 0),
            new T.Vector3(0.66, 0.62, 0),
            new T.Vector3(0.69, 0.83, 0),
            new T.Vector3(0.38, 1.02, 0),
            new T.Vector3(0.19, 1.1, 0),
          ]);
          const torso = new T.LatheGeometry(
            silhouette.getPoints(86).map((v) => new T.Vector2(v.x, v.y)),
            76,
          );
          mesh(
            torso,
            glass,
          );
          dots(torso, 0, 0, 0, 1, 1, 0.59);
          for (const side of [-1, 1]) {
            const upperArm = dots(
              new T.CylinderGeometry(0.155, 0.11, 1.03, 26, 30, true),
              side * 0.79,
              0.35,
              0,
            );
            upperArm.rotation.z = side * 0.1;
            limbs.push(upperArm as unknown as InstanceType<typeof T.Group>);
            const glassUpperArm = mesh(
              new T.CylinderGeometry(0.155, 0.11, 1.03, 32),
              glass,
              side * 0.79,
              0.35,
              0,
            );
            glassUpperArm.rotation.z = side * 0.1;
            dots(
              new T.SphereGeometry(0.16, 24, 20),
              side * 0.71,
              0.83,
              0,
              1,
              1,
              0.9,
            );
            const forearm = dots(
              new T.CylinderGeometry(0.115, 0.07, 0.95, 22, 30, true),
              side * 0.85,
              -0.57,
              0.01,
            );
            limbs.push(forearm as unknown as InstanceType<typeof T.Group>);
            mesh(
              new T.CylinderGeometry(0.115, 0.07, 0.95, 28),
              glass,
              side * 0.85,
              -0.57,
              0.01,
            );
            dots(
              new T.SphereGeometry(0.1, 18, 16),
              side * 0.86,
              -1.13,
              0.02,
              0.8,
              1.5,
              0.55,
            );
            const thigh = dots(
              new T.CylinderGeometry(0.22, 0.15, 1.3, 30, 28, true),
              side * 0.23,
              -1.67,
              0,
            );
            limbs.push(thigh as unknown as InstanceType<typeof T.Group>);
            mesh(
              new T.CylinderGeometry(0.22, 0.15, 1.3, 32),
              glass,
              side * 0.23,
              -1.67,
              0,
            );
            const shin = dots(
              new T.CylinderGeometry(0.14, 0.08, 1.03, 24, 22, true),
              side * 0.24,
              -2.78,
              0,
            );
            limbs.push(shin as unknown as InstanceType<typeof T.Group>);
            mesh(
              new T.CylinderGeometry(0.14, 0.08, 1.03, 28),
              glass,
              side * 0.24,
              -2.78,
              0,
            );
            dots(
              new T.SphereGeometry(0.13, 20, 15),
              side * 0.24,
              -3.35,
              0.1,
              0.9,
              0.55,
              1.8,
            );
            for (let i = 0; i < 10; i++) {
              const a = [];
              const yy = 0.77 - i * 0.135,
                w = 0.55 - Math.abs(i - 3) * 0.026;
              for (let j = 0; j < 30; j++) {
                const t = (j / 29) * Math.PI;
                a.push(
                  new T.Vector3(
                    side * (0.045 + Math.sin(t) * w),
                    yy - Math.sin(t) * 0.08,
                    Math.cos(t) * 0.28,
                  ),
                );
              }
              tube(a, 0.008);
            }
            const lung = mesh(
              new T.SphereGeometry(0.24, 24, 20),
              new T.MeshBasicMaterial({
                color: 0x60d4c5,
                wireframe: true,
                transparent: true,
                opacity: 0.1,
              }),
              side * 0.25,
              0.38,
              0.02,
            );
            lung.scale.set(0.85, 1.65, 0.65);
          }
          tube(
            [
              new T.Vector3(0, 1, 0),
              new T.Vector3(0, 0.2, -0.12),
              new T.Vector3(0, -0.9, -0.05),
            ],
            0.02,
          );
          heart = new T.Group();
          heart.position.set(0.16, 0.3, 0.26);
          heart.rotation.z = -0.3;
          group.add(heart);
          const hm = new T.MeshBasicMaterial({
            color: 0xf58269,
            wireframe: true,
            transparent: true,
            opacity: 0.85,
          });
          for (const [x, y, s] of [
            [-0.07, 0.04, 0.13],
            [0.07, 0.06, 0.13],
            [0, -0.09, 0.15],
          ]) {
            const h = new T.Mesh(new T.SphereGeometry(s, 18, 18), hm);
            h.position.set(x, y, 0);
            h.scale.set(1, 1.2, 0.8);
            heart.add(h);
          }
          tube(
            [
              new T.Vector3(0, 0.8, 0.25),
              new T.Vector3(0, 0.95, 0.32),
              new T.Vector3(-0.2, 0.87, 0.34),
              new T.Vector3(-0.53, 0.77, 0.26),
            ],
            0.012,
          );
          tube(
            [
              new T.Vector3(0, 0.95, 0.32),
              new T.Vector3(0.2, 0.87, 0.34),
              new T.Vector3(0.53, 0.77, 0.26),
            ],
            0.012,
          );
          group.position.y = 0.6;
          group.rotation.y = -0.16;
        } else if (kind === "mri" || kind === "ct") {
          const body = mesh(
            new T.TorusGeometry(1.05, 0.4, 28, 80),
            light,
            0,
            0.25,
            0,
          );
          body.scale.z = kind === "mri" ? 2 : 1;
          mesh(new T.TorusGeometry(1.03, 0.035, 12, 80), glow, 0, 0.25, 0.44);
          mesh(new T.TorusGeometry(0.7, 0.015, 8, 80), glow, 0, 0.25, 0.47);
          box(0, -1.1, 0, 2.3, 0.55, 1.2, light);
          box(0, -0.5, 1.3, 0.6, 0.12, 2.5, light);
          box(0, -0.8, 1.85, 0.3, 0.5, 0.6, dark);
          box(0.85, 0.48, 0.39, 0.22, 0.4, 0.05, dark);
        } else if (kind === "xray") {
          box(0, -1.1, 0, 2, 0.2, 1.2, light);
          box(-0.7, 0.2, -0.2, 0.13, 2.5, 0.13, light);
          box(0, 1.3, -0.2, 1.5, 0.13, 0.13, light);
          box(0.5, 1.05, -0.1, 0.45, 0.48, 0.5, light);
          box(0.5, -0.55, 0.1, 1.1, 0.09, 1.1, mat);
        } else if (kind === "analyzer") {
          box(0, -0.2, 0, 2.4, 1.3, 1.4, light);
          box(0, 0.55, 0, 2.35, 0.25, 1.35, dark);
          box(0.75, 0.9, -0.4, 0.7, 0.55, 0.08, dark);
          for (let i = 0; i < 12; i++) {
            const t = (i * Math.PI) / 6;
            mesh(
              new T.CylinderGeometry(0.07, 0.07, 0.3, 12),
              glow,
              Math.cos(t) * 0.65,
              0.75,
              Math.sin(t) * 0.45,
            );
          }
        } else if (kind === "pump") {
          box(0, 0.2, 0, 0.75, 1.25, 0.5, light);
          box(0, 0.4, 0.26, 0.5, 0.38, 0.02, dark);
          box(0, -0.1, 0.27, 0.47, 0.06, 0.03, glow);
          tube(
            [
              new T.Vector3(0.15, -0.42, 0.05),
              new T.Vector3(0.4, -0.8, 0.05),
              new T.Vector3(0.3, -1.2, 0.2),
              new T.Vector3(0.7, -1.4, 0.2),
            ],
            0.025,
          );
          box(-0.6, 0, -0.15, 0.04, 3, 0.04, light);
          box(-0.6, -1.5, -0.15, 1, 0.06, 0.6, dark);
        } else {
          const portable = kind === "ecg" || kind === "defibrillator";
          box(
            0,
            portable ? -0.15 : 0.35,
            0,
            portable ? 1.7 : 1.65,
            portable ? 0.7 : 1.2,
            0.6,
            light,
          );
          const screen = box(
            -0.16,
            portable ? -0.05 : 0.42,
            0.31,
            1.1,
            portable ? 0.34 : 0.75,
            0.02,
            dark,
          );
          for (let j = 0; j < 3; j++) {
            const pts = [];
            for (let i = 0; i < 90; i++) {
              let x = i / 90;
              const w = x % 0.33;
              let y = Math.sin(x * 35) * 0.015;
              if (w > 0.15 && w < 0.18) y += 0.16;
              if (w > 0.18 && w < 0.2) y -= 0.09;
              pts.push(
                new T.Vector3(
                  x * 1.0 - 0.67,
                  y + (portable ? -0.05 : 0.58) - j * (portable ? 0.06 : 0.18),
                  0.333,
                ),
              );
            }
            tube(pts, 0.006, j === 1 ? 0x83b8e6 : cyan);
          }
          screen.name = "display";
          box(0.66, portable ? -0.08 : 0.4, 0.32, 0.08, 0.12, 0.03, glow);
          if (!portable) {
            box(0, -0.7, 0, 0.13, 1.1, 0.13, light);
            box(0, -1.2, 0, 1.5, 0.1, 0.85, dark);
          }
          if (kind === "ventilator") {
            tube(
              [
                new T.Vector3(0.6, -0.1, 0.25),
                new T.Vector3(1, -0.4, 0.35),
                new T.Vector3(1.2, 0.4, 0.5),
                new T.Vector3(0.6, 1, 0.5),
              ],
              0.055,
            );
          }
          if (kind === "ultrasound") {
            box(0, -0.42, 0.3, 1.7, 0.12, 1.1, mat);
            tube(
              [
                new T.Vector3(0.8, -0.3, 0.3),
                new T.Vector3(1, -0.8, 0.2),
                new T.Vector3(0.9, -1, 0.1),
              ],
              0.026,
            );
          }
          if (kind === "defibrillator") {
            const handle = mesh(
              new T.TorusGeometry(0.3, 0.05, 8, 28, Math.PI),
              dark,
              0,
              0.27,
              0,
            );
            handle.scale.x = 1.8;
          }
        }
        scene.add(new T.HemisphereLight(0xd7fbff, 0x07101a, 2));
        const key = new T.DirectionalLight(0xb8faff, 5);
        key.position.set(3, 5, 4);
        scene.add(key);
        const fill = new T.PointLight(cyan, 8, 15);
        fill.position.set(-3, 1, 2);
        scene.add(fill);
        const floor = new T.Group();
        scene.add(floor);
        floor.position.y = kind === "anatomy" ? -2.85 : -1.55;
        for (const radius of [1.1, 1.35, 1.75]) {
          const ring = new T.Mesh(
            new T.TorusGeometry(radius, 0.006, 6, 100),
            new T.MeshBasicMaterial({
              color: cyan,
              transparent: true,
              opacity: radius === 1.35 ? 0.6 : 0.14,
            }),
          );
          ring.rotation.x = Math.PI / 2;
          floor.add(ring);
        }
        const grid = new T.GridHelper(8, 32, 0x183c44, 0x102129);
        grid.position.y = floor.position.y - 0.02;
        scene.add(grid);
        const orbitRig = new T.Group();
        if (kind === "anatomy") {
          const orbitA = new T.Mesh(
            new T.TorusGeometry(2.7, 0.0045, 4, 180),
            new T.MeshBasicMaterial({
              color: cyan,
              transparent: true,
              opacity: 0.34,
            }),
          );
          orbitA.rotation.set(Math.PI / 1.85, 0.28, 0);
          const orbitB = new T.Mesh(
            new T.TorusGeometry(3.12, 0.0035, 4, 180),
            new T.MeshBasicMaterial({
              color: cyan,
              transparent: true,
              opacity: 0.15,
            }),
          );
          orbitB.rotation.set(Math.PI / 2.1, -0.42, 0.5);
          orbitRig.add(orbitA, orbitB);
          const nodeMat = new T.MeshBasicMaterial({
            color: cyan,
            transparent: true,
            opacity: 0.9,
          });
          for (let i = 0; i < 3; i += 1) {
            const node = new T.Mesh(
              new T.SphereGeometry(0.042, 14, 14),
              nodeMat,
            );
            const angle = i * 2.09;
            node.position.set(
              Math.cos(angle) * 2.7,
              Math.sin(angle) * 2.7,
              0,
            );
            orbitA.add(node);
          }
        }
        scene.add(orbitRig);
        const stars = [];
        for (let i = 0; i < 160; i++) {
          stars.push(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 7,
            (Math.random() - 0.5) * 4 - 1,
          );
        }
        const starGeo = new T.BufferGeometry();
        starGeo.setAttribute(
          "position",
          new T.Float32BufferAttribute(stars, 3),
        );
        scene.add(
          new T.Points(
            starGeo,
            new T.PointsMaterial({
              color: cyan,
              size: 0.012,
              transparent: true,
              opacity: 0.35,
            }),
          ),
        );
        let raf = 0,
          visible = true,
          last = 0,
          drag = false,
          px = 0,
          py = 0,
          rot = kind === "anatomy" ? -0.16 : -0.3,
          tilt = 0,
          zoom = kind === "anatomy" ? 11.1 : 7.3,
          hover = 0,
          hoverY = 0,
          poseMode = 0;
        const reduced = matchMedia("(prefers-reduced-motion: reduce)");
        const resize = () => {
          const { width, height } = el.getBoundingClientRect();
          r.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        resize();
        const obs = new ResizeObserver(resize);
        obs.observe(el);
        const visibility = new IntersectionObserver((es) => {
          visible = es[0].isIntersecting;
        });
        visibility.observe(el);
        const down = (e: PointerEvent) => {
          drag = true;
          px = e.clientX;
          py = e.clientY;
          el.setPointerCapture(e.pointerId);
        };
        const move = (e: PointerEvent) => {
          if (drag) {
            rot += (e.clientX - px) * 0.008;
            tilt = Math.max(
              -0.4,
              Math.min(0.4, tilt + (e.clientY - py) * 0.004),
            );
            px = e.clientX;
            py = e.clientY;
          } else {
            const box = el.getBoundingClientRect();
            hover = ((e.clientX - box.left) / box.width - 0.5) * 0.15;
            hoverY = ((e.clientY - box.top) / box.height - 0.5) * 0.9;
          }
        };
        const up = () => {
          drag = false;
        };
        el.addEventListener("pointerdown", down);
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerup", up);
        el.addEventListener("pointercancel", up);
        const contextLost = (e: Event) => {
          e.preventDefault();
          setFailed(true);
        };
        r.domElement.addEventListener("webglcontextlost", contextLost);
        api.current = {
          zoom: (n) => {
            zoom = Math.max(
              kind === "anatomy" ? 8 : 4.7,
              Math.min(14, zoom + n),
            );
          },
          reset: () => {
            rot = kind === "anatomy" ? -0.16 : -0.3;
            tilt = 0;
            zoom = kind === "anatomy" ? 11.1 : 7.3;
            hover = 0;
            hoverY = 0;
          },
          rotate: (n) => {
            rot += n;
          },
          pose: () => {
            poseMode = (poseMode + 1) % 3;
          },
        };
        let firstFrame = false;
        const tick = (now: number) => {
          raf = requestAnimationFrame(tick);
          if (!visible || document.hidden || now - last < 32) return;
          last = now;
          const moving = !reduced.matches && !pausedRef.current;
          group.rotation.y +=
            (rot +
              (moving ? Math.sin(now * 0.00025) * 0.1 + hover : 0) -
              group.rotation.y) *
            0.06;
          group.rotation.x += (tilt - group.rotation.x) * 0.1;
          camera.position.z += (zoom - camera.position.z) * 0.1;
          camera.position.x += (hover * 3.4 - camera.position.x) * 0.045;
          camera.position.y +=
            ((kind === "anatomy" ? 0.2 : 0) - hoverY * 0.7 - camera.position.y) *
            0.045;
          camera.lookAt(0, kind === "anatomy" ? 0.15 : 0, 0);
          if (moving) {
            orbitRig.rotation.y += 0.0026;
            orbitRig.rotation.z = Math.sin(now * 0.00018) * 0.05;
            halo.material.opacity = 0.62 + Math.sin(now * 0.0011) * 0.08;
          }
          if (heart) {
            // Two quick contractions followed by a short rest, matching the ECG trace.
            const phase = (now % 1100) / 1100;
            pulse = phase < 0.18 ? Math.sin((phase / 0.18) * Math.PI) : 0;
            heart.scale.setScalar(moving ? 1 + pulse * 0.13 : 1);
            heart.position.z = 0.26 + pulse * 0.025;
          }
          if (moving && limbs.length === 8) {
            // Subtle independent joint motion makes the figure feel alive without becoming clinical.
            const breath = Math.sin(now * 0.0018) * 0.018;
            const pose = poseMode === 1 ? 0.16 : poseMode === 2 ? -0.16 : 0;
            limbs[0].rotation.z = -0.1 + pose + Math.sin(now * 0.0014) * 0.045 + breath;
            limbs[1].rotation.z = 0.1 - pose - Math.sin(now * 0.0014) * 0.045 - breath;
            limbs[2].rotation.z = -0.035 + pose * 0.55 + Math.sin(now * 0.0014 + 0.35) * 0.06;
            limbs[3].rotation.z = 0.035 - pose * 0.55 - Math.sin(now * 0.0014 + 0.35) * 0.06;
            limbs[4].rotation.z = pose * 0.35 + Math.sin(now * 0.0011) * 0.025;
            limbs[5].rotation.z = -pose * 0.35 - Math.sin(now * 0.0011) * 0.025;
            limbs[6].rotation.z = pose * 0.2 + Math.sin(now * 0.0011 + 0.2) * 0.035;
            limbs[7].rotation.z = -pose * 0.2 - Math.sin(now * 0.0011 + 0.2) * 0.035;
          }
          r.render(scene, camera);
          if (!firstFrame) {
            firstFrame = true;
            setReady(true);
          }
        };
        tick(0);
        cleanup = () => {
          cancelAnimationFrame(raf);
          obs.disconnect();
          visibility.disconnect();
          el.removeEventListener("pointerdown", down);
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerup", up);
          el.removeEventListener("pointercancel", up);
          scene.traverse((o) => {
            if (o instanceof T.Sprite) {
              o.material.dispose();
              return;
            }
            if (
              o instanceof T.Mesh ||
              o instanceof T.LineSegments ||
              o instanceof T.Points
            ) {
              o.geometry.dispose();
              const materials = Array.isArray(o.material)
                ? o.material
                : [o.material];
              materials.forEach((m) => m.dispose());
            }
          });
          glowTexture.dispose();
          r.dispose();
          r.domElement.remove();
        };
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [kind]);
  return (
    <div
      className={`scene ${compact ? "compact" : ""} ${failed ? "fallback" : ""}`}
    >
      <div
        ref={host}
        className="canvas-host"
        role="img"
        aria-label={
          lang === "ar"
            ? "مجسم تعليمي ثلاثي الأبعاد قابل للتدوير"
            : "Interactive schematic 3D educational model"
        }
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            api.current?.rotate(e.key === "ArrowRight" ? 0.15 : -0.15);
          }
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            api.current?.pose();
          }
        }}
        onDoubleClick={() => api.current?.pose()}
      />
      {(!ready || failed) && (
        <div className="scene-fallback">
          <svg viewBox="0 0 240 280" aria-hidden="true">
            <g fill="none" stroke="currentColor">
              {kind === "anatomy" ? (
                <>
                  <ellipse cx="120" cy="60" rx="22" ry="30" />
                  <path d="M112 90 73 108 62 198M128 90l39 18 11 90M73 108l15 95 5 65m74-160-15 95-5 65M88 203h64M120 95v100" />
                  {[115, 128, 141, 154, 167].map((y) => (
                    <ellipse key={y} cx="120" cy={y} rx="30" ry="10" />
                  ))}
                </>
              ) : kind === "mri" || kind === "ct" ? (
                <>
                  <rect x="35" y="45" width="170" height="180" rx="55" />
                  <ellipse cx="120" cy="125" rx="50" ry="60" />
                  <path d="M98 150h44l24 95H74zM80 225v30m80-30v30" />
                </>
              ) : (
                <>
                  <rect x="35" y="55" width="170" height="130" rx="12" />
                  <rect x="50" y="70" width="125" height="75" rx="4" />
                  <path d="M60 110h20l10-20 13 40 12-25h45M120 185v60m-55 0h110" />
                  <circle cx="185" cy="160" r="6" />
                  <circle cx="65" cy="255" r="8" />
                  <circle cx="175" cy="255" r="8" />
                </>
              )}
            </g>
          </svg>
          <span>
            {failed
              ? lang === "ar"
                ? "عرض توضيحي بديل"
                : "Illustrated fallback"
              : lang === "ar"
                ? "تهيئة المشهد"
                : "Initializing scene"}
          </span>
        </div>
      )}
      <div className="scene-corner tl" />
      <div className="scene-corner br" />
      <div className="scene-caption">
        <Move size={12} />
        {lang === "ar"
          ? "اسحب للتدوير · انقر مرتين لتغيير الوضعية"
          : "DRAG TO ROTATE · DOUBLE-CLICK TO POSE"}
      </div>
      <div className="scene-controls" dir="ltr">
        <button
          aria-label={lang === "ar" ? "تصغير" : "Zoom out"}
          onClick={() => api.current?.zoom(0.6)}
        >
          <Minus size={15} />
        </button>
        <button
          aria-label={lang === "ar" ? "تكبير" : "Zoom in"}
          onClick={() => api.current?.zoom(-0.6)}
        >
          <Plus size={15} />
        </button>
        <button
          aria-label={lang === "ar" ? "إعادة الضبط" : "Reset view"}
          onClick={() => api.current?.reset()}
        >
          <RotateCcw size={14} />
        </button>
        <button
          aria-label={lang === "ar" ? "تبديل الحركة" : "Toggle motion"}
          aria-pressed={paused}
          onClick={() => {
            pausedRef.current = !paused;
            setPaused(!paused);
          }}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
    </div>
  );
}
