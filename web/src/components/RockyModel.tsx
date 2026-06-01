import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ART } from '../lib/art';

/**
 * The live Rocky: rocky.glb rendered with vanilla three.js (no R3F, to avoid
 * React-19 version churn), softly lit and slowly turning. Transparent canvas so
 * the warm paper shows through. Falls back to a watercolor still if WebGL or
 * the model fails, and respects prefers-reduced-motion (no auto-rotate).
 */
export default function RockyModel() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let raf = 0;
    let disposed = false;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      setFailed(true);
      return;
    }
    const size = () => ({ w: mount.clientWidth || 280, h: mount.clientHeight || 280 });
    const { w, h } = size();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, w / h, 0.1, 100);
    camera.position.set(1.15, 1.05, 4.4);
    camera.lookAt(0, 0.05, 0);

    // Warm sky / teal ground tint — gives the rock body a watercolor warmth
    // up top and a soft bioluminescent teal underglow below.
    scene.add(new THREE.HemisphereLight(0xffe6c4, 0x2fa391, 1.25));
    scene.add(new THREE.AmbientLight(0xfff2dd, 0.45));
    const key = new THREE.DirectionalLight(0xfff0d2, 1.7);
    key.position.set(3, 5, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0x57d7c5, 1.1, 28);
    rim.position.set(-3, 1.2, 1.5);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffd9a8, 0.5);
    fill.position.set(-2, 1, 4);
    scene.add(fill);

    const group = new THREE.Group();
    scene.add(group);

    const reduce = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    new GLTFLoader().load(
      '/rocky.glb',
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;
        // Re-skin as a translucent teal "jade glass" Rocky — a soft glowing
        // comms projection that fits the watercolor storybook, keyed off his
        // canonical teal-green bioluminescence. Avoids the raw realistic mesh
        // clashing with the hand-drawn art.
        model.traverse((o) => {
          const mesh = o as THREE.Mesh;
          if (!mesh.isMesh) return;
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x3aa896,
            emissive: 0x2f8f80,
            emissiveIntensity: 0.5,
            roughness: 0.3,
            metalness: 0.0,
            transparent: true,
            opacity: 0.72,
          });
        });
        const box = new THREE.Box3().setFromObject(model);
        const dim = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale = 3.0 / (Math.max(dim.x, dim.y, dim.z) || 1);
        model.scale.setScalar(scale);
        model.position.copy(center).multiplyScalar(-scale);
        group.add(model);
      },
      undefined,
      () => { if (!disposed) setFailed(true); },
    );

    const onResize = () => {
      const s = size();
      renderer.setSize(s.w, s.h);
      camera.aspect = s.w / s.h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    const tick = () => {
      if (disposed) return;
      if (!reduce) group.rotation.y += 0.0045;
      group.rotation.x = -0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      try { mount.removeChild(renderer.domElement); } catch { /* ignore */ }
    };
  }, []);

  return (
    <div className="rocky3d" ref={mountRef} aria-label="Rocky">
      {failed && <img className="rocky3d-fallback" src={ART.rockyListen} alt="Rocky" />}
    </div>
  );
}
