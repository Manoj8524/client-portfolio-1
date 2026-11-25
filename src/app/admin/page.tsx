'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Home as HomeIcon,
  Briefcase,
  User,
  PhoneCall,
  Inbox,
  LogOut,
  Save,
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Mail,
  Eye,
  Sliders,
  Sparkles,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { SiteContent, ContactMessage, WorkProjectItem } from '@/lib/contentStore';

type AdminTab = 'overview' | 'global' | 'home' | 'works' | 'about' | 'contact' | 'messages';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const [content, setContent] = useState<SiteContent | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Check auth & fetch initial data
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchContent();
        fetchMessages();
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    } catch {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setIsAuthenticated(true);
        fetchContent();
        fetchMessages();
      } else {
        setLoginError(data.error || 'Invalid password');
      }
    } catch {
      setLoginError('Authentication failed');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
  };

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setContent(data);
    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const json = await res.json();
      if (json.ok && Array.isArray(json.data)) {
        setMessages(json.data);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSaveContent = async () => {
    if (!content) return;
    setSaving(true);
    setSaveSuccess(false);
    setSaveError('');
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        setSaveError(json.error || 'Failed to save');
      }
    } catch {
      setSaveError('Network error while saving');
    } finally {
      setSaving(false);
    }
  };

  // Image Uploader Handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUploaded: (url: string) => void,
    fieldKey: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldKey);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.ok && data.url) {
        onUploaded(data.url);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Error uploading image');
    } finally {
      setUploadingField(null);
    }
  };

  // Message Actions
  const handleToggleMessageStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    try {
      const res = await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  // ---------------------------------------------------------------------------
  // LOGIN SCREEN
  // ---------------------------------------------------------------------------
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center p-6 text-white font-ppmori">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#fec52d]/10 border border-[#fec52d]/30 flex items-center justify-center text-[#fec52d] mb-6">
            <Sparkles className="w-7 h-7" />
          </div>
          <h1 className="font-horas text-3xl sm:text-4xl uppercase tracking-tight text-white mb-2">
            MUTHU STUDIO
          </h1>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-8">
            ENTERPRISE CONTENT &amp; LEADS PORTAL
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 text-left">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Master Security Key
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-5 py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-[#fec52d] focus:outline-none text-white text-sm tracking-wide transition-colors"
                autoFocus
                required
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="mt-4 w-full py-3.5 rounded-xl bg-[#fec52d] text-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#ffe066] transition-all duration-200 shadow-lg cursor-pointer"
            >
              Access Dashboard
            </button>
          </form>

          <p className="mt-8 text-[11px] font-mono text-neutral-600">
            Default Key: <code className="text-neutral-400 font-bold">muthu2026</code>
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading || !content) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center text-white font-mono text-xs uppercase tracking-[0.3em]">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-6 h-6 animate-spin text-[#fec52d]" />
          <span>Synchronizing Studio Architecture...</span>
        </div>
      </div>
    );
  }

  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

  // ---------------------------------------------------------------------------
  // MAIN ADMIN CONSOLE
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white font-ppmori selection:bg-[#fec52d] selection:text-black flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-50 w-full bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-900 px-6 sm:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="flex items-center gap-2 group">
            <span className="font-horas text-2xl uppercase tracking-tighter text-white group-hover:text-[#fec52d] transition-colors">
              MUTHU
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
              CMS V2
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={handleSaveContent}
            disabled={saving}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] flex items-center gap-2 shadow-xl transition-all duration-300 cursor-pointer ${
              saving
                ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed'
                : 'bg-[#fec52d] text-black hover:bg-[#ffe066] hover:scale-105'
            }`}
          >
            {saving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save All Edits</span>
              </>
            )}
          </button>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2.5 rounded-full bg-neutral-900 hover:bg-red-950/50 hover:text-red-400 border border-neutral-800 text-neutral-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Toast Alert Feedback */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl bg-neutral-900 border border-emerald-500/50 text-emerald-400 shadow-2xl flex items-center gap-3 text-xs font-mono uppercase tracking-wider"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>All Site Content &amp; Imagery Successfully Deployed!</span>
          </motion.div>
        )}
        {saveError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl bg-neutral-900 border border-red-500/50 text-red-400 shadow-2xl flex items-center gap-3 text-xs font-mono uppercase tracking-wider"
          >
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>{saveError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Admin Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Navigation Sidebar Tabs - Fixed / Sticky on Desktop */}
        <aside className="w-full md:w-64 bg-neutral-950/90 backdrop-blur-xl border-b md:border-b-0 md:border-r border-neutral-900 p-4 sm:p-6 flex-shrink-0 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto select-none md:sticky md:top-[69px] md:h-[calc(100vh-69px)] md:self-start z-30">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 rounded-xl text-left text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#fec52d] text-black font-bold shadow-lg'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('global')}
            className={`px-4 py-3 rounded-xl text-left text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'global'
                ? 'bg-[#fec52d] text-black font-bold shadow-lg'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Sliders className="w-4 h-4 flex-shrink-0" />
            <span>Nav &amp; Footer</span>
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-3 rounded-xl text-left text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'home'
                ? 'bg-[#fec52d] text-black font-bold shadow-lg'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <HomeIcon className="w-4 h-4 flex-shrink-0" />
            <span>Home Page</span>
          </button>

          <button
            onClick={() => setActiveTab('works')}
            className={`px-4 py-3 rounded-xl text-left text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'works'
                ? 'bg-[#fec52d] text-black font-bold shadow-lg'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Briefcase className="w-4 h-4 flex-shrink-0" />
            <span>Works Portfolio</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-3 rounded-xl text-left text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'about'
                ? 'bg-[#fec52d] text-black font-bold shadow-lg'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <User className="w-4 h-4 flex-shrink-0" />
            <span>About Page</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-3 rounded-xl text-left text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'contact'
                ? 'bg-[#fec52d] text-black font-bold shadow-lg'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <PhoneCall className="w-4 h-4 flex-shrink-0" />
            <span>Contact Info</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-3 rounded-xl text-left text-xs font-mono uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'messages'
                ? 'bg-[#fec52d] text-black font-bold shadow-lg'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="w-4 h-4 flex-shrink-0" />
              <span>Leads Inbox</span>
            </div>
            {unreadMessagesCount > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'messages'
                    ? 'bg-black text-[#fec52d]'
                    : 'bg-[#fec52d] text-black'
                }`}
              >
                {unreadMessagesCount}
              </span>
            )}
          </button>
        </aside>

        {/* Tab Panel Viewports */}
        <main className="flex-1 p-6 sm:p-10 max-w-6xl">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#fec52d] mb-1">
                  // CMS CONTROL ROOM
                </p>
                <h2 className="font-horas text-3xl sm:text-5xl uppercase tracking-tight text-white">
                  Studio Overview &amp; Health
                </h2>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-neutral-400 mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider">Catalog Works</span>
                    <Briefcase className="w-4 h-4 text-[#fec52d]" />
                  </div>
                  <span className="font-horas text-4xl text-white">
                    {content.works.projects.length}
                  </span>
                  <p className="text-[11px] font-mono text-neutral-500 mt-2">Active live projects</p>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-neutral-400 mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider">Hero Posters</span>
                    <Layers className="w-4 h-4 text-[#fec52d]" />
                  </div>
                  <span className="font-horas text-4xl text-white">
                    {Object.values(content.home.hero.posterColumns).reduce(
                      (acc, arr) => acc + arr.length,
                      0
                    )}
                  </span>
                  <p className="text-[11px] font-mono text-neutral-500 mt-2">5 matrix scroll lanes</p>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-neutral-400 mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider">Client Inquiries</span>
                    <Mail className="w-4 h-4 text-[#fec52d]" />
                  </div>
                  <span className="font-horas text-4xl text-white">{messages.length}</span>
                  <p className="text-[11px] font-mono text-neutral-500 mt-2">Total leads recorded</p>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-neutral-400 mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider">Unread Leads</span>
                    <Inbox className="w-4 h-4 text-[#fec52d]" />
                  </div>
                  <span className="font-horas text-4xl text-[#fec52d]">
                    {unreadMessagesCount}
                  </span>
                  <p className="text-[11px] font-mono text-neutral-500 mt-2">Awaiting reply</p>
                </div>
              </div>

              {/* Quick Actions Guide */}
              <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <h3 className="font-horas text-2xl uppercase tracking-tight text-white">
                  Editable Architecture Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-400 font-ppmori">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#fec52d] mt-2 flex-shrink-0" />
                    <span>
                      <strong>Instant Save &amp; Deploy:</strong> Click &quot;Save All Edits&quot; at any
                      time to push your copy and image changes directly to live pages.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#fec52d] mt-2 flex-shrink-0" />
                    <span>
                      <strong>Free CDN Image Uploader:</strong> Every image field has an upload button
                      supporting local storage or Cloudinary CDN.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#fec52d] mt-2 flex-shrink-0" />
                    <span>
                      <strong>Contact Inquiries Leads:</strong> Submissions from the contact form are
                      safely archived in &quot;Leads Inbox&quot; with contact details.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#fec52d] mt-2 flex-shrink-0" />
                    <span>
                      <strong>Zero Code Required:</strong> Update studio telephone numbers, Google Maps
                      coordinates, about bio, and poster artworks visually.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: GLOBAL, NAV & FOOTER */}
          {activeTab === 'global' && (
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#fec52d] mb-1">
                  // GLOBAL IDENTITY &amp; CONTACT
                </p>
                <h2 className="font-horas text-3xl sm:text-4xl uppercase tracking-tight text-white">
                  Navbar, Footer &amp; Coordinates
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Studio Brand Name
                  </label>
                  <input
                    type="text"
                    value={content.siteSettings.brandName}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteSettings: { ...content.siteSettings, brandName: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#fec52d] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Studio Status Pill (Header Bar)
                  </label>
                  <input
                    type="text"
                    value={content.siteSettings.statusPill}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteSettings: { ...content.siteSettings, statusPill: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#fec52d] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Official Studio Email
                  </label>
                  <input
                    type="email"
                    value={content.siteSettings.studioEmail}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteSettings: { ...content.siteSettings, studioEmail: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#fec52d] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Studio Direct Phone
                  </label>
                  <input
                    type="text"
                    value={content.siteSettings.studioPhone}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteSettings: { ...content.siteSettings, studioPhone: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#fec52d] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Studio Coordinates / Address
                  </label>
                  <input
                    type="text"
                    value={content.siteSettings.studioCoordinates}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteSettings: { ...content.siteSettings, studioCoordinates: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#fec52d] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Google Maps Link URL
                  </label>
                  <input
                    type="text"
                    value={content.siteSettings.mapsUrl}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteSettings: { ...content.siteSettings, mapsUrl: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#fec52d] focus:outline-none"
                  />
                </div>
              </div>

              {/* Main Navbar Links Manager */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-horas text-xl uppercase tracking-wider text-white">
                      Main Header Navigation Links
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      Change navbar order, names, or link destinations
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(content.navigation?.links || [])];
                      updated.push({ label: 'New Link', href: '/' });
                      setContent({
                        ...content,
                        navigation: {
                          ...content.navigation,
                          links: updated,
                        },
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fec52d]/10 border border-[#fec52d]/40 text-[#fec52d] text-xs font-mono hover:bg-[#fec52d] hover:text-black transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Nav Link</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(content.navigation?.links || []).map((link, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800"
                    >
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                            Link Label (Index {idx + 1})
                          </label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const updated = [...(content.navigation?.links || [])];
                              updated[idx] = { ...updated[idx], label: e.target.value };
                              setContent({
                                ...content,
                                navigation: { ...content.navigation, links: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-neutral-700 text-white text-xs focus:border-[#fec52d] focus:outline-none"
                            placeholder="Home / Works / About / Contact"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                            Destination URL (href)
                          </label>
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) => {
                              const updated = [...(content.navigation?.links || [])];
                              updated[idx] = { ...updated[idx], href: e.target.value };
                              setContent({
                                ...content,
                                navigation: { ...content.navigation, links: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-neutral-700 text-white text-xs font-mono focus:border-[#fec52d] focus:outline-none"
                            placeholder="/ or /works or /about"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-1 self-end mb-0.5">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => {
                            if (idx === 0) return;
                            const updated = [...(content.navigation?.links || [])];
                            const temp = updated[idx];
                            updated[idx] = updated[idx - 1];
                            updated[idx - 1] = temp;
                            setContent({
                              ...content,
                              navigation: { ...content.navigation, links: updated },
                            });
                          }}
                          className="p-2 rounded-lg bg-neutral-800 hover:bg-[#fec52d] hover:text-black text-neutral-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                          title="Move Left / Up"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          disabled={idx === (content.navigation?.links || []).length - 1}
                          onClick={() => {
                            if (idx === (content.navigation?.links || []).length - 1) return;
                            const updated = [...(content.navigation?.links || [])];
                            const temp = updated[idx];
                            updated[idx] = updated[idx + 1];
                            updated[idx + 1] = temp;
                            setContent({
                              ...content,
                              navigation: { ...content.navigation, links: updated },
                            });
                          }}
                          className="p-2 rounded-lg bg-neutral-800 hover:bg-[#fec52d] hover:text-black text-neutral-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                          title="Move Right / Down"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (content.navigation?.links || []).filter((_, i) => i !== idx);
                            setContent({
                              ...content,
                              navigation: { ...content.navigation, links: updated },
                            });
                          }}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                          title="Remove Link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links Manager */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-horas text-xl uppercase tracking-wider text-white">
                      Footer Column 1: Quick Links
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      Manage all navigation links shown in the footer
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(content.footer?.quickLinks || [])];
                      updated.push({ label: 'New Link', href: '/' });
                      setContent({
                        ...content,
                        footer: {
                          ...content.footer,
                          quickLinks: updated,
                        },
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fec52d]/10 border border-[#fec52d]/40 text-[#fec52d] text-xs font-mono hover:bg-[#fec52d] hover:text-black transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Link</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(content.footer?.quickLinks || []).map((link, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800"
                    >
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                            Link Label
                          </label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const updated = [...(content.footer?.quickLinks || [])];
                              updated[idx] = { ...updated[idx], label: e.target.value };
                              setContent({
                                ...content,
                                footer: { ...content.footer, quickLinks: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-neutral-700 text-white text-xs focus:border-[#fec52d] focus:outline-none"
                            placeholder="Home / Works / Contact"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                            Destination URL (href)
                          </label>
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) => {
                              const updated = [...(content.footer?.quickLinks || [])];
                              updated[idx] = { ...updated[idx], href: e.target.value };
                              setContent({
                                ...content,
                                footer: { ...content.footer, quickLinks: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-neutral-700 text-white text-xs font-mono focus:border-[#fec52d] focus:outline-none"
                            placeholder="/ or /works or /about"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = (content.footer?.quickLinks || []).filter((_, i) => i !== idx);
                          setContent({
                            ...content,
                            footer: { ...content.footer, quickLinks: updated },
                          });
                        }}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors self-end mb-0.5"
                        title="Remove Link"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media Links */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <h3 className="font-horas text-xl uppercase tracking-wider text-white">
                  Social Media Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(content.siteSettings.socials).map(([platform, url]) => (
                    <div key={platform}>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1 capitalize">
                        {platform} URL
                      </label>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            siteSettings: {
                              ...content.siteSettings,
                              socials: {
                                ...content.siteSettings.socials,
                                [platform]: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#fec52d] focus:outline-none font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Newsletter & Copyright */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <h3 className="font-horas text-xl uppercase tracking-wider text-white">
                  Footer Typography &amp; Copyright
                </h3>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Newsletter Title
                  </label>
                  <input
                    type="text"
                    value={content.footer.newsletterHeading}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        footer: { ...content.footer, newsletterHeading: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#fec52d] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Newsletter Description
                  </label>
                  <input
                    type="text"
                    value={content.footer.newsletterDesc}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        footer: { ...content.footer, newsletterDesc: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#fec52d] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Copyright Notice
                  </label>
                  <input
                    type="text"
                    value={content.siteSettings.copyright}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteSettings: { ...content.siteSettings, copyright: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#fec52d] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HOME PAGE */}
          {activeTab === 'home' && (
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#fec52d] mb-1">
                  // HOMEPAGE ARCHITECTURE
                </p>
                <h2 className="font-horas text-3xl sm:text-4xl uppercase tracking-tight text-white">
                  Hero Wall, Showcases &amp; Zoom Dive
                </h2>
              </div>

              {/* Hero 5-Lane Continuous Poster Matrix Manager */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fec52d]">
                      // HERO VERTICAL MATRIX
                    </span>
                    <h3 className="font-horas text-2xl uppercase tracking-wider text-white mt-1">
                      Hero Poster Lanes (Continuous Feed)
                    </h3>
                    <p className="text-xs font-ppmori text-neutral-400 mt-1">
                      Add, upload, and remove movie posters from each of the 5 scrolling vertical lanes.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
                      <span>Marquee Poster Ratio:</span>
                      <select
                        id="hero-poster-aspect-ratio-select"
                        value={content.home.hero.posterAspectRatio || '4/5'}
                        onChange={(e) => {
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              hero: {
                                ...content.home.hero,
                                posterAspectRatio: e.target.value,
                              },
                            },
                          });
                        }}
                        className="bg-transparent text-[#fec52d] font-bold outline-none cursor-pointer"
                      >
                        <option value="4/5" className="bg-neutral-900 text-white">4:5 (Standard)</option>
                        <option value="2/3" className="bg-neutral-900 text-white">2:3 (Cinema Poster)</option>
                        <option value="1/1" className="bg-neutral-900 text-white">1:1 (Square)</option>
                        <option value="3/4" className="bg-neutral-900 text-white">3:4 (Portrait)</option>
                        <option value="16/9" className="bg-neutral-900 text-white">16:9 (Landscape)</option>
                      </select>
                    </div>
                    <div className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800 w-max">
                      Total Posters:{' '}
                      <span className="text-[#fec52d] font-bold">
                        {Object.values(content.home.hero.posterColumns || {}).reduce(
                          (acc, arr) => acc + (arr?.length || 0),
                          0
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  {(['lane1', 'lane2', 'lane3', 'lane4', 'lane5'] as const).map((laneKey, laneIdx) => {
                    const posters = content.home.hero.posterColumns?.[laneKey] || [];
                    return (
                      <div
                        key={laneKey}
                        className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 flex flex-col gap-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-[#fec52d]" />
                            <h4 className="font-horas text-lg uppercase tracking-wide text-white">
                              Lane 0{laneIdx + 1}
                            </h4>
                            <span className="text-[11px] font-mono text-neutral-500">
                              ({posters.length} posters)
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const newPosters = [
                                ...posters,
                                {
                                  title: 'New Film Poster',
                                  image: '/film_posters_cache/poster_187.webp',
                                },
                              ];
                              setContent({
                                ...content,
                                home: {
                                  ...content.home,
                                  hero: {
                                    ...content.home.hero,
                                    posterColumns: {
                                      ...content.home.hero.posterColumns,
                                      [laneKey]: newPosters,
                                    },
                                  },
                                },
                              });
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-[#fec52d] hover:text-black text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Poster</span>
                          </button>
                        </div>

                        {/* Poster Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {posters.map((poster, pIdx) => {
                            const fieldKey = `hero_${laneKey}_${pIdx}`;
                            return (
                              <div
                                key={pIdx}
                                className="p-3 rounded-xl bg-black/60 border border-neutral-800 flex flex-col gap-3 group relative"
                              >
                                <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-neutral-950 border border-white/5">
                                  {poster.image ? (
                                    <Image
                                      src={poster.image}
                                      alt={poster.title || 'Poster'}
                                      fill
                                      className="object-cover object-center select-none"
                                      unoptimized={poster.image.startsWith('http')}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-neutral-600 font-mono">
                                      No Image
                                    </div>
                                  )}

                                  {/* Delete button on hover */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = posters.filter((_, idx) => idx !== pIdx);
                                      setContent({
                                        ...content,
                                        home: {
                                          ...content.home,
                                          hero: {
                                            ...content.home.hero,
                                            posterColumns: {
                                              ...content.home.hero.posterColumns,
                                              [laneKey]: updated,
                                            },
                                          },
                                        },
                                      });
                                    }}
                                    className="absolute top-2 right-2 p-1.5 rounded-md bg-red-600/90 text-white hover:bg-red-500 shadow-md transition-colors cursor-pointer"
                                    title="Delete Poster"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="flex flex-col gap-2">
                                  <div>
                                    <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                                      Film Title
                                    </label>
                                    <input
                                      type="text"
                                      value={poster.title}
                                      onChange={(e) => {
                                        const updated = [...posters];
                                        updated[pIdx] = { ...updated[pIdx], title: e.target.value };
                                        setContent({
                                          ...content,
                                          home: {
                                            ...content.home,
                                            hero: {
                                              ...content.home.hero,
                                              posterColumns: {
                                                ...content.home.hero.posterColumns,
                                                [laneKey]: updated,
                                              },
                                            },
                                          },
                                        });
                                      }}
                                      className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#fec52d] focus:outline-none"
                                      placeholder="Poster Title"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                                      Image Source / Upload
                                    </label>
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="text"
                                        value={poster.image}
                                        onChange={(e) => {
                                          const updated = [...posters];
                                          updated[pIdx] = { ...updated[pIdx], image: e.target.value };
                                          setContent({
                                            ...content,
                                            home: {
                                              ...content.home,
                                              hero: {
                                                ...content.home.hero,
                                                posterColumns: {
                                                  ...content.home.hero.posterColumns,
                                                  [laneKey]: updated,
                                                },
                                              },
                                            },
                                          });
                                        }}
                                        className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-[11px] font-mono focus:border-[#fec52d] focus:outline-none truncate"
                                        placeholder="/path/to/poster.webp or https://..."
                                      />
                                      <label className="flex-shrink-0 p-1.5 rounded-lg bg-neutral-800 hover:bg-[#fec52d] hover:text-black text-neutral-300 transition-colors cursor-pointer border border-neutral-700">
                                        <Upload className="w-3.5 h-3.5" />
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) =>
                                            handleFileUpload(
                                              e,
                                              (url) => {
                                                const updated = [...posters];
                                                updated[pIdx] = { ...updated[pIdx], image: url };
                                                setContent({
                                                  ...content,
                                                  home: {
                                                    ...content.home,
                                                    hero: {
                                                      ...content.home.hero,
                                                      posterColumns: {
                                                        ...content.home.hero.posterColumns,
                                                        [laneKey]: updated,
                                                      },
                                                    },
                                                  },
                                                });
                                              },
                                              fieldKey
                                            )
                                          }
                                        />
                                      </label>
                                    </div>
                                    {uploadingField === fieldKey && (
                                      <span className="text-[10px] font-mono text-[#fec52d] animate-pulse mt-1 block">
                                        Uploading to Supabase...
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3-Column Showcase Cards */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fec52d]">
                    // 3-COLUMN SHOWCASE CARDS
                  </span>
                  <h3 className="font-horas text-2xl uppercase tracking-wider text-white mt-1">
                    Featured Project Showcase Grid (3 Columns)
                  </h3>
                  <p className="text-xs font-ppmori text-neutral-400 mt-1">
                    Update images, titles, tags, and link destinations for the 3 flagship full-bleed cards.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(content.home.showcaseCards || []).slice(0, 3).map((card, idx) => {
                    const fieldKey = `showcase_card_${idx}`;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col gap-3"
                      >
                        <span className="text-xs font-mono uppercase text-[#fec52d]">
                          Card 0{idx + 1}
                        </span>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                            Tag / Category
                          </label>
                          <input
                            type="text"
                            value={card.tag}
                            onChange={(e) => {
                              const updated = [...(content.home.showcaseCards || [])];
                              updated[idx] = { ...updated[idx], tag: e.target.value };
                              setContent({
                                ...content,
                                home: { ...content.home, showcaseCards: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              const updated = [...(content.home.showcaseCards || [])];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setContent({
                                ...content,
                                home: { ...content.home, showcaseCards: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                            Destination Link
                          </label>
                          <input
                            type="text"
                            value={card.link}
                            onChange={(e) => {
                              const updated = [...(content.home.showcaseCards || [])];
                              updated[idx] = { ...updated[idx], link: e.target.value };
                              setContent({
                                ...content,
                                home: { ...content.home, showcaseCards: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                            Image URL &amp; Upload
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={card.image}
                              onChange={(e) => {
                                const updated = [...(content.home.showcaseCards || [])];
                                updated[idx] = { ...updated[idx], image: e.target.value };
                                setContent({
                                  ...content,
                                  home: { ...content.home, showcaseCards: updated },
                                });
                              }}
                              className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs font-mono truncate"
                            />
                            <label className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-[#fec52d] hover:text-black text-neutral-200 text-xs font-mono flex items-center gap-1 cursor-pointer">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(
                                    e,
                                    (url) => {
                                      const updated = [...(content.home.showcaseCards || [])];
                                      updated[idx] = { ...updated[idx], image: url };
                                      setContent({
                                        ...content,
                                        home: { ...content.home, showcaseCards: updated },
                                      });
                                    },
                                    fieldKey
                                  )
                                }
                              />
                            </label>
                          </div>
                          {uploadingField === fieldKey && (
                            <span className="text-[10px] font-mono text-[#fec52d] animate-pulse mt-1 block">
                              Uploading...
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Featured Watch Showcase */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fec52d]">
                    // ULTRA-WIDE HERO SHOWCASE
                  </span>
                  <h3 className="font-horas text-2xl uppercase tracking-wider text-white mt-1">
                    Featured Project Banner (Sotto Zero Watch)
                  </h3>
                  <p className="text-xs font-ppmori text-neutral-400 mt-1">
                    Update the full-bleed banner image, title, and destination link.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Showcase Title
                    </label>
                    <input
                      type="text"
                      value={content.home.featuredWatch.title}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            featuredWatch: { ...content.home.featuredWatch, title: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Destination Link
                    </label>
                    <input
                      type="text"
                      value={content.home.featuredWatch.cta?.href || '/works?category=PRINT+%26+ADS'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            featuredWatch: {
                              ...content.home.featuredWatch,
                              cta: {
                                ...content.home.featuredWatch.cta,
                                href: e.target.value,
                              },
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Watch Visual Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={content.home.featuredWatch.image}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              featuredWatch: {
                                ...content.home.featuredWatch,
                                image: e.target.value,
                              },
                            },
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                      />
                      <label className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-[#fec52d] hover:text-black text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(
                              e,
                              (url) =>
                                setContent({
                                  ...content,
                                  home: {
                                    ...content.home,
                                    featuredWatch: {
                                      ...content.home.featuredWatch,
                                      image: url,
                                    },
                                  },
                                }),
                              'featuredWatch'
                            )
                          }
                        />
                      </label>
                    </div>

                    {/* Live Watch Banner Preview */}
                    <div className="mt-3 relative w-full h-44 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                      {content.home.featuredWatch?.image ? (
                        <Image
                          src={content.home.featuredWatch.image}
                          alt="Featured Watch Preview"
                          fill
                          className="object-cover object-center"
                          unoptimized={content.home.featuredWatch.image.startsWith('http')}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-600 font-mono">
                          No Watch Image
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Split 2-Column Showcase (Laptop & Mobile) */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fec52d]">
                    // SPLIT 2-COLUMN SHOWCASE
                  </span>
                  <h3 className="font-horas text-2xl uppercase tracking-wider text-white mt-1">
                    Devices &amp; Mockups Split Section (Laptop + Mobile)
                  </h3>
                  <p className="text-xs font-ppmori text-neutral-400 mt-1">
                    Manage the 58/42 split showcase section images and links.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Laptop Mockup */}
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col gap-3">
                    <span className="text-xs font-mono uppercase text-[#fec52d]">
                      Left Column (Laptop Mockup - 58% Width)
                    </span>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Alt Label / Title
                      </label>
                      <input
                        type="text"
                        value={content.home.splitShowcase?.leftAlt || 'Devices & Mockups'}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              splitShowcase: {
                                ...content.home.splitShowcase,
                                leftAlt: e.target.value,
                                leftImage: content.home.splitShowcase?.leftImage || '/extracted_assets/home/home_split_laptop.webp',
                                leftLink: content.home.splitShowcase?.leftLink || '/works?category=PRINT+%26+ADS',
                                rightImage: content.home.splitShowcase?.rightImage || '/extracted_assets/home/home_split_mobile.webp',
                                rightLink: content.home.splitShowcase?.rightLink || '/works?category=BRANDING',
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Destination Link
                      </label>
                      <input
                        type="text"
                        value={content.home.splitShowcase?.leftLink || '/works?category=PRINT+%26+ADS'}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              splitShowcase: {
                                ...content.home.splitShowcase,
                                leftLink: e.target.value,
                                leftImage: content.home.splitShowcase?.leftImage || '/extracted_assets/home/home_split_laptop.webp',
                                rightImage: content.home.splitShowcase?.rightImage || '/extracted_assets/home/home_split_mobile.webp',
                                rightLink: content.home.splitShowcase?.rightLink || '/works?category=BRANDING',
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Image URL &amp; Upload
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={content.home.splitShowcase?.leftImage || '/extracted_assets/home/home_split_laptop.webp'}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              home: {
                                ...content.home,
                                splitShowcase: {
                                  ...content.home.splitShowcase,
                                  leftImage: e.target.value,
                                  leftLink: content.home.splitShowcase?.leftLink || '/works?category=PRINT+%26+ADS',
                                  rightImage: content.home.splitShowcase?.rightImage || '/extracted_assets/home/home_split_mobile.webp',
                                  rightLink: content.home.splitShowcase?.rightLink || '/works?category=BRANDING',
                                },
                              },
                            })
                          }
                          className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs font-mono truncate"
                        />
                        <label className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-[#fec52d] hover:text-black text-neutral-200 text-xs font-mono flex items-center gap-1 cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(
                                e,
                                (url) =>
                                  setContent({
                                    ...content,
                                    home: {
                                      ...content.home,
                                      splitShowcase: {
                                        ...content.home.splitShowcase,
                                        leftImage: url,
                                        leftLink: content.home.splitShowcase?.leftLink || '/works?category=PRINT+%26+ADS',
                                        rightImage: content.home.splitShowcase?.rightImage || '/extracted_assets/home/home_split_mobile.webp',
                                        rightLink: content.home.splitShowcase?.rightLink || '/works?category=BRANDING',
                                      },
                                    },
                                  }),
                                'split_left'
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Mobile Projects */}
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col gap-3">
                    <span className="text-xs font-mono uppercase text-[#fec52d]">
                      Right Column (Mobile Projects - 42% Width)
                    </span>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Alt Label / Title
                      </label>
                      <input
                        type="text"
                        value={content.home.splitShowcase?.rightAlt || 'R Design Mobile Projects'}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              splitShowcase: {
                                ...content.home.splitShowcase,
                                rightAlt: e.target.value,
                                leftImage: content.home.splitShowcase?.leftImage || '/extracted_assets/home/home_split_laptop.webp',
                                leftLink: content.home.splitShowcase?.leftLink || '/works?category=PRINT+%26+ADS',
                                rightImage: content.home.splitShowcase?.rightImage || '/extracted_assets/home/home_split_mobile.webp',
                                rightLink: content.home.splitShowcase?.rightLink || '/works?category=BRANDING',
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Destination Link
                      </label>
                      <input
                        type="text"
                        value={content.home.splitShowcase?.rightLink || '/works?category=BRANDING'}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              splitShowcase: {
                                ...content.home.splitShowcase,
                                rightLink: e.target.value,
                                leftImage: content.home.splitShowcase?.leftImage || '/extracted_assets/home/home_split_laptop.webp',
                                leftLink: content.home.splitShowcase?.leftLink || '/works?category=PRINT+%26+ADS',
                                rightImage: content.home.splitShowcase?.rightImage || '/extracted_assets/home/home_split_mobile.webp',
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Image URL &amp; Upload
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={content.home.splitShowcase?.rightImage || '/extracted_assets/home/home_split_mobile.webp'}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              home: {
                                ...content.home,
                                splitShowcase: {
                                  ...content.home.splitShowcase,
                                  rightImage: e.target.value,
                                  leftImage: content.home.splitShowcase?.leftImage || '/extracted_assets/home/home_split_laptop.webp',
                                  leftLink: content.home.splitShowcase?.leftLink || '/works?category=PRINT+%26+ADS',
                                  rightLink: content.home.splitShowcase?.rightLink || '/works?category=BRANDING',
                                },
                              },
                            })
                          }
                          className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs font-mono truncate"
                        />
                        <label className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-[#fec52d] hover:text-black text-neutral-200 text-xs font-mono flex items-center gap-1 cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(
                                e,
                                (url) =>
                                  setContent({
                                    ...content,
                                    home: {
                                      ...content.home,
                                      splitShowcase: {
                                        ...content.home.splitShowcase,
                                        rightImage: url,
                                        leftImage: content.home.splitShowcase?.leftImage || '/extracted_assets/home/home_split_laptop.webp',
                                        leftLink: content.home.splitShowcase?.leftLink || '/works?category=PRINT+%26+ADS',
                                        rightLink: content.home.splitShowcase?.rightLink || '/works?category=BRANDING',
                                      },
                                    },
                                  }),
                                'split_right'
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brands Worked With Marquee */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fec52d]">
                    // BRANDS LOGO TICKER
                  </span>
                  <h3 className="font-horas text-2xl uppercase tracking-wider text-white mt-1">
                    Brands I’ve Worked With Marquee Ticker
                  </h3>
                  <p className="text-xs font-ppmori text-neutral-400 mt-1">
                    Edit heading text and upload/replace the seamless client brands banner strip.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={content.home.brandsTicker?.title || 'BRANDS I’VE WORKED WITH'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            brandsTicker: {
                              ...content.home.brandsTicker,
                              title: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Sub-tag / Note
                    </label>
                    <input
                      type="text"
                      value={content.home.brandsTicker?.tag || '// Trusted By Premier Studios & Visionary Brands'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            brandsTicker: {
                              ...content.home.brandsTicker,
                              tag: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Brands Ticker Image Strip URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={content.home.brandsTicker?.image || '/extracted_assets/home/home_brands_ticker.webp'}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              brandsTicker: {
                                ...content.home.brandsTicker,
                                image: e.target.value,
                              },
                            },
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                      />
                      <label className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-[#fec52d] hover:text-black text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(
                              e,
                              (url) =>
                                setContent({
                                  ...content,
                                  home: {
                                    ...content.home,
                                    brandsTicker: {
                                      ...content.home.brandsTicker,
                                      image: url,
                                    },
                                  },
                                }),
                              'brandsTicker'
                            )
                          }
                        />
                      </label>
                    </div>

                    {/* Live Brands Banner Preview */}
                    <div className="mt-3 relative w-full h-44 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                      {content.home.brandsTicker?.image ? (
                        <Image
                          src={content.home.brandsTicker.image}
                          alt="Brands Banner Preview"
                          fill
                          className="object-cover object-center"
                          unoptimized={content.home.brandsTicker.image.startsWith('http')}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-600 font-mono">
                          No Brands Banner Image
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Zoom Into The "O" Portal Section */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <h3 className="font-horas text-xl uppercase tracking-wider text-white">
                  Zoom Into The &quot;O&quot; Dive Section
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Word 1 (e.g. ZOOM)
                    </label>
                    <input
                      type="text"
                      value={content.home.zoomSection.word1}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            zoomSection: { ...content.home.zoomSection, word1: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-horas uppercase text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Word 2
                    </label>
                    <input
                      type="text"
                      value={content.home.zoomSection.word2}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            zoomSection: { ...content.home.zoomSection, word2: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-horas uppercase text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Word 3
                    </label>
                    <input
                      type="text"
                      value={content.home.zoomSection.word3}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            zoomSection: { ...content.home.zoomSection, word3: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-horas uppercase text-lg"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Plain Background Image
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={content.home.zoomSection.backdropImage}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            home: {
                              ...content.home,
                              zoomSection: {
                                ...content.home.zoomSection,
                                backdropImage: e.target.value,
                              },
                            },
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                      />
                      <label className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(
                              e,
                              (url) =>
                                setContent({
                                  ...content,
                                  home: {
                                    ...content.home,
                                    zoomSection: {
                                      ...content.home.zoomSection,
                                      backdropImage: url,
                                    },
                                  },
                                }),
                              'zoomBackdrop'
                            )
                          }
                        />
                      </label>
                    </div>

                    {/* Live Zoom Backdrop Preview */}
                    <div className="mt-3 relative w-full h-44 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                      {content.home.zoomSection?.backdropImage ? (
                        <Image
                          src={content.home.zoomSection.backdropImage}
                          alt="Zoom Backdrop Preview"
                          fill
                          className="object-cover object-center"
                          unoptimized={content.home.zoomSection.backdropImage.startsWith('http')}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-600 font-mono">
                          No Backdrop Image
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={content.home.zoomSection.cta.label}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          home: {
                            ...content.home,
                            zoomSection: {
                              ...content.home.zoomSection,
                              cta: { ...content.home.zoomSection.cta, label: e.target.value },
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WORKS PORTFOLIO */}
          {activeTab === 'works' && (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#fec52d] mb-1">
                    // PORTFOLIO CATALOG
                  </p>
                  <h2 className="font-horas text-3xl sm:text-4xl uppercase tracking-tight text-white">
                    Film Posters &amp; Works Manager
                  </h2>
                </div>
                <button
                  onClick={() => {
                    const newProj: WorkProjectItem = {
                      id: `proj_${Date.now()}`,
                      title: 'New Key Visual Project',
                      category: 'FILM POSTERS',
                      year: '2026',
                      image: '/extracted_assets/work/work_card_1.webp',
                      director: 'Visionary Director',
                      client: 'Premier Studio',
                      awards: 'Official Selection',
                      featured: false,
                    };
                    setContent({
                      ...content,
                      works: {
                        ...content.works,
                        projects: [newProj, ...content.works.projects],
                      },
                    });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#fec52d] text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#ffe066] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Works Page Hero Banner Customization */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-5">
                <div className="border-b border-neutral-800 pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fec52d]">
                    // PAGE HEADER
                  </span>
                  <h3 className="font-horas text-2xl uppercase tracking-wider text-white mt-0.5">
                    Works Page Hero Banner
                  </h3>
                  <p className="text-xs font-ppmori text-neutral-400">
                    Customize the title, subtitle, and backdrop image of the /works archive page.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Hero Tag
                    </label>
                    <input
                      type="text"
                      value={content.works.heroTag || '// PORTFOLIO ARCHIVE'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          works: { ...content.works, heroTag: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#fec52d] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Page Main Title
                    </label>
                    <input
                      type="text"
                      value={content.works.title}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          works: { ...content.works, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm font-horas tracking-wider focus:border-[#fec52d] focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Subtitle / Editorial Description
                    </label>
                    <textarea
                      rows={2}
                      value={content.works.subtitle}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          works: { ...content.works, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#fec52d] focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Hero Background Image URL / Direct Upload
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={content.works.backgroundImage || '/extracted_assets/work/work_hero_bg_clean.webp'}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            works: { ...content.works, backgroundImage: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#fec52d] focus:outline-none truncate"
                      />
                      <label className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-[#fec52d] hover:text-black text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border border-neutral-700 flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(
                              e,
                              (url) => {
                                setContent({
                                  ...content,
                                  works: { ...content.works, backgroundImage: url },
                                });
                              },
                              'works_hero_bg'
                            )
                          }
                        />
                      </label>
                    </div>
                    {uploadingField === 'works_hero_bg' && (
                      <span className="text-[10px] font-mono text-[#fec52d] animate-pulse mt-1 block">
                        Uploading banner to Supabase...
                      </span>
                    )}

                    {/* Full Hero Backdrop Image Live Preview */}
                    <div className="mt-3 relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl group">
                      {content.works.backgroundImage ? (
                        <>
                          <Image
                            src={content.works.backgroundImage}
                            alt="Works Hero Banner Preview"
                            fill
                            className="object-cover object-center select-none"
                            unoptimized={content.works.backgroundImage.startsWith('http')}
                          />
                          {/* Live Overlay Simulator showing Tag, Title, Subtitle as they appear on the live site */}
                          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#fec52d] mb-2 drop-shadow-md">
                              {content.works.heroTag || '// PORTFOLIO ARCHIVE'}
                            </span>
                            <span className="font-horas text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
                              {content.works.title || 'SELECTED ARCHIVE'}
                            </span>
                            <span className="mt-3 text-xs sm:text-sm font-ppmori text-neutral-300 max-w-xl line-clamp-2 drop-shadow-md">
                              {content.works.subtitle || 'Bespoke film poster key art, character visuals, and cinematic advertising campaigns.'}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-wider text-[#fec52d] flex items-center gap-1.5 shadow-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#fec52d] animate-pulse" />
                            <span>Live Banner Preview</span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500 font-mono">
                          No Backdrop Image Selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Works Grid Global Aspect Ratio Settings */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fec52d]">
                    // GLOBAL GRID DISPLAY SETTINGS
                  </span>
                  <h3 className="font-horas text-2xl uppercase tracking-wider text-white mt-1">
                    Works Grid Poster Aspect Ratio
                  </h3>
                  <p className="text-xs font-ppmori text-neutral-400 mt-1">
                    Choose the global fallback aspect ratio for all poster cards across the works archive.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs font-mono uppercase text-neutral-400 whitespace-nowrap">Grid Ratio:</label>
                  <select
                    id="global-grid-aspect-ratio-select"
                    value={content.works.gridAspectRatio || '2/3'}
                    onChange={(e) => {
                      setContent({
                        ...content,
                        works: { ...content.works, gridAspectRatio: e.target.value },
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-[#fec52d] text-xs font-mono font-bold focus:border-[#fec52d] outline-none cursor-pointer"
                  >
                    <option value="2/3">2:3 (Cinema Poster / 4-Col Default)</option>
                    <option value="4/5">4:5 (Standard Editorial Poster)</option>
                    <option value="1/1">1:1 (Square Artwork)</option>
                    <option value="3/4">3:4 (Classic Portrait)</option>
                    <option value="16/9">16:9 (Landscape Banner)</option>
                  </select>
                </div>
              </div>

              {/* Category-Specific Aspect Ratio Controls */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fec52d]">
                    // CATEGORY IMAGE SIZE ADJUSTMENTS
                  </span>
                  <h3 className="font-horas text-2xl uppercase tracking-wider text-white mt-1">
                    Category-Specific Image Aspect Ratios
                  </h3>
                  <p className="text-xs font-ppmori text-neutral-400 mt-1">
                    Adjust the image card size and aspect ratio for each individual category. All cards under each category adapt dynamically.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  {(content.works.categories || ['BRANDING', 'FILM POSTERS', 'SOCIAL MEDIA CREATIVES', 'PRINT & ADS'])
                    .filter((cat) => cat !== 'ALL')
                    .map((cat) => {
                      const currentVal = content.works.categoryRatios?.[cat] || 'default';
                      return (
                        <div
                          key={cat}
                          className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex flex-col gap-2.5 hover:border-neutral-700 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono font-bold text-neutral-200 tracking-wider uppercase">
                              {cat}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#fec52d]/10 text-[#fec52d] border border-[#fec52d]/20">
                              {currentVal === 'default' ? (content.works.gridAspectRatio || '2/3') : currentVal}
                            </span>
                          </div>
                          <select
                            id={`category-ratio-select-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                            value={currentVal}
                            onChange={(e) => {
                              const newRatios = {
                                ...(content.works.categoryRatios || {}),
                                [cat]: e.target.value,
                              };
                              setContent({
                                ...content,
                                works: {
                                  ...content.works,
                                  categoryRatios: newRatios,
                                },
                              });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-xs font-mono font-medium text-white focus:border-[#fec52d] outline-none cursor-pointer"
                          >
                            <option value="default">Default ({content.works.gridAspectRatio || '2/3'})</option>
                            <option value="2/3">2:3 (Cinema Poster)</option>
                            <option value="4/5">4:5 (Standard Editorial)</option>
                            <option value="1/1">1:1 (Square Artwork)</option>
                            <option value="3/4">3:4 (Portrait)</option>
                            <option value="16/9">16:9 (Landscape / Branding)</option>
                          </select>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Projects List */}
              <div className="grid grid-cols-1 gap-6">
                {content.works.projects.map((proj, idx) => (
                  <div
                    key={proj.id || idx}
                    className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col md:flex-row gap-6 items-start"
                  >
                    {/* Thumbnail Preview with Dynamic Ratio & Alignment */}
                    <div
                      style={{
                        aspectRatio: proj.aspectRatio && proj.aspectRatio !== 'default'
                          ? proj.aspectRatio
                          : (content.works.categoryRatios?.[proj.category] || content.works.gridAspectRatio || '2/3'),
                      }}
                      className="relative w-32 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 flex-shrink-0"
                    >
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        style={{ objectPosition: proj.objectPosition || 'center' }}
                        className="object-cover"
                        unoptimized={proj.image?.startsWith('http')}
                      />
                    </div>

                    {/* Project Fields */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                          Film / Project Title
                        </label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const updated = [...content.works.projects];
                            updated[idx].title = e.target.value;
                            setContent({
                              ...content,
                              works: { ...content.works, projects: updated },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                          Category
                        </label>
                        <select
                          value={proj.category}
                          onChange={(e) => {
                            const updated = [...content.works.projects];
                            updated[idx].category = e.target.value;
                            setContent({
                              ...content,
                              works: { ...content.works, projects: updated },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono uppercase"
                        >
                          {content.works.categories
                            .filter((c) => c !== 'ALL')
                            .map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                          Release Year
                        </label>
                        <input
                          type="text"
                          value={proj.year}
                          onChange={(e) => {
                            const updated = [...content.works.projects];
                            updated[idx].year = e.target.value;
                            setContent({
                              ...content,
                              works: { ...content.works, projects: updated },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2 md:col-span-3">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                          Poster / Artwork URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={proj.image}
                            onChange={(e) => {
                              const updated = [...content.works.projects];
                              updated[idx].image = e.target.value;
                              setContent({
                                ...content,
                                works: { ...content.works, projects: updated },
                              });
                            }}
                            className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                          />
                          <label className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(
                                  e,
                                  (url) => {
                                    const updated = [...content.works.projects];
                                    updated[idx].image = url;
                                    setContent({
                                      ...content,
                                      works: { ...content.works, projects: updated },
                                    });
                                  },
                                  `work_${idx}`
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                          Director
                        </label>
                        <input
                          type="text"
                          value={proj.director || ''}
                          onChange={(e) => {
                            const updated = [...content.works.projects];
                            updated[idx].director = e.target.value;
                            setContent({
                              ...content,
                              works: { ...content.works, projects: updated },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                          Client / Studio
                        </label>
                        <input
                          type="text"
                          value={proj.client || ''}
                          onChange={(e) => {
                            const updated = [...content.works.projects];
                            updated[idx].client = e.target.value;
                            setContent({
                              ...content,
                              works: { ...content.works, projects: updated },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                          Poster Ratio Override
                        </label>
                        <select
                          value={proj.aspectRatio || 'default'}
                          onChange={(e) => {
                            const updated = [...content.works.projects];
                            updated[idx].aspectRatio = e.target.value;
                            setContent({
                              ...content,
                              works: { ...content.works, projects: updated },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                        >
                          <option value="default">Default ({content.works.gridAspectRatio || '2/3'})</option>
                          <option value="2/3">2:3 (Cinema Poster)</option>
                          <option value="4/5">4:5 (Standard Editorial)</option>
                          <option value="1/1">1:1 (Square Artwork)</option>
                          <option value="3/4">3:4 (Classic Portrait)</option>
                          <option value="16/9">16:9 (Landscape Banner)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                          Image Focus / Alignment
                        </label>
                        <select
                          value={proj.objectPosition || 'center'}
                          onChange={(e) => {
                            const updated = [...content.works.projects];
                            updated[idx].objectPosition = e.target.value;
                            setContent({
                              ...content,
                              works: { ...content.works, projects: updated },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                        >
                          <option value="center">Center Focused</option>
                          <option value="top">Top (Headshot / Title)</option>
                          <option value="bottom">Bottom (Credits / Base)</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between pt-6">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-mono uppercase text-neutral-300">
                          <input
                            type="checkbox"
                            checked={!!proj.featured}
                            onChange={(e) => {
                              const updated = [...content.works.projects];
                              updated[idx].featured = e.target.checked;
                              setContent({
                                ...content,
                                works: { ...content.works, projects: updated },
                              });
                            }}
                            className="rounded bg-neutral-900 border-neutral-700 text-[#fec52d] focus:ring-0"
                          />
                          <span>Featured</span>
                        </label>

                        <button
                          onClick={() => {
                            if (confirm(`Delete project "${proj.title}"?`)) {
                              const updated = content.works.projects.filter((_, i) => i !== idx);
                              setContent({
                                ...content,
                                works: { ...content.works, projects: updated },
                              });
                            }
                          }}
                          className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-950/30 transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ABOUT PAGE */}
          {activeTab === 'about' && (
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#fec52d] mb-1">
                  // BIOGRAPHY, MONOLITH &amp; CAREER MILESTONES
                </p>
                <h2 className="font-horas text-3xl sm:text-4xl uppercase tracking-tight text-white">
                  About Story, Monolith Card &amp; Timeline
                </h2>
              </div>

              {/* Header & Main Story Paragraphs */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-horas text-xl uppercase tracking-wider text-white">
                    Editorial Biography &amp; CTAs
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(content.about.storyParagraphs || [])];
                      updated.push('New biography paragraph narrative detailing creative methodology...');
                      setContent({
                        ...content,
                        about: { ...content.about, storyParagraphs: updated },
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fec52d]/10 border border-[#fec52d]/40 text-[#fec52d] text-xs font-mono hover:bg-[#fec52d] hover:text-black transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Paragraph</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Header Tag
                    </label>
                    <input
                      type="text"
                      value={content.about.tag}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: { ...content.about, tag: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Main Headline
                    </label>
                    <input
                      type="text"
                      value={content.about.headline}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: { ...content.about, headline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm font-horas uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Primary CTA Button (Label / Destination)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={content.about.ctaPrimary?.label || 'Initiate Project'}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            about: {
                              ...content.about,
                              ctaPrimary: {
                                label: e.target.value,
                                href: content.about.ctaPrimary?.href || '/contact',
                              },
                            },
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs"
                        placeholder="Initiate Project"
                      />
                      <input
                        type="text"
                        value={content.about.ctaPrimary?.href || '/contact'}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            about: {
                              ...content.about,
                              ctaPrimary: {
                                label: content.about.ctaPrimary?.label || 'Initiate Project',
                                href: e.target.value,
                              },
                            },
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                        placeholder="/contact"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Secondary CTA Button (Label / Destination)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={content.about.ctaSecondary?.label || 'View Archive'}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            about: {
                              ...content.about,
                              ctaSecondary: {
                                label: e.target.value,
                                href: content.about.ctaSecondary?.href || '/works',
                              },
                            },
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs"
                        placeholder="View Archive"
                      />
                      <input
                        type="text"
                        value={content.about.ctaSecondary?.href || '/works'}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            about: {
                              ...content.about,
                              ctaSecondary: {
                                label: content.about.ctaSecondary?.label || 'View Archive',
                                href: e.target.value,
                              },
                            },
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                        placeholder="/works"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Story Paragraphs
                  </label>
                  {(content.about.storyParagraphs || []).map((para, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <span className="text-xs font-mono text-[#fec52d] mt-2">0{idx + 1}</span>
                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => {
                          const updated = [...content.about.storyParagraphs];
                          updated[idx] = e.target.value;
                          setContent({
                            ...content,
                            about: { ...content.about, storyParagraphs: updated },
                          });
                        }}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#fec52d] focus:outline-none font-ppmori leading-relaxed"
                      />
                      {(content.about.storyParagraphs || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = content.about.storyParagraphs.filter((_, i) => i !== idx);
                            setContent({
                              ...content,
                              about: { ...content.about, storyParagraphs: updated },
                            });
                          }}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors mt-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Kinetic Studio Monolith Card */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <h3 className="font-horas text-xl uppercase tracking-wider text-white">
                  Architectural Kinetic Monolith Card (Right Box)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Monolith Tag
                    </label>
                    <input
                      type="text"
                      value={content.about.monolith?.tag || '// MONOLITH ARCHIVE'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: {
                            ...content.about,
                            monolith: {
                              ...content.about.monolith!,
                              tag: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Monolith Title
                    </label>
                    <input
                      type="text"
                      value={content.about.monolith?.title || content.siteSettings.brandName || 'MUTHU'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: {
                            ...content.about,
                            monolith: {
                              ...content.about.monolith!,
                              title: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-horas uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Location Tag
                    </label>
                    <input
                      type="text"
                      value={content.about.monolith?.location || 'KOCHI / INDIA'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: {
                            ...content.about,
                            monolith: {
                              ...content.about.monolith!,
                              location: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Establishment Stamp
                    </label>
                    <input
                      type="text"
                      value={content.about.monolith?.estYear || 'EST. 2018'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: {
                            ...content.about,
                            monolith: {
                              ...content.about.monolith!,
                              estYear: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Monolith Disciplines &amp; Pillars
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(content.about.monolith?.pillars || []).map((pillar, pIdx) => (
                      <div key={pIdx} className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col gap-2">
                        <span className="text-[10px] font-mono uppercase text-[#fec52d]">Pillar 0{pIdx + 1}</span>
                        <input
                          type="text"
                          value={pillar.title}
                          onChange={(e) => {
                            const updated = [...(content.about.monolith?.pillars || [])];
                            updated[pIdx] = { ...updated[pIdx], title: e.target.value };
                            setContent({
                              ...content,
                              about: {
                                ...content.about,
                                monolith: { ...content.about.monolith!, pillars: updated },
                              },
                            });
                          }}
                          placeholder="Pillar Title"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-neutral-700 text-white text-xs font-horas uppercase"
                        />
                        <textarea
                          rows={2}
                          value={pillar.desc}
                          onChange={(e) => {
                            const updated = [...(content.about.monolith?.pillars || [])];
                            updated[pIdx] = { ...updated[pIdx], desc: e.target.value };
                            setContent({
                              ...content,
                              about: {
                                ...content.about,
                                monolith: { ...content.about.monolith!, pillars: updated },
                              },
                            });
                          }}
                          placeholder="Pillar description..."
                          className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-neutral-700 text-neutral-300 text-[11px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Numbers */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <div>
                  <h3 className="font-horas text-xl uppercase tracking-wider text-white">
                    Key Metrics &amp; Achievements (Numerical Bar)
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Configure the 4 numerical stats highlighted on the About page.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {content.about.stats.map((st, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col gap-3 min-w-0"
                    >
                      <span className="text-[10px] font-mono text-[#fec52d] uppercase tracking-wider font-semibold">
                        Metric 0{idx + 1}
                      </span>
                      <div className="flex flex-col gap-1 min-w-0">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          Value
                        </label>
                        <input
                          type="text"
                          value={st.value}
                          onChange={(e) => {
                            const updated = [...content.about.stats];
                            updated[idx].value = e.target.value;
                            setContent({
                              ...content,
                              about: { ...content.about, stats: updated },
                            });
                          }}
                          placeholder="e.g. 180+"
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-[#fec52d] font-horas text-xl font-bold min-w-0 focus:border-[#fec52d] outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1 min-w-0">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          Label
                        </label>
                        <input
                          type="text"
                          value={st.label}
                          onChange={(e) => {
                            const updated = [...content.about.stats];
                            updated[idx].label = e.target.value;
                            setContent({
                              ...content,
                              about: { ...content.about, stats: updated },
                            });
                          }}
                          placeholder="e.g. Official Key Visuals"
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold min-w-0 focus:border-[#fec52d] outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1 min-w-0">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          Subtext
                        </label>
                        <input
                          type="text"
                          value={st.sub}
                          onChange={(e) => {
                            const updated = [...content.about.stats];
                            updated[idx].sub = e.target.value;
                            setContent({
                              ...content,
                              about: { ...content.about, stats: updated },
                            });
                          }}
                          placeholder="e.g. Pan-Indian & Global Titles"
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 text-[11px] font-mono min-w-0 focus:border-[#fec52d] outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Milestones & Timeline */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-horas text-xl uppercase tracking-wider text-white">
                      Career Milestones &amp; Timeline
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      Chronological journey entries displayed on the About page
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(content.about.journeyMilestones || [])];
                      updated.push({
                        year: '2026',
                        title: 'New Milestone Achievement',
                        role: 'Key Art Lead',
                        desc: 'Launched landmark film campaign and international publicity artworks...',
                      });
                      setContent({
                        ...content,
                        about: { ...content.about, journeyMilestones: updated },
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fec52d]/10 border border-[#fec52d]/40 text-[#fec52d] text-xs font-mono hover:bg-[#fec52d] hover:text-black transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Milestone</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 border-b border-neutral-800">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Timeline Tag
                    </label>
                    <input
                      type="text"
                      value={content.about.journeyMilestonesHeading?.tag || '// EVOLUTION & TIMELINE'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: {
                            ...content.about,
                            journeyMilestonesHeading: {
                              tag: e.target.value,
                              title: content.about.journeyMilestonesHeading?.title || 'The Creative Journey.',
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Timeline Heading Title
                    </label>
                    <input
                      type="text"
                      value={content.about.journeyMilestonesHeading?.title || 'The Creative Journey.'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: {
                            ...content.about,
                            journeyMilestonesHeading: {
                              tag: content.about.journeyMilestonesHeading?.tag || '// EVOLUTION & TIMELINE',
                              title: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-horas uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {(content.about.journeyMilestones || []).map((ms, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#fec52d]">
                          Milestone 0{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = content.about.journeyMilestones.filter((_, i) => i !== idx);
                            setContent({
                              ...content,
                              about: { ...content.about, journeyMilestones: updated },
                            });
                          }}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete Milestone"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                            Year / Era
                          </label>
                          <input
                            type="text"
                            value={ms.year}
                            onChange={(e) => {
                              const updated = [...content.about.journeyMilestones];
                              updated[idx] = { ...updated[idx], year: e.target.value };
                              setContent({
                                ...content,
                                about: { ...content.about, journeyMilestones: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-700 text-white text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                            Milestone Title
                          </label>
                          <input
                            type="text"
                            value={ms.title}
                            onChange={(e) => {
                              const updated = [...content.about.journeyMilestones];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setContent({
                                ...content,
                                about: { ...content.about, journeyMilestones: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-700 text-white text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                            Studio Role / Organisation
                          </label>
                          <input
                            type="text"
                            value={ms.role}
                            onChange={(e) => {
                              const updated = [...content.about.journeyMilestones];
                              updated[idx] = { ...updated[idx], role: e.target.value };
                              setContent({
                                ...content,
                                about: { ...content.about, journeyMilestones: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-700 text-white text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                          Narrative Description
                        </label>
                        <textarea
                          rows={2}
                          value={ms.desc}
                          onChange={(e) => {
                            const updated = [...content.about.journeyMilestones];
                            updated[idx] = { ...updated[idx], desc: e.target.value };
                            setContent({
                              ...content,
                              about: { ...content.about, journeyMilestones: updated },
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-700 text-neutral-300 text-xs font-ppmori"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT PAGE */}
          {activeTab === 'contact' && (
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#fec52d] mb-1">
                  // CONTACT PAGE COPY &amp; INQUIRY FORM
                </p>
                <h2 className="font-horas text-3xl sm:text-4xl uppercase tracking-tight text-white">
                  Coordinates, Form Titles &amp; Working Hours
                </h2>
              </div>

              {/* Main Headings */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <h3 className="font-horas text-xl uppercase tracking-wider text-white">
                  Header Banner &amp; Tagline
                </h3>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Header Tag
                  </label>
                  <input
                    type="text"
                    value={content.contact.tag}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, tag: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={content.contact.headline}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, headline: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm font-horas uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Subtitle Description
                  </label>
                  <textarea
                    rows={2}
                    value={content.contact.subtitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, subtitle: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm"
                  />
                </div>
              </div>

              {/* Left Column: Coordinates Title & Cards */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <h3 className="font-horas text-xl uppercase tracking-wider text-white">
                  Left Column: Studio Coordinates Cards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Coordinates Section Title
                    </label>
                    <input
                      type="text"
                      value={content.contact.coordinatesTitle || 'Studio Coordinates'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contact: { ...content.contact, coordinatesTitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm"
                      placeholder="Studio Coordinates"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Email Card Title
                    </label>
                    <input
                      type="text"
                      value={content.contact.cards?.emailTitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contact: {
                            ...content.contact,
                            cards: {
                              ...content.contact.cards,
                              emailTitle: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs"
                      placeholder="Email Us"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Email Subtitle / Response Time
                    </label>
                    <input
                      type="text"
                      value={content.contact.cards?.emailSubtitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contact: {
                            ...content.contact,
                            cards: {
                              ...content.contact.cards,
                              emailSubtitle: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs"
                      placeholder="Typically responds within 24 hours"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Phone Card Title
                    </label>
                    <input
                      type="text"
                      value={content.contact.cards?.phoneTitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contact: {
                            ...content.contact,
                            cards: {
                              ...content.contact.cards,
                              phoneTitle: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs"
                      placeholder="Call Us"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Phone Subtitle
                    </label>
                    <input
                      type="text"
                      value={content.contact.cards?.phoneSubtitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contact: {
                            ...content.contact,
                            cards: {
                              ...content.contact.cards,
                              phoneSubtitle: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs"
                      placeholder="Direct studio line"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Location Card Title
                    </label>
                    <input
                      type="text"
                      value={content.contact.cards?.locationTitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contact: {
                            ...content.contact,
                            cards: {
                              ...content.contact.cards,
                              locationTitle: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs"
                      placeholder="Studio Coordinates"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Location Subtitle
                    </label>
                    <input
                      type="text"
                      value={content.contact.cards?.locationSubtitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contact: {
                            ...content.contact,
                            cards: {
                              ...content.contact.cards,
                              locationSubtitle: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs"
                      placeholder="By appointment only"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Studio Working Hours / Schedule
                  </label>
                  <input
                    type="text"
                    value={content.contact.officeHours}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, officeHours: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                    placeholder="Monday – Saturday // 09:30 AM – 07:00 PM IST"
                  />
                </div>
              </div>

              {/* Right Column: Project Enquiry Form Titles */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4">
                <h3 className="font-horas text-xl uppercase tracking-wider text-white">
                  Right Column: Enquiry Form Text
                </h3>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Form Heading
                  </label>
                  <input
                    type="text"
                    value={content.contact.formTitle || 'Initiate Project Enquiry'}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, formTitle: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm"
                    placeholder="Initiate Project Enquiry"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Form Prompt / Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={content.contact.formSubtitle || 'Fill out the brief coordinates below. Submissions land directly with our senior key art team.'}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, formSubtitle: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm"
                    placeholder="Fill out the brief coordinates below. Submissions land directly with our senior key art team."
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Submit Button Text
                  </label>
                  <input
                    type="text"
                    value={content.contact.formButtonText || 'Submit Project Brief'}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, formButtonText: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono"
                    placeholder="Submit Project Brief"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CONTACT LEADS INBOX */}
          {activeTab === 'messages' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#fec52d] mb-1">
                    // CLIENT INQUIRIES &amp; LEADS
                  </p>
                  <h2 className="font-horas text-3xl sm:text-4xl uppercase tracking-tight text-white">
                    Direct Contact Submissions ({messages.length})
                  </h2>
                </div>
                <button
                  onClick={fetchMessages}
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 rounded-3xl bg-neutral-950 border border-neutral-900 text-center flex flex-col items-center gap-3">
                  <Inbox className="w-10 h-10 text-neutral-600" />
                  <p className="font-horas text-xl uppercase tracking-wider text-neutral-400">
                    No Inquiries Received Yet
                  </p>
                  <p className="text-xs font-mono text-neutral-500">
                    Submissions from the /contact page will appear here instantly.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-6 rounded-2xl border transition-colors flex flex-col gap-4 ${
                        msg.status === 'unread'
                          ? 'bg-neutral-950 border-[#fec52d]/40 shadow-[0_0_20px_rgba(254,197,45,0.08)]'
                          : 'bg-neutral-950/60 border-neutral-900 opacity-80'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900 pb-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              msg.status === 'unread' ? 'bg-[#fec52d]' : 'bg-neutral-600'
                            }`}
                          />
                          <h4 className="font-horas text-xl uppercase tracking-wide text-white">
                            {msg.full_name}
                          </h4>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 text-neutral-400">
                            {msg.status}
                          </span>
                        </div>

                        <span className="text-xs font-mono text-neutral-500">
                          {new Date(msg.created_at).toLocaleString('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </span>
                      </div>

                      {/* Contact metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                        <a
                          href={`mailto:${msg.email_address}`}
                          className="hover:text-[#fec52d] flex items-center gap-1.5 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{msg.email_address}</span>
                        </a>
                        {msg.phone_number && (
                          <a
                            href={`tel:${msg.phone_number}`}
                            className="hover:text-[#fec52d] flex items-center gap-1.5 transition-colors"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>{msg.phone_number}</span>
                          </a>
                        )}
                      </div>

                      {/* Message Body */}
                      <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-sm text-neutral-300 leading-relaxed font-ppmori">
                        {msg.message}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => handleToggleMessageStatus(msg.id, msg.status)}
                          className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          Mark as {msg.status === 'unread' ? 'Read' : 'Unread'}
                        </button>

                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="text-xs font-mono uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
