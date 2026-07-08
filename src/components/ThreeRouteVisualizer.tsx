import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MapPin, Navigation, Compass, Globe } from 'lucide-react';

export default function ThreeRouteVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNode, setActiveNode] = useState<'toronto' | 'ottawa' | 'none'>('none');
  const [hoveredNode, setHoveredNode] = useState<'toronto' | 'ottawa' | 'none'>('none');
  const [stats, setStats] = useState({
    distance: '450 km',
    duration: '4h 30m',
    highway: 'Hwy 401 & 416',
    activeShuttles: 14
  });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a1526, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 35, 75);
    camera.lookAt(0, 5, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(120, 40, 0xd4af37, 0x1c3a5e);
    gridHelper.position.y = -5;
    // Set opacity
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach(m => {
        m.transparent = true;
        m.opacity = 0.15;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.15;
    }
    scene.add(gridHelper);

    // Glowing coordinate nodes
    // Toronto (Left side/Bottom)
    const torontoPos = new THREE.Vector3(-25, 0, 15);
    // Ottawa (Right side/Top)
    const ottawaPos = new THREE.Vector3(25, 8, -15);

    // Creator function for nodes
    const createNode = (position: THREE.Vector3, color: number) => {
      const group = new THREE.Group();
      group.position.copy(position);

      // Core sphere
      const coreGeo = new THREE.SphereGeometry(1.5, 32, 32);
      const coreMat = new THREE.MeshBasicMaterial({ color: color });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Outer glow ring
      const ringGeo = new THREE.RingGeometry(1.8, 2.4, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      // Vertical beacon line
      const beaconGeo = new THREE.CylinderGeometry(0.1, 0.1, 40, 8);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.y = 20;
      group.add(beacon);

      scene.add(group);
      return { group, ring, core };
    };

    const torontoNode = createNode(torontoPos, 0xd4af37); // Gold
    const ottawaNode = createNode(ottawaPos, 0x3b82f6);  // Blue/Gold theme matching Dark Navy

    // Connect them with a beautiful 3D Bezier Curve
    const midPoint = new THREE.Vector3(0, 18, 0);
    const curve = new THREE.QuadraticBezierCurve3(torontoPos, midPoint, ottawaPos);

    const points = curve.getPoints(50);
    const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
    const curveMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.8,
      linewidth: 2 // Note: linewidth > 1 usually not supported by WebGL implementations, but standard is fine
    });
    const curveLine = new THREE.Line(curveGeo, curveMat);
    scene.add(curveLine);

    // Glowing pulse particles flowing along the route (The executive shuttles)
    const shuttleCount = 6;
    const shuttles: { mesh: THREE.Mesh; progress: number; speed: number }[] = [];

    for (let i = 0; i < shuttleCount; i++) {
      const shuttleGeo = new THREE.SphereGeometry(0.6, 16, 16);
      const shuttleMat = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.9
      });
      const shuttleMesh = new THREE.Mesh(shuttleGeo, shuttleMat);
      scene.add(shuttleMesh);
      shuttles.push({
        mesh: shuttleMesh,
        progress: (i / shuttleCount) * 1.0,
        speed: 0.003 + Math.random() * 0.002
      });
    }

    // Add a floating particle starfield in the background
    const starCount = 300;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 200;     // X
      starPositions[i + 1] = Math.random() * 100;         // Y
      starPositions[i + 2] = (Math.random() - 0.5) * 200; // Z
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.4
    });
    const starfield = new THREE.Points(starGeo, starMat);
    scene.add(starfield);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 35;
    let targetCameraZ = 75;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / width) * 2 - 1;
      const y = -((event.clientY - rect.top) / height) * 2 + 1;

      mouseX = x;
      mouseY = y;

      // Detect hover on nodes (approximate calculation for responsive layout)
      const raycaster = new THREE.Raycaster();
      const ndcMouse = new THREE.Vector2(x, y);
      raycaster.setFromCamera(ndcMouse, camera);

      const intersects = raycaster.intersectObjects([torontoNode.core, ottawaNode.core]);
      if (intersects.length > 0) {
        const hovered = intersects[0].object;
        if (hovered === torontoNode.core) {
          setHoveredNode('toronto');
          container.style.cursor = 'pointer';
        } else if (hovered === ottawaNode.core) {
          setHoveredNode('ottawa');
          container.style.cursor = 'pointer';
        }
      } else {
        setHoveredNode('none');
        container.style.cursor = 'default';
      }
    };

    const handleCanvasClick = () => {
      if (hoveredNode !== 'none') {
        setActiveNode(hoveredNode);
        if (hoveredNode === 'toronto') {
          setStats({
            distance: 'Toronto Pearson (YYZ)',
            duration: 'Ontario Hub Connection',
            highway: 'Terminal 1 & 3 Pickups',
            activeShuttles: 8
          });
        } else {
          setStats({
            distance: 'Ottawa International (YOW)',
            duration: 'Capital Region Chauffeur',
            highway: 'Downtown & Parliament Service',
            activeShuttles: 6
          });
        }
      } else {
        setActiveNode('none');
        setStats({
          distance: '450 km',
          duration: '4h 30m',
          highway: 'Hwy 401 & 416',
          activeShuttles: 14
        });
      }
    };

    // Scroll trigger interaction
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      
      // Dynamic camera position based on scroll
      targetCameraX = mouseX * 15 + Math.sin(scrollPercent * Math.PI * 2) * 10;
      targetCameraZ = 75 - scrollPercent * 25 + mouseY * 10;
      targetCameraY = 35 - scrollPercent * 15 + mouseY * 5;
    };

    window.addEventListener('scroll', handleScroll);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleCanvasClick);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Rotate beacon rings
      torontoNode.ring.scale.setScalar(1 + Math.sin(time * 3) * 0.15);
      ottawaNode.ring.scale.setScalar(1 + Math.cos(time * 3) * 0.15);

      torontoNode.ring.rotation.z += 0.01;
      ottawaNode.ring.rotation.z -= 0.01;

      // Move particles along the curve
      shuttles.forEach((shuttle) => {
        shuttle.progress += shuttle.speed;
        if (shuttle.progress > 1) {
          shuttle.progress = 0;
        }
        
        // Get position along curve
        const pos = curve.getPointAt(shuttle.progress);
        shuttle.mesh.position.copy(pos);

        // Make trailing size fluctuate
        shuttle.mesh.scale.setScalar(0.8 + Math.sin(time * 5 + shuttle.progress * 10) * 0.2);
      });

      // Slowly rotate starfield
      starfield.rotation.y = time * 0.01;

      // Smooth camera interpolation (Lerp)
      const lerpFactor = 0.05;
      camera.position.x += ((mouseX * 20 + targetCameraX) - camera.position.x) * lerpFactor;
      camera.position.y += ((targetCameraY) - camera.position.y) * lerpFactor;
      camera.position.z += ((targetCameraZ) - camera.position.z) * lerpFactor;

      // Look slightly towards the center of Ontario route
      camera.lookAt(0, 4, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight || 500;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleCanvasClick);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [hoveredNode]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[500px] bg-gradient-to-b from-[#0a1526] via-[#080d16] to-[#111111] rounded-3xl overflow-hidden border border-brand-gold/10 navy-glow"
      id="three-d-route-section"
    >
      {/* ThreeJS Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Floating UI Glass Controls */}
      <div className="absolute top-6 left-6 right-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pointer-events-none z-10">
        <div className="glass-panel p-4 rounded-xl max-w-sm pointer-events-auto transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-brand-gold animate-spin-slow" />
            <h4 className="font-display font-semibold text-white tracking-wider text-sm uppercase">Ontario Interactive Express Route</h4>
          </div>
          <p className="text-xs text-gray-300">
            Hover and click on the glowing city beacons below to view active service nodes, or scroll to travel along the corridor.
          </p>
          <div className="mt-3 flex gap-4 text-[10px] font-mono text-brand-gold">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
              YYZ HUB ACTIVE
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              YOW HUB ACTIVE
            </span>
          </div>
        </div>

        {/* Dynamic Route Stats HUD */}
        <div className="glass-panel p-5 rounded-xl min-w-[280px] pointer-events-auto border-brand-gold/20">
          <div className="text-xs font-mono text-brand-gold mb-1 uppercase tracking-widest flex justify-between items-center">
            <span>Route Telemetry</span>
            <span className="text-[10px] bg-brand-gold/10 text-brand-gold px-1.5 py-0.5 rounded">Real-time</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-gray-400">Connection Distance:</span>
              <span className="font-display font-bold text-white text-lg tracking-tight">{stats.distance}</span>
            </div>
            
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-gray-400">Avg Travel Duration:</span>
              <span className="font-mono font-medium text-brand-gold">{stats.duration}</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-xs text-gray-400">Primary Corridor:</span>
              <span className="text-xs text-white font-mono">{stats.highway}</span>
            </div>

            <div className="h-[1px] bg-white/10 my-2" />

            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Active Fleet Chauffeurs:</span>
              <span className="bg-brand-navy/60 border border-brand-gold/30 px-2 py-0.5 rounded font-mono text-white text-xs font-semibold">
                {stats.activeShuttles} Vehicles
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* City Marker Overlays (Interactive) */}
      <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
        <div className="flex flex-col gap-1.5 font-mono text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-gold" />
            <span>Toronto (Pearson YYZ Hub) - Latitude: 43.6777° N</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Ottawa (Capital YOW Hub) - Latitude: 45.3225° N</span>
          </div>
        </div>
      </div>

      {/* Instruction Tip */}
      <div className="absolute bottom-6 right-6 z-10 bg-black/80 backdrop-blur-md border border-white/5 px-3 py-1.5 rounded-lg text-[11px] text-gray-300 font-mono flex items-center gap-1.5 pointer-events-none">
        <Compass className="w-3.5 h-3.5 text-brand-gold animate-bounce" />
        <span>Gently move mouse to pan camera perspective</span>
      </div>
    </div>
  );
}
