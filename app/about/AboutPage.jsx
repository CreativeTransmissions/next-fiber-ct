// Import the data into your Next.js component
import aboutData from './pageData.js'; // Adjust the import path to where your data.js file is located

const AboutPage = () => {
    return (
        <div className='about text-left'>
            <h1>Welcome!</h1>
            <section className='flex flex-col sm:flex-row'>
                <div className='w-full md:w-3/5'>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>I&#32;m Andrew, the technical architect behind Creative Transmissions, dedicated to integrating the latest technologies into your web projects. With over 19 years in the tech sector, my expertise has evolved from IT to WordPress and PHP development, and now to groundbreaking work in advanced web development.</p>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>{aboutData.intro2}</p>
                    <p>{aboutData.intro3}</p>
                </div>
                <div className='sm:w-full md:w-2/5 pl-0 md:pl-4'>
                    <img className='md:pl-8' src='/img/avatar.jpg' alt='Andrew Van Duivenbode - Full Stack Developer' />
                </div>
            </section >
            <section>
                <h2>Specialising in 3D WebXR and APIs</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>{aboutData.specialising}</p>
            </section>
            <section>
                <h2>A Journey Through Web Innovation</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>{aboutData.journey}</p>
            </section>
            <section>
                <h2>Mastering JavaScript and Three.js</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>{aboutData.mastering}</p>
            </section>
            <section>
                <h2>The 3DeSocial Initiative</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>{aboutData.initiative}</p>
            </section>
            <section>
                <h2>Expertise in Data and Analytics</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>{aboutData.expertise}</p>
            </section>
            <section>
                <h2>Lets Collaborate</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>{aboutData.collaborate}</p>
            </section>
        </div >
    );
};

export default AboutPage;