import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Scene3D = () => {
  const canvasRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // PARTICLE SYSTEM - Thousands of flowing particles
    const particleCount = 3000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      // Gradient colors (purple, pink, cyan)
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.4; // R
        colors[i * 3 + 1] = 0.3; // G
        colors[i * 3 + 2] = 0.9; // B (purple)
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.9;
        colors[i * 3 + 1] = 0.3;
        colors[i * 3 + 2] = 0.7; // (pink)
      } else {
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 1.0; // (cyan)
      }

      sizes[i] = Math.random() * 2;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // WAVE LINES - Flowing energy lines
    const lineCount = 50;
    const lines = [];
    
    for (let i = 0; i < lineCount; i++) {
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions = new Float32Array(100 * 3);
      
      for (let j = 0; j < 100; j++) {
        linePositions[j * 3] = (j - 50) * 0.2;
        linePositions[j * 3 + 1] = Math.sin(j * 0.1) * 2 + (i - lineCount / 2) * 0.5;
        linePositions[j * 3 + 2] = -10 + i * 0.3;
      }
      
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      
      const lineMaterial = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0x667eea : i % 3 === 1 ? 0xf093fb : 0x00d4ff,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
      lines.push({ mesh: line, offset: i * 0.1 });
    }

    // GLOWING ORBS - Pulsating energy spheres
    const orbs = [];
    for (let i = 0; i < 12; i++) {
      const orbGeometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.5, 16, 16);
      const orbMaterial = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x667eea : i % 3 === 1 ? 0xf093fb : 0x00d4ff,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      
      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      orb.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      scene.add(orb);
      orbs.push({ mesh: orb, speed: 0.5 + Math.random() * 1 });
    }

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x667eea, 2);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf093fb, 2);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // ANIMATION
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Animate particles - flowing movement
      const particlePositions = particles.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Wave motion
        particlePositions[i3 + 1] += Math.sin(elapsed + particlePositions[i3]) * 0.01;
        particlePositions[i3] += Math.cos(elapsed + particlePositions[i3 + 1]) * 0.01;
        
        // Wrap around
        if (particlePositions[i3 + 1] > 25) particlePositions[i3 + 1] = -25;
        if (particlePositions[i3] > 25) particlePositions[i3] = -25;
        if (particlePositions[i3] < -25) particlePositions[i3] = 25;
      }
      particles.attributes.position.needsUpdate = true;

      // Rotate particle system
      particleSystem.rotation.y = elapsed * 0.05;
      particleSystem.rotation.x = elapsed * 0.02;

      // Animate wave lines
      lines.forEach((line, i) => {
        const positions = line.mesh.geometry.attributes.position.array;
        for (let j = 0; j < 100; j++) {
          positions[j * 3 + 1] = Math.sin(j * 0.1 + elapsed + line.offset) * 2 + (i - lineCount / 2) * 0.5;
        }
        line.mesh.geometry.attributes.position.needsUpdate = true;
        line.mesh.rotation.z = elapsed * 0.1;
      });

      // Animate orbs - pulsating
      orbs.forEach((orb, i) => {
        const { mesh, speed } = orb;
        
        // Floating movement
        mesh.position.y += Math.sin(elapsed * speed + i) * 0.02;
        mesh.position.x += Math.cos(elapsed * speed + i) * 0.01;
        
        // Pulsating scale
        const scale = 1 + Math.sin(elapsed * 2 + i) * 0.3;
        mesh.scale.set(scale, scale, scale);
        
        // Rotation
        mesh.rotation.x = elapsed * speed * 0.5;
        mesh.rotation.y = elapsed * speed * 0.3;
      });

      // Mouse parallax
      camera.position.x += (mouseX.current * 1 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY.current * 1 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Pulsating lights
      pointLight1.intensity = 2 + Math.sin(elapsed * 2) * 0.5;
      pointLight2.intensity = 2 + Math.cos(elapsed * 2) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Scroll animations
    gsap.to(particleSystem.rotation, {
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
      y: Math.PI * 4,
    });

    orbs.forEach((orb, i) => {
      gsap.to(orb.mesh.position, {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
        y: `+=${i % 2 === 0 ? 10 : -10}`,
        x: `+=${i % 2 === 0 ? -5 : 5}`,
      });
    });

    // Mouse move
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
      particles.dispose();
      particleMaterial.dispose();
      lines.forEach(l => {
        l.mesh.geometry.dispose();
        l.mesh.material.dispose();
      });
      orbs.forEach(o => {
        o.mesh.geometry.dispose();
        o.mesh.material.dispose();
      });
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="scene-container" />
      
      {/* CSS GRADIENT MESH - Animated flowing gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-30">
        {/* Flowing gradient orbs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute blob"
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? 'rgba(102, 126, 234, 0.4)' : 
                i % 3 === 1 ? 'rgba(240, 147, 251, 0.4)' : 
                'rgba(0, 212, 255, 0.4)'
              } 0%, transparent 70%)`,
              top: `${10 + i * 10}%`,
              left: `${5 + i * 12}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${8 + i}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Scene3D;
