import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import * as THREE from 'three';

export const Pricing3DCard = ({ pkg, idx }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(150, 150);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Different shapes for each tier
    let geometry;
    if (idx === 0) {
      geometry = new THREE.IcosahedronGeometry(1.2, 0);
    } else if (idx === 1) {
      geometry = new THREE.DodecahedronGeometry(1.2);
    } else {
      geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);
    }

    const material = new THREE.MeshPhysicalMaterial({
      color: pkg.popular ? 0xFFFFFF : 0x0EA5E9,
      transparent: true,
      opacity: pkg.popular ? 0.9 : 0.7,
      transmission: 0.3,
      roughness: 0.1,
      metalness: pkg.popular ? 0.8 : 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });

    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    const light = new THREE.PointLight(pkg.popular ? 0xFFD700 : 0x38BDF8, 2);
    light.position.set(2, 2, 2);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      shape.rotation.x = elapsedTime * 0.3;
      shape.rotation.y = elapsedTime * 0.5;
      shape.position.y = Math.sin(elapsedTime * 2) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [idx, pkg.popular]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      whileHover={{ scale: pkg.popular ? 1.08 : 1.05, y: -10 }}
      className={`relative rounded-3xl p-8 transform-3d ${
        pkg.popular ? 'bg-sky-500 text-white shadow-2xl shadow-sky-500/40 scale-105' : 'glass-effect'
      }`}
      data-testid={`pricing-card-${pkg.name.toLowerCase()}`}
    >
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-6 py-2 rounded-full text-sm font-bold">
          ⭐ Most Popular
        </div>
      )}
      
      <div className="flex justify-center mb-6">
        <canvas ref={canvasRef} className="rounded-2xl" />
      </div>

      <h3 className={`text-3xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-slate-900'}`}>
        {pkg.name}
      </h3>
      <div className="mb-4">
        <span className={`text-5xl font-extrabold ${pkg.popular ? 'text-white' : 'text-sky-500'}`}>
          {pkg.price}
        </span>
        <span className={pkg.popular ? 'text-sky-100' : 'text-slate-600'}>{pkg.period}</span>
      </div>
      <p className={`mb-6 text-sm ${pkg.popular ? 'text-sky-100' : 'text-slate-600'}`}>{pkg.fit}</p>
      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle size={20} className={`flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-sky-200' : 'text-sky-500'}`} />
            <span className={`text-sm ${pkg.popular ? 'text-white' : 'text-slate-700'}`}>{feature}</span>
          </li>
        ))}
      </ul>
      <Link to="/pricing">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-4 rounded-full font-semibold text-lg ${
            pkg.popular ? 'bg-white text-sky-500' : 'bg-sky-500 text-white'
          }`}
          data-testid={`pricing-cta-${pkg.name.toLowerCase()}`}
        >
          Choose {pkg.name}
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default Pricing3DCard;
