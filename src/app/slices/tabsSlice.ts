import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Tab {
  key: string;
  label: string;
  alert: number | null;
  iconClass: string;
  closeable: boolean;
}

const initialTabs: Tab[] = [
  {
    key: "wallet",
    label: "Wallet Tracker",
    alert: 2,
    iconClass: "ri-wallet-3-line",
    closeable: false,
  },
  {
    key: "twitter",
    label: "Twitter Tracker",
    alert: 1,
    iconClass: "ri-twitter-x-line",
    closeable: false,
  },
  {
    key: "pulse",
    label: "Pulse Tracker",
    alert: 3,
    iconClass: "ri-pulse-line",
    closeable: false,
  },
  {
    key: "pnl",
    label: "PnL Tracker",
    alert: null,
    iconClass: "ri-bar-chart-line",
    closeable: false,
  },
];

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: initialTabs,
  reducers: {
    setTabs(state, action: PayloadAction<Tab[]>) {
      return action.payload;
    },
    closeTab(state, action: PayloadAction<string>) {
      return state.filter(tab => tab.key !== action.payload);
    },
  },
});

export const { setTabs, closeTab } = tabsSlice.actions;
export default tabsSlice.reducer;
