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
