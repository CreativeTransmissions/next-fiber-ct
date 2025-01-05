import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const { searchParams } = new URL(request.url)
        const path = searchParams.get('path')

        if (!path) {
            return NextResponse.json(
                { message: 'Missing path parameter' },
                { status: 400 }
            )
        }

        // Revalidate the path
        revalidatePath(path)

        return NextResponse.json({ revalidated: true, now: Date.now() })
    } catch (err) {
        return NextResponse.json(
            { message: 'Error revalidating' },
            { status: 500 }
        )
    }
}
