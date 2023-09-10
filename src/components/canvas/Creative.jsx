'use client'

import { useGLTF } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three'
import { useMemo, useRef, useState, useEffect } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export function Gallery(props) {
    const { scene } = useGLTF('/gallery.glb')

    ///useFrame((state, delta) => (scene.rotation.y += delta / 10))

    return <primitive object={scene} {...props} />
}

export function Computer(props) {
    const { scene } = useGLTF('/computer.glb');
    const [rotationY, setRotationY] = useState(Math.PI);

    const handleMouseMove = (event) => {
        const mouseX = event.clientX;
        const windowWidth = window.innerWidth;
        const normalizedMouseX = (mouseX / windowWidth) * 2 - 1;
        const desiredRotation = normalizedMouseX * (Math.PI * 2);
        setRotationY(desiredRotation);
    };

    useEffect(() => {
        if (!isTouchDevice()) {
            window.addEventListener('mousemove', handleMouseMove);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, []);

    useFrame(() => {
        if (isTouchDevice()) {
            scene.rotation.y += 0.005;
        } else {
            scene.rotation.y = rotationY;
        }
    });

    return <primitive object={scene} position={[0, 0, 0.5]} rotation={[0, rotationY, 0]} {...props} />;
}

function isTouchDevice() {
    return false;
}


export function Headset(props) {
    const { scene } = useGLTF('/oculus_quest_2.glb')

    useFrame((state, delta) => (scene.rotation.y += delta))

    return <primitive object={scene} position={[0, -0.1, 0.5]} rotation={[0, Math.PI, 0]} {...props} />
}

export function Mobile(props) {
    const { scene } = useGLTF('/cell_phone.glb')

    useFrame((state, delta) => (scene.rotation.y += delta))

    return <primitive object={scene} position={[0, 0.1, 4]} rotation={[Math.PI / 4, Math.PI, 0]} {...props} />
}
/*
export function Computer(props) {
    const { scene } = useGLTF('/computer.glb')

    const vrHeadsetGltf = useGLTF('/oculus_quest_2.glb');
    const mobilePhoneGltf = useGLTF('/cell_phone.glb');

    const computeScale = (object) => {
        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = new THREE.Vector3();
        boundingBox.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const desiredSize = 1;  // Set this to the desired size
        return desiredSize / maxDim;
    };

    const computerScale = computeScale(scene);
    const vrHeadsetScale = computeScale(vrHeadsetGltf.scene);
    const mobilePhoneScale = computeScale(mobilePhoneGltf.scene);

    scene.children[0].scale.set(computerScale, computerScale, computerScale);
    vrHeadsetGltf.scene.scale.set(vrHeadsetScale, vrHeadsetScale, vrHeadsetScale);
    mobilePhoneGltf.scene.scale.set(mobilePhoneScale, mobilePhoneScale, mobilePhoneScale);

    vrHeadsetGltf.scene.name = 'vrHeadset';
    mobilePhoneGltf.scene.name = 'mobilePhone';

    scene.add(vrHeadsetGltf.scene);
    scene.add(mobilePhoneGltf.scene);

    const s = 1; // side length of the equilateral triangle
    const h = Math.sqrt(3); // height of the equilateral triangle

    scene.children[0].position.set(0, 0, h / 2); // Top vertex
    vrHeadsetGltf.scene.position.set(-s / 2, 0, -h / 2); // Bottom-left vertex
    mobilePhoneGltf.scene.position.set(s / 2, 0, -h / 2); // Bottom-right vertex

    useFrame((state, delta) => (scene.rotation.y += delta / 5))

    return <primitive object={scene} position={[0, 0, 0.5]} rotation={[0, Math.PI, 0]} {...props} />
} */



export function Phone(props) {
    const { scene } = useGLTF('/gallery.glb')

    ///useFrame((state, delta) => (scene.rotation.y += delta / 10))

    return <primitive object={scene} {...props} />
}