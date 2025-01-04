'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Page() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/blog')
                const data = await response.json()
                setPosts(data.posts)
            } catch (error) {
                console.error('Error fetching blog posts:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    return (
        <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row lg:w-4/5'>
            <div className='mx-auto max-w-2xl flex w-full flex-col items-start justify-center p-12 sm:p-0'>
                <h1 className='text-4xl mb-12 text-left'>Blog</h1>
                <p className='mb-8 text-2xl leading-normal'>Thoughts on Technology and Development</p>
                
                {loading ? (
                    <div className='flex items-center justify-center w-full'>
                        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
                    </div>
                ) : (
                    <div className='w-full space-y-8'>
                        {posts.map((post) => (
                            <article key={post.id} className='border-b border-gray-200 pb-8'>
                                <Link href={`/blog/${post.slug}`}>
                                    <h2 className='text-3xl font-semibold mb-2 hover:text-blue-600 transition-colors'>
                                        {post.title}
                                    </h2>
                                </Link>
                                <div className='flex gap-4 text-sm text-gray-600 mb-4'>
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                    <span>•</span>
                                    <span>By {post.author}</span>
                                </div>
                                <p className='text-gray-700 leading-relaxed'>
                                    {post.excerpt}
                                </p>
                                <Link 
                                    href={`/blog/${post.slug}`}
                                    className='inline-block mt-4 text-blue-600 hover:text-blue-800 transition-colors'
                                >
                                    Read more →
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
