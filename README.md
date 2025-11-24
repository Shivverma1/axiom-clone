

---

# 🪙 Axiom Pulse – Token Discovery & Trading UI (Clone)

A pixel-perfect, high-performance clone of the **Axiom Pulse Token Discovery Interface**, built using **Next.js 15**, **TypeScript**, **Tailwind CSS**, and a clean modular architecture.

This project replicates the interactive token discovery experience with real-time UI updates, trading interface, advanced navigation, and responsive layouts.

---

## 🚀 Deployment

This project is live and deployed on **Vercel**:

### 🔗 **Production URL**

👉 [https://axiom-clone-iota.vercel.app](https://axiom-clone-iota.vercel.app)

### 🔄 **Latest Build Preview**

👉 [https://axiom-clone-ksgabttxd-shivshankar-vermas-projects.vercel.app](https://axiom-clone-ksgabttxd-shivshankar-vermas-projects.vercel.app)

Every push to the `main` branch automatically triggers a new deployment via GitHub → Vercel CI/CD.

---

## ⚙️ Tech Stack

### **Frontend**

* Next.js 15 (App Router)
* React 18
* TypeScript
* Tailwind CSS
* Remix Icons
* Next/Image optimization

### **State & Logic**

* Redux Toolkit (Global State)
* React Context (TradingProvider)
* Custom hooks
* Modular, scalable architecture

### **Deployment**

* Vercel (CI/CD)
* GitHub

---

## 📂 Folder Structure

```bash
src/
├── app/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── SecondaryNav.tsx
│   │   ├── ControlBar.tsx
│   │   ├── TokenCard.tsx
│   │   ├── NewPairsTokenCard.tsx
│   │   ├── TradingInterface.tsx
│   │   ├── ReduxProvider.tsx
│   │   ├── Main.tsx
│   │   └── ...
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── app/slices/
│   ├── tokenSlice.ts
│   ├── tabsSlice.ts
│   └── presetSlice.ts
│
├── app/store.ts
└── utils/
    └── tokenUtils.ts
```

---

## ✨ Features

### 🎨 Pixel-perfect UI

* Matches Axiom Pulse spacing, typography, shadows, gradients, and interactions.

### 📱 Fully Responsive

Designed and tested from **320px mobile** up to **4K monitors**.

### 🪙 Token Sections

* New Pairs
* Final Stretch
* Migrated Tokens
* Token Cards with charts and performance indicators

### ⚡ Trading Interface Modal

* Opens when a token is selected
* Displays chart, details, and trading controls
* Fully controlled by Redux + Trading Context

### 🔄 Global State Management

Redux Toolkit handles:

* Selected token
* Modal open/close
* Token lists
* Presets
* Tabs

### 🔍 Advanced Navigation

* Sticky Header
* Secondary Nav (Discover, Trackers, Yield, etc.)
* Search bar
* Deposit button
* Icon action cluster

### 📊 Charts (Lightweight Mock)

* Sparkline token trend charts
* Real-time visual updates (mock data for now)

---

## 🛠 Local Development

Clone the repo:

```bash
git clone https://github.com/Shivverma1/axiom-clone.git
cd axiom-clone
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🚀 Deploying to Vercel Manually

If needed:

```bash
vercel --prod
```

Or let GitHub → Vercel auto-deploy from the `main` branch.

---

## 📸 Screenshots

(Add screenshots whenever you're ready)

---

## 🎥 Demo Video (YouTube)

(Add your 1–2 minute demo video link here)

---

## 🧪 Known Limitations

* Token price data uses mock values (replace with WebSocket feed later)
* Mini charts use lightweight placeholder logic
* Sorting & filtering partially implemented

---

## 🔮 Future Enhancements

* Live WebSocket updates
* TradingView chart integration
* Wallet connect system
* Advanced sorting, filtering, and pagination
* Token metadata API integration

---

## 👨‍💻 Author

**Shivshankar Verma**
GitHub: [https://github.com/Shivverma1](https://github.com/Shivverma1)
LinkedIn: [https://www.linkedin.com/in/shivshankar-verma-21207b230/](https://www.linkedin.com/in/shivshankar-verma-21207b230/)

---

## 📝 License

This project is for educational and demonstrative purposes only.
Not affiliated with Axiom or its official products.

---

If you want a **README with images**, badges, tech stack icons, or GIF demo, I can create a premium version too.
