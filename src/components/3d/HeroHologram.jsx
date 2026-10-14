import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroHologram({ theme = 'dark' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const isDark = theme !== 'light';

    // Primary Colors
    // Primary Colors & Blending
    const blendingMode = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
    const primaryColor = isDark ? 0x0284c7 : 0x0369a1; // Sky blue / Deep ocean blue
    const accentColor = isDark ? 0x38bdf8 : 0x0284c7;  // Cyan glow / Rich azure
    const coreColor = isDark ? 0x0ea5e9 : 0x0284c7;

    // Main Group for interactive tilt
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- 1. MINIMALIST ORBITAL RINGS (CYBERNETIC GYROSCOPE) ---
    const rings = [];
    const ringRadii = [2.2, 2.7, 3.2];
    const ringRotations = [
      { x: 0.4, y: 0.2, z: 0.1, speed: 0.006 },
      { x: -0.5, y: 0.8, z: -0.3, speed: -0.004 },
      { x: 0.8, y: -0.3, z: 0.5, speed: 0.003 }
    ];

    ringRadii.forEach((radius, i) => {
      // Ring circle
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(120);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);

      const ringMat = new THREE.LineBasicMaterial({
        color: i === 1 ? accentColor : primaryColor,
        transparent: true,
        opacity: isDark ? 0.45 : 0.8,
        blending: blendingMode
      });

      const ringLine = new THREE.Line(ringGeo, ringMat);
      ringLine.rotation.set(ringRotations[i].x, ringRotations[i].y, ringRotations[i].z);
      mainGroup.add(ringLine);

      // Add a couple of tiny orbiting dots/nodes along the ring track
      const satelliteGeo = new THREE.BufferGeometry();
      const satPos = new Float32Array(3);
      satPos[0] = radius;
      satPos[1] = 0;
      satPos[2] = 0;
      satelliteGeo.setAttribute('position', new THREE.BufferAttribute(satPos, 3));

      const satelliteMat = new THREE.PointsMaterial({
        color: isDark ? 0xffffff : 0x0f172a,
        size: isDark ? 0.09 : 0.1,
        transparent: true,
        opacity: 0.95,
        blending: blendingMode
      });

      const satellite = new THREE.Points(satelliteGeo, satelliteMat);
      ringLine.add(satellite);

      rings.push({ line: ringLine, speed: ringRotations[i].speed, satellite, radius });
    });

    // --- 2. FLOATING GEOMETRIC WIREFRAME CORE (MINIMALIST CRYSTAL) ---
    // Outer wireframe icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const wireframeGeo = new THREE.WireframeGeometry(coreGeo);
    const coreWireMat = new THREE.LineBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity: isDark ? 0.55 : 0.85,
      blending: blendingMode
    });
    const coreMesh = new THREE.LineSegments(wireframeGeo, coreWireMat);
    mainGroup.add(coreMesh);

    // Inner glowing crystal facet
    const innerGeo = new THREE.OctahedronGeometry(0.7, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.6,
      blending: blendingMode
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // --- 3. MINIMALIST PARTICLES / STARDUST FIELD ---
    const particleCount = 350;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a spherical cloud around the central composition
      const r = 1.8 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      particleScales[i] = Math.random() * 0.03 + 0.015;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: isDark ? 0x93c5fd : 0x0284c7, // Bright ice blue in dark mode, vibrant cobalt in light mode
      size: isDark ? 0.045 : 0.075,
      transparent: true,
      opacity: isDark ? 0.65 : 0.85,
      blending: blendingMode
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // --- MOUSE PARALLAX INTERACTION ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotationY = mouseX * 0.45;
      targetRotationX = -mouseY * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION LOOP ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.04;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.04;

      // Rotate individual orbital rings
      rings.forEach((ring, idx) => {
        ring.line.rotation.z += ring.speed;
        ring.line.rotation.x += ring.speed * 0.5;
        // Orbit satellite node along its circle
        const angle = elapsed * (1.2 + idx * 0.6);
        const satPos = ring.satellite.geometry.attributes.position.array;
        satPos[0] = Math.cos(angle) * ring.radius;
        satPos[1] = Math.sin(angle) * ring.radius;
        ring.satellite.geometry.attributes.position.needsUpdate = true;
      });

      // Core rotations & breathing pulse
      coreMesh.rotation.y += 0.005;
      coreMesh.rotation.x -= 0.003;
      const scale = 1 + Math.sin(elapsed * 1.5) * 0.04;
      coreMesh.scale.set(scale, scale, scale);

      innerMesh.rotation.y -= 0.008;
      innerMesh.rotation.z += 0.006;

      // Particle subtle ambient drift
      particles.rotation.y = elapsed * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Soft Ambient Radial Backdrop */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at 50% 50%, rgba(2, 132, 199, 0.1) 0%, rgba(6, 11, 23, 0) 70%)' 
            : 'radial-gradient(circle at 50% 50%, rgba(2, 132, 199, 0.08) 0%, rgba(240, 246, 252, 0) 70%)'
        }}
      />
      
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
