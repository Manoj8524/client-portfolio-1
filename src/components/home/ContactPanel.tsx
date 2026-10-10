'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPanel({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: [] as string[],
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      projectType: prev.projectType.includes(type)
        ? prev.projectType.filter((t) => t !== type)
        : [...prev.projectType, type]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full max-w-[420px] rounded-2xl bg-[#0a0a0a] border border-white/10 p-6 shadow-2xl text-white"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-white/50 font-sans">
                  Contact
                </span>
                <button
                  onClick={onClose}
                  className="text-white/50 hover:text-white text-xl leading-none transition-colors"
                >
                  &times;
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h3 className="text-[22px] font-medium tracking-tight text-white mb-1">
                  Let&apos;s work together.
                </h3>
                <p className="text-[13px] text-white/40 leading-snug">
                  Fill in the details below and we&apos;ll be in touch.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center text-green-400 text-sm">
                  Thank you! Your message has been sent.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-medium uppercase tracking-[0.1em] text-white/30 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium uppercase tracking-[0.1em] text-white/30 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium uppercase tracking-[0.1em] text-white/30 mb-1.5">
                      Project Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Web Design', 'Web Development', 'Brand Identity', 'Other'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleType(type)}
                          className={`px-3 py-2 rounded-lg text-xs font-normal border transition-colors text-left ${
                            formData.projectType.includes(type)
                              ? 'bg-white text-black border-white'
                              : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-lg bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
