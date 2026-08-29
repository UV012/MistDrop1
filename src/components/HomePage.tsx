import React from 'react';
import { PageId } from '../types';
import {
  HERO_IMAGE,
  BOTTLE_ISOLATED,
  COMPANY_INFO,
  FOUNDERS,
  EXECUTIVES,
  WHY_CHOOSE_US,
  CLIENT_SECTORS,
  PRODUCTS,
} from '../data/content';
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  Truck,
  Timer,
  Award,
  Building2,
  CheckCircle2,
  Check,
  MessageSquare,
  Phone,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, interestedSku?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div id="home-page" className="w-full space-y-16 md:space-y-24">
      
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Hero Left Content */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dae2ff] text-[#001848] text-xs font-bold uppercase tracking-wider shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#003d9b]" />
              <span>MSME Registered & Certified Purity</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#003d9b] leading-[1.12]">
              Pure, Hygienic, <br className="hidden sm:inline" />
              <span className="text-[#191c1e]">Premium Bottled Water</span>
            </h1>

            <p className="text-lg text-[#434654] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Setting the standard for B2B procurement in Patna and Eastern India with uncompromising hygiene, scalable supply, and premium custom corporate branding capabilities.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-view-catalog-btn"
                onClick={() => onNavigate('catalog')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#003d9b] hover:bg-[#002d73] text-white px-8 py-4 rounded-xl text-base font-semibold shadow-[0_10px_25px_rgba(0,61,155,0.25)] transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>View Catalog</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-enquiry-btn"
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f2f4f6] text-[#003d9b] border-2 border-[#c3c6d6] hover:border-[#003d9b] px-7 py-3.5 rounded-xl text-base font-semibold shadow-sm transition-all"
              >
                <span>Direct Inquiry</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#c3c6d6]/40 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="block text-2xl font-bold text-[#003d9b]">100%</span>
                <span className="text-xs text-[#495f84] font-medium">Sterile Filling</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-[#003d9b]">7.2 pH</span>
                <span className="text-xs text-[#495f84] font-medium">Clinically Balanced</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-[#003d9b]">24-48h</span>
                <span className="text-xs text-[#495f84] font-medium">Patna Fleet Dispatch</span>
              </div>
            </div>

          </div>

          {/* Hero Right Photography */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,27,61,0.12)] border border-[#c3c6d6]/40 bg-white group">
              <img
                src={HERO_IMAGE}
                alt="Mist Drop premium packaged water bottles in laboratory pure studio setting"
                className="w-full h-[380px] sm:h-[480px] lg:h-[540px] object-cover object-center transform group-hover:scale-102 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001848]/60 via-transparent to-transparent opacity-60"></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/60 shadow-md flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#003d9b] block">Quality Assurance</span>
                  <span className="text-sm font-semibold text-[#191c1e]">Multi-Stage RO + UV + Micron Filtration</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#dae2ff] flex items-center justify-center text-[#003d9b] shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ABOUT STRIP */}
      <section id="about-strip" className="w-full bg-[#f2f4f6] py-12 border-y border-[#c3c6d6]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#003d9b]">The Standard In Purity</span>
          <p className="text-xl sm:text-2xl font-semibold text-[#191c1e] leading-snug">
            Mist Drop specializes in premium customized water filling and branding solutions. We empower enterprise clients with reliable, high-volume supply chains built on hygiene and excellence.
          </p>
        </div>
      </section>

      {/* 3. WHY CHOOSE MIST DROP (6-ITEM BENTO GRID) */}
      <section id="why-choose-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#003d9b] bg-[#dae2ff] px-3 py-1 rounded-full">
            Enterprise Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003d9b] mt-3">
            Why Choose Mist Drop
          </h2>
          <p className="text-base text-[#434654] mt-2">
            Enterprise-grade infrastructure, strict sterilization protocols, and dedicated logistics for bulk procurement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, index) => {
            const getIcon = (type: string) => {
              switch (type) {
                case 'branding': return <Sparkles className="w-6 h-6 text-[#003d9b]" />;
                case 'sanitizer': return <CheckCircle2 className="w-6 h-6 text-[#003d9b]" />;
                case 'truck': return <Truck className="w-6 h-6 text-[#003d9b]" />;
                case 'timer': return <Timer className="w-6 h-6 text-[#003d9b]" />;
                case 'layers': return <Layers className="w-6 h-6 text-[#003d9b]" />;
                default: return <Award className="w-6 h-6 text-[#003d9b]" />;
              }
            };

            return (
              <div
                key={item.id}
                id={`feature-card-${index}`}
                className="bg-white p-7 rounded-2xl border border-[#c3c6d6]/40 shadow-[0_10px_30px_rgba(0,27,61,0.03)] hover:shadow-[0_15px_35px_rgba(0,27,61,0.08)] hover:border-[#003d9b]/40 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#dae2ff] rounded-xl flex items-center justify-center mb-5">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-[#191c1e] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#434654] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#eceef0] flex items-center gap-1.5 text-xs font-semibold text-[#003d9b]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WHO WE SERVE */}
      <section id="who-we-serve" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#003d9b] bg-[#dae2ff] px-3 py-1 rounded-full">
            Client Sectors
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003d9b] mt-3">
            Who We Serve
          </h2>
          <p className="text-base text-[#434654] mt-2">
            Tailored delivery schedules and specialized packaging formats for diverse commercial sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CLIENT_SECTORS.map((sector, idx) => (
            <div
              key={sector.id}
              id={`sector-card-${idx}`}
              className="bg-white rounded-2xl overflow-hidden border border-[#c3c6d6]/40 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="h-48 relative overflow-hidden bg-[#f2f4f6]">
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold text-[#003d9b] border border-white/80 shadow-xs">
                  {sector.tag}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#191c1e] mb-2">{sector.title}</h3>
                  <p className="text-sm text-[#434654] leading-relaxed">{sector.description}</p>
                </div>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#003d9b] hover:text-[#002d73] hover:underline"
                >
                  <span>Explore Suitable SKUs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LEADERSHIP SECTION */}
      <section id="leadership-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#003d9b] bg-[#dae2ff] px-3 py-1 rounded-full">
            Governance & Vision
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003d9b] mt-3">
            Leadership
          </h2>
          <p className="text-base text-[#434654] mt-2">
            Guiding our commitment to quality, scale, and uncompromising hygiene.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {FOUNDERS.map((founder, i) => (
            <div
              key={founder.name}
              id={`founder-card-${i}`}
              className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_15px_30px_rgba(0,27,61,0.04)] border border-[#c3c6d6]/40 hover:-translate-y-1 transition-transform"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-5 border-4 border-[#eceef0] shadow-inner">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#191c1e] mb-1">{founder.name}</h3>
              <p className="text-sm font-semibold text-[#003d9b] mb-4">{founder.role}</p>
              <p className="text-sm text-[#434654] italic max-w-xs leading-relaxed">
                "{founder.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* Executive Management Badges */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {EXECUTIVES.map((exec) => (
            <div
              key={exec.name}
              className="bg-white p-4 rounded-xl border border-[#c3c6d6]/40 flex items-center gap-4 shadow-xs"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[#c3c6d6]">
                <img src={exec.image} alt={exec.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <h4 className="font-bold text-[#191c1e] text-base">{exec.name}</h4>
                <p className="text-xs text-[#003d9b] font-medium">{exec.role}</p>
                <p className="text-[11px] text-[#495f84]">Amrit Enterprises Management</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. READY TO PARTNER CTA BANNER */}
      <section id="partner-banner" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="bg-[#003d9b] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between text-white shadow-xl relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0052cc] rounded-full opacity-40 blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

          <div className="z-10 text-center md:text-left mb-6 md:mb-0 max-w-md">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-3">
              Corporate Onboarding
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Ready to Partner?
            </h2>
            <p className="text-base text-[#dae2ff] leading-relaxed">
              Explore our bulk procurement options today and receive a tailored institutional quote within 24 hours.
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              id="cta-view-catalog-btn"
              onClick={() => onNavigate('catalog')}
              className="w-full sm:w-auto bg-white text-[#003d9b] px-7 py-3.5 rounded-xl font-bold text-sm shadow-sm hover:bg-[#dae2ff] transition-colors"
            >
              View Catalog
            </button>
            
            <button
              id="cta-enquire-btn"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto border-2 border-white text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Contact Patna Team
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
