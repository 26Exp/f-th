import { apiService as api } from 'src/store/apiService';
import { WithSlice } from '@reduxjs/toolkit';
import rootReducer from '@/store/rootReducer';
import AgeWidgetType from './widgets/types/AgeWidgetType';
import ConversionsWidgetType from './widgets/types/ConversionsWidgetType';
import GenderWidgetType from './widgets/types/GenderWidgetType';
import ImpressionsWidgetType from './widgets/types/ImpressionsWidgetType';
import LanguageWidgetType from './widgets/types/LanguageWidgetType';
import NewVsReturningWidgetType from './widgets/types/NewVsReturningWidgetType';
import VisitsWidgetType from './widgets/types/VisitsWidgetType';
import VisitorsVsPageViewsType from './widgets/types/VisitorsVsPageViewsType';

export const addTagTypes = ['analytics_dashboard_widgets'] as const;

const AnalyticsDashboardApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAnalyticsDashboardWidgets: build.query<
				GetAnalyticsDashboardWidgetsApiResponse,
				GetAnalyticsDashboardWidgetsApiArg
			>({
				query: () => ({ url: `/api/mock/analytics-dashboard/widgets` }),
				providesTags: ['analytics_dashboard_widgets']
			})
		}),
		overrideExisting: false
	});
export default AnalyticsDashboardApi;

export type AnalyticsDashboardWidgetType =
	| AgeWidgetType
	| ConversionsWidgetType
	| GenderWidgetType
	| ImpressionsWidgetType
	| LanguageWidgetType
	| NewVsReturningWidgetType
	| VisitsWidgetType
	| VisitorsVsPageViewsType;

export type GetAnalyticsDashboardWidgetsApiResponse = {
	[key: string]: AnalyticsDashboardWidgetType;
};
export type GetAnalyticsDashboardWidgetsApiArg = void;

export const { useGetAnalyticsDashboardWidgetsQuery } = AnalyticsDashboardApi;

declare module '@/store/rootReducer' {
	export interface LazyLoadedSlices extends WithSlice<typeof AnalyticsDashboardApi> {}
}

export const selectWidget = <T>(id: string) =>
	rootReducer.selector((state) => {
		const widgets = AnalyticsDashboardApi.endpoints.getAnalyticsDashboardWidgets.select()(state)?.data;
		return widgets?.[id] as T;
	});
