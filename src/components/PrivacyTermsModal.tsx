import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface PrivacyTermsModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PrivacyTermsModal: React.FC<PrivacyTermsModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#c3c6d6]/40 p-6 md:p-8">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#eceef0]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#dae2ff] text-[#003d9b]">
              {type === 'privacy' ? <ShieldCheck className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#191c1e]">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
              <p className="text-xs text-[#495f84]">{COMPANY_INFO.parentCompany} • {COMPANY_INFO.brandName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#737685] hover:text-[#191c1e] hover:bg-[#eceef0] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4 text-xs text-[#434654] leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>Last Updated: 2024.</strong> {COMPANY_INFO.parentCompany} ("Mist Drop") values the privacy of our business clients, corporate procurement partners, and retail distributors in Patna and across India.
              </p>
              <h4 className="font-bold text-sm text-[#191c1e] mt-3">1. Information We Collect</h4>
              <p>
                We collect contact information voluntarily provided through our bulk enquiry forms, including your full name, business name, phone number, corporate email address, city, and volume requirements.
              </p>
              <h4 className="font-bold text-sm text-[#191c1e] mt-3">2. How We Use Information</h4>
              <p>
                All data collected is used solely to generate B2B quotations, verify enterprise procurement requirements, schedule delivery routes, and provide ongoing customer service. We do not sell or rent your business data to any third party.
              </p>
              <h4 className="font-bold text-sm text-[#191c1e] mt-3">3. Data Security & Storage</h4>
              <p>
                Inquiries submitted are transmitted securely and appended to internal encrypted company procurement sheets.
              </p>
              <h4 className="font-bold text-sm text-[#191c1e] mt-3">4. Contact Us</h4>
              <p>
                For privacy inquiries or data removal, please contact our Patna office at <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#003d9b] underline">{COMPANY_INFO.email}</a>.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Terms of B2B Supply & Procurement.</strong> By placing orders with {COMPANY_INFO.parentCompany} ({COMPANY_INFO.brandName}), you agree to the following terms:
              </p>
              <h4 className="font-bold text-sm text-[#191c1e] mt-3">1. Supply & Quality Standards</h4>
              <p>
                Mist Drop packaged drinking water complies with all relevant FSSAI and MSME manufacturing purity benchmarks, utilizing multi-stage reverse osmosis, micron filtration, and UV sterilization.
              </p>
              <h4 className="font-bold text-sm text-[#191c1e] mt-3">2. Order Minimums & Delivery</h4>
              <p>
                Minimum order quantities (MOQ) apply per SKU category (e.g. 20-40 cases for packaged bottles). Standard delivery within Patna municipal and industrial limits is fulfilled within 24 to 48 hours following order confirmation.
              </p>
              <h4 className="font-bold text-sm text-[#191c1e] mt-3">3. Custom Branding & Private Labeling</h4>
              <p>
                Custom labeled orders require vector artwork approval and a 50% advance deposit prior to cylinder plate printing and bottling runs.
              </p>
              <h4 className="font-bold text-sm text-[#191c1e] mt-3">4. Payments & Billing</h4>
              <p>
                All corporate shipments are accompanied by official GST tax invoices. Credit terms are available exclusively for pre-verified recurring enterprise accounts upon management approval.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-[#eceef0] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#003d9b] text-white rounded-lg text-xs font-semibold hover:bg-[#002d73] transition-colors"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
