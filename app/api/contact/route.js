import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function GET() {

    return NextResponse.json({ 'message': 'Test successful' })
}

export async function POST(req) {

    const { name, email, message } = await req.json();

    const content = {
        to: 'creativetransmissions@gmail.com',
        from: 'andrew@creativetransmissions.com',
        subject: `Website Message from ${name} @ ${email}`,
        text: message,
        html: `<p>${message}</p>`
    };

    try {
        let sendMailRes = await sgMail.send(content);
        // res.status(200).send('Message sent successfully.');
        return NextResponse.json({
            'success': true,
            'message': 'Email sent successfully',
            content: content
        })
    } catch (error) {

        return NextResponse.json({
            success: false,
            'message': 'ERROR',
            content: content,
            error: error.response.errors
        })
    }


}