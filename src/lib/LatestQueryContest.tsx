import React, { createContext, useState, useContext } from "react";

type LatestQueryContextType = {
  latestQuery: string | null;
  setLatestQuery: (query: string) => void;
};

const LatestQueryContext = createContext<LatestQueryContextType | undefined>(
  undefined
);

export const LatestQueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [latestQuery, setLatestQuery] = useState<string | null>(null);

  return (
    <LatestQueryContext.Provider value={{ latestQuery, setLatestQuery }}>
      {children}
    </LatestQueryContext.Provider>
  );
};

export const useLatestQuery = () => {
  const context = useContext(LatestQueryContext);
  if (!context) {
    throw new Error("useLatestQuery must be used within a LatestQueryProvider");
  }
  return context;
};
