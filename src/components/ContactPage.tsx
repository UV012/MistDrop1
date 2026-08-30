import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { COMPANY_INFO } from '../data/content';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    businessType: 'Corporate Procurement',
    email: '',
    phone: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your name.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please provide a valid 10-digit phone number so our team can reach you.';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please let us know how we can assist your business.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const payload = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      source: 'Contact',
      formType: 'Contact Page Inquiry',
      name: formData.fullName.trim(),
      contactName: formData.fullName.trim(),
      fullName: formData.fullName.trim(),
      businessName: '',
      businessType: formData.businessType,
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      bottleType: 'General / Custom Inquiry',
      interestedSku: 'General / Custom Inquiry',
      quantity: 'N/A',
      monthlyQuantity: 'N/A',
      city: 'Patna / Bihar',
      message: formData.message.trim(),
      requirements: formData.message.trim(),
    };

    const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      console.warn('VITE_APPS_SCRIPT_URL is not set. Inquiries will not be recorded in Google Sheets.');
      setSubmitStatus('success');
      setIsSubmitting(false);
      return;
    }

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setSubmitStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    const text = `*New Contact Message - Mist Drop Website*
- *Name:* ${formData.fullName || 'Not provided'}
- *Type:* ${formData.businessType}
- *Phone:* ${formData.phone || 'Not provided'}
- *Email:* ${formData.email || 'Not provided'}
- *Message:* ${formData.message || 'I would like to speak with a sales representative.'}`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div id="contact-page" className="w-full space-y-16 md:space-y-20 py-8">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dae2ff] text-[#001848] text-xs font-bold uppercase tracking-wider shadow-sm">
          <MapPin className="w-4 h-4 text-[#003d9b]" />
          <span>Dhelwan, Patna Facility & Regional HQ</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#003d9b]">
          Get in Touch
        </h1>

        <p className="text-base sm:text-lg text-[#434654] max-w-2xl mx-auto leading-relaxed">
          Speak with our enterprise bottling specialists for contract pricing, custom private labeling inquiries, and scheduled distribution across Bihar.
        </p>
      </section>

      {/* Quick Action Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Call Sales */}
          <div
            id="contact-call-card"
            className="bg-white p-7 rounded-3xl border border-[#c3c6d6]/50 shadow-[0_10px_30px_rgba(0,27,61,0.03)] hover:shadow-lg hover:border-[#003d9b] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#dae2ff] flex items-center justify-center text-[#003d9b] mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#191c1e] mb-1">Direct Call Desk</h3>
              <p className="text-xs text-[#495f84] mb-3">Direct lines for instant quotes & dispatch verification</p>
              <div className="space-y-1.5">
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="block text-base font-bold text-[#003d9b] hover:underline">
                  Amit Kumar: {COMPANY_INFO.phone}
                </a>
                <a href={`tel:${COMPANY_INFO.secondaryPhoneRaw}`} className="block text-base font-bold text-[#003d9b] hover:underline">
                  Ritesh Jha: {COMPANY_INFO.secondaryPhone}
                </a>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#eceef0] flex items-center justify-between text-xs font-bold text-[#003d9b]">
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:underline flex items-center gap-1">
                <span>Call Amit</span> &rarr;
              </a>
              <a href={`tel:${COMPANY_INFO.secondaryPhoneRaw}`} className="hover:underline flex items-center gap-1">
                <span>Call Ritesh</span> &rarr;
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Business */}
          <div
            id="contact-whatsapp-card"
            className="bg-white p-7 rounded-3xl border border-[#c3c6d6]/50 shadow-[0_10px_30px_rgba(0,27,61,0.03)] hover:shadow-lg hover:border-[#25D366] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 flex items-center justify-center text-[#075E54] mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#191c1e] mb-1">WhatsApp Business</h3>
              <p className="text-xs text-[#495f84] mb-3">Instant chat, PDF quotation exchange & catalog</p>
              <div className="space-y-1.5">
                <a
                  href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent("Hello Amit, I would like to inquire about Mist Drop packaged drinking water supply.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base font-bold text-[#075E54] hover:underline"
                >
                  Amit Kumar: {COMPANY_INFO.phone}
                </a>
                <a
                  href={`https://wa.me/${COMPANY_INFO.secondaryPhoneRaw}?text=${encodeURIComponent("Hello Ritesh, I would like to inquire about Mist Drop packaged drinking water supply.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base font-bold text-[#075E54] hover:underline"
                >
                  Ritesh Jha: {COMPANY_INFO.secondaryPhone}
                </a>
              </div>
            </div>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Mist Drop, I would like to inquire about bulk packaged water supply.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pt-3 border-t border-[#eceef0] inline-flex items-center gap-1 text-xs font-bold text-[#075E54] hover:underline"
            >
              <span>Open Primary WhatsApp</span> &rarr;
            </a>
          </div>

          {/* Card 3: Corporate Email */}
          <a
            id="contact-email-card"
            href={`mailto:${COMPANY_INFO.email}`}
            className="bg-white p-7 rounded-3xl border border-[#c3c6d6]/50 shadow-[0_10px_30px_rgba(0,27,61,0.03)] hover:shadow-lg hover:border-[#003d9b] transition-all transform hover:-translate-y-1 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#dae2ff] flex items-center justify-center text-[#003d9b] mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#191c1e] mb-1">Procurement Email</h3>
              <p className="text-xs text-[#495f84] mb-3">Official vendor registration and RFP submissions</p>
              <p className="text-base font-bold text-[#003d9b] truncate">{COMPANY_INFO.email}</p>
              <p className="text-xs text-[#495f84] truncate mt-1">{COMPANY_INFO.salesEmail}</p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#003d9b] group-hover:underline">
              <span>Send Email</span> &rarr;
            </span>
          </a>

        </div>
      </section>

      {/* Main Split: Form & Facility Location / Google Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#c3c6d6]/50 p-6 sm:p-10 shadow-sm">
            <div className="mb-6 space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#191c1e]">
                Send a Procurement Message
              </h2>
              <p className="text-xs text-[#495f84]">
                Responses guaranteed within 2-4 business hours.
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-5 bg-emerald-50 border border-emerald-500/30 rounded-2xl text-center space-y-2 animate-in fade-in">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900">
                  Thank you! Our team will contact you shortly.
                </h3>
                <p className="text-xs text-emerald-800">
                  Your message has been received by Amrit Enterprises. An account manager will reach out via phone/WhatsApp at {formData.phone}.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-2 text-xs font-bold text-emerald-800 underline"
                >
                  Send another message
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sen"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: undefined });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#c3c6d6]'
                  } focus:outline-none focus:ring-2 focus:ring-[#003d9b] text-sm text-[#191c1e] bg-white transition-all`}
                />
                {formErrors.fullName && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                    Phone / Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
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
                    <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. you@company.com"
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
                    <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                  Inquiry Topic / Business Type
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#c3c6d6] focus:outline-none focus:ring-2 focus:ring-[#003d9b] text-sm text-[#191c1e] bg-white transition-all"
                >
                  <option value="Corporate Procurement">Corporate Office Supply</option>
                  <option value="Hospitality / Hotel Procurement">Hotel / Restaurant Bulk Water</option>
                  <option value="Custom Labeling / Private Brand">Custom Logo / Private Labeling</option>
                  <option value="Event / Conference Supply">Event / Exhibition Catering</option>
                  <option value="Industrial Distilled / Tanker">Industrial 1000L IBC / RO Tanker</option>
                  <option value="Distributor / Dealership">Distributorship Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#191c1e] mb-1.5">
                  Your Message or Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your requirements, bottle volume, location, or request a sample..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (formErrors.message) setFormErrors({ ...formErrors, message: undefined });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.message ? 'border-red-500 bg-red-50/20' : 'border-[#c3c6d6]'
                  } focus:outline-none focus:ring-2 focus:ring-[#003d9b] text-sm text-[#191c1e] bg-white transition-all resize-none`}
                ></textarea>
                {formErrors.message && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.message}</p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#003d9b] hover:bg-[#002d73] disabled:bg-[#495f84] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Transmitting message...</span>
                  ) : (
                    <>
                      <span>Send Direct Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send On WhatsApp</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Facility Location, Hours, Google Map Embed (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Facility Details Card */}
            <div className="bg-[#f2f4f6] rounded-3xl p-6 sm:p-8 border border-[#c3c6d6]/50 space-y-5">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#003d9b] bg-white px-3 py-1 rounded-full border border-[#c3c6d6]/50">
                  Headquarters & Plant
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>Operational Now</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#191c1e]">{COMPANY_INFO.parentCompany}</h3>
                <p className="text-xs font-bold text-[#003d9b] uppercase tracking-wider mt-0.5">
                  Brand: {COMPANY_INFO.brandName} — {COMPANY_INFO.subTitle}
                </p>
                <p className="text-xs italic text-[#495f84] mt-0.5">
                  "{COMPANY_INFO.tagline}"
                </p>
                <p className="text-sm text-[#434654] mt-3 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#003d9b] shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.headquarters}</span>
                </p>
              </div>

              {/* Direct Contact Persons */}
              <div className="pt-3 border-t border-[#c3c6d6]/50 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#191c1e] block">
                  Official Contact Persons:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {COMPANY_INFO.contacts.map((contact) => (
                    <div key={contact.name} className="bg-white p-2.5 rounded-xl border border-[#c3c6d6]/40">
                      <p className="font-bold text-[#191c1e]">{contact.name}</p>
                      <p className="text-[10px] text-[#495f84] mb-1">{contact.role}</p>
                      <a href={`tel:${contact.phoneRaw}`} className="font-bold text-[#003d9b] hover:underline block">
                        {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#c3c6d6]/50 space-y-2 text-xs text-[#434654]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#003d9b] shrink-0" />
                  <span><strong>Hours:</strong> {COMPANY_INFO.operatingHours} (Sunday by appointment)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#003d9b] shrink-0" />
                  <span><strong>Certification:</strong> {COMPANY_INFO.regStatus}</span>
                </div>
              </div>

            </div>

            {/* Embedded Google Maps (Pointing to Sangeeta Sadan, Dhelwan) */}
            <div className="bg-white rounded-3xl border border-[#c3c6d6]/50 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-[#eceef0] flex items-center justify-between bg-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#191c1e] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#003d9b]" />
                  <span>Dhelwan Facility Map View</span>
                </span>
                <a
                  href={COMPANY_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#003d9b] hover:underline inline-flex items-center gap-1"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="w-full h-64 bg-[#eceef0] relative">
                <iframe
                  title="Amrit Enterprises Mist Drop Patna Facility Location"
                  src={COMPANY_INFO.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
