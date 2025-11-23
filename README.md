# 📦 BudgetBox

> **Offline-First Personal Budgeting Application**  
> Built with Next.js 15, Express, and Zustand — featuring real-time sync, glassmorphism UI, and local-first architecture.

---

## 🎯 Features

### Core Functionality
- ✅ **Offline-First Architecture** - Works completely offline with local storage persistence
- ✅ **Auto-Save** - Every keystroke is saved locally instantly
- ✅ **Smart Sync** - Syncs to server when internet is available
- ✅ **Real-time Analytics** - Burn rate, savings potential, and month-end predictions
- ✅ **AI Insights** - Rule-based warnings for spending anomalies
- ✅ **Interactive Charts** - Expense breakdown with Recharts pie charts

### UI/UX
- 🎨 **Ultra-Premium Dark Theme** - Glassmorphism effects with mesh gradients
- 🌙 **Modern Design** - Clean, spacious layout with micro-interactions
- 📱 **Fully Responsive** - Optimized for all screen sizes
- 🔐 **Secure Login** - Client-side authentication with logout functionality
- 🔄 **Live Sync Indicator** - Real-time connection and sync status

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **State Management:** Zustand with persist middleware
- **Styling:** Tailwind CSS 4
- **Charts:** Recharts
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** JSON file-based storage
- **CORS:** Enabled for cross-origin requests

---

## 📦 Setup & Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Backend Setup
```bash
cd backend
npm install
node server.js
```
Server runs on **http://localhost:3002**

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on **http://localhost:3000**

---

## 🔐 Demo Credentials

**Email:** `hire-me@anshumat.org`  
**Password:** `HireMe@2025!`

---

## 🧪 Testing Offline Mode

1. Open the app at `http://localhost:3000`
2. Sign in with demo credentials
3. Open DevTools → Network Tab → Set to "Offline"
4. Add/edit budget items
5. Refresh the page → Data persists
6. Re-enable network → Click "Sync Now"
7. Check `backend/database.json` for synced data

---

## 📊 Project Structure

```
Assignment A – BudgetBox/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── BudgetForm.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── SyncIndicator.tsx
│   │   ├── store/
│   │   │   └── useBudgetStore.ts
│   │   └── types/
│   │       └── index.ts
│   └── package.json
└── backend/
    ├── server.js
    ├── database.json (auto-generated)
    └── package.json
```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

### Backend (Railway/Render)
```bash
cd backend
# Deploy to Railway or Render
# Set PORT environment variable to 3002
```

### Environment Variables
- **Frontend:** `NEXT_PUBLIC_API_URL=https://your-backend.com`
- **Backend:** `PORT=3002`

---

## 🎨 Design Highlights

- **Glassmorphism Cards** - Subtle backdrop-blur with border transparency
- **Mesh Gradients** - Dynamic background with radial gradients
- **Rounded Corners** - Consistent 3xl rounding for modern feel
- **Micro-interactions** - Smooth hover states and scale transforms
- **Typography** - Precise tracking and font weights for clarity

---

## 📄 License

MIT License - Built for assignment submission

---

**Made with 💜 by [SYED SHUJATULLAH]**
