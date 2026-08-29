import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { DEFAULT_GOOGLE_SCRIPT_URL, COMPANY_INFO } from './data/content';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyTermsModal } from './components/PrivacyTermsModal';
import { AppsScriptGuideModal } from './components/AppsScriptGuideModal';
import { MessageSquare, PhoneCall } from 'lucide-react';

export function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedSkuId, setSelectedSkuId] = useState<string | undefined>(undefined);
  const [privacyModalType, setPrivacyModalType] = useState<'privacy' | 'terms' | null>(null);
  const [isAppsScriptGuideOpen, setIsAppsScriptGuideOpen] = useState(false);
  const [scriptUrl, setScriptUrl] = useState<string>(() => {
    return localStorage.getItem('mistdrop_google_script_url') || DEFAULT_GOOGLE_SCRIPT_URL;
  });

  const handleUpdateScriptUrl = (newUrl: string) => {
    setScriptUrl(newUrl);
    localStorage.setItem('mistdrop_google_script_url', newUrl);
  };

  const handleNavigate = (page: PageId, skuId?: string) => {
    setActivePage(page);
    if (skuId) {
      setSelectedSkuId(skuId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] selection:bg-[#c4d2ff] selection:text-[#001848] font-sans antialiased">
      
      {/* Top Fixed Navigation */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      {/* Main Content Area (padded for fixed header) */}
      <main className="flex-1 pt-20 pb-16 md:pb-8">
        {activePage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {activePage === 'catalog' && (
          <CatalogPage selectedSkuId={selectedSkuId} scriptUrl={scriptUrl} />
        )}

        {activePage === 'contact' && (
          <ContactPage scriptUrl={scriptUrl} />
        )}
      </main>

      {/* Floating WhatsApp Action Pill (Bottom Right) */}
      <div className="fixed bottom-20 md:bottom-8 right-5 z-40">
        <a
          id="floating-whatsapp-btn"
          href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Mist Drop, I would like to inquire about bulk packaged water supply for my enterprise.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white px-4 py-3 rounded-full shadow-[0_6px_20px_rgba(37,211,102,0.35)] transition-all transform hover:scale-105 active:scale-95 group font-bold text-xs"
          title="Chat with Sales on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline">WhatsApp Sales</span>
        </a>
      </div>

      {/* Bottom Sticky Navigation for Mobile Devices */}
      <MobileBottomNav activePage={activePage} onNavigate={handleNavigate} />

      {/* Standard Footer with MSME, Legal, and Free Apps Script Link */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPrivacyTerms={(type) => setPrivacyModalType(type)}
        onOpenAppsScriptGuide={() => setIsAppsScriptGuideOpen(true)}
      />

      {/* Legal Modal (Privacy Policy & Terms) */}
      <PrivacyTermsModal
        type={privacyModalType}
        onClose={() => setPrivacyModalType(null)}
      />

      {/* Google Apps Script Free Web App Deployment Guide Modal */}
      <AppsScriptGuideModal
        isOpen={isAppsScriptGuideOpen}
        onClose={() => setIsAppsScriptGuideOpen(false)}
        scriptUrl={scriptUrl}
        onUpdateScriptUrl={handleUpdateScriptUrl}
      />

    </div>
  );
}

export default App;
