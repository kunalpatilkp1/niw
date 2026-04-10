import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Scene3D = () => {
  const canvasRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x667eea, 2);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xf093fb, 2);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    // Create 3D Blobs/Spheres with gradient materials
    const blobs = [];

    // Blob 1
    const blob1 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x667eea,
        transparent: true,
        opacity: 0.6,
        metalness: 0.5,
        roughness: 0.2,
        envMapIntensity: 1,
      })
    );
    blob1.position.set(-3, 2, -3);
    scene.add(blob1);
    blobs.push(blob1);

    // Blob 2
    const blob2 = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x764ba2,
        transparent: true,
        opacity: 0.7,
        metalness: 0.6,
        roughness: 0.1,
      })
    );
    blob2.position.set(3, -2, -4);
    scene.add(blob2);
    blobs.push(blob2);

    // Blob 3
    const blob3 = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0xf093fb,
        transparent: true,
        opacity: 0.5,
        metalness: 0.7,
        roughness: 0.3,
      })
    );
    blob3.position.set(0, 0, -5);
    scene.add(blob3);
    blobs.push(blob3);

    // Torus
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.4, 16, 50),
      new THREE.MeshStandardMaterial({
        color: 0x8e9aff,
        metalness: 0.8,
        roughness: 0.2,
      })
    );
    torus.position.set(-2, -3, -2);
    scene.add(torus);
    blobs.push(torus);

    // Animation
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Morphing animation
      blobs.forEach((blob, i) => {
        blob.rotation.x = elapsed * (0.2 + i * 0.1);
        blob.rotation.y = elapsed * (0.3 + i * 0.1);
        
        // Floating
        blob.position.y += Math.sin(elapsed * (1 + i * 0.5)) * 0.002;
        
        // Morphing scale
        const scale = 1 + Math.sin(elapsed * (1 + i * 0.3)) * 0.1;
        blob.scale.set(scale, scale, scale);
      });

      // Parallax mouse movement
      camera.position.x += (mouseX.current * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY.current * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Mouse parallax
    const handleMouseMove = (e) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      blobs.forEach(blob => {
        blob.geometry.dispose();
        blob.material.dispose();
      });
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="scene-container" />
      
      {/* CSS Morphing Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blob"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-pink-500 to-purple-500 opacity-15 blob" style={{ animationDelay: '4s' }}></div>
      </div>
    </>
  );
};

export default Scene3D;
