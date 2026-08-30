import React from 'react';
import { PageId } from '../types';
import { COMPANY_INFO } from '../data/content';
import { Droplets, Phone, Mail, MapPin, MessageSquare, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenPrivacyTerms: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacyTerms,
}) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="w-full bg-[#eceef0] text-[#191c1e] border-t border-[#c3c6d6]/40 pt-16 pb-28 md:pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1 & 2: Brand Identity & Verification */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#dae2ff] flex items-center justify-center text-[#003d9b]">
                <Droplets className="w-5 h-5 fill-[#003d9b] text-[#003d9b]" />
              </div>
              <div>
                <span className="font-bold text-2xl tracking-tight text-[#003d9b] block leading-none">Mist Drop</span>
                <span className="text-[11px] font-semibold text-[#495f84] tracking-wider uppercase block mt-0.5">Pure Water, Pure Trust</span>
              </div>
            </div>
            
            <p className="text-sm text-[#434654] max-w-sm leading-relaxed">
              Packaged Drinking Water engineered for B2B enterprise procurement, corporate offices, institutions, and custom branded hospitality in Patna and Bihar.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#c3c6d6]/60 shadow-sm text-xs font-semibold text-[#003d9b]">
              <ShieldCheck className="w-4 h-4 text-[#003d9b]" />
              <span>{COMPANY_INFO.regStatus}</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-bold text-sm text-[#191c1e] uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#434654]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#003d9b] hover:underline underline-offset-4 transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('catalog')}
                  className="hover:text-[#003d9b] hover:underline underline-offset-4 transition-colors"
                >
                  Product Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#003d9b] hover:underline underline-offset-4 transition-colors"
                >
                  Contact & Facility Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('catalog')}
                  className="hover:text-[#003d9b] hover:underline underline-offset-4 transition-colors font-medium text-[#003d9b]"
                >
                  Bulk Enquiry Form
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Contact */}
          <div>
            <h4 className="font-bold text-sm text-[#191c1e] uppercase tracking-wider mb-4">
              Procurement Desk
            </h4>
            <ul className="space-y-2.5 text-xs text-[#434654]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#003d9b] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.headquarters}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#003d9b] shrink-0" />
                <div>
                  <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-[#003d9b] hover:underline block">
                    Amit Kumar: {COMPANY_INFO.phone}
                  </a>
                  <a href={`tel:${COMPANY_INFO.secondaryPhoneRaw}`} className="hover:text-[#003d9b] hover:underline block">
                    Ritesh Jha: {COMPANY_INFO.secondaryPhone}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#003d9b] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#003d9b] hover:underline truncate">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2 pt-1">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Mist Drop, I need bulk water supply pricing.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#075E54] font-semibold hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp: {COMPANY_INFO.phone}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & System Setup */}
          <div>
            <h4 className="font-bold text-sm text-[#191c1e] uppercase tracking-wider mb-4">
              Legal & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-[#434654]">
              <li>
                <button
                  onClick={() => onOpenPrivacyTerms('privacy')}
                  className="hover:text-[#003d9b] hover:underline underline-offset-4 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPrivacyTerms('terms')}
                  className="hover:text-[#003d9b] hover:underline underline-offset-4 transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#c3c6d6]/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#495f84]">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.parentCompany}. {COMPANY_INFO.regStatus}.</p>
          <div className="flex items-center gap-6">
            <span>Patna, Bihar • Fast 24-48h Enterprise Dispatch</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Clean Room Packaging</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
