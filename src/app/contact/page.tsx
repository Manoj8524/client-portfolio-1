'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import initialContent from '@/data/siteContent.json';

export default function ContactPage() {
  const [content, setContent] = useState(initialContent);
  const [formData, setFormData] = useState({
    full_name: '',
    email_address: '',
    phone_number: '',
    message: '',
  });
  const [nameError, setNameError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.contact) {
          setContent(data);
        }
      })
      .catch(() => {});
  }, []);

  const { contact, siteSettings } = content;

  const contactInfo = [
    {
      icon: Mail,
      title: contact?.cards?.emailTitle || 'Email Us',
      content: siteSettings?.studioEmail || 'info@muthu.design',
      link: `mailto:${siteSettings?.studioEmail || 'info@muthu.design'}`,
      subtitle: contact?.cards?.emailSubtitle || 'Typically responds within 24 hours',
    },
    {
      icon: Phone,
      title: contact?.cards?.phoneTitle || 'Call Us',
      content: siteSettings?.studioPhone || '+91 9048 326 777',
      link: `tel:${siteSettings?.studioPhone?.replace(/\s+/g, '') || ''}`,
      subtitle: contact?.cards?.phoneSubtitle || 'Direct studio line',
    },
    {
      icon: MapPin,
      title: contact?.cards?.locationTitle || 'Studio Coordinates',
      content: siteSettings?.studioCoordinates || 'Ln-1, Kutty Sahib Layout Rd, Kochi',
      link: siteSettings?.mapsUrl || '#',
      subtitle: contact?.cards?.locationSubtitle || 'By appointment only',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'full_name') {
      if (value.trim().length > 0 && value.trim().length < 2) {
        setNameError('Please enter at least 2 characters.');
      } else {
        setNameError('');
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nameError || !formData.full_name.trim()) return;
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setSubmitted(true);
        setFormData({ full_name: '', email_address: '', phone_number: '', message: '' });
      } else {
        setErrorMessage(data.error || 'Failed to submit enquiry');
      }
    } catch {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.full_name.trim().length >= 2 &&
    formData.email_address.trim() !== '' &&
    formData.message.trim() !== '' &&
    !nameError;

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white font-ppmori selection:bg-[#fec52d] selection:text-black pt-28 pb-28">
      <div className="pointer-events-none fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-[#fec52d]/5 rounded-full blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 w-full">
        {/* Header Section */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-[#fec52d] text-xs font-mono uppercase tracking-[0.25em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{contact?.tag || '// GET IN TOUCH'}</span>
          </div>
          <h1 className="font-horas text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white leading-none">
            {contact?.headline || "LET'S CREATE SOMETHING EXTRAORDINARY."}
          </h1>
          <p className="mt-6 text-sm sm:text-base text-neutral-400 font-ppmori leading-relaxed max-w-2xl">
            {contact?.subtitle ||
              'Available for feature film key art commissions, international festival campaigns, visual identity consulting, and executive brand design.'}
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Coordinates & Studio Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="font-horas text-2xl uppercase tracking-wider text-white">
              Studio Coordinates
            </h2>

            <div className="flex flex-col gap-4">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <a
                    key={idx}
                    href={info.link}
                    target={info.icon === MapPin ? '_blank' : undefined}
                    rel={info.icon === MapPin ? 'noopener noreferrer' : undefined}
                    className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-900 hover:border-neutral-700 transition-all duration-300 flex items-start gap-5 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#fec52d] group-hover:scale-110 transition-transform shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#fec52d] block mb-1">
                        {info.title}
                      </span>
                      <p className="text-white text-base font-medium group-hover:text-[#fec52d] transition-colors leading-snug">
                        {info.content}
                      </p>
                      <span className="text-xs font-mono text-neutral-500 mt-1 block">
                        {info.subtitle}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Availability pill */}
            <div className="p-6 rounded-2xl bg-neutral-950/40 border border-neutral-900/80 flex items-center gap-4 text-xs font-mono text-neutral-400">
              <Clock className="w-4 h-4 text-[#fec52d] shrink-0" />
              <span>
                Studio Hours: {contact?.officeHours || 'Monday – Saturday // 09:30 AM – 07:00 PM IST'}
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 md:p-12 rounded-3xl bg-neutral-950/90 border border-neutral-900 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <h2 className="font-horas text-2xl sm:text-3xl uppercase tracking-wider text-white mb-2">
                Initiate Project Enquiry
              </h2>
              <p className="text-xs sm:text-sm font-ppmori text-neutral-400 mb-8">
                Fill out the brief coordinates below. Submissions land directly with our senior key art team.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-neutral-900/60 border border-emerald-500/40 text-center flex flex-col items-center gap-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-horas text-2xl uppercase tracking-wide text-white">
                    Enquiry Delivered
                  </h3>
                  <p className="text-sm font-ppmori text-neutral-300 max-w-md leading-relaxed">
                    Thank you. Your message has been received by Muthu Studio. Our team will review the details and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-mono uppercase tracking-wider text-white transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/40 text-red-400 text-xs font-mono">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Your Name / Production House <span className="text-[#fec52d]">*</span>
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="e.g. Aashirvad Cinemas / Rajiv Menon"
                      className={`w-full px-5 py-4 rounded-xl bg-neutral-900/80 border text-white text-sm placeholder-neutral-600 focus:outline-none transition-colors ${
                        nameError ? 'border-red-500/80' : 'border-neutral-800 focus:border-[#fec52d]'
                      }`}
                    />
                    {nameError && (
                      <span className="text-xs text-red-400 mt-1 block font-mono">{nameError}</span>
                    )}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                        Email Address <span className="text-[#fec52d]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email_address"
                        required
                        value={formData.email_address}
                        onChange={handleChange}
                        placeholder="producer@studio.com"
                        className="w-full px-5 py-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-white text-sm placeholder-neutral-600 focus:border-[#fec52d] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-5 py-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-white text-sm placeholder-neutral-600 focus:border-[#fec52d] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Project Vision / Commission Brief <span className="text-[#fec52d]">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Outline film genre, timeline, deliverable requirements (first look, teaser, theatrical posters, title typography)..."
                      className="w-full px-5 py-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-white text-sm placeholder-neutral-600 focus:border-[#fec52d] focus:outline-none transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={`w-full py-4 rounded-xl font-medium text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 shadow-xl cursor-pointer ${
                      isFormValid && !loading
                        ? 'bg-[#fec52d] text-black hover:bg-[#ffe066] hover:scale-[1.01]'
                        : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <span>Dispatching Brief...</span>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
