import { useTranslation } from 'react-i18next';

export const useTranslations = () => {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  return {
    t,
    currentLanguage,
  };
};
