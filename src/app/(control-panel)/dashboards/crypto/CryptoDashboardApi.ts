import { apiService as api } from 'src/store/apiService';
import { WithSlice } from '@reduxjs/toolkit';
import BTCWidgetType from './types/BTCWidgetType';
import WalletsType from './types/WalletsType';
import WatchlistType from './types/WatchlistType';

export const addTagTypes = ['crypto_dashboard_widgets'] as const;

const CryptoDashboardApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCryptoDashboardWidgets: build.query<
				GetCryptoDashboardWidgetsApiResponse,
				GetCryptoDashboardWidgetsApiArg
			>({
				query: () => ({ url: `/api/mock/crypto-dashboard/widgets` }),
				providesTags: ['crypto_dashboard_widgets']
			})
		}),
		overrideExisting: false
	});
export default CryptoDashboardApi;

export type CryptoDashboardWidgetType = BTCWidgetType | WalletsType | WatchlistType;

export type GetCryptoDashboardWidgetsApiResponse = { [key: string]: CryptoDashboardWidgetType };

export type GetCryptoDashboardWidgetsApiArg = void;

export const { useGetCryptoDashboardWidgetsQuery } = CryptoDashboardApi;

declare module '@/store/rootReducer' {
	export interface LazyLoadedSlices extends WithSlice<typeof CryptoDashboardApi> {}
}
