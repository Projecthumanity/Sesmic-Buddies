
import React, { useState } from 'react';
import { Check, Copy, KeyRound } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface ApiPortalProps {
  onClose?: () => void;
}

const ApiPortal: React.FC<ApiPortalProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Generate a one-time API key
  const generateApiKey = () => {
    // Create a random API key
    const randomKey = Array(32)
      .fill(0)
      .map(() => Math.round(Math.random() * 15).toString(16))
      .join('');
    
    const formattedKey = `sesmicbuddy_${randomKey}`;
    setApiKey(formattedKey);
    
    toast({
      title: t('apiKeyGenerated'),
      description: t('apiKeyInfo'),
    });
  };
  
  // Copy API key to clipboard
  const copyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      
      toast({
        title: t('apiKeyCopied'),
        duration: 2000,
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };
  
  return (
    <div className="space-y-4 py-2">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            {t('apiComingSoon')}
          </CardTitle>
          <CardDescription>{t('apiComingSoonDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('apiUnderDevelopment')}
          </p>
          <div className="bg-muted p-4 rounded-md">
            <h4 className="font-medium mb-2 text-sm">{t('plannedFeatures')}</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{t('apiFeature1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{t('apiFeature2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{t('apiFeature3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{t('apiFeature4')}</span>
              </li>
            </ul>
          </div>
          <p className="text-xs text-muted-foreground italic">
            {t('apiStayTuned')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiPortal;
