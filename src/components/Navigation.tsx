import React, { useState, useEffect } from 'react';
import { RoutePath, prefetchRoute } from '../router';
import { profileData } from '../data/profile';
import { contactData } from '../data/contact';
import { ResponsiveAvatar } from './ResponsiveAvatar';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Send,
  GraduationCap,
  Users,
  BadgeCheck,
  PenTool,
  UserCircle,
  Wrench,
  Mail,
  Briefcase,
  Linkedin,
  MessageSquare,
  FileText,
  Menu,
  X,
  Check,
} from 'lucide-react';

interface NavigationProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenResume: () => void;
}

const ROLES = [
  'PGDM Business Design',
  'Digital Marketing',
  'Performance Marketing',
  'Business Strategy',
  'Innovation',
];

export const Navigation: React.FC<NavigationProps> = ({
  currentPath,
  onNavigate,
  collapsed,
  onToggleCollapse,
  onOpenResume,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect matching amankumar.ai sidebar header
  useEffect(() => {
    const fullText = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedRole === fullText) {
        setTimeout(() => setIsDeleting(true), 1400);
      } else if (isDeleting && displayedRole === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        setDisplayedRole(
          fullText.substring(0, displayedRole.length + (isDeleting ? -1 : 1))
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  const navLinks: {
    label: string;
    path: RoutePath;
    icon: React.ReactNode;
    matchPrefix?: string;
  }[] = [
    { label: 'Home', path: '/', icon: <Home className="w-4 h-4 shrink-0" /> },
    {
      label: 'Projects',
      path: '/projects',
      icon: <Send className="w-4 h-4 shrink-0 -rotate-12" />,
      matchPrefix: '/projects',
    },
    {
      label: 'Education',
      path: '/education',
      icon: <GraduationCap className="w-4 h-4 shrink-0" />,
    },
    {
      label: 'Internships',
      path: '/internships',
      icon: <Briefcase className="w-4 h-4 shrink-0" />,
    },
    {
      label: 'Leadership Experience',
      path: '/leadership',
      icon: <Users className="w-4 h-4 shrink-0" />,
    },
    {
      label: 'Certifications',
      path: '/certifications',
      icon: <BadgeCheck className="w-4 h-4 shrink-0" />,
    },
    {
      label: 'Tools',
      path: '/tools',
      icon: <Wrench className="w-4 h-4 shrink-0" />,
    },
    {
      label: 'Pensieve',
      path: '/research',
      icon: <PenTool className="w-4 h-4 shrink-0" />,
      matchPrefix: '/research',
    },
    {
      label: 'About',
      path: '/about',
      icon: <UserCircle className="w-4 h-4 shrink-0" />,
    },
    {
      label: 'Contact',
      path: '/contact',
      icon: <Mail className="w-4 h-4 shrink-0" />,
    },
  ];

  const handleNavClick = (path: RoutePath) => {
    onNavigate(path);
    setMobileOpen(false);
  };

  const handleEmailClick = () => {
    if (contactData.email && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(contactData.email).catch(() => {});
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
    setMobileOpen(false);
  };

  const isLinkActive = (item: (typeof navLinks)[0]) => {
    if (item.matchPrefix && currentPath.startsWith(item.matchPrefix)) {
      return true;
    }
    return currentPath === item.path;
  };

  return (
    <>
      {/* Mobile Header Bar (< md) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#f4f4f5]/90 backdrop-blur-md border-b border-zinc-200 px-4 flex items-center justify-between">
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center space-x-2.5 text-left cursor-pointer py-1"
        >
          <ResponsiveAvatar
            size="xs"
            priority={true}
            className="rounded-full ring-1 ring-zinc-300"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-zinc-900 font-display">
              {profileData.name}
            </span>
            <span className="text-[11px] text-zinc-500 truncate max-w-[175px]">
              PGDM Business Design
            </span>
          </div>
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center w-10 h-10 -mr-1.5 text-zinc-700 hover:text-black rounded-lg hover:bg-gray-200/80 active:bg-gray-300/70 transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Left Sidebar (id="sider") */}
      <aside
        id="sider"
        className={`fixed left-0 top-0 z-40 h-screen overflow-y-auto overflow-x-hidden bg-[#f4f4f5] border-r border-zinc-200/80 py-6 md:py-10 space-y-4 px-3.5 transition-all duration-300 ${
          collapsed && !mobileOpen ? 'md:w-[68px]' : 'w-[252px] md:w-[236px]'
        } ${
          mobileOpen
            ? 'translate-x-0 w-[252px] shadow-2xl'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Collapse / Expand Chevron Button */}
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-expanded={!collapsed}
          aria-controls="sider"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="hidden md:flex absolute top-3.5 right-2 rounded-full border border-transparent p-1 text-gray-500 hover:bg-gray-200 hover:text-black transition-colors cursor-pointer"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>

        {/* Profile Lockup */}
        <div
          onClick={() => handleNavClick('/')}
          className={`flex items-center sm:mb-6 px-1.5 cursor-pointer ${
            collapsed && !mobileOpen ? 'justify-center' : 'space-x-3 justify-start'
          }`}
        >
          <ResponsiveAvatar
            size="sm"
            priority={true}
            className="rounded-full ring-1 ring-zinc-300"
          />

          {(!collapsed || mobileOpen) && (
            <div className="text-sm flex flex-col min-w-0">
              <span className="text-black font-medium md:text-base truncate font-display">
                {profileData.shortName}
              </span>
              <span className="text-[11px] text-zinc-600 h-4 flex items-center truncate">
                <span>{displayedRole}</span>
                <span className="ml-0.5 text-zinc-800 animate-cursor-blink">|</span>
              </span>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="space-y-1 py-2">
          {navLinks.map((item) => {
            const active = isLinkActive(item);
            const showLabels = !collapsed || mobileOpen;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                onMouseEnter={() => prefetchRoute(item.path)}
                onTouchStart={() => prefetchRoute(item.path)}
                title={!showLabels ? item.label : undefined}
                className={`w-full flex items-center cursor-pointer rounded-md text-[15px] md:text-sm border py-2.5 md:py-2 px-3 gap-2.5 transition-colors ${
                  !showLabels ? 'justify-center px-0' : 'justify-start'
                } ${
                  active
                    ? 'bg-zinc-900 text-white border-zinc-900 font-medium'
                    : 'border-transparent text-zinc-700 hover:text-black hover:bg-gray-200'
                }`}
              >
                <span>{item.icon}</span>
                {showLabels && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Connect Section */}
        <div className="space-y-2 py-4 border-t border-zinc-200/80">
          {(!collapsed || mobileOpen) && (
            <span className="text-xs font-medium text-zinc-500 mb-2 block px-3">
              Connect
            </span>
          )}
          <div className="space-y-1">
            {contactData.linkedin ? (
              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                title="LinkedIn"
                className={`flex items-center cursor-pointer rounded-md text-[15px] md:text-sm text-zinc-700 py-2 md:py-1.5 hover:text-black hover:underline transition-colors duration-200 ${
                  collapsed && !mobileOpen ? 'justify-center px-0' : 'px-3'
                }`}
              >
                <div className={`flex items-center ${collapsed && !mobileOpen ? '' : 'flex-grow'}`}>
                  <span className={collapsed && !mobileOpen ? '' : 'mr-2.5'}>
                    <Linkedin className="w-4 h-4 shrink-0" />
                  </span>
                  {(!collapsed || mobileOpen) && <span>LinkedIn</span>}
                </div>
              </a>
            ) : (
              <button
                onClick={() => handleNavClick('/contact')}
                title="LinkedIn"
                className={`w-full flex items-center cursor-pointer rounded-md text-[15px] md:text-sm text-zinc-700 py-2 md:py-1.5 hover:text-black hover:underline transition-colors duration-200 text-left ${
                  collapsed && !mobileOpen ? 'justify-center px-0' : 'px-3'
                }`}
              >
                <div className={`flex items-center ${collapsed && !mobileOpen ? '' : 'flex-grow'}`}>
                  <span className={collapsed && !mobileOpen ? '' : 'mr-2.5'}>
                    <Linkedin className="w-4 h-4 shrink-0" />
                  </span>
                  {(!collapsed || mobileOpen) && <span>LinkedIn</span>}
                </div>
              </button>
            )}

            {contactData.email ? (
              <a
                href={`mailto:${contactData.email}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleEmailClick}
                title={`Email ${contactData.email}`}
                className={`flex items-center cursor-pointer rounded-md text-[15px] md:text-sm text-zinc-700 py-2 md:py-1.5 hover:text-black hover:underline transition-colors duration-200 ${
                  collapsed && !mobileOpen ? 'justify-center px-0' : 'px-3'
                }`}
              >
                <div className={`flex items-center ${collapsed && !mobileOpen ? '' : 'flex-grow justify-between'}`}>
                  <div className="flex items-center">
                    <span className={collapsed && !mobileOpen ? '' : 'mr-2.5'}>
                      {emailCopied ? (
                        <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                      ) : (
                        <Mail className="w-4 h-4 shrink-0" />
                      )}
                    </span>
                    {(!collapsed || mobileOpen) && <span>{emailCopied ? 'Copied!' : 'Email'}</span>}
                  </div>
                </div>
              </a>
            ) : (
              <button
                onClick={() => handleNavClick('/contact')}
                title="Email"
                className={`w-full flex items-center cursor-pointer rounded-md text-[15px] md:text-sm text-zinc-700 py-2 md:py-1.5 hover:text-black hover:underline transition-colors duration-200 text-left ${
                  collapsed && !mobileOpen ? 'justify-center px-0' : 'px-3'
                }`}
              >
                <div className={`flex items-center ${collapsed && !mobileOpen ? '' : 'flex-grow'}`}>
                  <span className={collapsed && !mobileOpen ? '' : 'mr-2.5'}>
                    <Mail className="w-4 h-4 shrink-0" />
                  </span>
                  {(!collapsed || mobileOpen) && <span>Email</span>}
                </div>
              </button>
            )}

            <button
              onClick={() => handleNavClick('/contact')}
              onMouseEnter={() => prefetchRoute('/contact')}
              onTouchStart={() => prefetchRoute('/contact')}
              title="Direct Contact"
              className={`w-full flex items-center cursor-pointer rounded-md text-[15px] md:text-sm text-zinc-700 py-2 md:py-1.5 hover:text-black hover:underline transition-colors duration-200 text-left ${
                collapsed && !mobileOpen ? 'justify-center px-0' : 'px-3'
              }`}
            >
              <div className={`flex items-center ${collapsed && !mobileOpen ? '' : 'flex-grow'}`}>
                <span className={collapsed && !mobileOpen ? '' : 'mr-2.5'}>
                  <MessageSquare className="w-4 h-4 shrink-0" />
                </span>
                {(!collapsed || mobileOpen) && <span>Contact</span>}
              </div>
            </button>

            <a
              href="/assets/documents/Akash_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setMobileOpen(false);
              }}
              title="Akash Kumar — Verified Resume (PDF)"
              className={`w-full flex items-center cursor-pointer rounded-md text-[15px] md:text-sm text-zinc-700 py-2 md:py-1.5 hover:text-black hover:underline transition-colors duration-200 text-left ${
                collapsed && !mobileOpen ? 'justify-center px-0' : 'px-3'
              }`}
            >
              <div className={`flex items-center ${collapsed && !mobileOpen ? '' : 'flex-grow'}`}>
                <span className={collapsed && !mobileOpen ? '' : 'mr-2.5'}>
                  <FileText className="w-4 h-4 shrink-0" />
                </span>
                {(!collapsed || mobileOpen) && <span>Resume</span>}
              </div>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
