"use client";

import productImage from "../assets/product-image.png";
import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { animate } from "motion";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    ValueAnimationTransition,
} from "motion/react";
import React, {
    ComponentPropsWithoutRef,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

const tabs = [
    {
        icon: "/assets/lottie/vroom.lottie",
        title: "User-friendly dashboard",
        isNew: false,
        backgroundPositionX: 0,
        backgroundPositionY: 0,
        backgroundSizeX: 150,
    },
    {
        icon: "/assets/lottie/click.lottie",
        title: "One-click optimization",
        isNew: false,
        backgroundPositionX: 98,
        backgroundPositionY: 100,
        backgroundSizeX: 135,
    },
    {
        icon: "/assets/lottie/stars.lottie",
        title: "Smart keyword generator",
        isNew: true,
        backgroundPositionX: 100,
        backgroundPositionY: 27,
        backgroundSizeX: 177,
    },
];

type TabType = (typeof tabs)[number];

const FeatureFab = (
    tab: TabType & ComponentPropsWithoutRef<"div"> & { selected: boolean }
) => {
    // Use proper typing for the DotLottie instance
    const [dotLottie, setDotLottie] = React.useState<DotLottie | null>(null);

    const tabRef = useRef<HTMLDivElement>(null);

    const xPercentage = useMotionValue(0);
    const yPercentage = useMotionValue(0);

    const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%,black,transparent)`;

    useEffect(() => {
        if (!tabRef.current || !tab.selected) return;

        xPercentage.set(0);
        yPercentage.set(0);
        const { height, width } = tabRef.current?.getBoundingClientRect();

        const circumference = height * 2 + width * 2;

        const times = [
            0,
            width / circumference,
            (width + height) / circumference,
            (width * 2 + height) / circumference,
            1,
        ];
        const options: ValueAnimationTransition = {
            times: times,
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
        };
        animate(xPercentage, [0, 100, 100, 0, 0], options);

        animate(yPercentage, [0, 0, 100, 100, 0], options);
    }, [tab.selected]);

    // Create a proper callback that TypeScript recognizes
    const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
        setDotLottie(instance);
    }, []);

    const handleTabHover = () => {
        if (dotLottie) {
            // Reset and play animation
            dotLottie.stop();
            dotLottie.play();
        }
    };

    return (
        <div
            ref={tabRef}
            onMouseEnter={handleTabHover}
            className="border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center flex-1 relative"
            onClick={tab.onClick}
        >
            {tab.selected && (
                <motion.div
                    style={{
                        maskImage: maskImage,
                    }}
                    className="absolute inset-0 -m-px rounded-xl border border-[#A369FF]"
                ></motion.div>
            )}
            <div className="h-12 w-12 rounded-xl inline-flex items-center justify-center">
                <DotLottieReact
                    src={tab.icon}
                    className="h-5 w-5"
                    autoplay
                    dotLottieRefCallback={dotLottieRefCallback}
                />
            </div>
            <div className="font-medium">{tab.title}</div>
            {tab.isNew && (
                <div className="text-xs rounded-full px-2 py-0.5 bg-[#8C44FF] text-black font-semibold">
                    new
                </div>
            )}
        </div>
    );
};

export default function Features() {
    const [selectedTab, setselectedTab] = useState(0);

    const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX);
    const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY);
    const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX);

    const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`;
    const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`;

    const handleSelectedTab = (index: number) => {
        setselectedTab(index);

        const animateOptions: ValueAnimationTransition = {
            duration: 2,
            ease: "easeInOut",
        };

        animate(
            backgroundSizeX,
            [backgroundSizeX.get(), 100, tabs[index].backgroundSizeX],
            animateOptions
        );

        animate(
            backgroundPositionX,
            [backgroundPositionX.get(), 100, tabs[index].backgroundPositionX],
            animateOptions
        );

        animate(
            backgroundPositionY,
            [backgroundPositionY.get(), 100, tabs[index].backgroundPositionY],
            animateOptions
        );
    };

    return (
        <section className="py-20 md:py-24">
            <div className="container">
                <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
                    Elevate your SEO efforts.
                </h2>
                <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-tight text-center mt-5">
                    From small startups to large enterprises, our AI-driven tool
                    has revolutionized the way businesses approach SEO.
                </p>
                <div className="mt-10 flex flex-col lg:flex-row gap-3">
                    {tabs.map((tab, tabIndex) => (
                        <FeatureFab
                            {...tab}
                            selected={selectedTab === tabIndex}
                            onClick={() => handleSelectedTab(tabIndex)}
                            key={tab.title}
                        />
                    ))}
                </div>
                <div className="border border-white/20 p-2.5 rounded-xl mt-12">
                    <motion.div
                        className="aspect-video bg-cover border border-white/20 rounded-lg"
                        style={{
                            backgroundPosition: backgroundPosition,
                            backgroundSize: backgroundSize,
                            backgroundImage: `url(${productImage.src})`,
                        }}
                    ></motion.div>
                </div>
            </div>
        </section>
    );
}
