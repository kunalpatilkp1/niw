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
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const gradient = new THREE.Color(0x0a0015); // Deep purple background
    scene.background = gradient;
    scene.fog = new THREE.Fog(0x0a0015, 10, 50);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;
    cameraRef.current = camera;

    // Renderer with antialiasing and alpha
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    // Rich Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffd700, 2); // Gold
    mainLight.position.set(10, 10, 5);
    scene.add(mainLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 3);
    purpleLight.position.set(-10, 5, -5);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(0x06b6d4, 2);
    blueLight.position.set(10, -5, 5);
    scene.add(blueLight);

    const pinkLight = new THREE.PointLight(0xec4899, 2);
    pinkLight.position.set(0, 10, -10);
    scene.add(pinkLight);

    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffd700,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    particlesRef.current = particlesMesh;

    // Create optimized 3D shapes with rich materials
    const shapes = [];

    // Crystal-like Icosahedron
    const ico1 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.MeshPhysicalMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.9,
        transmission: 0.95,
        roughness: 0,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0,
        ior: 2.4,
        thickness: 1,
        envMapIntensity: 1.5,
      })
    );
    ico1.position.set(-4, 3, -2);
    scene.add(ico1);
    shapes.push(ico1);

    // Golden Torus
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.3, 16, 50),
      new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1,
        roughness: 0.1,
        emissive: 0xffd700,
        emissiveIntensity: 0.3,
      })
    );
    torus.position.set(4, -2, -3);
    scene.add(torus);
    shapes.push(torus);

    // Cyan Glass Sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.3, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.7,
        transmission: 0.98,
        roughness: 0,
        metalness: 0,
        clearcoat: 1,
        ior: 1.5,
      })
    );
    sphere.position.set(0, 4, -5);
    scene.add(sphere);
    shapes.push(sphere);

    // Pink Diamond Octahedron
    const octa = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.1),
      new THREE.MeshPhysicalMaterial({
        color: 0xec4899,
        transparent: true,
        opacity: 0.85,
        metalness: 0.9,
        roughness: 0.05,
        clearcoat: 1,
        emissive: 0xec4899,
        emissiveIntensity: 0.2,
      })
    );
    octa.position.set(-5, -3, -1);
    scene.add(octa);
    shapes.push(octa);

    // Emerald TorusKnot
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.7, 0.25, 64, 8),
      new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x10b981,
        emissiveIntensity: 0.3,
      })
    );
    knot.position.set(5, 3, -4);
    scene.add(knot);
    shapes.push(knot);

    shapesRef.current = shapes;

    // Animation loop with optimized performance
    const clock = new THREE.Clock();
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime) => {
      requestAnimationFrame(animate);
      
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      lastTime = currentTime - (deltaTime % frameInterval);
      
      const elapsedTime = clock.getElapsedTime();

      // Smooth continuous rotation
      shapes.forEach((shape, index) => {
        const speed = 0.3 + index * 0.15;
        shape.rotation.x = Math.sin(elapsedTime * speed * 0.5) * 0.3;
        shape.rotation.y = elapsedTime * speed * 0.4;
        shape.rotation.z = Math.cos(elapsedTime * speed * 0.3) * 0.2;
        
        // Gentle floating
        const floatSpeed = speed * 0.8;
        shape.position.y += Math.sin(elapsedTime * floatSpeed + index) * 0.001;
      });

      // Rotate particles slowly
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.05;
        particlesRef.current.rotation.x = elapsedTime * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate(0);

    // Smooth scroll animations
    shapes.forEach((shape, index) => {
      gsap.to(shape.position, {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
        y: `+=${(index % 2 === 0 ? 5 : -5)}`,
        x: `+=${(index % 2 === 0 ? -3 : 3)}`,
        z: `+=${(index % 2 === 0 ? 2 : -2)}`,
      });

      gsap.to(shape.rotation, {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
        y: Math.PI * 3,
        x: Math.PI * 2,
      });
    });

    // Smooth mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const updateCamera = () => {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      
      camera.position.x = targetX * 0.5;
      camera.position.y = targetY * 0.5;
      camera.lookAt(scene.position);
      
      requestAnimationFrame(updateCamera);
    };

    updateCamera();
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
      particlesGeometry.dispose();
      particlesMaterial.dispose();
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
