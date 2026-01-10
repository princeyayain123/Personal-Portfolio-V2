// GlobeComponent.jsx
import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const GlobeComponent = () => {
  const globeEl = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const globe = globeEl.current;
    if (!globe) return;

    const controls = globe.controls();

    // Auto-rotate
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;

    // Disable zoom / wheel / pan
    controls.enableZoom = false;
    controls.enablePan = false;

    // Clouds
    const CLOUDS_IMG_URL = './clouds.png';
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROT_SPEED = -0.006;

    const radius = globe.getGlobeRadius() * (1 + CLOUDS_ALT);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(CLOUDS_IMG_URL),
      transparent: true,
    });
    const cloudsGeometry = new THREE.SphereGeometry(radius, 75, 75);
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    globe.scene().add(cloudsMesh);

    const rotate = () => {
      cloudsMesh.rotation.y += (CLOUDS_ROT_SPEED * Math.PI) / 180;
      requestAnimationFrame(rotate);
    };
    rotate();

    return () => {
      globe.scene().remove(cloudsMesh);
      cloudsMesh.geometry.dispose();
      cloudsMesh.material.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full globe-position">
      <Globe ref={globeEl} animateIn={false} globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg" bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png" width={isMobile ? dimensions.width : dimensions.width + 900} height={isMobile ? dimensions.height : dimensions.height + 600} />
    </div>
  );
};

export default GlobeComponent;
