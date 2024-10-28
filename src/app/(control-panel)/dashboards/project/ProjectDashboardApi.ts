import { createSelector, WithSlice } from '@reduxjs/toolkit';
import { apiService as api } from 'src/store/apiService';
import BudgetWidgetType from '../finance/widgets/types/BudgetWidgetType';
import BudgetDistributionDataType from './tabs/budget/widgets/types/BudgetDistributionDataType';
import ExpensesDataType from './tabs/budget/widgets/types/ExpensesDataType';
import BudgetDetailsDataType from './tabs/budget/widgets/types/BudgetDetailsDataType';
import WidgetDataType from './tabs/home/widgets/types/WidgetDataType';
import GithubIssuesDataType from './tabs/home/widgets/types/GithubIssuesDataType';
import ScheduleDataType from './tabs/home/widgets/types/ScheduleDataType';
import TaskDistributionDataType from './tabs/home/widgets/types/TaskDistributionDataType';
import TeamMemberType from './tabs/team/widgets/types/TeamMemberType';

export const addTagTypes = ['project_dashboard_widgets', 'project_dashboard_projects'] as const;
const ProjectDashboardApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getProjectDashboardWidgets: build.query<
				GetProjectDashboardWidgetsApiResponse,
				GetProjectDashboardWidgetsApiArg
			>({
				query: () => ({ url: `/api/mock/project-dashboard/widgets` }),
				providesTags: ['project_dashboard_widgets']
			}),
			getProjectDashboardProjects: build.query<
				GetProjectDashboardProjectsApiResponse,
				GetProjectDashboardProjectsApiArg
			>({
				query: () => ({ url: `/api/mock/project-dashboard/projects` }),
				providesTags: ['project_dashboard_projects']
			})
		}),
		overrideExisting: false
	});
export default ProjectDashboardApi;

export type ProjectDashboardWidgetType =
	| BudgetWidgetType
	| BudgetDetailsDataType
	| BudgetDistributionDataType
	| ExpensesDataType
	| WidgetDataType
	| GithubIssuesDataType
	| ScheduleDataType
	| TaskDistributionDataType
	| TeamMemberType[];

export type GetProjectDashboardWidgetsApiResponse = {
	[key: string]: ProjectDashboardWidgetType;
};

export type GetProjectDashboardWidgetsApiArg = void;

export type GetProjectDashboardProjectsApiResponse = /** status 200 OK */ ProjectType[];
export type GetProjectDashboardProjectsApiArg = void;

export type ProjectType = {
	id: number;
	name: string;
};

export const { useGetProjectDashboardWidgetsQuery, useGetProjectDashboardProjectsQuery } = ProjectDashboardApi;

export type ProjectDashboardApiType = {
	[ProjectDashboardApi.reducerPath]: ReturnType<typeof ProjectDashboardApi.reducer>;
};

/**
 * Lazy load
 * */
declare module '@/store/rootReducer' {
	export interface LazyLoadedSlices extends WithSlice<typeof ProjectDashboardApi> {}
}

export const selectProjectDashboardWidgets = createSelector(
	ProjectDashboardApi.endpoints.getProjectDashboardWidgets.select(),
	(results) => results.data
);

export const selectWidget = <T>(id: string) =>
	createSelector(selectProjectDashboardWidgets, (widgets) => {
		return widgets?.[id] as T;
	});
