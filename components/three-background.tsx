"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface ThreeBackgroundProps {
  particleCount?: number
  className?: string
}

export default function ThreeBackground({ particleCount = 1000, className = "" }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particles
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    // Color palette: teal, cyan, white
    const colorPalette = [
      new THREE.Color(0x007eb0), // Teal
      new THREE.Color(0x00ced1), // Cyan
      new THREE.Color(0xffffff), // White
    ]

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 10
      positions[i + 1] = (Math.random() - 0.5) * 10
      positions[i + 2] = (Math.random() - 0.5) * 10

      // Color
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles

    // Add floating cubes
    const cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x007eb0,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })

    for (let i = 0; i < 5; i++) {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      cube.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8)
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      scene.add(cube)
    }

    // Mouse movement
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      if (particles) {
        particles.rotation.x += 0.0005
        particles.rotation.y += 0.0008
      }

      // Animate cubes
      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.x += 0.005
          child.rotation.y += 0.005
        }
      })

      // Camera follows mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(frameRef.current)

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }

      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [particleCount])

  return <div ref={containerRef} className={`fixed inset-0 -z-10 ${className}`} />
}
