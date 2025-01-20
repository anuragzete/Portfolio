import React from "react";
import Hero from "./Hero.jsx";
import HomeAbout from "./HomeAbout.jsx";
import StatsSection from "./StatsSection.jsx";
import ProjectsList from "../project/ProjectsList.jsx";

export default function Home() {
    return (
        <div id='home'>
            <Hero />
            <HomeAbout />
            <StatsSection />
            <ProjectsList />
        </div>
    )
}