import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export const Service3DCard = ({ icon: Icon, title, desc, index }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(140, 140);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Rich color palette
    const colors = [
      0x8b5cf6, // Purple
      0xec4899, // Pink
      0xfbbf24, // Gold
      0x06b6d4, // Cyan
      0x10b981, // Emerald
      0xf97316, // Orange
      0x3b82f6, // Blue
      0xa855f7, // Violet
    ];

    const geometries = [
      new THREE.IcosahedronGeometry(0.9, 0),
      new THREE.OctahedronGeometry(1),
      new THREE.TorusGeometry(0.7, 0.25, 16, 50),
      new THREE.TetrahedronGeometry(1.1),
      new THREE.DodecahedronGeometry(0.85),
      new THREE.SphereGeometry(0.9, 32, 32),
      new THREE.ConeGeometry(0.8, 1.5, 32),
      new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8),
    ];

    const geometry = geometries[index % geometries.length];
    const color = colors[index % colors.length];
    
    const material = new THREE.MeshPhysicalMaterial({
      color: color,
      transparent: true,
      opacity: 0.9,
      metalness: 0.8,
      roughness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0,
      emissive: color,
      emissiveIntensity: 0.3,
    });

    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    // Lighting
    const light1 = new THREE.PointLight(color, 2);
    light1.position.set(2, 2, 2);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 1);
    light2.position.set(-2, -2, 2);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const clock = new THREE.Clock();
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const animate = (currentTime) => {
      requestAnimationFrame(animate);
      
      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      const elapsedTime = clock.getElapsedTime();
      shape.rotation.x = elapsedTime * 0.4;
      shape.rotation.y = elapsedTime * 0.6;
      shape.position.y = Math.sin(elapsedTime * 2) * 0.1;

      renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08, y: -15, rotateY: 10 }}
      className="glass-effect rounded-3xl p-8 cursor-pointer group relative overflow-hidden transform-3d"
      data-testid={`service-card-${index}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="flex justify-center mb-6 relative z-10">
        <canvas ref={canvasRef} className="rounded-2xl" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
        {title}
      </h3>
      <p className="text-gray-300 text-sm leading-relaxed relative z-10">{desc}</p>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </motion.div>
  );
};

export default Service3DCard;
