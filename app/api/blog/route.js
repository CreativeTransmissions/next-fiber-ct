import { NextResponse } from 'next/server'

export async function GET() {
    // Dummy blog posts data
    const posts = [
        {
            id: 1,
            title: "Exploring React Three Fiber",
            slug: "exploring-react-three-fiber",
            excerpt: "Deep dive into creating immersive 3D experiences with React Three Fiber and Three.js",
            date: "2024-12-28",
            author: "Andrew",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "The Future of Web Development",
            slug: "future-of-web-development",
            excerpt: "Insights into emerging technologies and trends shaping the future of web development",
            date: "2024-12-15",
            author: "Andrew",
            readTime: "4 min read"
        }
    ];

    return NextResponse.json({ posts });
}
