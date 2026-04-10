import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Scene3D = () => {
  const canvasRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const cursorTrailRef = useRef([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x667eea, 3);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xf093fb, 3);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x00d4ff, 2);
    light3.position.set(0, 5, -5);
    scene.add(light3);

    // Create MORE 3D objects
    const objects = [];

    // Sphere 1 - Glass
    const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x667eea,
        transparent: true,
        opacity: 0.7,
        metalness: 0.5,
        roughness: 0.1,
        transmission: 0.5,
        clearcoat: 1,
      })
    );
    sphere1.position.set(-3, 2, -3);
    scene.add(sphere1);
    objects.push({ mesh: sphere1, speed: 1 });

    // Sphere 2 - Metallic
    const sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x764ba2,
        transparent: true,
        opacity: 0.8,
        metalness: 0.9,
        roughness: 0.05,
        clearcoat: 1,
      })
    );
    sphere2.position.set(3, -2, -4);
    scene.add(sphere2);
    objects.push({ mesh: sphere2, speed: 1.2 });

    // Sphere 3 - Glowing
    const sphere3 = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0xf093fb,
        transparent: true,
        opacity: 0.6,
        metalness: 0.6,
        roughness: 0.2,
        emissive: 0xf093fb,
        emissiveIntensity: 0.5,
      })
    );
    sphere3.position.set(0, 0, -5);
    scene.add(sphere3);
    objects.push({ mesh: sphere3, speed: 0.8 });

    // Torus 1
    const torus1 = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.4, 16, 50),
      new THREE.MeshStandardMaterial({
        color: 0x8e9aff,
        metalness: 0.9,
        roughness: 0.1,
      })
    );
    torus1.position.set(-2, -3, -2);
    scene.add(torus1);
    objects.push({ mesh: torus1, speed: 1.5 });

    // Torus 2
    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.8, 0.3, 16, 50),
      new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        metalness: 0.8,
        roughness: 0.2,
      })
    );
    torus2.position.set(4, 3, -3);
    scene.add(torus2);
    objects.push({ mesh: torus2, speed: 1.3 });

    // Box
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.7,
        roughness: 0.3,
        clearcoat: 1,
      })
    );
    box.position.set(-4, 1, -2);
    scene.add(box);
    objects.push({ mesh: box, speed: 1.1 });

    // Octahedron
    const octa = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.9),
      new THREE.MeshStandardMaterial({
        color: 0xff6b9d,
        metalness: 0.8,
        roughness: 0.2,
      })
    );
    octa.position.set(2, 4, -4);
    scene.add(octa);
    objects.push({ mesh: octa, speed: 0.9 });

    // Animation
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Animate all objects
      objects.forEach((obj, i) => {
        const { mesh, speed } = obj;
        mesh.rotation.x = elapsed * (0.2 * speed);
        mesh.rotation.y = elapsed * (0.3 * speed);
        
        // Floating
        mesh.position.y += Math.sin(elapsed * (1 + i * 0.5)) * 0.002;
        
        // Morphing scale
        const scale = 1 + Math.sin(elapsed * (1 + i * 0.3)) * 0.1;
        mesh.scale.set(scale, scale, scale);
      });

      // Parallax mouse movement
      camera.position.x += (mouseX.current * 0.8 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY.current * 0.8 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Scroll animations with GSAP
    objects.forEach((obj, i) => {
      gsap.to(obj.mesh.position, {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
        y: `+=${i % 2 === 0 ? 6 : -6}`,
        x: `+=${i % 2 === 0 ? -4 : 4}`,
      });

      gsap.to(obj.mesh.rotation, {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        y: Math.PI * 4,
        z: Math.PI * 2,
      });
    });

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
      ScrollTrigger.getAll().forEach(t => t.kill());
      renderer.dispose();
      objects.forEach(obj => {
        obj.mesh.geometry.dispose();
        obj.mesh.material.dispose();
      });
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="scene-container" />
      
      {/* More Morphing Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 blob"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-20 blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-pink-500 to-purple-600 opacity-15 blob" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-15 blob" style={{ animationDelay: '6s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-56 h-56 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 blob" style={{ animationDelay: '3s' }}></div>
      </div>
    </>
  );
};

export default Scene3D;