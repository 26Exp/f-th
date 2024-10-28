'use client';

import * as React from 'react';
import { useMemo } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import FuseTheme from '@fuse/core/FuseTheme';
import { useMainTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import createCache, { Options } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

type MainThemeProviderProps = {
	children: React.ReactNode;
};

const emotionCacheOptions: Record<string, Options> = {
	rtl: {
		key: 'muirtl',
		stylisPlugins: [rtlPlugin],
		prepend: true
	},
	ltr: {
		key: 'muiltr',
		stylisPlugins: [],
		prepend: true
	}
};

function MainThemeProvider({ children }: MainThemeProviderProps) {
	const mainTheme = useMainTheme();
	const langDirection = mainTheme?.direction;

	const cacheProviderValue = useMemo(() => createCache(emotionCacheOptions[langDirection]), [langDirection]);

	return (
		<CacheProvider value={cacheProviderValue}>
			<FuseTheme
				theme={mainTheme}
				root
			>
				{children}
			</FuseTheme>
		</CacheProvider>
	);
}

export default MainThemeProvider;
