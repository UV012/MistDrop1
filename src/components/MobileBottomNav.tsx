import React from 'react';
import { PageId } from '../types';
import { Home, Package, PhoneCall } from 'lucide-react';

interface MobileBottomNavProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activePage, onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="mobile-bottom-bar"
      className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-[#c3c6d6]/40 shadow-[0_-4px_20px_rgba(0,27,61,0.06)] z-50 pb-[env(safe-area-inset-bottom,8px)]"
    >
      <div className="flex justify-around items-center h-16 px-4">
        
        {/* Home */}
        <button
          id="mobile-tab-home"
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center w-20 py-1 transition-all ${
            activePage === 'home'
              ? 'text-[#003d9b] font-bold scale-105'
              : 'text-[#495f84] hover:text-[#003d9b]'
          }`}
        >
          <div className={`p-1.5 rounded-full ${activePage === 'home' ? 'bg-[#dae2ff]' : 'bg-transparent'}`}>
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[11px] uppercase tracking-wider mt-0.5 font-semibold">Home</span>
        </button>

        {/* Catalog */}
        <button
          id="mobile-tab-catalog"
          onClick={() => handleNav('catalog')}
          className={`flex flex-col items-center justify-center w-20 py-1 transition-all ${
            activePage === 'catalog'
              ? 'text-[#003d9b] font-bold scale-105'
              : 'text-[#495f84] hover:text-[#003d9b]'
          }`}
        >
          <div className={`p-1.5 rounded-full ${activePage === 'catalog' ? 'bg-[#dae2ff]' : 'bg-transparent'}`}>
            <Package className="w-5 h-5" />
          </div>
          <span className="text-[11px] uppercase tracking-wider mt-0.5 font-semibold">Catalog</span>
        </button>

        {/* Contact */}
        <button
          id="mobile-tab-contact"
          onClick={() => handleNav('contact')}
          className={`flex flex-col items-center justify-center w-20 py-1 transition-all ${
            activePage === 'contact'
              ? 'text-[#003d9b] font-bold scale-105'
              : 'text-[#495f84] hover:text-[#003d9b]'
          }`}
        >
          <div className={`p-1.5 rounded-full ${activePage === 'contact' ? 'bg-[#dae2ff]' : 'bg-transparent'}`}>
            <PhoneCall className="w-5 h-5" />
          </div>
          <span className="text-[11px] uppercase tracking-wider mt-0.5 font-semibold">Contact</span>
        </button>

      </div>
    </nav>
  );
};
