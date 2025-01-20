import React from "react";
import { useStats } from "../../shared/hooks/useStats.js";
import LoadingSpinner from "../../shared/components/LoadingSpinner.jsx"; 

const StatsSection = () => {
    const {
        githubProjects,
        prMerged,
        leetCodeSolved,
        loading,
        error,
    } = useStats();

    const stats = [
        { label: "Projects Built", value: githubProjects },
        { label: "LeetCode Solved", value: leetCodeSolved },
        { label: "PRs Merged", value: prMerged }
    ];

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <section className="w-full flex justify-center py-10 px-4">
            <div className="backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 rounded-2xl shadow-xl p-6 md:p-10
                grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-center gap-8 max-w-4xl">
                {stats.map((stat) => (
                    <div key={stat.label} className="text-center min-w-[120px]">
                        <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                            {stat.value}
                        </div>
                        <div className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
