# Mist Drop — B2B Packaged Drinking Water

Mist Drop by Amrit Enterprises: Patna-based B2B bulk packaged drinking water supplier providing pure, hygienic packaged drinking water and custom branding for corporate and institutional clients.

## Quick Start (Local Development)

**Prerequisites:** Node.js (v18+)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (optional for local testing):
   ```bash
   cp .env.example .env
   ```
   Add your deployed Google Apps Script Web App URL to `.env`:
   ```env
   VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec
   ```
   *(If unset, the app will log a console warning in dev mode and submit forms locally without crashing).*

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## Deploy to Netlify

1. Push this project to your GitHub repository.
2. In Netlify: **New site from Git** → select the repository.
3. Build settings (pre-set in `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. In Netlify: Go to **Site configuration > Environment variables** and add:
   - **Key:** `VITE_APPS_SCRIPT_URL`
   - **Value:** Your deployed Google Apps Script Web App URL ending in `/exec`
5. Trigger deploy.

---

## Google Sheet Integration Setup (Backend Script)

Form submissions from the **Bulk Order Catalog** and **Contact Page** are transmitted directly to your private Google Sheet via a Google Apps Script Web App.

### Setup Instructions:

1. Open your target Google Sheet (tab name: `Sheet1`).
2. Click **Extensions > Apps Script** in the top menu.
3. Replace all code in `Code.gs` with the script below.
4. Click **Save** (disk icon).
5. Click **Deploy > New deployment**.
6. Choose type **Web app** (gear icon).
7. Configure:
   - **Description:** `Mist Drop Lead Processor`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
8. Click **Deploy**, authorize permissions, and copy the Web App URL (ending in `/exec`).
9. Set this URL as the `VITE_APPS_SCRIPT_URL` environment variable in your `.env` file (local) and Netlify site settings (production).

### `Code.gs` (Google Apps Script)

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Sheet1") || ss.getActiveSheet();
    
    // 11 Standard Columns
    var headers = [
      "Timestamp",
      "Source",
      "Name",
      "Business Name",
      "Business Type",
      "Phone",
      "Email",
      "Bottle Type Required",
      "Quantity Required",
      "City",
      "Message"
    ];
    
    // Auto-create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#dae2ff")
        .setFontColor("#001848");
      sheet.setFrozenRows(1);
    }
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    
    var timestamp = data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var source = data.source || (data.formType && data.formType.indexOf("Contact") !== -1 ? "Contact" : "Catalog");
    var name = data.name || data.contactName || data.fullName || "";
    var businessName = data.businessName || "";
    var businessType = data.businessType || "";
    var phone = data.phone || data.mobile || "";
    var email = data.email || "";
    var bottleType = data.bottleType || data.interestedSku || "";
    var quantity = data.quantity || data.monthlyQuantity || "";
    var city = data.city || "";
    var message = data.message || data.requirements || "";
    
    // Append row to Sheet1
    sheet.appendRow([
      timestamp,
      source,
      name,
      businessName,
      businessType,
      phone,
      email,
      bottleType,
      quantity,
      city,
      message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      message: "Lead recorded successfully" 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: "success", 
    message: "Mist Drop Apps Script Web App endpoint is active." 
  })).setMimeType(ContentService.MimeType.JSON);
}
```
