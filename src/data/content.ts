import { ProductSKU, Founder, ValueProp, ClientSector } from '../types';

// Google Apps Script Web App Endpoint (configured via VITE_APPS_SCRIPT_URL environment variable)
export const APPS_SCRIPT_URL: string = import.meta.env.VITE_APPS_SCRIPT_URL || '';

// Business details
export const COMPANY_INFO = {
  brandName: "Mist Drop",
  tagline: "Pure Water, Pure Trust",
  subTitle: "Packaged Drinking Water",
  parentCompany: "Amrit Enterprises",
  regStatus: "MSME Registered & FSSAI Compliant",
  headquarters: "Sangeeta Sadan, Near Devi Asthan, Dhelwan, Post Office Patna, Bihar 800030",
  shortAddress: "Sangeeta Sadan, Dhelwan, Patna 800030",
  phone: "+91 93342 46276",
  phoneRaw: "919334246276",
  secondaryPhone: "+91 73239 37027",
  secondaryPhoneRaw: "917323937027",
  contacts: [
    {
      name: "Amit Kumar",
      phone: "+91 93342 46276",
      phoneRaw: "919334246276",
      role: "Sales & Procurement",
      whatsappUrl: "https://wa.me/919334246276"
    },
    {
      name: "Ritesh Jha",
      phone: "+91 73239 37027",
      phoneRaw: "917323937027",
      role: "Operations & Management",
      whatsappUrl: "https://wa.me/917323937027"
    }
  ],
  email: "procurement@mistdrop.com",
  salesEmail: "sales@amritenterprises.in",
  operatingHours: "Mon - Sat: 8:00 AM - 6:00 PM",
  whatsappNumber: "919334246276",
  googleMapsEmbed: "https://maps.google.com/maps?q=Sangeeta+Sadan,+Near+Devi+Asthan,+Dhelwan,+Patna,+Bihar+800030&t=&z=15&ie=UTF8&iwloc=&output=embed",
  googleMapsLink: "https://maps.google.com/?q=Sangeeta+Sadan,+Near+Devi+Asthan,+Dhelwan,+Patna,+Bihar+800030"
};

