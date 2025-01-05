'use client'

import { useState, useEffect } from 'react'
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
            excerpt: post.body.split('View this post at https://desocialworld')[0],
            date: new Date(post.timestamp).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            author: "Andrew",
            readTime: "5 min read",
            imageUrl: post.imageUrls?.[0] || null
        };
    });
};

export default function BlogPostsList({ initialPosts }) {
    const [posts, setPosts] = useState(initialPosts)

    useEffect(() => {
        const checkForNewPosts = async () => {
            try {
                const { data } = await client.query({
                    query: GET_BLOG_POSTS,
                    fetchPolicy: 'network-only',
                });

                const transformedPosts = transformPosts(data.posts.nodes);
                const newPostHashes = new Set(transformedPosts.map(p => p.id));
                const oldPostHashes = new Set(posts.map(p => p.id));

                // Check if we have any new posts
                const hasNewPosts = transformedPosts.some(post => !oldPostHashes.has(post.id));

                if (hasNewPosts) {
                    // Trigger revalidation
                    try {
                        await fetch('/api/revalidate?path=/blog', { method: 'POST' });
                    } catch (error) {
                        console.error('Error triggering revalidation:', error);
                    }

                    // Update client-side state immediately
                    setPosts(prevPosts => {
                        const merged = [...prevPosts, ...transformedPosts]
                            .filter((post, index, self) =>
                                index === self.findIndex((p) => p.id === post.id)
                            )
                            .sort((a, b) => new Date(b.date) - new Date(a.date));
                        return merged;
                    });
                }
            } catch (error) {
                console.error('Error checking for new posts:', error);
            }
        };

        // Check for new posts periodically
        const interval = setInterval(checkForNewPosts, 30000); // every 30 seconds

        return () => clearInterval(interval);
    }, [posts]);

    return (
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
    );
}
