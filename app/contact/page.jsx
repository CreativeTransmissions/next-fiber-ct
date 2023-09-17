'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import NavBar from '@/components/navigation/NavBar.jsx';
import LinkedIn from '@/components/contact/LinkedIn.jsx';
import GitHubButton from 'react-github-btn';
import ContactForm from '@/components/contact/ContactForm';

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })

export default function Page() {
    return (
        <><NavBar />

            <div className="contact-page mx-auto max-w-2xl flex flex-col flex-wrap items-center md:flex-row lg:md-48 lg:md-48 p12 p-8 sm:p-0">
                <h1 className="text-4xl mb-12 pt-12">Let&apos;s Collaborate</h1>
                <p>Dive into the future of web development with a partner who understands every layer, from server to user interface. Let's create something impactful together.</p>

                <ContactForm />

                {/* jumbo */}
                <div className='flex w-full h-full items-center justify-center p-12 text-center'>
                    <LinkedIn />
                </div>
                <div className='flex w-full h-full items-center justify-center text-center'>
                    <GitHubButton href="https://github.com/CreativeTransmissions" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Follow @YourGitHubUsername on GitHub">Follow @CreativeTransmissions</GitHubButton>
                </div>
            </div>
        </>
    )
}