// 4 Core B2B Products matching Stitch Export
export const PRODUCTS: ProductSKU[] = [
  {
    id: "round-1l",
    name: "Premium Round Bottle",
    capacity: "1 Liter",
    shape: "Round Executive",
    description: "Our signature premium round bottle. Ideal for boardrooms, executive meetings, VIP lounges, and high-end hospitality environments. Exceptional clarity and structural integrity.",
    idealFor: "Boardrooms & VIP Hospitality",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC4DI1icp2Wlt-QeQfsJIgQ7dCVQXVQo_IlQn7-swjNBZgFcxwwzWATsSTuGCCqR3Y4vjRu5cNn8LIOXmIG999Iuv_SP7Xymai73e1NlZcJRYIgqPG14V2WO8fvo8GE3Y_EeNtOxeWpJy-Vdy11rAheHd7_rZAQOBi5IEooMAWfpfRTO7mjKrGNsZX1rz0x4Lqz-IwXR3RpA1ja50NkU-62uB5BPzeDSZCvSqU3Od4RebG9x3Z6EftRw",
    minOrder: "20 Cases (24 bottles/case)",
    features: ["BPA-Free Food Grade PET", "Custom Logo Labeling", "Leak-Proof Tamper Ring", "High Rigidity Body"],
    specs: {
      tds: "80 - 120 ppm",
      ph: "7.2 - 7.5 (Balanced)",
      shelfLife: "12 Months",
      packaging: "24 Units / Master Carton"
    }
  },
  {
    id: "square-1l",
    name: "Square Bulk Bottle",
    capacity: "1 Liter",
    shape: "Square Space-Saver",
    description: "Designed for optimal storage density. The square profile maximizes pallet efficiency for large-scale enterprise procurement, logistics, and multi-floor corporate distribution.",
    idealFor: "Enterprise Workforces & Bulk Warehousing",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMkXumIFLS7OUub5l6NWOeKDYXjD7bJ6hQ0mGsb3RyKvTQPb4dj1XYXkpPaY1fAK0cfFViDyKmQrICMw6D8JM9eSEwS1MWUlKlIVavppnT3nVNaWxEu5pI5lRQ0WtHIcMjw7yJDNECM2upYdfV2QkDzIvNfr_tvRDSvhlhceigsmahcrph2dgymewQPzPv2A26o4-Tvdm2A79X3N2Guj8ts_OXPVSHRyLv5tPP3kxAfq9fGn4PiAfHpw",
    minOrder: "25 Cases (24 bottles/case)",
    features: ["High Density Pallet Stacking", "Ergonomic Grip Corners", "Multi-stage RO + UV Processed", "Recyclable #1 PET"],
    specs: {
      tds: "75 - 110 ppm",
      ph: "7.2 - 7.4 (Neutral)",
      shelfLife: "12 Months",
      packaging: "24 Units / Shrink Wrapped"
    }
  },
  {
    id: "square-500ml",
    name: "Square Daily Office Bottle",
    capacity: "500 ml",
    shape: "Square Compact",
    description: "The standard corporate issue. Perfect for employee cafeterias, conference halls, standard meetings, and daily office consumption with a space-saving footprint.",
    idealFor: "Corporate Cafeterias & Conferences",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDM6jEoRDdB_z3M4gs_tjurHFnNoY2wU73qJ7yq7Gf5ycg3x9UbY74Np2IEFvrohtWb5BoUQKJNemZLFD1GLJdRZaQUAo5nw7hhHyGFd_9uOt5PkmQl0CU3GXlNJcKQmjuJkJqSIKGpkoD3AVOEOzXvfrnB1hTcOxSuYeVIa69fz5lZZwQaxRM2alZYoRx5qO1Oogrt2KQZDlu0qDUZy1mD993pnWgNEVvxXRMpz2EzfWQbPhOcn0rzpA",
    minOrder: "30 Cases (24 bottles/case)",
    features: ["Most Popular SKU", "Custom Corporate Branding", "Zero Odor Guarantee", "Clean Pour Lip"],
    specs: {
      tds: "85 - 120 ppm",
      ph: "7.1 - 7.4 (Balanced)",
      shelfLife: "12 Months",
      packaging: "24 Units / Box"
    }
  },
  {
    id: "square-250ml",
    name: "Square Event & Hospitality Bottle",
    capacity: "250 ml",
    shape: "Square Mini",
    description: "Compact and efficient. Ideal for brief client meetings, seminars, catering, wedding hospitality, or situations requiring zero water wastage. Easy bulk handling.",
    idealFor: "Short Meetings, Events & Hospitality",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHaOR2ONS7dd-jZ51wEqQ5o5-v3eE99rlTb8UCPMeN8a7zAExGdftjdO7ffotPGuBqwempq808nx6erVeuZdDMYz4MKRxaOian2G014cgp7aGLo_hh3whkixmkeWFMMyOVBPk3qTV0QB5kL0-VsLy9oF2EUrPS2KXKBiYoR31vU9ZL301Tfq1DbKc9jqVOAi9t9uXgD_e_zyf45pFZvXElJHEd0zuyZpj9xmbCP8oZETA6of1oZSIVLw",
    minOrder: "40 Cases (30 bottles/case)",
    features: ["Zero Waste Sizing", "Event Custom Sleeves", "Convenient Pocket Fit", "Tamper Evident Seal"],
    specs: {
      tds: "80 - 115 ppm",
      ph: "7.2 - 7.5 (Balanced)",
      shelfLife: "12 Months",
      packaging: "30 Units / Box"
    }
  }
];

// Additional Bulk Industrial Option for reference
export const BULK_INDUSTRIAL_PRODUCTS = [
  {
    id: "distilled-1000l",
    name: "Premium Distilled - 1000L IBC",
    capacity: "1000 Liters",
    description: "Laboratory grade distilled water suitable for manufacturing, pharma, and precise industrial applications in Patna and Bihar.",
    tds: "< 1 ppm",
    ph: "6.5 - 7.5",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMyzh19wqoLyJQuwYeNPutSShNvPtjPENQLEXzngl1g-3ZzGlQ8l-TDiBLN9IZ7iFG3RJZ0mZM7qRmwC_HyAyQS33Tvx4X7XIHrby9zglK-1VWw2Lm-clSwH9EXRTeyqhHyfSHNXlX0La1ylSQ03rsojiu1qiQz-SxOm4WO0t0nYIagliGfO_hf2Tcp00dq10-VcLXxHn9_T3ZA5NhzhsRICt7mPPPzUNae36PmI6qF5K4e0VmxNzAgQ"
  },
  {
    id: "ro-tanker",
    name: "Reverse Osmosis (RO) - Bulk Tanker",
    capacity: "10,000+ Liters",
    description: "High-volume RO purified water delivered directly via dedicated food-grade sanitized tankers with 48h delivery dispatch.",
    tds: "< 50 ppm",
    ph: "6.8 - 7.4",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDqkDvy9SfIFbyhP5gKln9ud5xXGwBkon1_0whzcNaDnRKVtXQ1TtxdCuz7JXgNo65Ib0NkwDiGZJWMRGvHHnr0W1Y8otAKEEqsfXmYYZzmZoIrOkxVbz88qhGtgqFBnkDVuoTDnWw51IXPi-GfGXnpcxXV8_ogy80Bz1qN4Vmsu0XijXCI124vkijS7gcKcf-ykEr_OT6d4U8T_kq9xXmo8U3FjzJ8Xbd1IzWgYHeaAHdW3qfsqtu8w"
  }
];

