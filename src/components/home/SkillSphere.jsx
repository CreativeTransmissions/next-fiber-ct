import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Text, TrackballControls } from '@react-three/drei'
import { View } from '@/components/canvas/View';

function Word({ children, ...props }) {
    const color = new THREE.Color()
    const fontProps = { font: '/Roboto.woff', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    const over = (e) => (e.stopPropagation(), setHovered(true))
    const out = () => setHovered(false)
    // Change the mouse cursor on hover
    useEffect(() => {
        if (hovered) document.body.style.cursor = 'pointer'
        return () => (document.body.style.cursor = 'auto')
    }, [hovered])
    // Tie component to the render-loop
    useFrame(({ camera }) => {
        // Make text face the camera
        ref.current.quaternion.copy(camera.quaternion)
        // Animate font color
        ref.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1)
    })
    return <Text ref={ref} onPointerOver={over} onPointerOut={out} {...props} {...fontProps}>{children}</Text>
}

const wordSequence = (index) => {
    let words = ['HTMl 5', 'CSS', 'JavaScript', 'Databases', 'MySQL', 'SQL Server', 'Vue', 'Svelte', 'Procedures', 'Optimization', 'AWS', 'RDS', 'DynamoDB', 'MariaDB', 'Docker', 'Web 3', 'DeSo', 'Git', 'GitHub', 'Agile', 'Remote', 'PHP', 'Laravel', 'PHPUnit', 'Clean Code', 'jQuery', 'WordPress', 'WebXR', 'ThreeJS', 'BlockChain', 'APIs', 'SDKs', 'Web3']
    return words[index % words.length]
}
function Cloud({ count = 4, radius = 10 }) {
    // Create a count x count random words with spherical distribution
    const words = useMemo(() => {
        let word = '';
        let wordCounter = 0;
        const temp = []
        const spherical = new THREE.Spherical()
        const phiSpan = Math.PI / (count + 1)
        const thetaSpan = (Math.PI * 2) / count
        for (let i = 1; i < count + 1; i++) {
            for (let j = 0; j < count; j++) {
                word = wordSequence(++wordCounter);
                temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), word])
            }
        }
        return temp
    }, [count, radius])
    return words.map(([pos, word], index) => <Word key={index} position={pos}>{word}</Word>)
}

export const SkillSphere = (props) => {

    return (
        <View style={{
            height: '100%', width: '100%', position: 'absolute', top: 0, zIndex: '- 1'
        }}>
            <fog attach="fog" args={['#202025', 0, 80]} />
            <Cloud count={12} radius={40} />
            <OrbitControls autoRotate={true} enableZoom={false} />
        </View>
    );
}

export default SkillSphere;
