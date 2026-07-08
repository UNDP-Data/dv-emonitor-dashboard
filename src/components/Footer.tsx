import {
  Footer,
  FooterLogoUnit,
  FooterCopyrightUnit,
} from '@undp/design-system-react/Footer';
import { useTranslation } from 'react-i18next';

export default function FooterEl() {
  const { t } = useTranslation();
  return (
    <Footer>
      <FooterLogoUnit>{t('subscribe')}</FooterLogoUnit>
      <FooterCopyrightUnit>{t('footnote')}</FooterCopyrightUnit>
    </Footer>
  );
}
