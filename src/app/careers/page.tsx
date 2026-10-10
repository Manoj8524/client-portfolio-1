'use client';

import { useState, useEffect, useRef } from 'react';
import { Briefcase, Paperclip, CheckCircle2, ArrowRight } from 'lucide-react';
import { getCareers, submitJobApplication } from '@/lib/api';

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    career_id: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [nameError, setNameError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadJobs() {
      const res = await getCareers();
      if (res && Array.isArray(res.data)) {
        setJobs(res.data);
      } else if (Array.isArray(res)) {
        setJobs(res);
      }
    }
    loadJobs();
  }, []);

  const scrollToApply = (jobId?: number) => {
    if (jobId) {
      setFormData((prev) => ({ ...prev, career_id: jobId.toString() }));
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    if (val !== '' && !/^([A-Za-z]+(\s[A-Za-z.]+)+)$/.test(val)) {
      setNameError("Invalid name format. Use 'John Doe', 'John D.', etc.");
    } else {
      setNameError('');
    }
    setFormData((prev) => ({ ...prev, name: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nameError) return;
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('mobile_number', formData.mobile_number);
      if (formData.career_id) data.append('career_id', formData.career_id);
      if (file) data.append('resume', file);

      await submitJobApplication(data);
      setSubmitted(true);
      setFormData({ name: '', email: '', mobile_number: '', career_id: '' });
      setFile(null);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const isValid =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.mobile_number.trim() !== '' &&
    formData.career_id !== '' &&
    file !== null &&
    !nameError;

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white padding-primary pt-12 pb-24">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 mb-4">
            // JOIN OUR SQUAD
          </p>
          <h1 className="font-horas text-4xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-6">
            Let&apos;s Shine <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fce39d] to-[#fec52d]">
              Brighter, Together.
            </span>
          </h1>
          <p className="font-ppmori text-neutral-400 text-sm md:text-lg max-w-3xl leading-relaxed">
            Here&apos;s your opportunity to work alongside industry maestros and innovators who are shaping the future. Come aboard and let&apos;s build a legacy that lasts a lifetime.
          </p>
        </section>

        {/* Open Positions Grid */}
        <section className="mb-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-900">
            <h2 className="font-horas text-3xl sm:text-5xl uppercase tracking-tight text-center mb-12">
              Current Openings
            </h2>

            {jobs.length === 0 ? (
              <div className="text-center py-12 text-neutral-400">
                <p>No open positions at this moment. You can still send an open application below!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors"
                  >
                    <div>
                      {job.job_type && (
                        <p className="text-xs font-mono uppercase tracking-widest text-yellow-400 mb-2">
                          {job.job_type}
                        </p>
                      )}
                      <h3 className="font-horas text-2xl uppercase tracking-wide text-white mb-4">
                        {job.career_title}
                      </h3>
                      {job.job_description && (
                        <div
                          className="text-sm font-ppmori text-neutral-300 space-y-2 mb-6 line-clamp-4 prose-invert"
                          dangerouslySetInnerHTML={{ __html: job.job_description }}
                        />
                      )}
                    </div>
                    <button
                      onClick={() => scrollToApply(job.id)}
                      className="mt-4 w-full py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                    >
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Application Form */}
        <section ref={formRef} className="max-w-3xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-900">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2 text-center">
              // BECOME A YELLOWTOOTHIAN
            </p>
            <h2 className="font-horas text-3xl sm:text-4xl uppercase tracking-tight text-center mb-8">
              Join the Change
            </h2>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl border border-green-500/50 bg-green-950/40 text-green-300 flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-400" />
                <span>Application submitted successfully! Our team will review your profile.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleNameChange}
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
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="mobile_number"
                  placeholder="Mobile Number"
                  value={formData.mobile_number}
                  onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                  inputMode="numeric"
                  required
                  className="w-full px-4 py-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <select
                  value={formData.career_id}
                  onChange={(e) => setFormData({ ...formData, career_id: e.target.value })}
                  required
                  className="w-full px-4 py-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-neutral-500 transition-colors"
                >
                  <option value="" disabled>Select Job Position</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.job_type ? `${j.job_type} | ` : ''}{j.career_title}
                    </option>
                  ))}
                  <option value="999">General / Open Application</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 px-1">
                  <Paperclip className="w-4 h-4" /> Attach Resume (.pdf, .doc, .docx)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-yellow-400 file:cursor-pointer transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!isValid || submitting}
                className="w-full mt-4 py-4 rounded-2xl bg-white text-black font-semibold text-base uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40 disabled:hover:bg-white"
              >
                {submitting ? 'Submitting...' : 'Apply Now'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
