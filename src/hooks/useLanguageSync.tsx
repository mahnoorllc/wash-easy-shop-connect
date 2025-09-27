import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';

export const useLanguageSync = () => {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const { profile } = useProfile();

  useEffect(() => {
    // Load user's preferred language when profile is loaded
    if (user && profile?.language && profile.language !== i18n.language) {
      i18n.changeLanguage(profile.language);
    }
  }, [user, profile?.language, i18n]);

  return null;
};