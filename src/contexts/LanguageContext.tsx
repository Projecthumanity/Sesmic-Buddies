
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the translations for all supported languages
export const translations = {
  en: {
    // NavBar
    appTitle: "SeismicBuddy",
    realTimeMonitoring: "Real-time Monitoring",
    getApi: "Get API",
    
    // Main page
    pageTitle: "Earthquake Monitor",
    pageDescription: "Real-time monitoring of earthquake activity around the world, with customizable alerts and visualization.",
    recentEarthquakes: "Recent Earthquakes",
    events: "events",
    noEarthquakes: "No earthquakes to display",
    loadingData: "Loading earthquake data...",
    
    // Alert Settings
    alertSettings: "Alert Settings",
    magnitudeThreshold: "Magnitude Threshold",
    distanceThreshold: "Distance Threshold",
    kilometers: "km",
    soundAlerts: "Sound Alerts",
    enableSound: "Enable Sound",
    disableSound: "Disable Sound",
    
    // Earthquake Card
    intensity: "intensity",
    low: "low",
    moderate: "moderate",
    high: "high",
    severe: "severe",
    
    // Felt It Button
    feltIt: "Felt It!",
    thankYou: "Thank you for your report!",
    
    // Safety Tips
    safetyTips: "Safety Tips",
    beforeEarthquake: "Before an Earthquake",
    duringEarthquake: "During an Earthquake",
    afterEarthquake: "After an Earthquake",
    tip1: "Identify safe places in each room",
    tip2: "Secure heavy furniture and objects",
    tip3: "Make an emergency plan",
    tip4: "Drop, Cover, and Hold On",
    tip5: "Stay away from windows",
    tip6: "If outdoors, stay in open areas",
    tip7: "Check for injuries and damage",
    tip8: "Listen to authorities",
    tip9: "Be prepared for aftershocks",
    
    // History
    earthquakeHistory: "Earthquake History",
    last24Hours: "Last 24 Hours",
    noHistory: "No earthquake history to display",
    
    // API Portal
    apiPortal: "API Portal",
    getApiKey: "Get API Key",
    apiKeyGenerated: "Your API key has been generated",
    apiKeyInfo: "This key will expire in 24 hours",
    apiEndpoints: "API Endpoints",
    endpointDescription: "Use this endpoint to get earthquake data",
    copyApiKey: "Copy API Key",
    apiKeyCopied: "API Key copied to clipboard!",
    
    // Footer
    footerText: "Earthquake data provided by multiple trusted sources:",
    footerGeoNet: "GeoNet: New Zealand Seismic Monitoring System",
    footerEmsc: "EMSC: European-Mediterranean Seismological Centre",
    footerUsgs: "USGS: United States Geological Survey",
    footerJma: "JMA: Japan Meteorological Agency",
    footerGlobalQuake: "GlobalQuake: Aggregated Global Earthquake Data",
    dataUpdateFrequency: "Data is updated every minute",
    dataDisclaimer: "Information may be delayed or incomplete",
    
    // About Page
    about: "About",
    aboutTitle: "About Earthquake Monitor",
    aboutSubtitle: "A real-time earthquake monitoring system designed to keep you informed and safe",
    ourMission: "Our Mission",
    missionDescription: "Earthquake Monitor is a real-time earthquake tracking application that provides up-to-the-minute information about seismic activities worldwide. Our goal is to keep communities informed and prepared for potential seismic events.",
    keyFeatures: "Key Features",
    feature1Title: "Real-time Monitoring",
    feature1Description: "Live earthquake data from USGS and GlobalQuake networks",
    feature2Title: "Interactive Map",
    feature2Description: "Visualize earthquakes globally with color-coded magnitude indicators",
    feature3Title: "Custom Alerts",
    feature3Description: "Set magnitude and distance thresholds for personalized notifications",
    feature4Title: "Felt Reports",
    feature4Description: "Community-driven reporting system to share earthquake experiences",
    feature5Title: "Safety Information",
    feature5Description: "Access earthquake safety tips and guidelines",
    feature6Title: "Multi-language Support",
    feature6Description: "Available in multiple languages worldwide",
    developer: "Developer",
    developerDescription: "Developed by Sandesh Bastola, this project represents a commitment to public safety and community awareness through technology.",
    openContribution: "Open Contribution",
    openContributionTagline: "This is an open contribution project - everyone is welcome to contribute!",
    contributionDescription: "We believe in the power of community collaboration. Whether you're a developer, designer, translator, or someone passionate about disaster preparedness, your contributions are valuable.",
    getInvolved: "Get Involved",
    waysToContribute: "Ways to Contribute",
    contribute1: "Report bugs and suggest features",
    contribute2: "Improve documentation and translations",
    contribute3: "Add new data sources and features",
    contribute4: "Enhance UI/UX design",
    
    // API Portal Coming Soon
    apiComingSoon: "API Coming Soon",
    apiComingSoonDescription: "We're working hard to bring you earthquake data APIs",
    apiUnderDevelopment: "Our API is currently under active development. Soon you'll be able to access real-time earthquake data programmatically.",
    plannedFeatures: "Planned Features:",
    apiFeature1: "RESTful API for earthquake data",
    apiFeature2: "Historical earthquake queries",
    apiFeature3: "Real-time WebSocket connections",
    apiFeature4: "Comprehensive API documentation",
    apiStayTuned: "Stay tuned for updates!"
  },
  ne: {
    // NavBar
    appTitle: "भूकम्प मित्र",
    realTimeMonitoring: "वास्तविक समय निगरानी",
    getApi: "API प्राप्त गर्नुहोस्",
    
    // Main page
    pageTitle: "भूकम्प मोनिटर",
    pageDescription: "अनुकूलित अलर्ट र दृश्यावलोकन सहित विश्वभर भूकम्प गतिविधिको वास्तविक समय निगरानी।",
    recentEarthquakes: "हालैका भूकम्पहरू",
    events: "घटनाहरू",
    noEarthquakes: "प्रदर्शन गर्न कुनै भूकम्प छैन",
    loadingData: "भूकम्प डाटा लोड हुँदैछ...",
    
    // Alert Settings
    alertSettings: "अलर्ट सेटिङ्स",
    magnitudeThreshold: "आयाम थ्रेसहोल्ड",
    distanceThreshold: "दूरी थ्रेसहोल्ड",
    kilometers: "किमी",
    soundAlerts: "ध्वनि अलर्ट",
    enableSound: "ध्वनि सक्षम गर्नुहोस्",
    disableSound: "ध्वनि अक्षम गर्नुहोस्",
    
    // Earthquake Card
    intensity: "तीव्रता",
    low: "कम",
    moderate: "मध्यम",
    high: "उच्च",
    severe: "गम्भीर",
    
    // Felt It Button
    feltIt: "मैले महसुस गरें!",
    thankYou: "तपाईंको रिपोर्टको लागि धन्यवाद!",
    
    // Safety Tips
    safetyTips: "सुरक्षा टिप्स",
    beforeEarthquake: "भूकम्प अघि",
    duringEarthquake: "भूकम्प दौरान",
    afterEarthquake: "भूकम्प पछि",
    tip1: "प्रत्येक कोठामा सुरक्षित स्थानहरू पहिचान गर्नुहोस्",
    tip2: "भारी फर्निचर र वस्तुहरू सुरक्षित गर्नुहोस्",
    tip3: "आपतकालीन योजना बनाउनुहोस्",
    tip4: "झुक्नुहोस्, ढाक्नुहोस्, र समात्नुहोस्",
    tip5: "झ्यालहरूबाट टाढा रहनुहोस्",
    tip6: "बाहिर रहनु परेमा, खुला क्षेत्रहरूमा रहनुहोस्",
    tip7: "चोटपटक र क्षतिको लागि जाँच गर्नुहोस्",
    tip8: "अधिकारीहरूको कुरा सुन्नुहोस्",
    tip9: "परकम्पको लागि तयार रहनुहोस्",
    
    // History
    earthquakeHistory: "भूकम्प इतिहास",
    last24Hours: "पछिल्लो २४ घण्टा",
    noHistory: "प्रदर्शन गर्न कुनै भूकम्प इतिहास छैन",
    
    // API Portal
    apiPortal: "API पोर्टल",
    getApiKey: "API Key प्राप्त गर्नुहोस्",
    apiKeyGenerated: "तपाईंको API key उत्पन्न गरिएको छ",
    apiKeyInfo: "यो key २४ घण्टामा समाप्त हुनेछ",
    apiEndpoints: "API एन्डपोइन्टहरू",
    endpointDescription: "भूकम्प डाटा प्राप्त गर्न यो एन्डपोइन्ट प्रयोग गर्नुहोस्",
    copyApiKey: "API Key कपी गर्नुहोस्",
    apiKeyCopied: "API Key क्लिपबोर्डमा कपी गरियो!",
    
    // Footer
    footerText: "भूकम्प डेटा विभिन्न विश्वसनीय स्रोतहरूबाट प्रदान गरिएको छ:",
    footerGeoNet: "GeoNet: न्यूजिल्यान्ड भूकम्प निगरानी प्रणाली",
    footerEmsc: "EMSC: युरोपियन-मेडिटेरेनियन भूकम्पीय केन्द्र",
    footerUsgs: "USGS: युनाइटेड स्टेट्स जियोलोजिकल सर्वे",
    footerJma: "JMA: जापान मौसम एजेन्सी",
    footerGlobalQuake: "GlobalQuake: एकीकृत विश्वव्यापी भूकम्प डेटा",
    dataUpdateFrequency: "डेटा प्रत्येक मिनेटमा अद्यावधिक गरिन्छ",
    dataDisclaimer: "जानकारी ढिलो वा अपूर्ण हुन सक्छ",
    
    // About Page
    about: "बारेमा",
    aboutTitle: "भूकम्प मोनिटर बारेमा",
    aboutSubtitle: "तपाईंलाई सूचित र सुरक्षित राख्नको लागि डिजाइन गरिएको वास्तविक समय भूकम्प निगरानी प्रणाली",
    ourMission: "हाम्रो मिशन",
    missionDescription: "भूकम्प मोनिटर एक वास्तविक समय भूकम्प ट्र्याकिङ एप्लिकेसन हो जसले विश्वभरका भूकम्प गतिविधिहरूको बारेमा अप-टु-द-मिनिट जानकारी प्रदान गर्दछ। हाम्रो लक्ष्य समुदायहरूलाई सूचित र सम्भावित भूकम्प घटनाहरूको लागि तयार राख्नु हो।",
    keyFeatures: "मुख्य सुविधाहरू",
    feature1Title: "वास्तविक समय निगरानी",
    feature1Description: "USGS र GlobalQuake नेटवर्कहरूबाट प्रत्यक्ष भूकम्प डाटा",
    feature2Title: "अन्तरक्रियात्मक नक्सा",
    feature2Description: "रंग-कोडित आयाम सूचकहरूसँग विश्वव्यापी भूकम्प दृश्यावलोकन गर्नुहोस्",
    feature3Title: "अनुकूलित अलर्ट",
    feature3Description: "व्यक्तिगत सूचनाहरूको लागि आयाम र दूरी थ्रेसहोल्ड सेट गर्नुहोस्",
    feature4Title: "महसूस रिपोर्ट",
    feature4Description: "भूकम्प अनुभवहरू साझा गर्न समुदाय-संचालित रिपोर्टिङ प्रणाली",
    feature5Title: "सुरक्षा जानकारी",
    feature5Description: "भूकम्प सुरक्षा टिप्स र दिशानिर्देशहरू पहुँच गर्नुहोस्",
    feature6Title: "बहु-भाषा समर्थन",
    feature6Description: "विश्वभर धेरै भाषाहरूमा उपलब्ध",
    developer: "विकासकर्ता",
    developerDescription: "सन्देश बस्तोलाद्वारा विकसित, यो परियोजना प्रविधि मार्फत सार्वजनिक सुरक्षा र समुदाय जागरूकताको प्रतिबद्धता प्रतिनिधित्व गर्दछ।",
    openContribution: "खुला योगदान",
    openContributionTagline: "यो एक खुला योगदान परियोजना हो - सबैलाई योगदान गर्न स्वागत छ!",
    contributionDescription: "हामी समुदाय सहयोगको शक्तिमा विश्वास गर्छौं। तपाईं विकासकर्ता, डिजाइनर, अनुवादक, वा प्रकोप तयारीमा भावुक कोही हुनुहुन्छ भने, तपाईंको योगदान मूल्यवान छ।",
    getInvolved: "संलग्न हुनुहोस्",
    waysToContribute: "योगदान गर्ने तरिकाहरू",
    contribute1: "बगहरू रिपोर्ट गर्नुहोस् र सुविधाहरू सुझाव दिनुहोस्",
    contribute2: "कागजात र अनुवाद सुधार गर्नुहोस्",
    contribute3: "नयाँ डाटा स्रोत र सुविधाहरू थप्नुहोस्",
    contribute4: "UI/UX डिजाइन बढाउनुहोस्",
    
    // API Portal Coming Soon
    apiComingSoon: "API चाँडै आउँदैछ",
    apiComingSoonDescription: "हामी तपाईंलाई भूकम्प डाटा API ल्याउन कडा मेहनत गरिरहेका छौं",
    apiUnderDevelopment: "हाम्रो API हाल सक्रिय विकास अन्तर्गत छ। चाँडै तपाईं प्रोग्रामेटिक रूपमा वास्तविक समय भूकम्प डाटा पहुँच गर्न सक्षम हुनुहुनेछ।",
    plannedFeatures: "योजनाबद्ध सुविधाहरू:",
    apiFeature1: "भूकम्प डाटाको लागि RESTful API",
    apiFeature2: "ऐतिहासिक भूकम्प क्वेरीहरू",
    apiFeature3: "वास्तविक समय WebSocket जडानहरू",
    apiFeature4: "व्यापक API कागजात",
    apiStayTuned: "अपडेटको लागि धन्यवाद रहनुहोस्!"
  },
  fr: {
    // NavBar
    appTitle: "CompagnonSismique",
    realTimeMonitoring: "Surveillance en temps réel",
    getApi: "Obtenir l'API",
    
    // Main page
    pageTitle: "Moniteur de séismes",
    pageDescription: "Surveillance en temps réel de l'activité sismique dans le monde, avec alertes et visualisations personnalisables.",
    recentEarthquakes: "Séismes récents",
    events: "événements",
    noEarthquakes: "Aucun séisme à afficher",
    loadingData: "Chargement des données sismiques...",
    
    // Alert Settings
    alertSettings: "Paramètres d'alerte",
    magnitudeThreshold: "Seuil de magnitude",
    distanceThreshold: "Seuil de distance",
    kilometers: "km",
    soundAlerts: "Alertes sonores",
    enableSound: "Activer le son",
    disableSound: "Désactiver le son",
    
    // Earthquake Card
    intensity: "intensité",
    low: "faible",
    moderate: "modérée",
    high: "élevée",
    severe: "sévère",
    
    // Felt It Button
    feltIt: "Je l'ai senti !",
    thankYou: "Merci pour votre signalement !",
    
    // Safety Tips
    safetyTips: "Conseils de sécurité",
    beforeEarthquake: "Avant un séisme",
    duringEarthquake: "Pendant un séisme",
    afterEarthquake: "Après un séisme",
    tip1: "Identifiez les endroits sûrs dans chaque pièce",
    tip2: "Fixez les meubles lourds et les objets",
    tip3: "Élaborez un plan d'urgence",
    tip4: "Baissez-vous, couvrez-vous et accrochez-vous",
    tip5: "Éloignez-vous des fenêtres",
    tip6: "Si vous êtes à l'extérieur, restez dans des zones ouvertes",
    tip7: "Vérifiez s'il y a des blessés et des dégâts",
    tip8: "Écoutez les autorités",
    tip9: "Soyez prêt pour les répliques",
    
    // History
    earthquakeHistory: "Historique des séismes",
    last24Hours: "Dernières 24 heures",
    noHistory: "Aucun historique de séisme à afficher",
    
    // API Portal
    apiPortal: "Portail API",
    getApiKey: "Obtenir une clé API",
    apiKeyGenerated: "Votre clé API a été générée",
    apiKeyInfo: "Cette clé expirera dans 24 heures",
    apiEndpoints: "Points de terminaison API",
    endpointDescription: "Utilisez ce point de terminaison pour obtenir des données sur les séismes",
    copyApiKey: "Copier la clé API",
    apiKeyCopied: "Clé API copiée dans le presse-papiers !",
    
    // Footer
    footerText: "Données sismiques fournies par plusieurs sources fiables :",
    footerGeoNet: "GeoNet: Système de surveillance sismique de la Nouvelle-Zélande",
    footerEmsc: "EMSC: Centre Sismologique Euro-Méditerranéen",
    footerUsgs: "USGS: Service géologique des États-Unis",
    footerJma: "JMA: Agence météorologique du Japon",
    footerGlobalQuake: "GlobalQuake: Données sismiques mondiales agrégées",
    dataUpdateFrequency: "Les données sont mises à jour toutes les minutes",
    dataDisclaimer: "Les informations peuvent être retardées ou incomplètes",
    
    // About Page
    about: "À propos",
    aboutTitle: "À propos du Moniteur de Séismes",
    aboutSubtitle: "Un système de surveillance sismique en temps réel conçu pour vous tenir informé et en sécurité",
    ourMission: "Notre Mission",
    missionDescription: "Le Moniteur de Séismes est une application de suivi des séismes en temps réel qui fournit des informations à jour sur les activités sismiques dans le monde entier. Notre objectif est de tenir les communautés informées et préparées aux événements sismiques potentiels.",
    keyFeatures: "Fonctionnalités Clés",
    feature1Title: "Surveillance en temps réel",
    feature1Description: "Données sismiques en direct des réseaux USGS et GlobalQuake",
    feature2Title: "Carte interactive",
    feature2Description: "Visualisez les séismes à l'échelle mondiale avec des indicateurs de magnitude codés par couleur",
    feature3Title: "Alertes personnalisées",
    feature3Description: "Définissez des seuils de magnitude et de distance pour des notifications personnalisées",
    feature4Title: "Rapports ressentis",
    feature4Description: "Système de signalement communautaire pour partager les expériences de séisme",
    feature5Title: "Informations de sécurité",
    feature5Description: "Accédez aux conseils et directives de sécurité sismique",
    feature6Title: "Support multilingue",
    feature6Description: "Disponible en plusieurs langues dans le monde entier",
    developer: "Développeur",
    developerDescription: "Développé par Sandesh Bastola, ce projet représente un engagement envers la sécurité publique et la sensibilisation communautaire grâce à la technologie.",
    openContribution: "Contribution ouverte",
    openContributionTagline: "C'est un projet à contribution ouverte - tout le monde est invité à contribuer !",
    contributionDescription: "Nous croyons au pouvoir de la collaboration communautaire. Que vous soyez développeur, designer, traducteur ou quelqu'un passionné par la préparation aux catastrophes, vos contributions sont précieuses.",
    getInvolved: "S'impliquer",
    waysToContribute: "Façons de contribuer",
    contribute1: "Signaler des bugs et suggérer des fonctionnalités",
    contribute2: "Améliorer la documentation et les traductions",
    contribute3: "Ajouter de nouvelles sources de données et fonctionnalités",
    contribute4: "Améliorer la conception UI/UX",
    
    // API Portal Coming Soon
    apiComingSoon: "API bientôt disponible",
    apiComingSoonDescription: "Nous travaillons dur pour vous apporter des API de données sismiques",
    apiUnderDevelopment: "Notre API est actuellement en développement actif. Bientôt, vous pourrez accéder aux données sismiques en temps réel par programmation.",
    plannedFeatures: "Fonctionnalités prévues :",
    apiFeature1: "API RESTful pour les données sismiques",
    apiFeature2: "Requêtes de séismes historiques",
    apiFeature3: "Connexions WebSocket en temps réel",
    apiFeature4: "Documentation API complète",
    apiStayTuned: "Restez à l'écoute pour les mises à jour !"
  },
  es: {
    // NavBar
    appTitle: "CompañeroSísmico",
    realTimeMonitoring: "Monitoreo en tiempo real",
    getApi: "Obtener API",
    
    // Main page
    pageTitle: "Monitor de Terremotos",
    pageDescription: "Monitoreo en tiempo real de la actividad sísmica en todo el mundo, con alertas personalizables y visualización.",
    recentEarthquakes: "Terremotos Recientes",
    events: "eventos",
    noEarthquakes: "No hay terremotos para mostrar",
    loadingData: "Cargando datos de terremotos...",
    
    // Alert Settings
    alertSettings: "Configuración de Alertas",
    magnitudeThreshold: "Umbral de Magnitud",
    distanceThreshold: "Umbral de Distancia",
    kilometers: "km",
    soundAlerts: "Alertas de Sonido",
    enableSound: "Activar Sonido",
    disableSound: "Desactivar Sonido",
    
    // Earthquake Card
    intensity: "intensidad",
    low: "baja",
    moderate: "moderada",
    high: "alta",
    severe: "severa",
    
    // Felt It Button
    feltIt: "¡Lo sentí!",
    thankYou: "¡Gracias por tu reporte!",
    
    // Safety Tips
    safetyTips: "Consejos de Seguridad",
    beforeEarthquake: "Antes de un Terremoto",
    duringEarthquake: "Durante un Terremoto",
    afterEarthquake: "Después de un Terremoto",
    tip1: "Identifica lugares seguros en cada habitación",
    tip2: "Asegura muebles pesados y objetos",
    tip3: "Haz un plan de emergencia",
    tip4: "Agáchate, Cúbrete y Agárrate",
    tip5: "Aléjate de las ventanas",
    tip6: "Si estás al aire libre, permanece en áreas abiertas",
    tip7: "Verifica si hay heridos y daños",
    tip8: "Escucha a las autoridades",
    tip9: "Prepárate para las réplicas",
    
    // History
    earthquakeHistory: "Historial de Terremotos",
    last24Hours: "Últimas 24 Horas",
    noHistory: "No hay historial de terremotos para mostrar",
    
    // API Portal
    apiPortal: "Portal API",
    getApiKey: "Obtener Clave API",
    apiKeyGenerated: "Tu clave API ha sido generada",
    apiKeyInfo: "Esta clave caducará en 24 horas",
    apiEndpoints: "Endpoints de API",
    endpointDescription: "Usa este endpoint para obtener datos de terremotos",
    copyApiKey: "Copiar Clave API",
    apiKeyCopied: "¡Clave API copiada al portapapeles!",
    
    // Footer
    footerText: "Datos de terremotos proporcionados por múltiples fuentes confiables:",
    footerGeoNet: "GeoNet: Sistema de Monitoreo Sísmico de Nueva Zelanda",
    footerEmsc: "EMSC: Centro Sismológico Euro-Mediterráneo",
    footerUsgs: "USGS: Servicio Geológico de los Estados Unidos",
    footerJma: "JMA: Agencia Meteorológica de Japón",
    footerGlobalQuake: "GlobalQuake: Datos Sísmicos Globales Agregados",
    dataUpdateFrequency: "Los datos se actualizan cada minuto",
    dataDisclaimer: "La información puede estar retrasada o incompleta",
    
    // About Page
    about: "Acerca de",
    aboutTitle: "Acerca del Monitor de Terremotos",
    aboutSubtitle: "Un sistema de monitoreo sísmico en tiempo real diseñado para mantenerte informado y seguro",
    ourMission: "Nuestra Misión",
    missionDescription: "El Monitor de Terremotos es una aplicación de seguimiento de terremotos en tiempo real que proporciona información actualizada sobre actividades sísmicas en todo el mundo. Nuestro objetivo es mantener a las comunidades informadas y preparadas para posibles eventos sísmicos.",
    keyFeatures: "Características Clave",
    feature1Title: "Monitoreo en tiempo real",
    feature1Description: "Datos sísmicos en vivo de las redes USGS y GlobalQuake",
    feature2Title: "Mapa interactivo",
    feature2Description: "Visualiza terremotos globalmente con indicadores de magnitud codificados por color",
    feature3Title: "Alertas personalizadas",
    feature3Description: "Establece umbrales de magnitud y distancia para notificaciones personalizadas",
    feature4Title: "Informes sentidos",
    feature4Description: "Sistema de informes impulsado por la comunidad para compartir experiencias de terremotos",
    feature5Title: "Información de seguridad",
    feature5Description: "Accede a consejos y pautas de seguridad sísmica",
    feature6Title: "Soporte multilingüe",
    feature6Description: "Disponible en múltiples idiomas en todo el mundo",
    developer: "Desarrollador",
    developerDescription: "Desarrollado por Sandesh Bastola, este proyecto representa un compromiso con la seguridad pública y la conciencia comunitaria a través de la tecnología.",
    openContribution: "Contribución abierta",
    openContributionTagline: "Este es un proyecto de contribución abierta - ¡todos son bienvenidos a contribuir!",
    contributionDescription: "Creemos en el poder de la colaboración comunitaria. Ya seas desarrollador, diseñador, traductor o alguien apasionado por la preparación ante desastres, tus contribuciones son valiosas.",
    getInvolved: "Involúcrate",
    waysToContribute: "Formas de contribuir",
    contribute1: "Reportar errores y sugerir características",
    contribute2: "Mejorar la documentación y las traducciones",
    contribute3: "Agregar nuevas fuentes de datos y características",
    contribute4: "Mejorar el diseño UI/UX",
    
    // API Portal Coming Soon
    apiComingSoon: "API próximamente",
    apiComingSoonDescription: "Estamos trabajando duro para traerte APIs de datos sísmicos",
    apiUnderDevelopment: "Nuestra API está actualmente en desarrollo activo. Pronto podrás acceder a datos sísmicos en tiempo real de forma programática.",
    plannedFeatures: "Características planificadas:",
    apiFeature1: "API RESTful para datos sísmicos",
    apiFeature2: "Consultas de terremotos históricos",
    apiFeature3: "Conexiones WebSocket en tiempo real",
    apiFeature4: "Documentación API completa",
    apiStayTuned: "¡Mantente atento a las actualizaciones!"
  },
  ja: {
    // NavBar
    appTitle: "地震バディ",
    realTimeMonitoring: "リアルタイム監視",
    getApi: "API取得",
    
    // Main page
    pageTitle: "地震モニター",
    pageDescription: "世界中の地震活動のリアルタイム監視、カスタマイズ可能なアラートと視覚化。",
    recentEarthquakes: "最近の地震",
    events: "イベント",
    noEarthquakes: "表示する地震はありません",
    loadingData: "地震データを読み込んでいます...",
    
    // Alert Settings
    alertSettings: "アラート設定",
    magnitudeThreshold: "マグニチュード閾値",
    distanceThreshold: "距離閾値",
    kilometers: "km",
    soundAlerts: "音声アラート",
    enableSound: "音声を有効にする",
    disableSound: "音声を無効にする",
    
    // Earthquake Card
    intensity: "強度",
    low: "低",
    moderate: "中",
    high: "高",
    severe: "激しい",
    
    // Felt It Button
    feltIt: "感じました！",
    thankYou: "ご報告ありがとうございます！",
    
    // Safety Tips
    safetyTips: "安全のヒント",
    beforeEarthquake: "地震の前に",
    duringEarthquake: "地震の間に",
    afterEarthquake: "地震の後に",
    tip1: "各部屋の安全な場所を特定する",
    tip2: "重い家具や物を固定する",
    tip3: "緊急時の計画を立てる",
    tip4: "姿勢を低く、頭を保護し、固定物に掴まる",
    tip5: "窓から離れる",
    tip6: "屋外にいる場合は、開けた場所にいる",
    tip7: "怪我や損傷を確認する",
    tip8: "当局の指示に従う",
    tip9: "余震に備える",
    
    // History
    earthquakeHistory: "地震履歴",
    last24Hours: "過去24時間",
    noHistory: "表示する地震履歴はありません",
    
    // API Portal
    apiPortal: "APIポータル",
    getApiKey: "APIキーを取得",
    apiKeyGenerated: "APIキーが生成されました",
    apiKeyInfo: "このキーは24時間で期限切れになります",
    apiEndpoints: "APIエンドポイント",
    endpointDescription: "地震データを取得するにはこのエンドポイントを使用してください",
    copyApiKey: "APIキーをコピー",
    apiKeyCopied: "APIキーがクリップボードにコピーされました！",
    
    // Footer
    footerText: "地震データは複数の信頼できるソースから提供されています：",
    footerGeoNet: "GeoNet：ニュージーランド地震監視システム",
    footerEmsc: "EMSC：欧州地中海地震センター",
    footerUsgs: "USGS：アメリカ地質調査所",
    footerJma: "JMA：気象庁",
    footerGlobalQuake: "GlobalQuake：集約された世界の地震データ",
    dataUpdateFrequency: "データは1分ごとに更新されます",
    dataDisclaimer: "情報が遅延または不完全な場合があります",
    
    // About Page
    about: "について",
    aboutTitle: "地震モニターについて",
    aboutSubtitle: "あなたに情報を提供し、安全を保つために設計されたリアルタイム地震監視システム",
    ourMission: "私たちのミッション",
    missionDescription: "地震モニターは、世界中の地震活動に関する最新情報を提供するリアルタイム地震追跡アプリケーションです。私たちの目標は、コミュニティに情報を提供し、潜在的な地震イベントに備えることです。",
    keyFeatures: "主な機能",
    feature1Title: "リアルタイム監視",
    feature1Description: "USGSとGlobalQuakeネットワークからのライブ地震データ",
    feature2Title: "インタラクティブマップ",
    feature2Description: "色分けされたマグニチュード指標で世界中の地震を視覚化",
    feature3Title: "カスタムアラート",
    feature3Description: "パーソナライズされた通知のためのマグニチュードと距離のしきい値を設定",
    feature4Title: "体感レポート",
    feature4Description: "地震体験を共有するためのコミュニティ主導のレポートシステム",
    feature5Title: "安全情報",
    feature5Description: "地震の安全のヒントとガイドラインにアクセス",
    feature6Title: "多言語サポート",
    feature6Description: "世界中の複数の言語で利用可能",
    developer: "開発者",
    developerDescription: "Sandesh Bastolaによって開発されたこのプロジェクトは、技術を通じた公共の安全とコミュニティの意識へのコミットメントを表しています。",
    openContribution: "オープン貢献",
    openContributionTagline: "これはオープン貢献プロジェクトです - 誰でも貢献を歓迎します！",
    contributionDescription: "私たちはコミュニティコラボレーションの力を信じています。あなたが開発者、デザイナー、翻訳者、または災害準備に情熱を持っている人であれば、あなたの貢献は貴重です。",
    getInvolved: "参加する",
    waysToContribute: "貢献の方法",
    contribute1: "バグを報告し、機能を提案する",
    contribute2: "ドキュメントと翻訳を改善する",
    contribute3: "新しいデータソースと機能を追加する",
    contribute4: "UI/UXデザインを強化する",
    
    // API Portal Coming Soon
    apiComingSoon: "API近日公開",
    apiComingSoonDescription: "地震データAPIをお届けするために一生懸命取り組んでいます",
    apiUnderDevelopment: "私たちのAPIは現在活発に開発中です。まもなく、プログラムでリアルタイム地震データにアクセスできるようになります。",
    plannedFeatures: "予定されている機能：",
    apiFeature1: "地震データ用のRESTful API",
    apiFeature2: "過去の地震クエリ",
    apiFeature3: "リアルタイムWebSocket接続",
    apiFeature4: "包括的なAPIドキュメント",
    apiStayTuned: "アップデートをお楽しみに！"
  },
  zh: {
    // NavBar
    appTitle: "地震伙伴",
    realTimeMonitoring: "实时监测",
    getApi: "获取API",
    
    // Main page
    pageTitle: "地震监测",
    pageDescription: "全球地震活动实时监测，提供可定制的警报和可视化。",
    recentEarthquakes: "近期地震",
    events: "事件",
    noEarthquakes: "没有地震可显示",
    loadingData: "正在加载地震数据...",
    
    // Alert Settings
    alertSettings: "警报设置",
    magnitudeThreshold: "震级阈值",
    distanceThreshold: "距离阈值",
    kilometers: "公里",
    soundAlerts: "声音警报",
    enableSound: "启用声音",
    disableSound: "禁用声音",
    
    // Earthquake Card
    intensity: "强度",
    low: "低",
    moderate: "中等",
    high: "高",
    severe: "严重",
    
    // Felt It Button
    feltIt: "我感觉到了！",
    thankYou: "感谢您的报告！",
    
    // Safety Tips
    safetyTips: "安全提示",
    beforeEarthquake: "地震前",
    duringEarthquake: "地震中",
    afterEarthquake: "地震后",
    tip1: "识别每个房间的安全地点",
    tip2: "固定重家具和物品",
    tip3: "制定应急计划",
    tip4: "趴下，掩护，抓牢",
    tip5: "远离窗户",
    tip6: "如果在户外，待在开阔区域",
    tip7: "检查伤害和损坏",
    tip8: "听从当局指示",
    tip9: "为余震做好准备",
    
    // History
    earthquakeHistory: "地震历史",
    last24Hours: "过去24小时",
    noHistory: "没有地震历史可显示",
    
    // API Portal
    apiPortal: "API门户",
    getApiKey: "获取API密钥",
    apiKeyGenerated: "您的API密钥已生成",
    apiKeyInfo: "此密钥将在24小时后过期",
    apiEndpoints: "API端点",
    endpointDescription: "使用此端点获取地震数据",
    copyApiKey: "复制API密钥",
    apiKeyCopied: "API密钥已复制到剪贴板！",
    
    // Footer
    footerText: "地震数据由多个可靠来源提供：",
    footerGeoNet: "GeoNet：新西兰地震监测系统",
    footerEmsc: "EMSC：欧洲地中海地震中心",
    footerUsgs: "USGS：美国地质调查局",
    footerJma: "JMA：日本气象厅",
    footerGlobalQuake: "GlobalQuake：汇总的全球地震数据",
    dataUpdateFrequency: "数据每分钟更新",
    dataDisclaimer: "信息可能延迟或不完整",
    
    // About Page
    about: "关于",
    aboutTitle: "关于地震监测",
    aboutSubtitle: "旨在让您了解情况并保持安全的实时地震监测系统",
    ourMission: "我们的使命",
    missionDescription: "地震监测是一个实时地震跟踪应用程序，提供全球地震活动的最新信息。我们的目标是让社区了解情况并为潜在的地震事件做好准备。",
    keyFeatures: "主要功能",
    feature1Title: "实时监测",
    feature1Description: "来自USGS和GlobalQuake网络的实时地震数据",
    feature2Title: "交互式地图",
    feature2Description: "使用颜色编码的震级指标在全球范围内可视化地震",
    feature3Title: "自定义警报",
    feature3Description: "为个性化通知设置震级和距离阈值",
    feature4Title: "感觉报告",
    feature4Description: "社区驱动的报告系统，分享地震体验",
    feature5Title: "安全信息",
    feature5Description: "访问地震安全提示和指南",
    feature6Title: "多语言支持",
    feature6Description: "全球多种语言可用",
    developer: "开发者",
    developerDescription: "由Sandesh Bastola开发，该项目代表了通过技术对公共安全和社区意识的承诺。",
    openContribution: "开放贡献",
    openContributionTagline: "这是一个开放贡献项目 - 欢迎每个人贡献！",
    contributionDescription: "我们相信社区协作的力量。无论您是开发人员、设计师、翻译人员，还是对灾害准备充满热情的人，您的贡献都是宝贵的。",
    getInvolved: "参与",
    waysToContribute: "贡献方式",
    contribute1: "报告错误并建议功能",
    contribute2: "改进文档和翻译",
    contribute3: "添加新的数据源和功能",
    contribute4: "增强UI/UX设计",
    
    // API Portal Coming Soon
    apiComingSoon: "API即将推出",
    apiComingSoonDescription: "我们正在努力为您带来地震数据API",
    apiUnderDevelopment: "我们的API目前正在积极开发中。很快您将能够以编程方式访问实时地震数据。",
    plannedFeatures: "计划功能：",
    apiFeature1: "地震数据的RESTful API",
    apiFeature2: "历史地震查询",
    apiFeature3: "实时WebSocket连接",
    apiFeature4: "全面的API文档",
    apiStayTuned: "敬请期待更新！"
  }
};

// Type definition for the language context
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  availableLanguages: { code: string; name: string; nativeName: string }[];
};

// Available languages for selection
const availableLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' }
];

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  availableLanguages: []
});

// Create a provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

  // Function to get translations by key
  const t = (key: string): string => {
    const langTranslations = translations[language as keyof typeof translations];
    if (!langTranslations) return key;
    
    const langKeys = langTranslations as Record<string, string>;
    return langKeys[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
