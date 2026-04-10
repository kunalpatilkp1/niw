import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Scene3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // OPTIMIZED PARTICLES - Only 600
    const particleCount = 600;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // VIBRANT COLORS - Cyan, Purple, Pink
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.0;      // R
        colors[i * 3 + 1] = 0.96; // G
        colors[i * 3 + 2] = 1.0;  // B (Cyan)
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.65;     // R
        colors[i * 3 + 1] = 0.54; // G
        colors[i * 3 + 2] = 0.98; // B (Purple)
      } else {
        colors[i * 3] = 0.92;     // R
        colors[i * 3 + 1] = 0.28; // G
        colors[i * 3 + 2] = 0.60; // B (Pink)
      }
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // SIMPLE SHAPES - Only 5
    const shapes = [];

    // Torus - Cyan
    const torus1 = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.3, 16, 50),
      new THREE.MeshBasicMaterial({ color: 0x00F5FF, transparent: true, opacity: 0.5 })
    );
    torus1.position.set(-3, 2, -5);
    scene.add(torus1);
    shapes.push(torus1);

    // Sphere - Purple
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xA78BFA, transparent: true, opacity: 0.4 })
    );
    sphere.position.set(3, -2, -6);
    scene.add(sphere);
    shapes.push(sphere);

    // Box - Pink
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xEC4899, transparent: true, opacity: 0.5 })
    );
    box.position.set(0, 0, -4);
    scene.add(box);
    shapes.push(box);

    // Torus 2 - Purple
    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.8, 0.25, 16, 50),
      new THREE.MeshBasicMaterial({ color: 0xA78BFA, transparent: true, opacity: 0.4 })
    );
    torus2.position.set(-2, -3, -3);
    scene.add(torus2);
    shapes.push(torus2);

    // Octahedron - Cyan
    const octa = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.8),
      new THREE.MeshBasicMaterial({ color: 0x00F5FF, transparent: true, opacity: 0.5 })
    );
    octa.position.set(4, 3, -5);
    scene.add(octa);
    shapes.push(octa);

    // SMOOTH ANIMATION
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate particles slowly
      particleSystem.rotation.y = elapsed * 0.03;

      // Animate shapes
      shapes.forEach((shape, i) => {
        shape.rotation.x = elapsed * (0.2 + i * 0.1);
        shape.rotation.y = elapsed * (0.3 + i * 0.1);
        shape.position.y += Math.sin(elapsed + i) * 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize
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
      particles.dispose();
      particleMaterial.dispose();
      shapes.forEach(s => {
        s.geometry.dispose();
        s.material.dispose();
      });
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="scene-container" />
      
      {/* CSS BLOBS - Vibrant Colors */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 blob"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500 blob" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-pink-500 to-purple-500 blob" style={{ animationDelay: '6s' }}></div>
      </div>
    </>
  );
};

export default Scene3D;