'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import NavBar from '@/components/navigation/NavBar.jsx';
import AboutPage from './AboutPage.jsx';

export default function Page() {
    return (
        <><NavBar />
            <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row lg:w-4/5'>
                {/* jumbo */}
                <div className='flex w-full flex-col items-start justify-center p-12 text-center md:text-left'>
                    <AboutPage />
                </div>
            </div>
        </>
    )
}
