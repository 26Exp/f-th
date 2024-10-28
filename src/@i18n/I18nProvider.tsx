'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import useFuseSettings from '@fuse/core/FuseSettings/hooks/useFuseSettings';
import i18n from './i18n';

export type LanguageType = {
	id: string;
	title: string;
	flag: string;
};

type I18nContextType = {
	language: LanguageType;
	languageId: string;
	languages: LanguageType[];
	changeLanguage: (languageId: string) => Promise<void>;
	langDirection: 'ltr' | 'rtl';
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

type I18nProviderProps = {
	children: React.ReactNode;
};

const languages: LanguageType[] = [
	{ id: 'en', title: 'English', flag: 'US' },
	{ id: 'tr', title: 'Turkish', flag: 'TR' },
	{ id: 'ar', title: 'Arabic', flag: 'SA' }
];

export function I18nProvider(props: I18nProviderProps) {
	const { children } = props;
	const { data: settings, setSettings } = useFuseSettings();
	const settingsThemeDirection = useMemo(() => settings.direction, [settings]);
	const [languageId, setLanguageId] = useState(i18n.options.lng);

	const changeLanguage = async (languageId: string) => {
		setLanguageId(languageId);
		await i18n.changeLanguage(languageId);
	};

	useEffect(() => {
		if (languageId !== i18n.options.lng) {
			i18n.changeLanguage(languageId);
		}

		const langDirection = i18n.dir(languageId);

		if (settingsThemeDirection !== langDirection) {
			setSettings({ direction: langDirection });
		}
	}, [languageId, settingsThemeDirection]);

	return (
		<I18nContext.Provider
			value={useMemo(
				() => ({
					language: _.find(languages, { id: languageId }),
					languageId,
					langDirection: i18n.dir(languageId),
					languages,
					changeLanguage
				}),
				[languageId, languages]
			)}
		>
			{children}
		</I18nContext.Provider>
	);
}

export const useI18n = () => {
	const context = useContext(I18nContext);

	if (!context) {
		throw new Error('useI18n must be used within an I18nProvider');
	}

	return context;
};
