import { useEffect, useState } from "react";

const GITHUB_USERNAME = "anuragzete";
const LEETCODE_USERNAME = "anuragzete";

const fetchWithRetry = async (fn, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (err) {
            if (i === retries - 1) throw err;
            await new Promise(res => setTimeout(res, delay * (i + 1)));
        }
    }
};

export const useStats = () => {
    const [stats, setStats] = useState({
        githubProjects: 0,
        prMerged: 0,
        leetCodeSolved: 0,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const cacheKey = "stats_cache";
        const cached = sessionStorage.getItem(cacheKey);

        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                setStats({ ...parsed, loading: false });
                return;
            } catch {
                console.warn("Invalid stats cache, refetching...");
            }
        }

        const fetchGitHubData = async () => {
            const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
            const repos = await reposRes.json();

            const prsRes = await fetch(
                `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+is:merged`
            );
            const prsData = await prsRes.json();

            return {
                githubProjects: repos.length || 0,
                prMerged: prsData.total_count ?? 0,
            };
        };

        const fetchLeetCodeData = async () => {
            const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`);
            const data = await res.json();

            return {
                leetCodeSolved: data.totalSolved || 0,
            };
        };

        const fetchAll = async () => {
            try {
                const [github, leetcode] = await Promise.all([
                    fetchWithRetry(fetchGitHubData),
                    fetchWithRetry(fetchLeetCodeData),
                ]);

                const combined = {
                    ...github,
                    ...leetcode,
                    loading: false,
                    error: null,
                };

                sessionStorage.setItem(cacheKey, JSON.stringify(combined));
                setStats(combined);
            } catch (err) {
                console.error("Stats fetch error:", err);
                setStats(prev => ({
                    ...prev,
                    loading: false,
                    error: err.message || "Failed to load stats",
                }));
            }
        };

        fetchAll();
    }, []);

    return stats;
};