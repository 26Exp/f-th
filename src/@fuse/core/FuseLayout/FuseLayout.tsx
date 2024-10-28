'use client';

import _ from 'lodash';
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import { themeLayoutsType } from 'src/components/theme-layouts/themeLayouts';
import usePathname from '@fuse/hooks/usePathname';
import useFuseSettings from '@fuse/core/FuseSettings/hooks/useFuseSettings';

export type FuseRouteObjectType = {
	settings?: FuseSettingsConfigType;
	auth?: string[] | [] | null | undefined;
};

export type FuseLayoutProps = {
	layouts: themeLayoutsType;
	children?: React.ReactNode;
	settings?: FuseSettingsConfigType['layout'];
};

type FuseLayoutSettingsContextType = FuseSettingsConfigType['layout'];

const FuseLayoutSettingsContext = createContext<FuseLayoutSettingsContextType | undefined>(undefined);

export const useFuseLayoutSettings = () => {
	const context = useContext(FuseLayoutSettingsContext);

	if (context === undefined) {
		throw new Error('useFuseLayoutSettings must be used within a SettingsProvider');
	}

	return context;
};

/**
 * FuseLayout
 * React frontend component in a React project that is used for layouting the user interface. The component
 * handles generating user interface settings related to current routes, merged with default settings, and uses
 * the new settings to generate layouts.
 */
function FuseLayout(props: FuseLayoutProps) {
	const { layouts, children, settings: forcedSettings } = props;

	const { data: current } = useFuseSettings();
	const currentLayoutSetting = useMemo(() => current.layout, [current]);
	const pathname = usePathname();

	const layoutSetting = useMemo(
		() => _.merge({}, currentLayoutSetting, forcedSettings),
		[currentLayoutSetting, forcedSettings]
	);

	const layoutStyle = useMemo(() => layoutSetting.style, [layoutSetting]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<FuseLayoutSettingsContext.Provider value={layoutSetting}>
			{useMemo(() => {
				return Object.entries(layouts).map(([key, Layout]) => {
					if (key === layoutStyle) {
						return (
							<React.Fragment key={key}>
								<Layout>{children}</Layout>
							</React.Fragment>
						);
					}

					return null;
				});
			}, [layoutStyle, layouts, children])}
		</FuseLayoutSettingsContext.Provider>
	);
}

export default FuseLayout;
