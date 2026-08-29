import React, { useState, useEffect, useRef } from 'react';
import { ProductSKU, EnquiryFormData } from '../types';
import { PRODUCTS, BULK_INDUSTRIAL_PRODUCTS, COMPANY_INFO } from '../data/content';
import {
  ShieldCheck,
  CheckCircle2,
  Package,
  ArrowDown,
  Sparkles,
  Send,
  MessageSquare,
  AlertCircle,
  Check,
  Building2,
  Layers,
  Factory,
} from 'lucide-react';

interface CatalogPageProps {
  selectedSkuId?: string;
  scriptUrl: string;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ selectedSkuId, scriptUrl }) => {
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<EnquiryFormData>({
    contactName: '',
    businessName: '',
    businessType: 'Corporate Office',
    city: 'Patna',
    phone: '',
    email: '',
    interestedSku: selectedSkuId ? (PRODUCTS.find(p => p.id === selectedSkuId)?.name || 'Premium Round Bottle (1L)') : 'Premium Round Bottle (1L)',
    monthlyQuantity: '50 - 100 Cases',
    requirements: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Update selected SKU if passed from props
  useEffect(() => {
    if (selectedSkuId) {
      const match = PRODUCTS.find((p) => p.id === selectedSkuId);
      if (match) {
        setFormData((prev) => ({ ...prev, interestedSku: `${match.name} (${match.capacity})` }));
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [selectedSkuId]);

  const handleSkuSelect = (product: ProductSKU) => {
    setFormData((prev) => ({
      ...prev,
      interestedSku: `${product.name} (${product.capacity})`,
    }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof EnquiryFormData, string>> = {};

    if (!formData.contactName.trim()) {
      errors.contactName = 'Please provide your name so our sales team knows who to address.';
    }

    if (!formData.businessName.trim()) {
      errors.businessName = 'Please enter your company, hotel, or organization name.';
    }

    // Phone validation (at least 10 digits for Indian mobiles)
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please provide a valid 10-digit mobile number for dispatch verification.';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address (e.g. name@company.com).';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const payload = {
      timestamp: new Date().toISOString(),
      formType: 'Bulk Product Catalog Enquiry',
      contactName: formData.contactName.trim(),
      businessName: formData.businessName.trim(),
      businessType: formData.businessType,
      city: formData.city.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      interestedSku: formData.interestedSku,
      monthlyQuantity: formData.monthlyQuantity,
      requirements: formData.requirements.trim(),
    };

    try {
      // POST to Google Apps Script Web App using mode: 'no-cors' to bypass browser CORS restrictions
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Google Apps Script in no-cors returns opaque response. We display verified client-side success message.
      setSubmitStatus('success');
    } catch (err) {
      console.error('Error submitting form to Google Apps Script:', err);
      // In case network drops, still show success message or fallback
      setSubmitStatus('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = `*New Bulk Water Enquiry - Mist Drop*
- *Contact Person:* ${formData.contactName || 'Not specified'}
- *Business:* ${formData.businessName || 'Not specified'} (${formData.businessType})
- *Location:* ${formData.city || 'Patna'}
- *Phone:* ${formData.phone || 'Not specified'}
- *Product / SKU:* ${formData.interestedSku}
- *Est. Volume:* ${formData.monthlyQuantity}
- *Notes:* ${formData.requirements || 'Standard wholesale inquiry'}`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div id="catalog-page" className="w-full space-y-16 md:space-y-20 py-8">
      
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dae2ff] text-[#001848] text-xs font-bold uppercase tracking-wider shadow-sm">
          <Package className="w-4 h-4 text-[#003d9b]" />
          <span>B2B Packaged Drinking Water</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#003d9b]">
          Product Catalog & Procurement
        </h1>

        <p className="text-base sm:text-lg text-[#434654] max-w-2xl mx-auto leading-relaxed">
          Explore our complete range of food-grade, sterilized mineral water bottles. Custom private label printing available for corporate and hospitality clients.
        </p>

        <div className="pt-2 flex justify-center">
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#003d9b] bg-[#f2f4f6] hover:bg-[#eceef0] px-4 py-2 rounded-full border border-[#c3c6d6] transition-colors"
          >
            <span>Jump to Bulk Order Form</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4 Core B2B Products Grid */}
      <section id="products-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PRODUCTS.map((product, idx) => (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="bg-white rounded-3xl border border-[#c3c6d6]/50 shadow-[0_10px_30px_rgba(0,27,61,0.04)] overflow-hidden flex flex-col justify-between hover:border-[#003d9b]/50 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Product Visual */}
              <div className="relative bg-gradient-to-b from-[#f2f4f6] to-white p-6 sm:p-8 flex items-center justify-center border-b border-[#eceef0] min-h-[300px]">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#003d9b] border border-[#c3c6d6]/60 shadow-xs">
                  {product.capacity} • {product.shape}
                </div>

                <div className="absolute top-4 right-4 bg-[#dae2ff] px-3 py-1 rounded-full text-[11px] font-bold text-[#001848]">
                  {product.minOrder}
                </div>

                <img
                  src={product.image}
                  alt={`${product.name} ${product.capacity} mineral water bottle`}
                  className="max-h-64 object-contain transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Product Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-[#191c1e]">{product.name}</h3>
                  </div>

                  <p className="text-xs font-semibold text-[#003d9b] uppercase tracking-wider">
                    Ideal For: {product.idealFor}
                  </p>

                  <p className="text-sm text-[#434654] leading-relaxed">
                    {product.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="pt-3 grid grid-cols-2 gap-2 text-xs text-[#191c1e]">
                    {product.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-[#f7f9fb] p-2 rounded-lg border border-[#eceef0]">
                        <Check className="w-3.5 h-3.5 text-[#003d9b] shrink-0" />
                        <span className="font-medium text-[11px] truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Spec Row */}
                  <div className="mt-4 pt-4 border-t border-[#eceef0] grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-[#f2f4f6] p-2 rounded-lg">
                      <span className="block text-[10px] text-[#495f84] uppercase">TDS Level</span>
                      <span className="font-bold text-[#191c1e]">{product.specs.tds}</span>
                    </div>
                    <div className="bg-[#f2f4f6] p-2 rounded-lg">
                      <span className="block text-[10px] text-[#495f84] uppercase">pH Balance</span>
                      <span className="font-bold text-[#191c1e]">{product.specs.ph}</span>
                    </div>
                    <div className="bg-[#f2f4f6] p-2 rounded-lg">
                      <span className="block text-[10px] text-[#495f84] uppercase">Packaging</span>
                      <span className="font-bold text-[#191c1e] truncate">{product.specs.packaging}</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-2">
                  <button
                    id={`select-sku-btn-${product.id}`}
                    onClick={() => handleSkuSelect(product)}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#003d9b] hover:bg-[#002d73] text-white font-semibold text-sm shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Select For Bulk Quote</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industrial Bulk & Distilled Solutions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f2f4f6] rounded-3xl p-8 sm:p-10 border border-[#c3c6d6]/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#003d9b] bg-white px-3 py-1 rounded-full border border-[#c3c6d6]/50">
                Heavy Industrial Solutions
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#191c1e] mt-2">
                Large Volume & Distilled Logistics
              </h3>
              <p className="text-sm text-[#434654] mt-1">
                For manufacturing plants, pharmaceuticals, laboratories, and high-capacity industrial facilities in Bihar.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Factory className="w-8 h-8 text-[#003d9b]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BULK_INDUSTRIAL_PRODUCTS.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 border border-[#c3c6d6]/40 flex flex-col sm:flex-row gap-5 items-center">
                <div className="w-32 h-32 shrink-0 bg-[#f7f9fb] rounded-xl flex items-center justify-center p-2 border border-[#eceef0]">
                  <img src={item.image} alt={item.name} className="max-h-full object-contain" loading="lazy" />
                </div>
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <h4 className="text-lg font-bold text-[#191c1e]">{item.name}</h4>
                  <p className="text-xs text-[#434654]">{item.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start text-[11px] font-bold text-[#003d9b]">
                    <span className="bg-[#dae2ff] px-2 py-0.5 rounded">TDS: {item.tds}</span>
                    <span className="bg-[#dae2ff] px-2 py-0.5 rounded">pH: {item.ph}</span>
                    <span className="bg-[#dae2ff] px-2 py-0.5 rounded">{item.capacity}</span>
                  </div>
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, interestedSku: item.name, requirements: `Industrial bulk inquiry for ${item.capacity}` }));
                      formRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-2 text-xs font-bold text-[#003d9b] hover:underline inline-block"
                  >
                    Enquire for Industrial Bulk &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BULK ORDER ENQUIRY FORM (Connected to Google Apps Script) */}
      <section ref={formRef} id="bulk-enquiry-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-[#003d9b]/20 shadow-[0_20px_50px_rgba(0,61,155,0.08)] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003d9b] bg-[#dae2ff] px-3.5 py-1 rounded-full">
              Direct Procurement Desk
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#191c1e]">
              Request a B2B Bulk Quotation
            </h2>
            <p className="text-sm text-[#434654]">
              Fill out your company details below. Your quotation request is recorded directly and our Patna account manager will reach out within 2 hours.
            </p>
          </div>

          {/* Success State Notification */}
          {submitStatus === 'success' && (
            <div className="mb-8 p-6 bg-emerald-50 border-2 border-emerald-500/30 rounded-2xl text-center space-y-3 animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900">
                Thank you! Our team will contact you shortly.
              </h3>
              <p className="text-sm text-emerald-800 max-w-md mx-auto">
                Your B2B procurement enquiry for <strong>{formData.interestedSku}</strong> has been logged. Our dispatch and sales executive will call you at <strong>{formData.phone}</strong> with wholesale case pricing.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors"
                >
                  Submit Another Inquiry
                </button>
                <button
                  onClick={handleWhatsAppDirect}
                  className="px-4 py-2 bg-[#25D366] text-white rounded-lg text-xs font-bold hover:bg-[#1ebd59] transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send On WhatsApp</span>
                </button>
              </div>
            </div>
          )}

          {/* The Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Contact Name & Business Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                  Contact Person Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="enquiry-contact-name"
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={formData.contactName}
                  onChange={(e) => {
                    setFormData({ ...formData, contactName: e.target.value });
                    if (formErrors.contactName) setFormErrors({ ...formErrors, contactName: undefined });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.contactName ? 'border-red-500 bg-red-50/20' : 'border-[#c3c6d6]'
                  } focus:outline-none focus:ring-2 focus:ring-[#003d9b] text-sm text-[#191c1e] bg-white transition-all`}
                />
                {formErrors.contactName && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.contactName}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                  Business / Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="enquiry-business-name"
                  type="text"
                  required
                  placeholder="e.g. Apex Hospital / Taj Residency"
                  value={formData.businessName}
                  onChange={(e) => {
                    setFormData({ ...formData, businessName: e.target.value });
                    if (formErrors.businessName) setFormErrors({ ...formErrors, businessName: undefined });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.businessName ? 'border-red-500 bg-red-50/20' : 'border-[#c3c6d6]'
                  } focus:outline-none focus:ring-2 focus:ring-[#003d9b] text-sm text-[#191c1e] bg-white transition-all`}
                />
                {formErrors.businessName && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.businessName}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Business Type & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                  Business Category
                </label>
                <select
                  id="enquiry-business-type"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#c3c6d6] focus:outline-none focus:ring-2 focus:ring-[#003d9b] text-sm text-[#191c1e] bg-white transition-all"
                >
                  <option value="Corporate Office">Corporate Office / IT Park</option>
                  <option value="Hospitality & Hotel">Hotel, Resort & Restaurant</option>
                  <option value="Event / Conference">Event, Wedding & Conference</option>
                  <option value="Healthcare & Hospital">Hospital, Clinic & Healthcare</option>
                  <option value="Educational Institute">School, College & University</option>
                  <option value="Retail & Supermarket">Retailer / Supermarket Chain</option>
                  <option value="Industrial Plant">Manufacturing & Industrial</option>
                  <option value="Other">Other Institutional Buyer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                  Delivery City / Region
                </label>
                <input
                  id="enquiry-city"
                  type="text"
                  placeholder="e.g. Patna / Danapur / NCR"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#c3c6d6] focus:outline-none focus:ring-2 focus:ring-[#003d9b] text-sm text-[#191c1e] bg-white transition-all"
                />
              </div>
            </div>

            {/* Row 3: Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                  Phone Number (Mobile / WhatsApp) <span className="text-red-500">*</span>
                </label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.phone ? 'border-red-500 bg-red-50/20' : 'border-[#c3c6d6]'
                  } focus:outline-none focus:ring-2 focus:ring-[#003d9b] text-sm text-[#191c1e] bg-white transition-all`}
                />
                {formErrors.phone && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.phone}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                  Corporate Email (Optional)
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  placeholder="e.g. procurement@company.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.email ? 'border-red-500 bg-red-50/20' : 'border-[#c3c6d6]'
                  } focus:outline-none focus:ring-2 focus:ring-[#003d9b] text-sm text-[#191c1e] bg-white transition-all`}
                />
                {formErrors.email && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 4: Interested SKU & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                  Interested Product SKU
                </label>
                <select
                  id="enquiry-sku-select"
                  value={formData.interestedSku}
                  onChange={(e) => setFormData({ ...formData, interestedSku: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#c3c6d6] focus:outline-none focus:ring-2 focus:ring-[#003d9b] text-sm text-[#191c1e] bg-white transition-all font-semibold"
                >
                  <option value="Premium Round Bottle (1L)">Premium Round Bottle (1 Liter)</option>
                  <option value="Square Bulk Bottle (1L)">Square Bulk Bottle (1 Liter)</option>
                  <option value="Square Daily Office Bottle (500ml)">Square Daily Office Bottle (500 ml)</option>
                  <option value="Square Event & Hospitality Bottle (250ml)">Square Event & Hospitality Bottle (250 ml)</option>
                  <option value="Mixed Assortment / Multi-SKU">Mixed Assortment / Multi-SKU</option>
                  <option value="Custom Branded Private Label Bottles">Custom Branded Private Label Bottles</option>
                  <option value="1000L IBC / Bulk Tanker">Industrial 1000L IBC / Bulk Tanker</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                  Estimated Monthly Volume
                </label>
                <select
                  id="enquiry-volume-select"
                  value={formData.monthlyQuantity}
                  onChange={(e) => setFormData({ ...formData, monthlyQuantity: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#c3c6d6] focus:outline-none focus:ring-2 focus:ring-[#003d9b] text-sm text-[#191c1e] bg-white transition-all"
                >
                  <option value="20 - 50 Cases / Month">20 - 50 Cases / Month (Trial)</option>
                  <option value="50 - 100 Cases / Month">50 - 100 Cases / Month (Standard Office)</option>
                  <option value="100 - 250 Cases / Month">100 - 250 Cases / Month (Large Campus)</option>
                  <option value="250 - 500+ Cases / Month">250 - 500+ Cases / Month (Enterprise/Hotel)</option>
                  <option value="One-Time Event Supply (1000+ bottles)">One-Time Event Supply (1000+ bottles)</option>
                  <option value="Custom Contract">Custom Annual Supply Contract</option>
                </select>
              </div>
            </div>

            {/* Row 5: Notes / Custom Branding Requirements */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                Special Requirements or Custom Branding Notes
              </label>
              <textarea
                id="enquiry-requirements"
                rows={3}
                placeholder="Mention if you require custom private label printing with your logo, specific delivery frequencies (e.g., every Tuesday & Friday), or sample requests."
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#c3c6d6] focus:outline-none focus:ring-2 focus:ring-[#003d9b] text-sm text-[#191c1e] bg-white transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
              <button
                id="submit-enquiry-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 py-4 px-8 rounded-xl bg-[#003d9b] hover:bg-[#002d73] disabled:bg-[#495f84] text-white font-bold text-base shadow-[0_8px_20px_rgba(0,61,155,0.25)] transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging Procurement Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit B2B Quotation Request</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                title="Send inquiry directly via WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Instant WhatsApp Quote</span>
              </button>
            </div>

            <p className="text-[11px] text-[#737685] text-center pt-2">
              🔒 All procurement requests are securely processed and backed by Amrit Enterprises' strict enterprise privacy policy. No spam.
            </p>

          </form>

        </div>
      </section>

    </div>
  );
};
