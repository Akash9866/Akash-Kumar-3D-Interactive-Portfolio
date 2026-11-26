import React, { useState } from 'react';
import { RoutePath } from '../router';
import { contactData } from '../data/contact';
import {
  Linkedin,
  Mail,
  MessageSquare,
  FileText,
  Send,
  CheckCircle2,
  Check,
  ExternalLink,
  Download,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [messageText, setMessageText] = useState('');
  const [formSentSuccess, setFormSentSuccess] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const buildComposedLinks = () => {
    const subject = encodeURIComponent(
      `Inbound Inquiry from ${senderName || 'Contact'} (${
        senderOrg || 'Organization'
      })`
    );
    const body = encodeURIComponent(
      `Hi Akash,\n\nName: ${senderName}\nOrganization: ${senderOrg}\n\nMessage:\n${messageText}\n\nBest regards,\n${senderName}`
    );
    const mailtoUrl = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      contactData.email
    )}&su=${subject}&body=${body}`;
    return { mailtoUrl, gmailUrl };
  };

  const handleCopyEmail = () => {
    if (!contactData.email) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(contactData.email).catch(() => {});
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactData.email) {
      const { mailtoUrl } = buildComposedLinks();
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    }
    setFormSentSuccess(true);
  };

  return (
    <div className="relative mx-auto space-y-6 md:space-y-8">
      {/* Subtle Isometric Architectural Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-25"
        style={{
          maskImage:
            'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 20%, transparent 70%)',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
            backgroundSize: '48px 32px',
            transform: 'skewX(-36deg) skewY(12deg) scale(1.1)',
          }}
        />
      </div>

      <div className="relative z-10 space-y-4 md:space-y-5">
        <h1 className="text-[28px] leading-[1.15] sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">
          Contact
        </h1>
        <h2 className="text-[14.5px] sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
          {contactData.customMessagePrompt}
        </h2>

        {/* Direct Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {/* LinkedIn Card */}
          {contactData.linkedin ? (
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-3 sm:gap-4 p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-md transition-all duration-200 group w-full cursor-pointer"
            >
              <div className="flex-shrink-0 p-2.5 sm:p-2 rounded-lg bg-zinc-900 text-white">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 leading-tight">
                  LinkedIn Profile
                </p>
                <p className="text-xs sm:text-[11px] text-zinc-500 truncate mt-0.5">
                  {contactData.linkedin.replace(/^https?:\/\//, '')}
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-3 py-1.5 sm:py-1 bg-black text-white rounded-full text-xs font-medium group-hover:scale-105 transition-transform">
                  Connect
                </span>
              </div>
            </a>
          ) : (
            <div className="flex flex-row items-center gap-3 sm:gap-4 p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm w-full">
              <div className="flex-shrink-0 p-2.5 sm:p-2 rounded-lg bg-zinc-900 text-white">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 leading-tight">
                  LinkedIn Profile
                </p>
                <p className="text-xs sm:text-[11px] text-zinc-500 truncate mt-0.5">
                  Connect with me for opportunities & collaborations
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="#msg"
                  className="inline-flex items-center px-3 py-1.5 sm:py-1 bg-zinc-900 text-white rounded-full text-xs font-medium hover:bg-zinc-800 transition-colors"
                >
                  Message
                </a>
              </div>
            </div>
          )}

          {/* Direct Email Card */}
          {contactData.email ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm w-full">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0 p-2.5 sm:p-2 rounded-lg bg-zinc-900 text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-tight">
                    Direct Email
                  </p>
                  <p className="text-xs sm:text-[11px] text-zinc-500 font-mono truncate mt-0.5">
                    {emailCopied ? 'Copied to clipboard!' : contactData.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 pl-12 sm:pl-0">
                <a
                  href={`mailto:${contactData.email}`}
                  onClick={handleCopyEmail}
                  title="Send email (also copies to clipboard)"
                  className="inline-flex items-center justify-center min-h-[36px] sm:min-h-0 px-4 py-1.5 sm:py-1 bg-black text-white hover:bg-zinc-800 rounded-full text-xs font-medium transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-3 sm:gap-4 p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm w-full">
              <div className="flex-shrink-0 p-2.5 sm:p-2 rounded-lg bg-zinc-900 text-white">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 leading-tight">
                  Direct Inquiry
                </p>
                <p className="text-xs sm:text-[11px] text-zinc-500 font-mono truncate mt-0.5">
                  Use the inquiry form below to reach me
                </p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <a
                  href="#msg"
                  className="inline-flex items-center px-3 py-1.5 sm:py-1 bg-zinc-900 text-white rounded-full text-xs font-medium hover:bg-zinc-800 transition-colors"
                >
                  Inquire
                </a>
              </div>
            </div>
          )}

          {/* Resume Document Card with View & Download */}
          <div
            className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-md transition-all duration-200 w-full"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0 p-2.5 sm:p-2 rounded-lg bg-zinc-900 text-white">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 leading-tight">
                  Resume (PDF)
                </p>
                <p className="text-xs sm:text-[11px] text-zinc-500 truncate mt-0.5">
                  Verified one-page professional resume
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 pl-11 sm:pl-0">
              <a
                href="/assets/documents/Akash_Kumar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 sm:py-1 bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-100 rounded-full text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View PDF</span>
              </a>
              <a
                href="/assets/documents/Akash_Kumar_Resume.pdf"
                download="Akash_Kumar_Resume.pdf"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 sm:py-1 bg-black text-white hover:bg-zinc-800 rounded-full text-xs font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>

        {/* Direct Message Composer */}
        <div className="pt-2 sm:pt-4">
          <div className="bg-neutral-200/80 border border-zinc-300 rounded-xl p-4 sm:p-7 space-y-4">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-semibold text-zinc-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-zinc-700" />
                <span>Send a direct message</span>
              </h3>
              <p className="text-[13px] sm:text-xs text-zinc-600 leading-relaxed">
                For digital marketing initiatives, business strategy & consulting projects, or professional opportunities.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium text-zinc-700 block"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:px-3 sm:py-2 bg-white border border-zinc-300 rounded-md text-base sm:text-xs text-zinc-900 focus:outline-none focus:border-zinc-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="org"
                    className="text-xs font-medium text-zinc-700 block"
                  >
                    Company / Institution
                  </label>
                  <input
                    id="org"
                    type="text"
                    required
                    placeholder="Company or institution"
                    value={senderOrg}
                    onChange={(e) => setSenderOrg(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:px-3 sm:py-2 bg-white border border-zinc-300 rounded-md text-base sm:text-xs text-zinc-900 focus:outline-none focus:border-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="msg"
                  className="text-xs font-medium text-zinc-700 block"
                >
                  Message
                </label>
                <textarea
                  id="msg"
                  required
                  rows={4}
                  placeholder="Share role details, project context, or collaboration inquiry..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:px-3 sm:py-2 bg-white border border-zinc-300 rounded-md text-base sm:text-xs text-zinc-900 focus:outline-none focus:border-zinc-700 leading-relaxed resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 min-h-[42px] sm:min-h-0 sm:py-2 text-sm sm:text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>

              {formSentSuccess && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-900 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Your message draft is ready. Choose your preferred email client below if it did not open automatically:
                    </span>
                  </div>
                  {contactData.email && (
                    <div className="flex flex-wrap items-center gap-2 pl-6">
                      <a
                        href={buildComposedLinks().gmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 bg-zinc-900 text-white rounded-md text-xs font-medium hover:bg-zinc-800 transition-colors"
                      >
                        <span>Open in Gmail</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href={buildComposedLinks().mailtoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 bg-white border border-zinc-300 text-zinc-800 rounded-md text-xs font-medium hover:bg-zinc-100 transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Open Mail App</span>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
