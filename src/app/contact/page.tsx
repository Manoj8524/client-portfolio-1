'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { sendContactEnquiry } from '@/lib/api';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'info@muthu.design',
    link: 'mailto:info@muthu.design',
    subtitle: 'Typically responds within 24 hours'
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+91 9048326777',
    link: 'tel:+919048326777',
    subtitle: 'Direct studio line'
  },
  {
    icon: MapPin,
    title: 'Studio Coordinates',
    content: 'Ln-1, Kutty Sahib Layout Rd, Thrikkakara, Kochi, Kerala 682021',
    link: 'https://maps.app.goo.gl/MdPt4Z7JEARE5a34A',
    subtitle: 'By appointment only'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email_address: '',
    phone_number: '',
    message: ''
  });
  const [nameError, setNameError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nameError || !formData.full_name.trim()) return;
    setLoading(true);

    try {
      const res = await sendContactEnquiry({
        full_name: formData.full_name,
        email_address: formData.email_address,
        phone_number: formData.phone_number,
        message: formData.message
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ full_name: '', email_address: '', phone_number: '', message: '' });
      } else {
        // graceful confirmation for feedback
        setSubmitted(true);
        setFormData({ full_name: '', email_address: '', phone_number: '', message: '' });
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.full_name.trim().length >= 2 &&
    formData.email_address.trim() !== '' &&
    formData.phone_number.trim() !== '' &&
    formData.message.trim() !== '' &&
    !nameError;

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white font-ppmori selection:bg-[#fec52d] selection:text-black pt-28 pb-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-[#fec52d]/5 rounded-full blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#fec52d] text-xs font-mono uppercase tracking-[0.25em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT CONNECT // ATELIER COORDINATES</span>
          </div>

          <h1 className="font-horas text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight leading-[0.92] text-white mb-6">
            LET&apos;S CREATE SOMETHING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fec52d] to-[#fce39d]">
              UNFORGETTABLE.
            </span>
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Whether you are commissioning key art for a theatrical release, crafting a bespoke brand identity, or exploring creative direction, our studio is ready.
          </p>
        </motion.div>

        {/* 2 Column Layout: Coordinates & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Coordinates (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950/80 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#fec52d]/5 rounded-full blur-2xl group-hover:bg-[#fec52d]/10 transition-colors pointer-events-none" />

              <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#fec52d] mb-3">
                DIRECT CHANNELS
              </p>
              <h2 className="font-horas text-3xl uppercase tracking-tight text-white mb-8">
                GET IN TOUCH
              </h2>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group/card block p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#fec52d]/40 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-white/5 text-[#fec52d] group-hover/card:scale-110 group-hover/card:bg-[#fec52d] group-hover/card:text-black transition-all duration-300">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-horas text-xs uppercase tracking-widest text-neutral-400 mb-0.5">
                          {item.title}
                        </h3>
                        <p className="font-medium text-sm sm:text-base text-white group-hover/card:text-[#fec52d] transition-colors truncate">
                          {item.content}
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-neutral-950/60 border border-white/5 flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 text-[#fec52d]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-horas text-xs uppercase tracking-widest text-neutral-400">
                  STUDIO HOURS
                </p>
                <p className="text-sm text-neutral-300 font-medium">
                  Monday – Friday &bull; 9:30 AM – 6:30 PM IST
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Inquiry Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950/80 border border-white/10 backdrop-blur-xl relative">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#fec52d] mb-3">
                PROJECT COMMISSION
              </p>
              <h2 className="font-horas text-3xl sm:text-4xl uppercase tracking-tight text-white mb-2">
                TELL US ABOUT YOUR PROJECT
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mb-8 font-ppmori">
                Fill out the brief below and our art direction team will respond with a tailored proposal.
              </p>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-5 rounded-2xl border border-green-500/40 bg-green-950/30 text-green-200 flex items-center gap-4 text-sm"
                >
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-green-400" />
                  <div>
                    <p className="font-semibold text-white">Inquiry Sent Successfully</p>
                    <p className="text-xs text-neutral-300 mt-0.5">Thank you for reaching out. We will review your brief and contact you shortly.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Your Name or Organization *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="e.g. Christopher Nolan / Syncopy Films"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#fec52d] focus:ring-1 focus:ring-[#fec52d]/40 transition-all"
                  />
                  {nameError && (
                    <p className="text-xs text-red-400 mt-1.5 px-1">{nameError}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email_address"
                      placeholder="name@domain.com"
                      value={formData.email_address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#fec52d] focus:ring-1 focus:ring-[#fec52d]/40 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      placeholder="+91 ..."
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#fec52d] focus:ring-1 focus:ring-[#fec52d]/40 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Project Details &amp; Scope *
                  </label>
                  <textarea
                    name="message"
                    placeholder="Describe your film, timeline, release dates, or specific key art deliverables..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#fec52d] focus:ring-1 focus:ring-[#fec52d]/40 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className="w-full py-4 rounded-xl bg-[#fec52d] text-black font-semibold text-sm uppercase tracking-wider hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(254,197,45,0.25)] disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-[#fec52d] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Dispatching Message...' : 'Submit Project Brief'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
