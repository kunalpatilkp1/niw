import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Scene3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Optimized Scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent
    
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;

    // High-performance renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false, // Disable for performance
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Simple lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Create only 3 simple shapes for performance
    const shapes = [];

    // Shape 1: Torus
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.5, 16, 50),
      new THREE.MeshStandardMaterial({
        color: 0xa5b4fc,
        metalness: 0.7,
        roughness: 0.3,
      })
    );
    torus.position.set(-4, 2, -5);
    scene.add(torus);
    shapes.push(torus);

    // Shape 2: Box
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshStandardMaterial({
        color: 0xc4b5fd,
        metalness: 0.5,
        roughness: 0.5,
      })
    );
    box.position.set(4, -2, -6);
    scene.add(box);
    shapes.push(box);

    // Shape 3: Sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xddd6fe,
        metalness: 0.6,
        roughness: 0.4,
      })
    );
    sphere.position.set(0, 0, -7);
    scene.add(sphere);
    shapes.push(sphere);

    // Smooth animation with requestAnimationFrame
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth rotation
      shapes.forEach((shape, i) => {
        shape.rotation.x = elapsed * 0.2;
        shape.rotation.y = elapsed * 0.3;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      shapes.forEach(shape => {
        shape.geometry.dispose();
        shape.material.dispose();
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="scene-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Scene3D;
