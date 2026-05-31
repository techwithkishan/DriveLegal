# 🚘 DRIVELEGAL: AI-Powered Traffic Compliance & Challan Intelligence System

<div align="center">
  <img src="https://img.shields.io/badge/Category-Legal--Tech%20%2F%20Civic--Tech-blueviolet?style=for-the-badge" alt="Category" />
  <img src="https://img.shields.io/badge/Framework-React%20%2B%20Vite%20%2B%20Tailwind-61dafb?style=for-the-badge&logo=react" alt="Tech Stack" />
  <img src="https://img.shields.io/badge/Localization-22%20Indian%20Languages-emerald?style=for-the-badge" alt="Localization" />
  <img src="https://img.shields.io/badge/AI-Challan%20OCR%20%26%20Intelligence-amber?style=for-the-badge" alt="AI Features" />
</div>

---

## 🌟 Overview
**DRIVELEGAL** is a full-stack, state-of-the-art AI-powered Traffic Compliance & Challan Intelligence System designed to bridge the gap between complex legal traffic regulations and everyday citizens. 

🖥️ **Live Web Application:** [https://drive-legal-seven.vercel.app](https://drive-legal-seven.vercel.app)

Traffic violation laws and challan management remain fragmented, opaque, and confusing. DRIVELEGAL empowers vehicle owners with **real-time AI legal explanations, localized language interfaces, active document audits, cross-border rule warnings, and interactive simulation tools** while providing traffic authorities with comprehensive governance analytics.

---

## 🚀 Core Features

### 1. 🌐 Dynamic 22 Constitutional Language Switcher
*   **Constitutional Parity**: Built-in support for all **22 official Indian languages** recognized in the Eighth Schedule of the Constitution (Hindi, Gujarati, Telugu, Tamil, Marathi, Bengali, Sanskrit, Kannada, Punjabi, Urdu, etc.).
*   **Instant Client-Side Translation**: Powered by a robust, reactive context translation dictionary (`t()`) that instantly translates all greetings, quick stats, compliance guides, and menu options without page reloads.
*   **Persistent Preferences**: Automatically remembers user language preferences across sessions using secure `localStorage` persistence.

### 2. 🗺️ Fully Interactive Guided Onboarding Tour
*   **Dynamic Orientation**: Displays a premium welcome onboarding popup for first-time registrants and logins, prompting a guided interactive tour.
*   **Interactive Tooltips**: Guides the user step-by-step through **10 key dashboard features and icons** with automatic smooth scrolling, high-fidelity pulse highlight animations (`ring-4 ring-amber-500 glow-amber`), and dynamic tooltip descriptions.
*   **Confetti Completion**: Celebrates the successful completion of the onboarding tour with a custom CSS/DOM-particle particle confetti explosion.
*   **Full Multi-lingual Sync**: Tooltips, step headers, and control buttons dynamically translate to the user's selected language in real time.

### 3. 🛡️ Civic Compliance Score Meter
*   **Real-time Rating**: A dynamic **0 to 100 Safe Driving Index**. Serious unpaid infractions lower the score, while safe driving patterns, lack of active tickets, and prompt payments restore it.
*   **Visual Gauge**: Beautifully animated SVG ring gauge colored dynamically based on rating (Emerald for Good, Amber for Moderate, Red for Critical).

### 4. 🧮 Challan Compliance Calculator
*   **Act & Rules Dictionary**: Instantly lookup exact fine amounts, applicable legal sections under the **Motor Vehicles Act**, and legal consequences of non-payment.
*   **Global Scaling**: Supports RTO guidelines across India and **6 major global countries** (USA, UAE, UK, Germany, Australia) with integrated currency conversions.

### 5. 🤖 AI Driving Advisor & Insights
*   **Personalized Reports**: Evaluates driving history to generate a detailed safety feedback report card.
*   **Actionable Planning**: Formulates structured **30-60-90 day performance improvement roadmaps** to guide drivers toward safer behaviors.

### 6. 📸 OCR Challan Ticket Scanner
*   **Document Digitization**: Simulates AI optical character recognition (OCR) to parse physical paper challans.
*   **Auto-Extraction**: Instantly extracts ticket numbers, vehicle details, violation codes, and RTO fine amounts from simple camera/image uploads.

### 7. 📋 Pre-Drive Compliance Audit
*   **Proactive Document Check**: Prevents penalty traps by running automated audit checks on vehicle documents, including **PUC (Pollution Under Control) certificate, insurance policies, and driving licenses**.
*   **Smart Reminders**: Alerts users ahead of document expirations to secure renewals before driving.

### 8. ⚠️ Active Enforcement Zone Alerts
*   **Safety Warning System**: Detects nearby active enforcement cameras, speed traps, speed limits, and high-accident zones.
*   **Prevention Warnings**: Pattern recognition system alerts users to speed cameras on their route to prevent automated speed-challan penalties.

### 9. ⚖️ AI Scenario Simulator
*   **Compound Fine Sandbox**: Interactive playground showing users how driving violations compound financially over time if left unresolved.
*   **Legal Courtroom Defense**: Prepares drivers with legal arguments, dispute letters, and rights representation guidelines.

### 10. 📊 RTO Governance Mode (Admin Dashboard)
*   **Authority Dashboard**: Shift to "Governance Mode" to view repeat offender directories, district-wise compliance analytics, speed camera audits, and regional revenue maps.

---

## 🛠️ Tech Stack & Architecture

### **Frontend & Framework**
*   **React 18** (Vite-powered for lightning-fast HMR and bundling)
*   **Tailwind CSS** (Custom theme configuration, glassmorphism UI utilities, dark/light modes)
*   **Lucide React** (Vector iconography)

### **State & Context**
*   **AppStateContext**: Manages user authentication, garage vehicles, active tickets, offline emulation, and simulated location coordinates.
*   **GlobalContext**: Drives localization state, the 22-language translation engine, and visual transition overlays.

---

## 📦 Core Directories

```
drivelegal/
├── src/
│   ├── components/       # Reusable UI widgets (Header, TopBar, BottomNav, ThemeToggle, etc.)
│   ├── context/          # State managers (AppStateContext, GlobalContext)
│   ├── data/             # Static datasets (Translations DB, global rules, RTO matrices)
│   ├── screens/          # Core views (Dashboard, AI Advisor, Scenario Simulator, Admin, etc.)
│   ├── App.jsx           # Main routing and screen coordinator
│   ├── index.css         # Custom utility styles, animation keyframes, and base theme tokens
│   └── main.jsx          # App entrypoint
├── public/               # Static assets & icons
├── tailwind.config.js    # Premium Tailwind typography and custom color configurations
└── package.json          # Package dependencies
```

---

## 🏁 Quick Start & Local Setup

### **Prerequisites**
Make sure you have [Node.js](https://nodejs.org/) installed.

### **1. Clone & Install Dependencies**
```bash
# Navigate to project directory
cd drivelegal

# Install npm packages
npm install
```

### **2. Launch Development Server**
```bash
npm run dev
```
Open the local address [http://localhost:5173](http://localhost:5173) in your browser or explore the live production deployment at [https://drive-legal-seven.vercel.app](https://drive-legal-seven.vercel.app) to experience the application!

### **3. Production Build**
```bash
npm run build
```

---

## 🏆 Development Team
*   **Team Name**: Team Achievers
*   **Institution**: Baderia Global Institute of Engineering and Management, Jabalpur
*   **Project Context**: Civic-Tech / Legal-Tech AI Application Portfolio

---
<div align="center">
  <sub>Drive Safe. Comply Legally. Powered by <b>DRIVELEGAL</b>.</sub>
</div>
