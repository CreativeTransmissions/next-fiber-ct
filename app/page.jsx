'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef } from 'react'
import NavBar from '@/components/navigation/NavBar.jsx'
import { Canvas, useFrame } from '@react-three/fiber'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useThree } from '@react-three/fiber'
import pageData from './homePageData.js'
const Computer = dynamic(() => import('@/components/canvas/Creative').then((mod) => mod.Computer), { ssr: false })
const Headset = dynamic(() => import('@/components/canvas/Creative').then((mod) => mod.Headset), { ssr: false })
const Mobile = dynamic(() => import('@/components/canvas/Creative').then((mod) => mod.Mobile), { ssr: false })

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
      ease: 'sine.out',
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
      <div className="scrollcontent" style={{ position: 'relative', zIndex: 1 }}>
        <div className='mx-auto flex w-full flex-wrap items-center md:flex-row lg:w-4/5'>
          <div className='flex w-full flex-col items-center justify-center text-center md:w-2/5 md:text-left md:items-start'>
            <Image className='p-0 mt-6 mx-auto md:mx-0'
              src="/img/logo.jpg"
              alt="Creative Transmissions Logo"
              width={250}
              height={250}
            />
            <p className='mb-8 text-2xl leading-normal pl-2'>{pageData.title}</p>
          </div>
          <div className='flex w-full flex-col items-center justify-center text-center md:w-3/5 md:text-left pt-4'>
            <Canvas style={{ height: '280px', border: '2px solid #000', width: '100%' }}>
              <Computer />
              <Common color={'#AAF'} />
            </Canvas>
          </div>
        </div>


        <div className='w-full text-center md:w-3/5'>
        </div>

      </div >
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </>
  )
}
