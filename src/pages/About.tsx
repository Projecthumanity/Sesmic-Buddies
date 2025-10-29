import React from 'react';
import { Mail, Globe, Users, Shield, Activity, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NavBar from '@/components/NavBar';
import { useLanguage } from '@/contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="max-w-6xl mx-auto px-6 py-12 animate-fade-in">
        <div className="space-y-8">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight">
              {t('aboutTitle')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('aboutSubtitle')}
            </p>
          </section>

          {/* Mission Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t('ourMission')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t('missionDescription')}
              </p>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                {t('keyFeatures')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">{t('feature1Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('feature1Description')}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">{t('feature2Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('feature2Description')}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">{t('feature3Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('feature3Description')}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">{t('feature4Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('feature4Description')}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">{t('feature5Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('feature5Description')}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">{t('feature6Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('feature6Description')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Developer Section */}
          <Card>
            <CardHeader>
              <CardTitle>{t('developer')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('developerDescription')}
              </p>
            </CardContent>
          </Card>

          {/* Open Contribution */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                {t('openContribution')}
              </CardTitle>
              <CardDescription>{t('openContributionTagline')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                {t('contributionDescription')}
              </p>
              
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t('getInvolved')}
                </h4>
                <div className="space-y-2 text-sm">
                  <a 
                    href="mailto:humanityproject123@gmail.com"
                    className="block text-primary hover:underline"
                  >
                    humanityproject123@gmail.com
                  </a>
                  <a 
                    href="mailto:sandeshbastola19@gmail.com"
                    className="block text-primary hover:underline"
                  >
                    sandeshbastola19@gmail.com
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {t('waysToContribute')}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{t('contribute1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{t('contribute2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{t('contribute3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{t('contribute4')}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
