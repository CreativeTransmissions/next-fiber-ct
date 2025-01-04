'use client'

import { useEffect, useState } from 'react'
import { client } from '@/services/graphql/client'
import { GET_BLOG_POSTS, GET_BLOG_POST } from '@/services/graphql/queries'
import { notFound } from 'next/navigation'

export default function BlogPost({ params }) {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // First try to get from cache
                const { data: listData } = await client.query({
                    query: GET_BLOG_POSTS,
                    fetchPolicy: 'cache-first',
                });

                // Find the post in the cached list
                const cachedPost = listData.posts.nodes.find(post => 
                    post.extraData?.BlogTitleSlug?.toLowerCase().replace(/\s+/g, '-') === params.slug
                );

                if (cachedPost) {
                    setPost(transformPost(cachedPost));
                    setLoading(false);
                } else {
                    // If not in cache, fetch all posts to find the hash
                    const { data: freshData } = await client.query({
                        query: GET_BLOG_POSTS,
                        fetchPolicy: 'network-only',
                    });

                    const freshPost = freshData.posts.nodes.find(post => 
                        post.extraData?.BlogTitleSlug?.toLowerCase().replace(/\s+/g, '-') === params.slug
                    );

                    if (freshPost) {
                        // Get the full post data
                        const { data: postData } = await client.query({
                            query: GET_BLOG_POST,
                            variables: { postHash: freshPost.postHash },
                        });

                        if (postData.post) {
                            setPost(transformPost(postData.post));
                        } else {
                            notFound();
                        }
                    } else {
                        notFound();
                    }
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
                notFound();
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [params.slug]);

    const transformPost = (post) => {
        const extraData = post.extraData || {};
        return {
            id: post.postHash,
            title: extraData.BlogTitleSlug || '',
            body: post.body,
            date: new Date(post.timestamp).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            author: "Andrew",
            readTime: "5 min read",
            imageUrl: post.imageUrls?.[0] || null
        };
    };

    if (loading) {
        return (
            <div className='container mx-auto px-4 max-w-6xl'>
                <div className='mx-auto max-w-2xl w-full py-12'>
                    <h1 className='text-4xl mb-12'>Loading...</h1>
                </div>
            </div>
        );
    }

    if (!post) {
        notFound();
    }

    return (
        <div className='container mx-auto px-4 max-w-6xl'>
            <div className='mx-auto max-w-2xl w-full py-12'>
                <article className="w-full">
                    {post.imageUrl && (
                        <img 
                            src={post.imageUrl} 
                            alt={post.title}
                            className="w-full h-64 object-cover rounded-lg mb-8"
                        />
                    )}
                    <h1 className="text-4xl mb-4">{post.title}</h1>
                    <div className="text-gray-600 mb-8">
                        {post.date} · {post.readTime} · {post.author}
                    </div>
                    <div className="prose prose-lg max-w-none">
                        {post.body.split('\n').map((paragraph, index) => (
                            paragraph.trim() && (
                                <p key={index} className="mb-4 text-gray-700">
                                    {paragraph}
                                </p>
                            )
                        ))}
                    </div>
                </article>
            </div>
        </div>
    );
}