// Founders and Leadership Team
export const FOUNDERS: Founder[] = [
  {
    name: "Amit Kumar",
    role: "Director & Co-Founder",
    quote: "Building long-term B2B partnerships through uncompromising hygiene standards and dependable Patna supply chains.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCub-8fwMsZjVG2m5OsNrDIYPrVIXs9jfeXsm3Bv8EQfQoHUUWc9Vma9XOSM6iVuqf6ZaImXscblW--HWqgN1zmUY-HIdsVRRiEtxvKAiILZpyJX-mfAI0yIkFOotDVrPjjXz7wbGUoykLqGQXr4f2z_GKclEn-Yc_CB4wMmGpSfIXBz6gqDQylhpnycIybV8PWImRcFQpwc_4fmK9KoVZdkPykEO2IUFRp01AkM2MZerGWXDr1VXVw5g"
  },
  {
    name: "Ritesh Jha",
    role: "Director & Co-Founder",
    quote: "Ensuring laboratory-grade purity and timely delivery for every single order, no matter the scale.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIefuKJhARq6Wr3xGZZPeBdzhSwq1Ck4UGZ85XO8Lt_GJkxPzJoJKI0jzrnePLMrDfozPOqpwi4y3Fm4aCiWmrb_VYyAN0tWEKvTUH59qZMyjo1zPsge6BKpJsc5AZrgre0vpLnR2qxXQ6ZMuOEw3J9s8-WwXcGSYUp8fvsUs0C1zbET3EUUEXbdiiMR3xwCilbW86DOht4OPg1lUou-jIuzQvLCczmGfx1RVZBiEGZKO33hKOrFclAw"
  }
];

// Executive Management
export const EXECUTIVES = [
  {
    name: "Amrit Singh",
    role: "Managing Director",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX0u6Zo94jA7RBm9R2MTcOeAkZClAfqA-A7_789kxFqroMZLZHk3AbHRWTO-YoNc8F_vdrUZxqrlLWzYST53zLUTsJonhu50DPO0l5ezBmoqXn0AveKUSbw2hIaZP3A3QA5YOJHOVwSxUtR62J2H8n4dFkgngnbUXXfpi5Wv8LGb7SuhKxV4gBX0nS0FoUfm4RckqEna4pbLZ5T3OTk5iSfiVgVDexOgMrx9waDMJ346EdL4i9NBa_BA"
  },
  {
    name: "Priya Sharma",
    role: "Head of Operations",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5RyWrkb7yh8OUy1ek8K7qYxyKbF5YDPSfaQUdyDdV9zriSJNvcrnCzfF4WV_0TYnqkKUqAUFujNJLOK-Wiz7slxVmu8sigm3jLRG-EcacKyRmn1H5TSvYb6OtzO6sJVbwYMP08bYSGvmf-3SsvubrtOp81qLl-JG0UaG8AWm6QY_kLPeug7b7s4iCUCrBwj0PICLo07X0dC7pOSOmO6fKu2n8ooxytCZsRmTNqXfNes_EDBFIkvZTuQ"
  }
];

// Why Choose Us
export const WHY_CHOOSE_US: ValueProp[] = [
  {
    id: "branding",
    title: "Custom Branding",
    description: "Tailored private labeling solutions featuring your enterprise or event identity on bottle labels.",
    icon: "branding"
  },
  {
    id: "hygiene",
    title: "Hygienic Filling",
    description: "Automated, untouched multi-barrier filtration & ozone sterilization ensuring 100% pure output.",
    icon: "sanitizer"
  },
  {
    id: "bulk",
    title: "Bulk Supply",
    description: "Scalable monthly warehousing and scheduled inventory to meet demanding procurement needs.",
    icon: "truck"
  },
  {
    id: "delivery",
    title: "Timely Delivery",
    description: "Optimized Patna & regional fleet logistics for guaranteed schedule adherence and route predictability.",
    icon: "timer"
  },
  {
    id: "sizes",
    title: "Multiple Sizes",
    description: "Versatile packaging options (250ml, 500ml, 1L Round/Square, 20L cans) for varying operational needs.",
    icon: "layers"
  },
  {
    id: "msme",
    title: "MSME Registered",
    description: "Verified corporate manufacturing entity with complete tax invoices, GST, and strict FSSAI compliance.",
    icon: "badge"
  }
];

