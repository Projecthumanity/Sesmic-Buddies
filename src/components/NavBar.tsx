
import React, { useState } from 'react';
import { Activity, Languages, Globe, KeyRound, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import ApiPortal from './ApiPortal';

const NavBar: React.FC = () => {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [isApiPortalOpen, setIsApiPortalOpen] = useState(false);
  
  return (
    <header className="w-full py-4 px-6 animate-fade-in bg-gradient-to-r from-blue-500 to-primary">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Globe className="h-6 w-6 text-white" />
            <h1 className="text-2xl font-display font-semibold tracking-tight text-white">
              {t('appTitle')}
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white">
              <Languages className="h-4 w-4" />
              <span className="text-sm font-medium">
                {availableLanguages.find(lang => lang.code === language)?.nativeName || language}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {availableLanguages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? "bg-accent" : ""}
                >
                  <span className="mr-2">{lang.nativeName}</span>
                  <span className="text-xs text-muted-foreground">{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/about">
            <button className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white">
              <Info className="h-4 w-4" />
              <span className="text-sm font-medium">{t('about')}</span>
            </button>
          </Link>
          
          <Dialog open={isApiPortalOpen} onOpenChange={setIsApiPortalOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white">
                <KeyRound className="h-4 w-4" />
                <span className="text-sm font-medium">{t('getApi')}</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t('apiPortal')}</DialogTitle>
              </DialogHeader>
              <ApiPortal onClose={() => setIsApiPortalOpen(false)} />
            </DialogContent>
          </Dialog>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-white">
              {t('realTimeMonitoring')}
            </span>
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse-light"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
