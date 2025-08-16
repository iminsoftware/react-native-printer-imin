// src/LanguageContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import * as RNLocalize from 'react-native-localize';
import { AppState, AppStateStatus } from 'react-native';

interface LanguageContextProps {
  language: string;
  changeLanguage: (lng: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  changeLanguage: () => {},
});

export const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState(
    RNLocalize.getLocales()[0].languageCode
  );

  useEffect(() => {
    const handleLocalizationChange = () => {
      const localization = RNLocalize.getLocales()[0];
      setLanguage(localization.languageCode);
    };

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        handleLocalizationChange();
      }
    };

    // 监听应用状态变化
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    // 初始化时立即执行一次
    handleLocalizationChange();

    // 清理事件监听器
    return () => {
      subscription.remove();
    };
  }, []);

  const changeLanguage = (lng: string) => {
    setLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
