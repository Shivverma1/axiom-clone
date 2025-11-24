Certainly! Here’s the updated README for your repo without the license section:

# Token Discovery Table – Axiom Trade Replica

A pixel-perfect, high-performance clone of the Axiom Trade token discovery table—built and deployed in just 48 hours. This application demonstrates advanced Next.js practices, real-time price updates, accessibility, and a fully responsive UI engineered with a modern, enterprise-quality React stack.

## 🚀 Live Demo & Key Links

- **🔴 Live App:** [https://token-trading-table-topaz.vercel.app/](https://token-trading-table-topaz.vercel.app/)  
- **🗂️ GitHub Repository:** [https://github.com/ak-8225/Token_trading_table](https://github.com/ak-8225/Token_trading_table)  
- **▶️ YouTube Demo Video:** [https://www.youtube.com/watch?v=zAQHvzR1-3E](https://www.youtube.com/watch?v=zAQHvzR1-3E)  

## ✨ Features

- **Pixel-Perfect Replica:** Matches Axiom Trade Pulse’s token table UI to within 2px.  
- **Real-Time Price Updates:** Mocked WebSocket streams animated token price changes—smooth color transitions on every update.  
- **Full Interactivity:**  
  - Sortable, accessible columns for New Pairs, Final Stretch, and Migrated.  
  - Popovers, tooltips, and modals with Radix UI & shadcn/ui.  
  - Advanced hover and click states.  
- **Responsive Design:** Fully fluid UI down to 320px (mobile), with layout snapshots in the repo.  
- **Loading, Error, and Empty States:** Skeleton loaders, shimmer effects, progressive rendering, and robust error boundaries.  
- **Performance-Optimized:**  
  - Memoized components, zero layout shifts,   
  
  
  
  
  
  
  
  

## 🏗️ Getting Started

**Requirements:** Node.js v18+; npm, yarn, pnpm, or bun.

**Clone & Install:**

```bash
git clone https://github.com/ak-8225/Token_trading_table
cd Token_trading_table
# Install dependencies (choose one package manager)
npm install   # or yarn or pnpm or bun install
```

**Run in development:**

```bash
npm run dev   # or yarn dev or pnpm dev or bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## 📚 Project Structure Highlights

- `store.ts` — Redux root store with token, tabs, preset slices  
- `tokenSlice.ts` — All token data state/logic  
- `tabsSlice.ts` — Tab navigation state  
- `presetSlice.ts` — Preset and current preset selection state  
- `Main.tsx` — Main content consuming token state from Redux  
- `Footer.tsx` — Uses Redux for tabs and presets  
- `ReduxProvider.tsx` — Provider wrapper  
- `AppLayout.tsx` — Integrates ReduxProvider globally  
- Custom hooks and DRY utilities throughout

## 🌐 Deployment
<img width="1439" height="816" alt="Screenshot 2<img width="464" height="629" alt="Screenshot 2025-07-27 at 11 53 16 PM" src="https://github.com/user-attachments/assets/80a92f0c-e47f-471b-a498-dafbe86af795" />
025-07-27 at 11 52 24 PM" src="https://github.com/user-attachments/assets/f4326863-45d5-455f-9580-30c2e34350aa" />
<img width="464" h<img width="486" height="623" alt="Screenshot 2025-07-27 at 11 54 13 PM" src="https://github.com/user-attachments/assets/3ce06a6b-54fb-440d-bbd1-a5fb447e456a" />
eight<img width="488" height="630" alt="Screenshot 2025-07-27 at 11 55 25 PM" src="https://github.com/user-attachments/assets/fd571fe1-686b-4bfe-a7f8-eb494278057e" />
="638" alt="Screenshot 2025-07-27 at 11 53 50 PM" src="https://github.com/u<img width="1440" height="56" alt="Screenshot 2025-07-27 at 11 55 45 PM" src="https://github.com/user-attachments/assets/0fde0541-73e2-4927-843f-ec2b5f1f4ec4" />
ser-attachments/assets/420904f0-c15e-4d8e-bece-5600c7bbc31b" />
<img width="1440" height="42" alt="Scre<img width="396" height="656" alt="Screenshot 2025-07-27 at 11 56 14 PM" src="https://github.com/user-attachments/assets/b5e62bd8-c9ec-4c66-92dd-c8f8661207a2" />
enshot 2025-07-27 at 11 55 57 PM" src="https://github.com/user-attachments/assets/4a2b8ff9-2fac-49a0-90ea-4c6feb9c8080" />

Deployed with [Vercel](https://vercel.com) for global scale.  


## 🔗 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)  
- [Redux Toolkit](https://redux-toolkit.js.org/)  
- [React Query](https://react-query.tanstack.com/)  
- [Radix UI](https://www.radix-ui.com/)  
- [Tailwind CSS](https://tailwindcss.com/)  

**Thanks for checking out the project! Star ⭐ the repo, try the live demo, and watch the [video walkthrough](https://www.youtube.com/watch?v=zAQHvzR1-3E) for a full breakdown.**  
Feedback and contributions are always welcome!
