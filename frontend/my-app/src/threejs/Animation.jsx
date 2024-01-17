import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'stats.js';

const maxParticleCount = 100000;

const RainScene = () => {
  let camera, scene, renderer, controls, stats;

  const init = () => {
    // Your existing code...

    // Initialize Three.js components
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    // ... (other Three.js components)

    scene = new THREE.Scene();
    // ... (other scene setup)

    renderer = new THREE.WebGLRenderer({ antialias: true });
    // ... (other renderer setup)

    controls = new OrbitControls(camera, renderer.domElement);
    // ... (other controls setup)

    stats = new Stats();
    document.body.appendChild(stats.dom);

    // ... (other setup and event listeners)

    // Start the animation loop
    animate();
  };

  const animate = () => {
    stats.update();
    controls.update();

    // ... (animation logic)

    // Call animate recursively
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    init();

    // Cleanup Three.js resources on component unmount
    return () => {
      renderer.dispose();
      scene.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div id="rainScene" style={{ width: '100%', height: '100vh' }} ref={(mount) => (mount ? (mount.appendChild(renderer.domElement), renderer.setSize(mount.clientWidth, mount.clientHeight)) : null)} />
  );
};

export default RainScene;
