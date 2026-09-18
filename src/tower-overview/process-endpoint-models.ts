import { organGeometries } from './anatomy-brain-scene';
import { towerById } from './tower-organ-mapping';
import * as T from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

function roundedGeometry(w: number, h: number, d: number, r: number) {
  r = Math.min(r, w * 0.48, h * 0.48, d * 0.48);
  const geometry = new T.BoxGeometry(w, h, d, 12, 12, 8),
    positions = geometry.getAttribute('position');
  const limit = new T.Vector3(w / 2 - r, h / 2 - r, d / 2 - r),
    point = new T.Vector3(),
    inside = new T.Vector3();
  for (let i = 0; i < positions.count; i++) {
    point.fromBufferAttribute(positions, i);
    inside.copy(point).clamp(limit.clone().negate(), limit);
    point.sub(inside).normalize().multiplyScalar(r).add(inside);
    positions.setXYZ(i, point.x, point.y, point.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}
// Deliberately soft anatomical illustration, matching the existing brain material.
// `kind` is 'bag' or the receiving organ's tower id (brain, lungs, liver, ...).
export function createInfusionModel(
  host: HTMLElement,
  kind: string,
  onConnection?: (x: number, y: number) => void,
) {
  const renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0, 0);
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.94;
  host.appendChild(renderer.domElement);
  const scene = new T.Scene(),
    camera = new T.PerspectiveCamera(32, 1, 0.1, 30);
  camera.position.set(0, 0, 7);
  camera.lookAt(0, 0, 0);
  const pm = new T.PMREMGenerator(renderer),
    room = new RoomEnvironment(),
    env = pm.fromScene(room, 0.04);
  scene.environment = env.texture;
  pm.dispose();
  room.dispose();
  scene.add(new T.HemisphereLight(0xfff8f3, 0xac959d, 0.85));
  const light = new T.DirectionalLight(0xfff5ef, 2.8);
  light.position.set(-3, 5, 5);
  scene.add(light);
  const model = new T.Group();
  scene.add(model);
  const materials: T.Material[] = [],
    geometries: T.BufferGeometry[] = [];
  const material = (
    color: string,
    extra: Partial<T.MeshPhysicalMaterialParameters> = {},
  ) => {
    const m = new T.MeshPhysicalMaterial({
      color,
      roughness: 0.3,
      clearcoat: 0.35,
      envMapIntensity: 0.45,
      ...extra,
    });
    materials.push(m);
    return m;
  };
  // The brain keeps its original rose; other organs lift their anatomy colour toward the same softness.
  const organColor =
    kind === 'brain'
      ? '#d89daf'
      : '#' + new T.Color(towerById(kind).color).lerp(new T.Color('#f3e6ea'), 0.32).getHexString();
  const pink = material(organColor),
    blood = material('#a92a4c'),
    ivory = material('#f0e4e4'),
    plastic = material('#e9dade', {
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
    });
  function mesh(g: T.BufferGeometry, m: T.Material, x = 0, y = 0, z = 0) {
    geometries.push(g);
    const o = new T.Mesh(g, m);
    o.position.set(x, y, z);
    model.add(o);
    return o;
  }
  function rounded(
    w: number,
    h: number,
    d: number,
    r: number,
    m: T.Material,
    x = 0,
    y = 0,
    z = 0,
  ) {
    return mesh(roundedGeometry(w, h, d, r), m, x, y, z);
  }
  function tube(points: T.Vector3[], r: number, m: T.Material) {
    return mesh(
      new T.TubeGeometry(new T.CatmullRomCurve3(points), 40, r, 8, false),
      m,
    );
  }
  let fill: T.Mesh | undefined,
    top = 1.25;
  if (kind === 'bag') {
    model.rotation.set(0.08, -0.18, -0.04);
    rounded(1.7, 2.2, 0.42, 0.23, plastic, 0, 0.2, 0);
    fill = rounded(1.45, 1.52, 0.3, 0.2, blood, 0, -0.04, 0);
    rounded(1.7, 0.12, 0.36, 0.04, ivory, 0, 1.31, 0);
    rounded(0.72, 0.27, 0.15, 0.08, ivory, 0, 1.49, 0);
    mesh(new T.TorusGeometry(0.12, 0.04, 8, 24), pink, 0, 1.53, 0.1);
    rounded(0.94, 0.62, 0.055, 0.07, ivory, 0, 0.37, 0.24);
    rounded(0.12, 0.34, 0.065, 0.025, blood, 0, 0.38, 0.28);
    rounded(0.34, 0.12, 0.065, 0.025, blood, 0, 0.38, 0.28);
    for (const x of [-0.35, 0.28]) {
      mesh(new T.CylinderGeometry(0.095, 0.095, 0.28, 16), ivory, x, -1.02, 0);
    }
    mesh(new T.CapsuleGeometry(0.115, 0.29, 6, 12), plastic, -0.35, -1.39, 0);
    mesh(new T.CapsuleGeometry(0.055, 0.18, 6, 12), blood, -0.35, -1.37, 0);
    tube(
      [
        new T.Vector3(-0.35, -1.57, 0),
        new T.Vector3(-0.3, -1.72, 0),
        new T.Vector3(0, -1.9, 0),
      ],
      0.035,
      ivory,
    );
  } else {
    const source = organGeometries.get(kind);
    if (!source) throw new Error('Organ anatomy has not loaded yet.');
    const geometry = source.clone();
    geometry.computeBoundingBox();
    const size = geometry.boundingBox!.getSize(new T.Vector3());
    geometry.center();
    // Fit wide organs (lungs, intestines) as well as tall ones inside the same frame.
    const fit = kind === 'brain' ? 2.8 / size.y : Math.min(2.8 / size.y, 2.5 / size.x);
    geometry.scale(fit, fit, fit);
    geometry.computeBoundingBox();
    top = geometry.boundingBox!.max.y * 0.9;
    mesh(geometry, pink);
    model.rotation.set(0.05, -0.32, 0);
  }

  let disposed = false, animation = 0, arrived = false;
  const render = () => {
    if (disposed || host.clientWidth < 1 || host.clientHeight < 1) return;
    renderer.setSize(host.clientWidth, host.clientHeight);
    camera.aspect = host.clientWidth / host.clientHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    const point =
      kind === 'bag'
        ? new T.Vector3(0, -1.9, 0)
        : new T.Vector3(0, kind === 'brain' ? 1.25 : top, 0);
    model.localToWorld(point);
    point.project(camera);
    onConnection?.(
      ((point.x + 1) * host.clientWidth) / 2,
      ((1 - point.y) * host.clientHeight) / 2,
    );
  };
  const observer = new ResizeObserver(render);
  observer.observe(host);
  render();
  return {
    setProgress(p: number) {
      if (kind === 'bag') return;
      const complete = p >= 0.98;
      if (complete && !arrived) {
        const start = performance.now();
        const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 950);
          const pulse = Math.sin(t * Math.PI);
          model.scale.setScalar(1 + (reduced ? 0 : pulse * 0.065));
          pink.emissive.set('#f1c54b');
          pink.emissiveIntensity = 0.08 + pulse * 0.48;
          render();
          if (t < 1 && !disposed) animation = requestAnimationFrame(tick);
        };
        cancelAnimationFrame(animation);
        animation = requestAnimationFrame(tick);
      } else if (!complete) {
        cancelAnimationFrame(animation);
        model.scale.setScalar(1);
        pink.emissiveIntensity = 0;
        render();
      }
      arrived = complete;
    },
    destroy() {
      disposed = true;
      cancelAnimationFrame(animation);
      observer.disconnect();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      env.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
