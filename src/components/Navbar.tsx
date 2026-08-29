import React, { useState } from 'react';
import { PageId } from '../types';
import { COMPANY_INFO } from '../data/content';
import { Droplets, Phone, MessageSquare, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId, interestedSku?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="main-header" className="fixed top-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-[#c3c6d6]/40 shadow-[0_2px_15px_rgba(0,27,61,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#dae2ff] flex items-center justify-center text-[#003d9b] group-hover:scale-105 transition-transform shadow-sm">
            <Droplets className="w-6 h-6 fill-[#003d9b] text-[#003d9b]" />
          </div>
          <div>
            <span className="font-bold text-2xl tracking-tight text-[#003d9b] block leading-none">
              Mist Drop
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-[#495f84] uppercase block mt-1">
              By Amrit Enterprises • Patna
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8 text-base font-medium">
          <button
            id="nav-link-home"
            onClick={() => handleNav('home')}
            className={`pb-1.5 transition-all relative ${
              activePage === 'home'
                ? 'text-[#003d9b] font-bold border-b-2 border-[#003d9b]'
                : 'text-[#495f84] hover:text-[#003d9b]'
            }`}
          >
            Home
          </button>
          <button
            id="nav-link-catalog"
            onClick={() => handleNav('catalog')}
            className={`pb-1.5 transition-all relative ${
              activePage === 'catalog'
                ? 'text-[#003d9b] font-bold border-b-2 border-[#003d9b]'
                : 'text-[#495f84] hover:text-[#003d9b]'
            }`}
          >
            Catalog
          </button>
          <button
            id="nav-link-contact"
            onClick={() => handleNav('contact')}
            className={`pb-1.5 transition-all relative ${
              activePage === 'contact'
                ? 'text-[#003d9b] font-bold border-b-2 border-[#003d9b]'
                : 'text-[#495f84] hover:text-[#003d9b]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right CTA / Quick Contacts */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            id="nav-whatsapp-link"
            href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Mist Drop, I would like to enquire about bulk mineral water bottle supply for my business.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#075E54] bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-lg transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <button
            id="nav-enquire-btn"
            onClick={() => handleNav('catalog')}
            className="inline-flex items-center gap-2 bg-[#003d9b] hover:bg-[#002d73] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all active:scale-95"
          >
            <span>Enquire Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Enquire Button + Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            id="mobile-header-enquire-btn"
            onClick={() => handleNav('catalog')}
            className="bg-[#003d9b] text-white px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95"
          >
            Enquire
          </button>
          
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#003d9b] hover:bg-[#eceef0] rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-drawer" className="md:hidden bg-white border-b border-[#c3c6d6]/40 px-4 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 font-medium text-lg">
            <button
              onClick={() => handleNav('home')}
              className={`p-3 text-left rounded-xl transition-colors ${
                activePage === 'home' ? 'bg-[#dae2ff] text-[#003d9b] font-bold' : 'text-[#495f84] hover:bg-[#f2f4f6]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('catalog')}
              className={`p-3 text-left rounded-xl transition-colors ${
                activePage === 'catalog' ? 'bg-[#dae2ff] text-[#003d9b] font-bold' : 'text-[#495f84] hover:bg-[#f2f4f6]'
              }`}
            >
              Product Catalog & Bulk Order
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`p-3 text-left rounded-xl transition-colors ${
                activePage === 'contact' ? 'bg-[#dae2ff] text-[#003d9b] font-bold' : 'text-[#495f84] hover:bg-[#f2f4f6]'
              }`}
            >
              Contact & Patna Facility
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-[#eceef0] flex flex-col gap-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#f2f4f6] text-[#003d9b] rounded-xl font-semibold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Sales: {COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Mist Drop, I would like to enquire about bulk mineral water bottle supply for my business in Patna/Bihar.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-xl font-bold text-sm shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Instant WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
