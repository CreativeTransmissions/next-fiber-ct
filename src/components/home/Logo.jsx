import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js Image component

export const LogoWithCaption = (props) => {
    const { pageData } = props;

    return (
        <div className='flex w-full flex-col items-center justify-center text-center'>
            <Image
                className='p-0 mt-6 mx-auto md:mx-0'
                src="/img/logo.png"
                alt="Creative Transmissions Logo"
                width={250}
                height={250}
            />
            <p className='mb-8 text-2xl leading-normal pl-2'>{pageData.title}</p>
        </div>
    );
}

export default LogoWithCaption;