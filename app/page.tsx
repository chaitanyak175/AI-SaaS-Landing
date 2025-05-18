"use client";

import React, { useEffect, useState } from "react";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import LogoTicker from "./sections/LogoTicker";
import Features from "./sections/Features";
import Testimonials from "./sections/Testimonials";
import CallToAction from "./sections/CallToAction";
import Footer from "./sections/Footer";
import Lenis from "lenis";

export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        lenis.on("scroll", (e) => {
            console.log(e);
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const animationId = requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            cancelAnimationFrame(animationId);
        };
    }, []);

    if (!mounted) return null;

    return (
        <React.Fragment>
            <Header />
            <Hero />
            <LogoTicker />
            <Features />
            <Testimonials />
            <CallToAction />
            <Footer />
        </React.Fragment>
    );
}
