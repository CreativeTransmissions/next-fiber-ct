'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef } from 'react'
import NavBar from '@/components/navigation/NavBar.jsx'
import { Canvas, useFrame } from '@react-three/fiber'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useThree } from '@react-three/fiber'
const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Gallery = dynamic(() => import('@/components/canvas/Creative').then((mod) => mod.Gallery), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

const CameraMove = () => {
  const { camera } = useThree();
  const angle = useRef(0); // Use useRef to persist angle between renders
  angle.radius = 10; // Define a radius for the circular path

  useFrame(() => {
    angle.current += 0.01; // Increment the angle
    angle.radius += 0.1;// Define a radius for the circular path

    // Update x and z positions based on angle and radius
    camera.position.x = Math.cos(angle.current) * angle.radius;
    camera.position.z = Math.sin(angle.current) * angle.radius;
    camera.position.y += 0.05;

    camera.lookAt(0, 0, 0);
  });

  return null;
};


const CameraAnimation = () => {
  const { camera } = useThree();

  useEffect(() => {
    // Define the points for the curve
    const points = [
      { x: 0, y: 0, z: 0 },
      { x: 2, y: 30, z: 50 },
      { x: 5, y: 40, z: -10 },
      { x: 20, y: 50, z: -45 },
    ];

    // Create an interpolator function
    const interpolator = gsap.utils.interpolate(points[0], points[points.length - 1]);

    // Use GSAP to animate the camera
    gsap.to(camera.position, {
      duration: 60,
      ease: 'power1.inOut',
      progress: progress => {
        const point = interpolator(progress);
        camera.position.set(point.x, point.y, point.z);
      },
      onUpdate: () => camera.updateProjectionMatrix(),
    });
  }, [camera]);

  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export default function Page() {
  return (
    <>
      <NavBar />
      <Canvas style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
        <Gallery scale={2} target={[40, 0, 20]} position={[-40, -1.6, 40]} rotation={[0.0, -0.3, 0]} />
        <CameraMove />
        <Common color={'white'} />
      </Canvas>
      <div className="scrollcontent" style={{ position: 'relative', zIndex: 1 }}>
        <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
          {/* jumbo */}
          <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
            <p className='w-full uppercase'>3D Web, XR, VR, AR, DeSo, Blockchain.</p>
            <Image
              src="/img/logo.jpg"
              alt="Creative Transmissions Logo"
              width={200}
              height={200}
            />
          </div>
          <p className='mb-8 text-2xl leading-normal'>Full Stack Web Development</p>
        </div>

        <div className='w-full text-center md:w-3/5'>

        </div>

      </div>
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </>
  )
}
