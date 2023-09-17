import React from 'react';
import { useState } from 'react';

const ContactForm = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSubmitted(true);
                console.error(response);

            } else {
                console.error('Error sending email');
                console.error(response);
            }
        } catch (error) {
            console.error('There was an error sending the email', error);
        }
    }

    return (
        <>
            <div className="container mx-auto px-4 py-12">
                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="name" name="name" className="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="tel" className="block text-sm font-medium text-gray-700">Telephone Number</label>
                                <input type="tel" id="tel" name="tel" className="mt-1 p-2 w-full border rounded-md" />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea id="message" name="message" rows="5" className="mt-1 p-2 w-full border rounded-md"></textarea>
                            </div>
                        </div>
                    </div>
                    {/* Send Button */}
                    <div className="text-center mt-8">
                        {isSubmitted ? (
                            <p>Thank you for getting in touch! I will email my response as soon as possible.</p>
                        ) : (
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Send</button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}

export default ContactForm;