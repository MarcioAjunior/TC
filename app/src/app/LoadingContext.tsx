'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoadingContextProps {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    needReload: boolean;
    setNeedReload: (needReload: boolean) => void;
  }
  

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [needReload, setNeedReload] = useState(false);
  
    return (
      <LoadingContext.Provider value={{ loading, setLoading, needReload, setNeedReload }}>
        {children}
      </LoadingContext.Provider>
    );
  };


export const useLoadingContext = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
      throw new Error('useLoadingContext must be used within a LoadingProvider');
    }
    return context;
  };
