import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Computer = dynamic(() => import('@/components/canvas/Creative').then((mod) => mod.Computer), { ssr: false })
const Headset = dynamic(() => import('@/components/canvas/Creative').then((mod) => mod.Headset), { ssr: false })
const Mobile = dynamic(() => import('@/components/canvas/Creative').then((mod) => mod.Mobile), { ssr: false })
import { View } from '@/components/canvas/View';

const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export const DevicesCanvas = (props) => {
    const viewRef = useRef(null);

    useEffect(() => {
        if (viewRef.current) {

            let tl = gsap.timeline()
            tl.to(viewRef.current, { height: '250px', duration: 1, ease: 'power3.out' });
            tl.to(viewRef.current, { height: '0px', duration: 1, ease: 'power3.out', delay: 5 });
        }
    }, []);

    return (
        <div className="flex w-full flex-col items-center justify-center text-center md:w-3/5 md:text-left pt-4">
            <View ref={viewRef} style={{ height: '0px', border: '2px solid #000', width: '100%' }}>
                <Computer />
                <Common color="#AAF" />
            </View>
        </div>
    );
}

export default DevicesCanvas;
