import Image from "next/image";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import React from "react";
import { LogoTicker } from "./sections/LogoTicker";
import { Features } from "./sections/Features";
import { Testimonials } from "./sections/Testimonials";
import { CallToAction } from "./sections/CallToAction";
import { Footer } from "./sections/Footer";

export default function Home() {
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
