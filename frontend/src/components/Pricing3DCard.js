import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Sparkles } from 'lucide-react';
import * as THREE from 'three';

export const Pricing3DCard = ({ pkg, idx }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(160, 160);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    let geometry, color, emissiveColor;
    
    if (idx === 0) {
      geometry = new THREE.IcosahedronGeometry(1.3, 0);
      color = 0x8b5cf6; // Purple
      emissiveColor = 0x8b5cf6;
    } else if (idx === 1) {
      geometry = new THREE.TorusKnotGeometry(0.9, 0.35, 100, 16);
      color = 0xffd700; // Gold
      emissiveColor = 0xffa500;
    } else {
      geometry = new THREE.DodecahedronGeometry(1.3);
      color = 0xec4899; // Pink
      emissiveColor = 0xec4899;
    }

    const material = new THREE.MeshPhysicalMaterial({
      color: color,
      transparent: true,
      opacity: 0.95,
      metalness: pkg.popular ? 1 : 0.8,
      roughness: pkg.popular ? 0.05 : 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0,
      emissive: emissiveColor,
      emissiveIntensity: pkg.popular ? 0.5 : 0.3,
    });

    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    const light1 = new THREE.PointLight(color, 3);
    light1.position.set(3, 3, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(pkg.popular ? 0xffd700 : 0xffffff, 2);
    light2.position.set(-3, -3, 3);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
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
      shape.rotation.x = elapsedTime * 0.3;
      shape.rotation.y = elapsedTime * 0.5;
      shape.position.y = Math.sin(elapsedTime * 2) * 0.15;

      renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [idx, pkg.popular]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: pkg.popular ? 1.1 : 1.08, y: -15, rotateY: 5 }}
      className={`relative rounded-3xl p-8 transform-3d ${
        pkg.popular 
          ? 'glass-effect border-2 border-yellow-400/50 glow-gold scale-105' 
          : 'glass-effect'
      }`}
      data-testid={`pricing-card-${pkg.name.toLowerCase()}`}
    >
      {pkg.popular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full text-sm font-bold flex items-center gap-2 glow-gold">
          <Sparkles size={16} />
          <span>MOST POPULAR</span>
          <Sparkles size={16} />
        </div>
      )}
      
      <div className="flex justify-center mb-6">
        <canvas ref={canvasRef} className="rounded-2xl" />
      </div>

      <h3 className={`text-3xl font-bold mb-3 ${pkg.popular ? 'text-gradient-rich' : 'text-white'}`}>
        {pkg.name}
      </h3>
      <div className="mb-4">
        <span className={`text-5xl font-extrabold ${pkg.popular ? 'text-yellow-400' : 'text-purple-400'}`}>
          {pkg.price}
        </span>
        <span className="text-gray-400 text-lg">{pkg.period}</span>
      </div>
      <p className="mb-6 text-sm text-gray-300">{pkg.fit}</p>
      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle 
              size={20} 
              className={`flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-yellow-400' : 'text-purple-400'}`} 
            />
            <span className="text-sm text-gray-200">{feature}</span>
          </li>
        ))}
      </ul>
      <Link to="/pricing">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-4 rounded-full font-bold text-lg ${
            pkg.popular ? 'btn-gold text-black' : 'btn-premium text-white'
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
