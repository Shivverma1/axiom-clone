// Token interfaces and helpers extracted from Main.tsx

export interface Token {
  id: number;
  name: string;
  symbol: string;
  age: string;
  marketCap: number;
  price: number;
  volume24h: number;
  transactions24h: number;
  priceChange24h: number;
  image: string;
}

export interface EnhancedToken extends Token {
  category: "new" | "final" | "migrated";
  mcValue: string;
  priceValue: string;
  txValue: string;
  holders: number;
  creator: string;
  buys: number;
  sells: number;
  change5m: number;
  change1h: number;
  change24h: number;
}

export const mockTokens: Token[] = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    age: "3",
    marketCap: 7000,
    price: 5000,
    volume24h: 7000,
    transactions24h: 7,
    priceChange24h: 16,
    image: "/images/bitcoin.jpg",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    age: "8",
    marketCap: 5000,
    price: 0,
    volume24h: 0,
    transactions24h: 0,
    priceChange24h: 7,
    image: "/images/ethereum.jpg",
  },
  {
    id: 3,
    name: "Dogecoin",
    symbol: "DOGE",
    age: "14",
    marketCap: 5000,
    price: 134,
    volume24h: 11000,
    transactions24h: 11,
    priceChange24h: 2,
    image: "/images/dogecoin.webp",
  },
  {
    id: 4,
    name: "Litecoin",
    symbol: "LTC",
    age: "14",
    marketCap: 5000,
    price: 1,
    volume24h: 4000,
    transactions24h: 4,
    priceChange24h: 0,
    image: "/images/litecoin.jpg",
  },
  {
    id: 5,
    name: "Solana",
    symbol: "SOL",
    age: "16",
    marketCap: 5000,
    price: 2000,
    volume24h: 7000,
    transactions24h: 7,
    priceChange24h: -5,
    image: "/images/solana.jpg",
  },
  {
    id: 6,
    name: "Binance Coin",
    symbol: "BNB",
    age: "10",
    marketCap: 6000,
    price: 1800,
    volume24h: 6000,
    transactions24h: 6,
    priceChange24h: 4,
    image: "/images/binance.jpg",
  },
];

export const formatMarketCap = (mc: number): string => {
  if (mc >= 1000000) return `$${(mc / 1000000).toFixed(1)}M`;
  if (mc >= 1000) return `$${(mc / 1000).toFixed(0)}K`;
  return `$${mc}`;
};

export const formatPrice = (price: number): string => {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(0)}M`;
  if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
  return `$${price}`;
};

export const formatNumber = (num: number, decimals = 0): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const enhanceTokenData = (tokens: Token[]): EnhancedToken[] => {
  const expandedTokens: Token[] = [];
  for (let i = 0; i < 8; i++) {
    expandedTokens.push(...tokens.map(token => ({
      ...token,
      id: token.id + (i * 100),
      name: `${token.name}_${i + 1}`,
      symbol: `${token.symbol}_${i + 1}`
    })));
  }

  return expandedTokens.map((token, index) => {
    let category: 'new' | 'final' | 'migrated' = 'migrated';
    const categoryIndex = index % 3;
    if (categoryIndex === 0) {
      category = 'new';
    } else if (categoryIndex === 1) {
      category = 'final';
    } else {
      category = 'migrated';
    }
    const deterministicSeed = token.id + index;
    const holders = (deterministicSeed * 7) % 100;
    const creator = `Creator_${(deterministicSeed * 13) % 100000}`;
    const buys = Math.floor(token.transactions24h * 0.6);
    const sells = Math.floor(token.transactions24h * 0.4);
    const change5m = ((deterministicSeed * 3) % 20) - 10;
    const change1h = ((deterministicSeed * 5) % 30) - 15;
    const change24h = token.priceChange24h + ((deterministicSeed * 2) % 10) - 5;
    return {
      ...token,
      category,
      mcValue: formatMarketCap(token.marketCap),
      priceValue: formatPrice(token.price),
      txValue: formatNumber(token.volume24h / 1000, 2) + 'K',
      holders,
      creator,
      buys,
      sells,
      change5m,
      change1h,
      change24h
    };
  });
};
