'use client';

import { ReactNode, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esCommon from '@/public/locales/es/common.json';
import enCommon from '@/public/locales/en/common.json';

// Inicializar i18n solo si no está inicializado
if (!i18n.isInitialized) {
	i18n
		.use(initReactI18next)
		.init({
			lng: 'es',
			fallbackLng: 'es',
			supportedLngs: ['en', 'es'],
			defaultNS: 'common',
			ns: ['common'],
			keySeparator: '.',
			initImmediate: false,
			resources: {
				en: {
					common: enCommon,
				},
				es: {
					common: esCommon,
				},
			},
			interpolation: {
				escapeValue: false,
			},
			react: {
				useSuspense: false,
			},
		});
}

export function I18nProvider({ children }: { children: ReactNode }) {
	const [isInitialized, setIsInitialized] = useState(i18n.isInitialized);

	useEffect(() => {
		i18n.addResourceBundle('es', 'common', esCommon, true, true);
		i18n.addResourceBundle('en', 'common', enCommon, true, true);

		if (!isInitialized && i18n.isInitialized) {
			setIsInitialized(true);
		}
	}, [isInitialized]);

	if (!isInitialized) {
		return null;
	}

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
