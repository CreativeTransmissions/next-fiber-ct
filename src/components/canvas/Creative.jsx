'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export function Gallery(props) {
    const { scene } = useGLTF('/gallery.glb')

    ///useFrame((state, delta) => (scene.rotation.y += delta / 10))

    return <primitive object={scene} {...props} />
}

export function Computer(props) {
    const { scene } = useGLTF('/computer.glb')

    ///useFrame((state, delta) => (scene.rotation.y += delta / 10))

    return <primitive object={scene} position={[0, 0, 0.25]} rotation={[0, Math.PI, 0]} {...props} />
}

export function Headset(props) {
    const { scene } = useGLTF('/gallery.glb')

    ///useFrame((state, delta) => (scene.rotation.y += delta / 10))

    return <primitive object={scene} {...props} />
}

export function Phone(props) {
    const { scene } = useGLTF('/gallery.glb')

    ///useFrame((state, delta) => (scene.rotation.y += delta / 10))

    return <primitive object={scene} {...props} />
}