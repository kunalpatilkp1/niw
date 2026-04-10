import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Scene3D = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF0F9FF);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x38BDF8, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x0EA5E9, 1);
    pointLight.position.set(-5, -5, -5);
    scene.add(pointLight);

    // Create 3D shapes
    const shapes = [];

    // Icosahedron (glass material)
    const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
    const icosahedronMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0EA5E9,
      transparent: true,
      opacity: 0.6,
      transmission: 0.9,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.set(-3, 2, 0);
    scene.add(icosahedron);
    shapes.push(icosahedron);

    // Torus
    const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.7,
      transmission: 0.8,
      roughness: 0.1,
      metalness: 0.2,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(3, -1, -2);
    scene.add(torus);
    shapes.push(torus);

    // Sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x7DD3FC,
      transparent: true,
      opacity: 0.5,
      transmission: 0.95,
      roughness: 0.05,
      metalness: 0.1,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 3, -3);
    scene.add(sphere);
    shapes.push(sphere);

    // Octahedron
    const octahedronGeometry = new THREE.OctahedronGeometry(1);
    const octahedronMaterial = new THREE.MeshStandardMaterial({
      color: 0x0EA5E9,
      roughness: 0.2,
      metalness: 0.8,
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(-4, -2, -1);
    scene.add(octahedron);
    shapes.push(octahedron);

    // Dodecahedron
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(1);
    const dodecahedronMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.3,
      metalness: 0.7,
    });
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
    dodecahedron.position.set(4, 2, -4);
    scene.add(dodecahedron);
    shapes.push(dodecahedron);

    // Box
    const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xE0F2FE,
      roughness: 0.2,
      metalness: 0.5,
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(-2, -3, -2);
    scene.add(box);
    shapes.push(box);

    shapesRef.current = shapes;

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();

      // Continuous rotation and floating
      shapes.forEach((shape, index) => {
        const speed = 0.5 + index * 0.2;
        shape.rotation.x = Math.sin(elapsedTime * speed) * 0.5;
        shape.rotation.y = elapsedTime * speed * 0.3;
        shape.rotation.z = Math.cos(elapsedTime * speed * 0.5) * 0.3;
        
        // Floating effect
        shape.position.y += Math.sin(elapsedTime * speed + index) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Scroll animations with GSAP
    shapes.forEach((shape, index) => {
      gsap.to(shape.position, {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        y: `+=${(index % 2 === 0 ? 3 : -3)}`,
        x: `+=${(index % 2 === 0 ? -2 : 2)}`,
        z: `+=${(index % 2 === 0 ? 1 : -1)}`,
      });

      gsap.to(shape.rotation, {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        y: Math.PI * 4,
        x: Math.PI * 2,
      });
    });

    // Mouse parallax effect
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      gsap.to(camera.position, {
        x: x * 0.5,
        y: y * 0.5,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
