"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send message");

      setStatus("success");
      setResponseMsg("Message sent! I will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setResponseMsg(err.message);
    }
  };

  return (
    <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-24">
      <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
        Have a question or want to work together? Leave a message!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
          <textarea
            id="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
            placeholder="How can I help you?"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-md bg-black dark:bg-white px-4 py-3 font-medium text-white dark:text-black hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {responseMsg && (
          <p className={`text-center font-medium ${status === "success" ? "text-green-600" : "text-red-500"}`}>
            {responseMsg}
          </p>
        )}
      </form>
    </main>
  );
}
