"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import { Mail, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react";



export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send(
      "service_ghjp36j",     // e.g., service_abc123
      "template_fevarz9",    // e.g., template_xyz789
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
      },
      "OUE4t33uSAnL37VCU"      // e.g., qwerty123456
    )
    .then(() => {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      setError("Failed to send message. Please try again.");
    });
  };

  return (
    <div className="min-h-screen mt-20 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-10">Contact Me</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-8 rounded-xl shadow space-y-6">
            <input
              id="name"
              type="text"
              required
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <textarea
              id="message"
              required
              rows={5}
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
              Send Message
            </button>

            {isSubmitted && (
              <p className="text-green-600">Message sent successfully!</p>
            )}
            {error && (
              <p className="text-red-600">{error}</p>
            )}
          </form>

          <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Mail className="text-blue-600" />
              <span className="text-lg">lovvsam@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <MapPin className="text-blue-600" />
              <span className="text-lg">Istanbul, Türkiye</span>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2 text-center md:text-left">Follow Me</h2>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://github.com/samlovv" target="_blank" rel="noopener noreferrer">
                  <Github />
                </a>
                <a href="https://linkedin.com/in/samlovv" target="_blank" rel="noopener noreferrer">
                  <Linkedin />
                </a>
                <a href="https://instagram.com/samlovv" target="_blank" rel="noopener noreferrer">
                  <Instagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
