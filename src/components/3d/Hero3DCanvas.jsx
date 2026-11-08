import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const mountRef = useRef(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as recommended in threejs skill
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch (e) {
        return true;
      }
    })();

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // Renderer setup
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL initialization failed, showing high-tech vector fallback:', err);
      setWebGlSupported(false);
      return;
    }

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x8B5CF6, 2.5); // Purple key light
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x06B6D4, 2.8); // Cyan rim light
    rimLight.position.set(-5, -3, 3);
    scene.add(rimLight);

    const topFill = new THREE.PointLight(0x3B82F6, 1.8, 20); // Electric blue fill
    topFill.position.set(0, 4, 2);
    scene.add(topFill);

    // Composite Procedural 3D Model: The Nexus Cybernetic Core
    const coreGroup = new THREE.Group();

    // 1. Central Metallic Icosahedron Core
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111C30,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // 2. Inner Glowing Wireframe Core
    const wireGeo = new THREE.IcosahedronGeometry(1.26, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // 3. Primary Cybernetic Torus Ring (Horizontal Axis)
    const ring1Geo = new THREE.TorusGeometry(1.9, 0.04, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x3B82F6,
      emissive: 0x1E40AF,
      emissiveIntensity: 0.4,
      metalness: 0.95,
      roughness: 0.15
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // 4. Secondary Cybernetic Torus Ring (Tilted Axis)
    const ring2Geo = new THREE.TorusGeometry(2.35, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x06B6D4,
      emissive: 0x0891B2,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.1
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    coreGroup.add(ring2);

    // 5. Outer Beveled Orbital Ring with Nodes
    const ring3Geo = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xEC4899,
      transparent: true,
      opacity: 0.4
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI / 4;
    coreGroup.add(ring3);

    // 6. Orbiting Satellite Nodes (3 parts)
    const satellites = [];
    const satGeo = new THREE.OctahedronGeometry(0.2, 0);
    const satColors = [0x8B5CF6, 0x06B6D4, 0x3B82F6];

    for (let i = 0; i < 3; i++) {
      const satMat = new THREE.MeshStandardMaterial({
        color: satColors[i],
        emissive: satColors[i],
        emissiveIntensity: 0.6,
        metalness: 0.8,
        roughness: 0.2
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      satellites.push({
        mesh: sat,
        orbitRadius: 2.2 + i * 0.45,
        speed: 0.8 + i * 0.4,
        angleOffset: (i * Math.PI * 2) / 3,
        inclination: (i * 0.4) - 0.4
      });
      coreGroup.add(sat);
    }

    // 7. Ambient Particle Dust Field
    const particleCount = isSoftwareGl ? 80 : 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 12;
      particlePos[i + 1] = (Math.random() - 0.5) * 10;
      particlePos[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x93C5FD,
      size: 0.045,
      transparent: true,
      opacity: 0.6
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    scene.add(coreGroup);

    // Mouse Tracking with smooth interpolation
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.45;
      mouse.targetY = y * 0.35;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    let lastTime = performance.now();
    let startTime = performance.now();

    const animate = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsedTime = (now - startTime) / 1000;

      // Smooth mouse damping
      mouse.x = THREE.MathUtils.damp(mouse.x, mouse.targetX, 4, delta);
      mouse.y = THREE.MathUtils.damp(mouse.y, mouse.targetY, 4, delta);

      // Rotate 3D Core with mouse parallax
      coreGroup.rotation.y = elapsedTime * 0.25 + mouse.x;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.2 + mouse.y;

      // Independent ring rotations
      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.x = elapsedTime * -0.3;
      ring3.rotation.y = elapsedTime * 0.25;

      // Pulsing wireframe
      wireMesh.rotation.y = -elapsedTime * 0.3;
      wireMesh.rotation.x = elapsedTime * 0.2;
      wireMat.opacity = 0.55 + Math.sin(elapsedTime * 2.5) * 0.2;

      // Orbiting satellites
      satellites.forEach(sat => {
        const angle = elapsedTime * sat.speed + sat.angleOffset;
        sat.mesh.position.x = Math.cos(angle) * sat.orbitRadius;
        sat.mesh.position.y = Math.sin(angle * 1.5) * 0.4 + sat.inclination;
        sat.mesh.position.z = Math.sin(angle) * sat.orbitRadius;
        sat.mesh.rotation.x += delta * 2;
        sat.mesh.rotation.y += delta * 1.5;
      });

      // Gently drift particle field
      particleSystem.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      satGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] flex items-center justify-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-purple-500/10 via-blue-500/5 to-transparent pointer-events-none rounded-3xl" />
      
      {/* Three.js mount container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Fallback if WebGL unavailable */}
      {!webGlSupported && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <div className="p-8 rounded-2xl glass-panel max-w-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold">3D</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Interactive Cyber Core</h4>
            <p className="text-xs text-slate-400">Interactive 3D geometry rendered using Three.js mathematical vertex projections.</p>
          </div>
        </div>
      )}
    </div>
  );
}
