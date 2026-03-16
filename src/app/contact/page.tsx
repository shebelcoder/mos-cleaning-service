"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="text-white py-20" style={{ backgroundColor: "#003d54" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Have a question or need a quote? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-extrabold mb-6" style={{ color: "#003d54" }}>Get In Touch</h2>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: "Phone / Text", value: "(587) 222-1440", href: "tel:+15872221440" },
                  { icon: Mail, label: "Email", value: "info@moscleaning.ca", href: "mailto:info@moscleaning.ca" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#00adee1a" }}>
                      <Icon size={20} style={{ color: "#00adee" }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "#003d54" }}>{label}</div>
                      <a href={href} className="text-base font-medium transition-colors hover:opacity-80" style={{ color: "#00adee" }}>
                        {value}
                      </a>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#00adee1a" }}>
                    <MapPin size={20} style={{ color: "#00adee" }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "#003d54" }}>Service Area</div>
                    <p className="text-gray-600 text-sm">Edmonton, Alberta and surrounding areas</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#00adee1a" }}>
                    <Clock size={20} style={{ color: "#00adee" }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "#003d54" }}>Hours</div>
                    <p className="text-gray-600 text-sm">Monday – Saturday: 8:00 AM – 6:00 PM</p>
                    <p className="text-gray-600 text-sm">Sunday: 10:00 AM – 4:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl overflow-hidden h-64 bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d154344.07!2d-113.7229!3d53.5461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0224580deff23%3A0x411fa00c0b605681!2sEdmonton%2C+AB!5e0!3m2!1sen!2sca!4v1"
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen loading="lazy" title="Edmonton Map"
                />
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-extrabold mb-6" style={{ color: "#003d54" }}>Send Us a Message</h2>
              {status === "success" ? (
                <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#f1f4f4", borderColor: "#00adee40" }}>
                  <div className="font-bold text-lg mb-1" style={{ color: "#003d54" }}>Message Sent!</div>
                  <p className="text-gray-600 text-sm">Thank you for reaching out. We&apos;ll get back to you within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { label: "Name *", type: "text", key: "name", required: true, placeholder: "Your full name" },
                    { label: "Email *", type: "email", key: "email", required: true, placeholder: "your@email.com" },
                    { label: "Phone", type: "tel", key: "phone", required: false, placeholder: "(587) 222-0000" },
                  ].map(({ label, type, key, required, placeholder }) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: "#003d54" }}>{label}</label>
                      <input
                        type={type}
                        required={required}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00adee] transition"
                        placeholder={placeholder}
                        style={{ backgroundColor: "#f1f4f4" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: "#003d54" }}>Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00adee] resize-none transition"
                      placeholder="How can we help you?"
                      style={{ backgroundColor: "#f1f4f4" }}
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-red-600 text-sm">Something went wrong. Please try again or call us directly.</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#32373c" }}
                  >
                    <Send size={16} />
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