// Who We Serve
export const CLIENT_SECTORS: ClientSector[] = [
  {
    id: "offices",
    title: "Corporate Offices",
    description: "Daily and weekly scheduled bulk bottle replenishment for executive floors, IT parks, and large staff workforces.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDM4LYRyDwBSi-F5WQ3yFnXPwlkEngX42Rfeui18bFYeYIeolSzb4rt5jdzMr4RVLpcOIHcebRxVicB-WOlEugvy-y0dwvKmjBP9Yv0FDekAKkCflnIhw7EFulh5C6wlVXmq-YpV-nwBdOOkx0_TyLHHCZz3MfmXcqlVgkcdwtQ_wIqtMRqjYMBx5XAATBzALLAe4rANhf_WXF3_yBkK1vzLkcJ5s88OVbtJxuPvsyDNXcrQWZdphzDzw",
    tag: "High Volume / Daily Supply"
  },
  {
    id: "events",
    title: "Conferences & Events",
    description: "High-volume supply with optional custom-printed conference sleeves for pristine brand presentation and VIP hospitality.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZX_YmDkUys9a6njtPrm27_ih0xc_evKgclJatJQ3u40UWNPXS3K_3w0XhraIrRnCD5_xHPNs_qBwXO1A1ZgzBS8Z729aubiwd9Mo27QccBwlBODxxTX6-2qlysN_JKJjSF3YTU6hEzutDq-kgY4ONBIK1IVAoFpwiUZW18zU20IH12M_akETdHs5VRHuvHoVYuW8p6ubJup2QNg5IJJXh6fz8N3czQ0HCT4-uIBJKaUyI396JQYbxKg",
    tag: "Custom Branding Ready"
  },
  {
    id: "hospitality",
    title: "Hotels & Restaurants",
    description: "Premium glass and sleek square water bottle lines that elevate guest tables, hotel suites, and banquet services.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8eXH_8jaLYNsbMRoBsFvz11oMklKEF_T5QK6Ue-mJAiOTuOy8r2SDn40-eOd65IfxOGt3kQ2nZumxh3dnFXIHRR4PwInuzWyd1emhrNPbLxj8NPpZ2buQhmyxj_hV0sYKjV9olEFwy0M_g5dWCYaeA7Uxdf5vgsFXh9OYnZMkrmjsdFFwX20yvO20U9YdU1nQhs7PjWSCg5rjIcTSGtVqeXLWwJZks_IFnW7Kz1j8Fnr-4imDe8sK9g",
    tag: "Luxury Presentation"
  }
];

export const HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuB8eXH_8jaLYNsbMRoBsFvz11oMklKEF_T5QK6Ue-mJAiOTuOy8r2SDn40-eOd65IfxOGt3kQ2nZumxh3dnFXIHRR4PwInuzWyd1emhrNPbLxj8NPpZ2buQhmyxj_hV0sYKjV9olEFwy0M_g5dWCYaeA7Uxdf5vgsFXh9OYnZMkrmjsdFFwX20yvO20U9YdU1nQhs7PjWSCg5rjIcTSGtVqeXLWwJZks_IFnW7Kz1j8Fnr-4imDe8sK9g";
export const BOTTLE_ISOLATED = "https://lh3.googleusercontent.com/aida-public/AB6AXuAELrekLBZ0PsJ6qmifTiqpzAcF29MjtBWrUjTHKNP0d2IcRetpFgkuuJ5FYKjNr5bz8Bmdk01vQ5jBbpAjJGPen1YaBgRIh3Nd-IWqvdZSHSnKXq6OADgy8tVbypsPwEsjXR58BHl3R_K71MVoz2utqncDF1nsXytdI8zkbZlfi0gfEMPryUl64dPfg-qU1AcAbNZd21l0LGhD8QMXqs9FJDt0ENsaq0kV3txh646dMan9YwpjmeCSiA";
