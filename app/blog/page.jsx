'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client } from '@/services/graphql/client'
import { GET_BLOG_POSTS } from '@/services/graphql/queries'

const transformPosts = (posts) => {
    return posts.map(post => {
        const extraData = post.extraData || {};
        return {
            id: post.postHash,
            title: extraData.Title || '',
            slug: extraData.BlogTitleSlug?.toLowerCase().replace(/\s+/g, '-') || '',
            excerpt: post.body.substring(0, 150) + '...',
            date: new Date(post.timestamp).toISOString().split('T')[0],
            author: "Andrew",
            readTime: "5 min read",
            imageUrl: post.imageUrls?.[0] || null
        };
    });
};

export default function Page() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async (useCache = true) => {
            try {
                const { data } = await client.query({
                    query: GET_BLOG_POSTS,
                    fetchPolicy: useCache ? 'cache-first' : 'network-only',
                });
                
                const transformedPosts = transformPosts(data.posts.nodes);
                
                if (!useCache) {
                    // Only update if we have new posts
                    setPosts(prevPosts => {
                        const newPostHashes = new Set(transformedPosts.map(p => p.id));
                        const oldPostHashes = new Set(prevPosts.map(p => p.id));
                        
                        // Check if we have any new posts
                        const hasNewPosts = transformedPosts.some(post => !oldPostHashes.has(post.id));
                        
                        if (hasNewPosts) {
                            // Merge old and new posts, remove duplicates, sort by date
                            return [...prevPosts, ...transformedPosts]
                                .filter((post, index, self) => 
                                    index === self.findIndex((p) => p.id === post.id)
                                )
                                .sort((a, b) => new Date(b.date) - new Date(a.date));
                        }
                        
                        return prevPosts;
                    });
                } else {
                    // Initial load from cache
                    setPosts(transformedPosts);
                }
            } catch (error) {
                console.error('Error fetching blog posts:', error)
            } finally {
                setLoading(false)
            }
        }

        // Initial fetch using cache
        fetchPosts(true);
        
        // Then check for new posts
        fetchPosts(false);

    }, [])

    if (loading) {
        return (
            <div className='container mx-auto px-4 max-w-6xl'>
                <div className='mx-auto max-w-2xl w-full py-12'>
                    <h1 className='text-4xl mb-12'>Blog</h1>
                    <p>Loading posts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto px-4 max-w-6xl'>
            <div className='mx-auto max-w-2xl w-full py-12'>
                <h1 className='text-4xl mb-12'>Blog</h1>
                <p className='mb-8 text-2xl leading-normal'>Thoughts on Technology and Development</p>
                
                <div className='w-full'>
                    {posts.map((post) => (
                        <article key={post.id} className='mb-8'>
                            {post.imageUrl && (
                                <img 
                                    src={post.imageUrl} 
                                    alt={post.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            )}
                            <h2 className='text-2xl font-bold mb-2'>
                                <Link href={`/blog/${post.slug}`} className='hover:text-blue-600'>
                                    {post.title}
                                </Link>
                            </h2>
                            <div className='text-gray-600 mb-2'>
                                {post.date} · {post.readTime} · {post.author}
                            </div>
                            <p className='text-gray-700'>{post.excerpt}</p>
                            <Link href={`/blog/${post.slug}`} className='text-blue-600 hover:underline mt-2 inline-block'>
                                Read more →
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
