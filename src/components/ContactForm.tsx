"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "+971564332583";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, message } = formData;

    // Format message for WhatsApp
    const whatsappMessage = `Hello! I'm interested in your services.

Name: ${name || "Not provided"}
Email: ${email || "Not provided"}

Message:
${message || "No message provided"}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Reset form after a short delay
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-6">
      <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition focus:border-[#0b4f82] focus:ring-2 focus:ring-[#0b4f82]/20"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition focus:border-[#0b4f82] focus:ring-2 focus:ring-[#0b4f82]/20"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="mt-2 w-full rounded-md border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition focus:border-[#0b4f82] focus:ring-2 focus:ring-[#0b4f82]/20"
            placeholder="Tell us about your project"
          />
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#20BA5A] hover:shadow-lg"
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Send via WhatsApp
        </button>
      </form>
    </div>
  );
}

