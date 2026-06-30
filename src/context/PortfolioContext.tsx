import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { projects, type Project } from '../data/projects';

interface PortfolioContextValue {
  activeProject: Project | null;
  activeIndex: number;
  openProject: (index: number) => void;
  closeProject: () => void;
  nextProject: () => void;
  prevProject: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const openProject = useCallback((index: number) => setActiveIndex(index), []);
  const closeProject = useCallback(() => setActiveIndex(-1), []);

  const nextProject = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const prevProject = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  const activeProject = activeIndex >= 0 ? projects[activeIndex] : null;

  return (
    <PortfolioContext.Provider
      value={{ activeProject, activeIndex, openProject, closeProject, nextProject, prevProject }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
