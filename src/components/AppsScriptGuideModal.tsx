import React, { useState } from 'react';
import { X, Check, Copy, FileSpreadsheet, ExternalLink, HelpCircle } from 'lucide-react';

interface AppsScriptGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  scriptUrl: string;
  onUpdateScriptUrl: (url: string) => void;
}

export const AppsScriptGuideModal: React.FC<AppsScriptGuideModalProps> = ({
  isOpen,
  onClose,
  scriptUrl,
  onUpdateScriptUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [tempUrl, setTempUrl] = useState(scriptUrl);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const appScriptCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    
    // Parse incoming payload (supports both JSON POST and Form URL Encoded)
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch(err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    var timestamp = new Date();
    var formType = data.formType || "Bulk Enquiry";
    var contactName = data.contactName || data.fullName || "";
    var businessName = data.businessName || "";
    var businessType = data.businessType || "";
    var city = data.city || "";
    var phone = data.phone || "";
    var email = data.email || "";
    var interestedSku = data.interestedSku || "";
    var quantity = data.monthlyQuantity || "";
    var message = data.requirements || data.message || "";

    // Append row to sheet
    sheet.appendRow([
      timestamp,
      formType,
      contactName,
      businessName,
      businessType,
      city,
      phone,
      email,
      interestedSku,
      quantity,
      message
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(appScriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveUrl = () => {
    onUpdateScriptUrl(tempUrl.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#c3c6d6]/40 p-6 md:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#eceef0]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#191c1e]">Free Google Sheet Integration Guide</h2>
              <p className="text-xs text-[#495f84]">Store all B2B customer inquiries directly in your private Google Sheet for free</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#737685] hover:text-[#191c1e] hover:bg-[#eceef0] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6 text-sm text-[#434654]">
          
          {/* Web App URL Config */}
          <div className="bg-[#f2f4f6] p-4 rounded-xl border border-[#c3c6d6]/40">
            <label className="block font-bold text-xs uppercase tracking-wider text-[#191c1e] mb-1.5">
              Active Google Apps Script Web App URL:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="flex-1 px-3 py-2 text-xs font-mono bg-white border border-[#c3c6d6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003d9b]"
              />
              <button
                onClick={handleSaveUrl}
                className="px-4 py-2 bg-[#003d9b] text-white rounded-lg font-semibold text-xs whitespace-nowrap hover:bg-[#002d73] transition-colors"
              >
                {savedSuccess ? "Saved!" : "Update URL"}
              </button>
            </div>
            <p className="text-[11px] text-[#495f84] mt-2">
              Default placeholder is active. You can swap this at any time in code (`DEFAULT_GOOGLE_SCRIPT_URL` in `src/data/content.ts`).
            </p>
          </div>

          {/* Steps */}
          <div>
            <h3 className="font-bold text-base text-[#191c1e] mb-3 flex items-center gap-2">
              <span>Quick 3-Minute Deployment Steps</span>
            </h3>
            <ol className="list-decimal list-inside space-y-2.5 text-xs text-[#434654]">
              <li>
                Create a new Google Sheet at <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-[#003d9b] underline font-semibold">sheets.new</a> (e.g. named <em>"Mist Drop B2B Inquiries"</em>).
              </li>
              <li>
                In the top row (headers), optionally label: <code className="bg-[#dae2ff] px-1 py-0.5 rounded text-[#001848]">Timestamp | Form Type | Contact Name | Business Name | Type | City | Phone | Email | SKU | Quantity | Message</code>.
              </li>
              <li>
                Click on <strong>Extensions &gt; Apps Script</strong> in the Google Sheet menu.
              </li>
              <li>
                Delete existing text in the editor, paste the script below, and click <strong>Save</strong>.
              </li>
              <li>
                Click <strong>Deploy &gt; New deployment</strong>. Select type <strong>Web app</strong>.
              </li>
              <li>
                Set <em>Execute as:</em> <strong>Me</strong> and <em>Who has access:</em> <strong>Anyone</strong> (crucial for free form submissions without login).
              </li>
              <li>
                Copy the generated Web App URL ending in <code className="bg-[#eceef0] px-1 py-0.5 rounded">/exec</code> and paste it above!
              </li>
            </ol>
          </div>

          {/* Code block */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-[#191c1e]">Google Apps Script Code (Code.gs):</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#dae2ff] text-[#001848] rounded-md text-xs font-semibold hover:bg-[#b2c5ff] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied Script!" : "Copy Code"}</span>
              </button>
            </div>
            <pre className="p-4 bg-[#191c1e] text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto max-h-60">
              {appScriptCode}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#eceef0] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#003d9b] text-white rounded-lg text-sm font-semibold hover:bg-[#002d73] transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
