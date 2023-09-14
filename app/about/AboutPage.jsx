// Import the data into your Next.js component
import aboutData from './pageData.js'; // Adjust the import path to where your data.js file is located

const AboutPage = () => {
    return (
        <div className='about text-left'>
            <h1 className="text-4xl mb-12">Welcome</h1>
            <section className='flex flex-col sm:flex-row'>
                <div className='w-full md:w-3/5'>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>I&apos;m Andrew, the technical architect behind Creative Transmissions, dedicated to integrating the latest technologies into your web projects. With over 19 years in the tech sector, my expertise has evolved from IT to WordPress and PHP development, and now to groundbreaking work in advanced web development.</p>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>I specialize in integrating the latest tech into your web projects, including WebXR, Geographical Systems, Social Graphs, Blockchain and Big Data.</p>
                    <p>I thrive on innovation and am passionate about leveraging new tools and techniques to create faster and more efficient development processes. I&apos;m highly focused, an excellent problem solver, and resilient in the face of challenges. My mission is to ensure that your web projects are not just current but future proof.</p>
                </div>
                <div className='sm:w-full md:w-2/5 pl-0 md:pl-4'>
                    <img className='md:pl-8' src='/img/avatar.jpg' alt='Andrew Van Duivenbode - Full Stack Developer' />
                </div>
            </section >
            <section>
                <h2>A Journey Through Web Innovation</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>My career has been a fascinating exploration of web technologies. I founded Creative Transmissions in 2010. Initially I created PHP websites usinge MVC frameworks, before specializing in JavaScript Google Maps applications. Following demand I created the TransitQuote brand - a range of WordPress plugins that leverage GMaps for dynamic pricing in the courier and transport sectors. The venture honed my technical and leadership skills, as I managed remote teams and implemented agile methodologies.</p>
            </section>
            <section>
                <h2>Expertise in Data and Analytics</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>Beyond web development, I collaborate with Connexio.co, gaining deep insights into social graphs and analytics while optimizing the organizations big social data platform. The experience endowed me with a unique perspective on how data can be leveraged to create more engaging and personalised user experiences.</p>
            </section>
            <section>
                <h2>Mastering JavaScript and Three.js</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>JavaScript is the backbone of modern web development, and I&apos;ve mastered its use in various applications. From client-side interactions to server-side solutions, my JavaScript expertise is comprehensive. I have a particular fondness for Three.js, a library that enables incredible 3D graphics right in your web browser.</p>
            </section>
            <section>
                <h2>The 3DeSocial Initiative</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>As the founder of 3DeSocial, an open-source Web3 project, my aim is to enable the creation and monetization of 3D web experiences. The project focuses on enabling anyone to create and share immersive 3D and VR experiences using decentralised storage solutions. It&apos;s not just about adding a new feature; it&apos;s about pioneering a whole new dimension of web interaction.
                </p>
            </section>
            <section>
                <h2>Lets Collaborate</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>The world is now at an exciting crossroads where traditional web development is converging with awe-inspiring advancements in 3D and VR technologies. If you&apos;re looking to push the boundaries in 3D WebXR, APIs, or JavaScript frameworks like Three.js. Let&apos;s connect and build something extraordinary together.</p>
            </section>
        </div >
    );
};

export default AboutPage;