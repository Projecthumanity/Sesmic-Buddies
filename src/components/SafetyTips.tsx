
import React from 'react';
import { AlertCircle, Shield, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SafetyTips: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold tracking-tight">{t('safetyTips')}</h2>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        {/* Before Earthquake */}
        <div className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">{t('beforeEarthquake')}</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5"></div>
              <span>{t('tip1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5"></div>
              <span>{t('tip2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5"></div>
              <span>{t('tip3')}</span>
            </li>
          </ul>
        </div>
        
        {/* During Earthquake */}
        <div className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <h3 className="font-semibold">{t('duringEarthquake')}</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-1.5"></div>
              <span>{t('tip4')}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-1.5"></div>
              <span>{t('tip5')}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-1.5"></div>
              <span>{t('tip6')}</span>
            </li>
          </ul>
        </div>
        
        {/* After Earthquake */}
        <div className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <h3 className="font-semibold">{t('afterEarthquake')}</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
              <span>{t('tip7')}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
              <span>{t('tip8')}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
              <span>{t('tip9')}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;
