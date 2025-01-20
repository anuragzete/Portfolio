import React, { useState } from "react";
import { Send } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaXTwitter } from "react-icons/fa6";
import NeverBounce from "neverbounce";
import Spinner from "../../shared/components/Spinner.jsx";

const NEON_CLASSES =
    "bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-[0_0_15px_rgba(168,101,201,0.8)]";

export default function Contact() {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("idle");
    const [feedback, setFeedback] = useState("Send Message");
    const [loading, setLoading] = useState(false);

    const trustedProviders = [
        "gmail.com",
        "outlook.com",
        "yahoo.com",
        "hotmail.com",
        "protonmail.com",
        "icloud.com"
    ];

    const handleInput = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
        setMessage(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const validateEmail = async (email) => {
        try {
            const serviceProvider = new NeverBounce({apiKey: import.meta.env.VITE_NEVERBOUNCE_API_KEY});
            const response = await serviceProvider.single.check(email);
            if (response.status === "success") {
                const result = response.result;
                if (result === "valid" && !flags.includes("disposable") && !flags.includes("role_account")) {
                    return true;
                } else {
                    return false;
                }
            }
        } catch (error) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) return false;

            const domain = email.split("@")[1].toLowerCase();
            console.warn("Error validating email, only simple verification done:", error);
            return trustedProviders.includes(domain);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name.trim() || !email.trim() || !message.trim()) {
            setFeedback("Please fill in all fields");
            setStatus("error");
            setTimeout(() => {
                setFeedback("Send Message");
                setStatus("idle");
            }, 1500);
            return;
        }

        const isValidEmail = await validateEmail(email);
        if (!isValidEmail) {
            setFeedback("Invalid or disposable email");
            setEmail("");
            setStatus("error");
            setLoading(false);
            setTimeout(() => {
                setFeedback("Send Message");
                setStatus("idle");
            }, 1500);
            return;
        }

        const formData = new FormData();
        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
        formData.append("subject", "New Submission from Portfolio");
        formData.append("name", name);
        formData.append("email", email);
        formData.append("message", message);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                setFeedback("Message sent!");
                setStatus("success");
                setLoading(false);
                setTimeout(() => {
                    setFeedback("Send Message");
                    setStatus("idle");
                }, 1500);
                setEmail("");
                setMessage("");
                setName("");
            } else {
                setFeedback("Failed to send message");
                setStatus("error");
                setLoading(false);
                setTimeout(() => {
                    setFeedback("Send Message");
                    setStatus("idle");
                }, 1500);
            }
        } catch (error) {
            setFeedback("Error sending message");
            setStatus("error");
            setLoading(false);
            setTimeout(() => {
                setFeedback("Send Message");
                setStatus("idle");
            }, 1500);
        }
    };

    const getButtonColor = () => {
        if (status === "success") return "bg-green-600";
        if (status === "error") return "bg-red-600";
        return NEON_CLASSES;
    };

    return (
        <section id="contact" className="py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Contact
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="hidden md:flex flex-col justify-center self-start space-y-6">
                        <h3 className="text-3xl font-bold">Get in touch</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            I'd love to hear from you! Whether you have a question, feedback,
                            or just want to connect, feel free to reach out.
                        </p>

                        <div className="flex flex-row items-center gap-x-6 text-2xl text-gray-700 dark:text-gray-300">
                            <a
                                href="https://wa.me/918793738304"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <FaWhatsapp className="text-green-500" />
                            </a>
                            <a
                                href="https://www.instagram.com/anurag_zete_101"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <FaInstagram className="text-pink-500" />
                            </a>
                            <a
                                href="https://x.com/itsJoker0013"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <FaXTwitter className="text-black dark:text-white" />
                            </a>
                        </div>
                    </div>

                    <div className="w-full">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={handleNameChange}
                                className="w-full px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                placeholder="Message"
                                value={message}
                                onInput={handleInput}
                                rows="2"
                                className="w-full px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                            />

                            <button
                                type="submit"
                                className={`flex items-center justify-center gap-2 w-full px-6 py-3 text-white rounded-lg transition-all shadow-lg ${getButtonColor()}`}
                            >
                                {loading ? <Spinner /> : <Send className="w-5 h-5" />}
                                <span>{feedback}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
