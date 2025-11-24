"use client";

import React, { useState, useMemo, useEffect } from "react";
import { enhanceTokenData, mockTokens } from "./tokenUtils.ts";
import ColumnSection from "./ColumnSection.tsx";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setTokens } from "../slices/tokenSlice";


// --- Main Component ---
const Main: React.FC = () => {
  const [searchTerm] = useState('');
  const dispatch = useDispatch();
  const tokens = useSelector((state: RootState) => state.token.tokens);

  useEffect(() => {
    if (!tokens || tokens.length === 0) {
      dispatch(setTokens(enhanceTokenData(mockTokens)));
    }
  }, [dispatch, tokens]);

  const categorizedTokens = useMemo(() => {
    const filtered = tokens.filter(token =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      new: filtered.filter(token => token.category === 'new'),
      final: filtered.filter(token => token.category === 'final'),
      migrated: filtered.filter(token => token.category === 'migrated')
    };
  }, [tokens, searchTerm]);
  
  return (
    <div className="h-full bg-[#0A0A0A] text-white flex flex-col items-center overflow-hidden">
      
      {/* Card-like Frame for Columns - RESPONSIVE DESIGN */}
      <div className="flex justify-center w-full h-full overflow-hidden px-2 sm:px-4 md:px-6" style={{
        marginTop: '0px',
        position: 'relative'
      }}>
        <div
          className="rounded-2xl shadow-2xl border border-[#1A1A1A] flex flex-col md:flex-row overflow-hidden"
          style={{ 
            width: '100%',
            maxWidth: 'calc(100vw - 16px)', // Mobile: 8px margin on each side
            height: 'calc(100vh - 110px)', // Perfect fit with small gap
            position: 'relative', 
            zIndex: 10,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            backgroundColor: '#101114'
          }}
        >
          {/* Frame structure that fits entire viewport - RESPONSIVE */}
          <div className="flex-1 h-full overflow-y-auto border-b md:border-b-0 md:border-r border-gray-700">
            <ColumnSection
              title="New Pairs"
              tokens={categorizedTokens.new}
              count={categorizedTokens.new.length}
              isNewPairs={true}
            />
          </div>
          <div className="flex-1 h-full overflow-y-auto border-b md:border-b-0 md:border-r border-gray-700">
            <ColumnSection
              title="Final Stretch"
              tokens={categorizedTokens.final}
              count={categorizedTokens.final.length}
              isNewPairs={true}
            />
          </div>
          <div className="flex-1 h-full overflow-y-auto">
            <ColumnSection
              title="Migrated"
              tokens={categorizedTokens.migrated}
              count={categorizedTokens.migrated.length}
              isNewPairs={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
