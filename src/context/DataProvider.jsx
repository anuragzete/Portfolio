import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, doc, getDoc, getDocs, query, orderBy } from "firebase/firestore";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return "Invalid date";
        return new Date(timestamp.seconds * 1000).toLocaleDateString();
    };

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

    const cacheAndSet = (key, setter, data) => {
        sessionStorage.setItem(key, JSON.stringify(data));
        setter(data);
    };

    const loadCachedData = (key, setter) => {
        const cached = sessionStorage.getItem(key);
        if (cached) {
            try {
                setter(JSON.parse(cached));
            } catch {
                console.warn(`Invalid cache for ${key}`);
            }
        }
    };

    const fetchProjects = async () => {
        const q = query(collection(db, "projects"), orderBy("index", "asc"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => {
            const data = doc.data();
            const start = formatDate(data.project_duration?.start);
            const end = formatDate(data.project_duration?.end);
            return {
                id: doc.id,
                ...data,
                durationText: data.status === "completed" ? `${start} - ${end}` : `${start} - Present`,
            };
        });
        cacheAndSet("projects_cache", setProjects, list);
    };

    const fetchExperiences = async () => {
        const q = query(collection(db, "workExperience"), orderBy("index", "asc"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                job_title: data.job_title || "",
                company_name: data.company_name || "",
                company_url: data.company_url || "",
                description: Array.isArray(data.description)
                    ? data.description
                    : data.description ? [data.description] : [],
                technologies: Array.isArray(data.technologies) ? data.technologies : [],
                duration: {
                    start: formatDate(data.duration?.start),
                    end: formatDate(data.duration?.end),
                },
                location: data.location || "",
                company_logo_url: data.company_logo_url || "",
                github_url: data.github_url || "",
            };
        });
        cacheAndSet("experiences_cache", setExperiences, list);
    };

    useEffect(() => {
        const loadAll = async () => {
            setLoading(true);
            setError(null);

            loadCachedData("projects_cache", setProjects);
            loadCachedData("experiences_cache", setExperiences);

            try {
                await fetchWithRetry(fetchProjects);
                await fetchWithRetry(fetchExperiences);
            } catch (err) {
                console.error("Data fetch failed:", err);
                setError("Failed to load portfolio data.");
            } finally {
                setLoading(false);
            }
        };

        loadAll();
    }, []);


    return (
        <DataContext.Provider
            value={{
                projects,
                experiences,
                loading,
                error
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
