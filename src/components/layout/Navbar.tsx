import React, { useState } from 'react';
import type { ScreenName } from '../../types';
import { Compass, Tent, Calendar, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { screen: ScreenName; label: string; icon: React.ReactNode }[] = [
    {
      screen: 'accueil',
      label: 'Accueil',
      icon: <Compass className="w-4 h-4" aria-hidden="true" />,
    },
    {
      screen: 'explorer',
      label: 'Explorer les bivouacs',
      icon: <Tent className="w-4 h-4" aria-hidden="true" />,
    },
    {
      screen: 'reservation',
      label: 'Réserver un séjour',
      icon: <Calendar className="w-4 h-4" aria-hidden="true" />,
    },
  ];

  const handleNavClick = (screen: ScreenName) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border/80 bg-surface-ground/90 backdrop-blur-md">
      <a href="#main-content" className="skip-link">
        Passer directement au contenu principal
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-18">
        {/* Logo de marque */}
        <button
          type="button"
          onClick={() => handleNavClick('accueil')}
          className="group flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-700 rounded-lg p-1"
          aria-label="Bivouac Sauvage - Retour à l'accueil"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-700 text-surface-ground shadow-sm transition-transform group-hover:scale-105">
            <Tent className="w-5 h-5 text-accent-400 stroke-[2.2]" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-extrabold tracking-tight text-forest-900 leading-none">
              BIVOUAC SAUVAGE
            </span>
            <span className="text-[11px] font-medium text-forest-600 tracking-wider uppercase mt-1">
              Montagne de Reims
            </span>
          </div>
        </button>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                type="button"
                onClick={() => handleNavClick(item.screen)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all min-h-[44px] cursor-pointer ${
                  isActive
                    ? 'bg-forest-700 text-surface-ground shadow-xs'
                    : 'text-text-main hover:bg-forest-100/60 hover:text-forest-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* CTA Réserver Rapide (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-forest-700 font-medium bg-forest-100/80 px-2.5 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-forest-700" aria-hidden="true" />
            <span>Éco-domaine certifié</span>
          </div>
        </div>

        {/* Bouton Menu Mobile (min-h 44px) */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu de navigation'}
            className="flex items-center justify-center p-2.5 rounded-lg text-text-main hover:bg-forest-100 focus-visible:outline-2 focus-visible:outline-forest-700 min-h-[44px] min-w-[44px]"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Déroulant Mobile */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-b border-surface-border bg-surface-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2"
        >
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  type="button"
                  onClick={() => handleNavClick(item.screen)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all min-h-[44px] text-left ${
                    isActive
                      ? 'bg-forest-700 text-surface-ground'
                      : 'text-text-main hover:bg-forest-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
