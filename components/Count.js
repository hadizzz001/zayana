'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import RoundedHoverButton from './Bookbtn'; // Assuming this is the path to your button component

const CounterStats = () => {
    // Static data instead of fetching from API
    const staticStats = [
        { title: 'Experience years', end: 30 },
        { title: 'Hours of expert trainings delivered', end: 450 },
        { title: 'Employees hired per year', end: 500 },
    ];

    const [startCount, setStartCount] = useState(false);
    const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {
        if (inView) setStartCount(true);
    }, [inView]);

    return (
        <div className="block">
            <center>
                <RoundedHoverButton side="left">Left</RoundedHoverButton>
            </center>
            <div
                ref={ref}
                className="flex flex-wrap justify-center items-center gap-10 md:gap-48 py-12 px-4"

            >

                {staticStats.map((item, index) => (
                    <div key={index} className="text-center">
                        <h2 className="titlemymymy2">
                             <CountUp end={startCount ? item.end : 0} duration={2} />+
                        </h2>
                        <p id="colorp" style={{ fontSize: '17px', marginTop: '1em' }}>
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CounterStats;
