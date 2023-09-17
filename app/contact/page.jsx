'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import NavBar from '@/components/navigation/NavBar.jsx';
import LinkedIn from '@/components/contact/LinkedIn.jsx';
import GitHubButton from 'react-github-btn';
import ContactForm from '@/components/contact/ContactForm';
import Head from 'next/head'

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })

export default function Page() {
    return (
        <><Head>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/dheereshagrwal/colored-icons@master/ci.min.css"
            />
        </Head>
            <NavBar />
            <div className="contact-page mx-auto max-w-2xl flex flex-col flex-wrap items-center md:flex-row lg:md-48 lg:md-48 p12 p-8 sm:p-0 pb-48">
                <h1 className="text-4xl mb-12 pt-12">Let&apos;s Collaborate</h1>
                <p>Dive into the future of web development with a partner who understands every layer, from server to user interface. Let's create something impactful together.</p>

                <ContactForm />
            </div>
        </>
    )
}
