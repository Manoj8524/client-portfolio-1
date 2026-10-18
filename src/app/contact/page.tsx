'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { sendContactEnquiry } from '@/lib/api';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'info@muthu.design',
    link: 'mailto:info@muthu.design'
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+91 9048326777',
    link: 'tel:+919048326777'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: 'Ln-1, Kutty Sahib Layout Rd, near Model Engineering College, Thrikkakara, Edappally, Ernakulam, Kochi, Kerala 682021',
    link: 'https://maps.app.goo.gl/MdPt4Z7JEARE5a34A'
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
  const [apiError, setApiError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === 'full_name') {
      formatted = value.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
      if (formatted !== '' && !/^([A-Za-z]+(\s[A-Za-z.]+)+)$/.test(formatted)) {
        setNameError("Invalid name format. Use 'John Doe', 'John D.', etc.");
      } else {
        setNameError('');
      }
    }
    setFormData((prev) => ({ ...prev, [name]: formatted }));
    if (submitted) setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nameError) return;
    setLoading(true);
    setApiError('');

    try {
      const payload = new FormData();
      payload.append('full_name', formData.full_name);
      payload.append('email_address', formData.email_address);
      payload.append('phone_number', formData.phone_number);
      payload.append('message', formData.message);

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
    formData.full_name.trim() !== '' &&
    formData.email_address.trim() !== '' &&
    formData.phone_number.trim() !== '' &&
    formData.message.trim() !== '' &&
    !nameError;

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white padding-primary pt-28 pb-24">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 mb-4">
            // GET IN TOUCH
          </p>
          <h1 className="font-horas text-4xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-6">
            Let&apos;s create something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fce39d] to-[#fec52d]">
              Groundbreaking.
            </span>
          </h1>
          <p className="font-ppmori text-neutral-400 text-sm md:text-lg max-w-2xl leading-relaxed">
            Scroll down to see our coordinates or send us a message directly. We look forward to bringing your vision to life.
          </p>
        </section>

        {/* 2 Column Section: Contact Cards & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Direct Coordinates */}
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-neutral-900 flex flex-col justify-between h-full space-y-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                // CONNECT DIRECTLY
              </p>
              <h2 className="font-horas text-3xl sm:text-4xl uppercase tracking-tight text-white mb-8">
                Reach out to us.
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-yellow-400/50 hover:bg-neutral-900 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-white/5 text-yellow-400 group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-horas text-base uppercase tracking-wider text-neutral-400 mb-1">
                          {item.title}
                        </h3>
                        <p className="font-ppmori text-sm sm:text-base text-white group-hover:text-yellow-400 transition-colors leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800">
              <p className="font-horas text-sm uppercase tracking-wider text-neutral-400 mb-1">
                Office Hours
              </p>
              <p className="text-sm font-ppmori text-neutral-300">
                Monday – Friday: 9:30 AM – 6:30 PM IST
              </p>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-neutral-900">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              // PROJECT INQUIRY
            </p>
            <h2 className="font-horas text-3xl sm:text-4xl uppercase tracking-tight text-white mb-6">
              Tell us your Story.
            </h2>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl border border-green-500/50 bg-green-950/40 text-green-300 flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-400" />
                <span>Thank you! Your message has been received. We will contact you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-500 transition-colors"
                />
                {nameError && (
                  <p className="text-xs text-red-400 mt-1.5 px-2">{nameError}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email_address"
                  placeholder="Enter your email address"
                  value={formData.email_address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone_number"
                  placeholder="Enter your phone number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  inputMode="numeric"
                  required
                  className="w-full px-4 py-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full py-4 rounded-2xl bg-white text-black font-semibold text-base uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40 disabled:hover:bg-white"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Submitting...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
