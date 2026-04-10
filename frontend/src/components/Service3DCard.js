import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export const Service3DCard = ({ icon: Icon, title, desc, index }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(120, 120);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create rotating 3D shape
    const geometries = [
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.TorusGeometry(0.6, 0.3, 16, 100),
      new THREE.OctahedronGeometry(0.8),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.ConeGeometry(0.7, 1.5, 32),
      new THREE.DodecahedronGeometry(0.8),
      new THREE.TetrahedronGeometry(1),
    ];

    const geometry = geometries[index % geometries.length];
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x0EA5E9,
      transparent: true,
      opacity: 0.8,
      transmission: 0.5,
      roughness: 0.1,
      metalness: 0.5,
      clearcoat: 1,
    });

    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    const light = new THREE.PointLight(0x38BDF8, 1);
    light.position.set(2, 2, 2);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      shape.rotation.x = elapsedTime * 0.5;
      shape.rotation.y = elapsedTime * 0.7;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="glass-effect rounded-3xl p-8 cursor-pointer group relative overflow-hidden"
      data-testid={`service-card-${index}`}
    >
      <div className="flex justify-center mb-4">
        <canvas ref={canvasRef} className="rounded-2xl" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-slate-900">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </motion.div>
  );
};

export default Service3DCard;
