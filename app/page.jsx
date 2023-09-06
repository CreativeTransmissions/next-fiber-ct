'use client'

import dynamic from 'next/dynamic'
import { Suspense, useRef } from 'react'
import NavBar from '@/components/navigation/NavBar.jsx';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

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
const RotatingStars = () => {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.rotation.x += 0.001;
    ref.current.rotation.y += 0.001;
  });

  return <Stars ref={ref} />;
};

export default function Page() {
  return (
    <>
      <NavBar />
      <Canvas style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
        <RotatingStars />
      </Canvas>
      <div className="scrollcontent" style={{ position: 'relative', zIndex: 1 }}>
        <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
          {/* jumbo */}
          <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
            <p className='w-full uppercase'>3D Web, XR, VR, AR, DeSo, Blockchain.</p>
            <h1 className='my-4 text-5xl font-bold leading-tight'>Creative Transmissions</h1>
            <p className='mb-8 text-2xl leading-normal'>Full Stack Web Development</p>
          </div>

          <div className='w-full text-center md:w-3/5'>
            <View className='flex h-96 w-full flex-col items-center justify-center'>
              <Suspense fallback={null}>
                <Logo route='/blob' scale={0.6} position={[0, 0, 0]} />
                <Common />
              </Suspense>
            </View>
          </div>
        </div>

        <div className='mx-auto flex w-full flex-col flex-wrap items-center p-12 md:flex-row  lg:w-4/5'>
          {/* first row */}
          <div className='relative my-12 h-96 w-full py-6 md:mb-40'>
            <View orbit className='relative h-full sm:w-full'>
              <Suspense fallback={null}>
                <Gallery scale={2} target={[40, 0, 20]} position={[-40, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
                <Common color={'white'} />
              </Suspense>
            </View>
          </div>
          {/* second row */}

          <div className='w-full p-6 sm:w-1/2'>
            <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>Dom and 3D are synchronized</h2>
            <p className='mb-8 text-gray-600'>
              3D Divs are renderer through the View component. It uses gl.scissor to cut the viewport into segments. You
              tie a view to a tracking div which then controls the position and bounds of the viewport. This allows you to
              have multiple views with a single, performant canvas. These views will follow their tracking elements,
              scroll along, resize, etc.
            </p>
          </div>
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
