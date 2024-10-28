import { apiService as api } from 'src/store/apiService';

export const addTagTypes = [
	'settings_account',
	'settings_notification',
	'settings_security',
	'settings_plan_billing',
	'settings_team',
	'settings_team_member'
] as const;
const injectedRtkApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAccountSettings: build.query<GetAccountSettingsApiResponse, GetAccountSettingsApiArg>({
				query: () => ({ url: `/api/mock/app-account-settings/0` }),
				providesTags: ['settings_account']
			}),
			updateAccountSettings: build.mutation<UpdateAccountSettingsApiResponse, UpdateAccountSettingsApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/app-account-settings/0`,
					method: 'PUT',
					body: queryArg
				}),
				invalidatesTags: ['settings_account']
			}),
			getNotificationSettings: build.query<GetNotificationSettingsApiResponse, GetNotificationSettingsApiArg>({
				query: () => ({ url: `/api/mock/app-notification-settings/0` }),
				providesTags: ['settings_notification']
			}),
			updateNotificationSettings: build.mutation<
				UpdateNotificationSettingsApiResponse,
				UpdateNotificationSettingsApiArg
			>({
				query: (queryArg) => ({
					url: `/api/mock/app-notification-settings/0`,
					method: 'PUT',
					body: queryArg
				}),
				invalidatesTags: ['settings_notification']
			}),
			getSecuritySettings: build.query<GetSecuritySettingsApiResponse, GetSecuritySettingsApiArg>({
				query: () => ({ url: `/api/mock/app-security-settings/0` }),
				providesTags: ['settings_security']
			}),
			updateSecuritySettings: build.mutation<UpdateSecuritySettingsApiResponse, UpdateSecuritySettingsApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/app-security-settings/0`,
					method: 'PUT',
					body: queryArg
				}),
				invalidatesTags: ['settings_security']
			}),
			getPlanBillingSettings: build.query<GetPlanBillingSettingsApiResponse, GetPlanBillingSettingsApiArg>({
				query: () => ({ url: `/api/mock/app-plan-billing-settings/0` }),
				providesTags: ['settings_plan_billing']
			}),
			updatePlanBillingSettings: build.mutation<
				UpdatePlanBillingSettingsApiResponse,
				UpdatePlanBillingSettingsApiArg
			>({
				query: (queryArg) => ({
					url: `/api/mock/app-plan-billing-settings/0`,
					method: 'PUT',
					body: queryArg
				}),
				invalidatesTags: ['settings_plan_billing']
			}),
			getTeamMembersSettings: build.query<GetTeamMembersSettingsApiResponse, GetTeamMembersSettingsApiArg>({
				query: () => ({ url: `/api/mock/app-team-members` }),
				providesTags: ['settings_team']
			}),
			createTeamMemberSettings: build.mutation<
				CreateTeamMemberSettingsApiResponse,
				CreateTeamMemberSettingsApiArg
			>({
				query: (queryArg) => ({
					url: `/api/mock/app-team-members`,
					method: 'POST',
					body: queryArg
				}),
				invalidatesTags: ['settings_team']
			}),
			deleteTeamMemberSettings: build.mutation<
				DeleteTeamMemberSettingsApiResponse,
				DeleteTeamMemberSettingsApiArg
			>({
				query: (queryArg) => ({
					url: `/api/mock/app-team-members/${queryArg.memberId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['settings_team_member']
			}),
			updateTeamMemberSettings: build.mutation<
				UpdateTeamMemberSettingsApiResponse,
				UpdateTeamMemberSettingsApiArg
			>({
				query: (queryArg) => ({
					url: `/api/mock/app-team-members`,
					method: 'PUT',
					body: queryArg
				}),
				invalidatesTags: ['settings_team']
			})
		}),
		overrideExisting: false
	});
export { injectedRtkApi as SettingsApi };
export type GetAccountSettingsApiResponse = /** status 200 OK */ SettingsAccount;
export type GetAccountSettingsApiArg = void;
export type UpdateAccountSettingsApiResponse = unknown;
export type UpdateAccountSettingsApiArg = SettingsAccount;
export type GetNotificationSettingsApiResponse = /** status 200 OK */ SettingsNotifications;
export type GetNotificationSettingsApiArg = void;
export type UpdateNotificationSettingsApiResponse = unknown;
export type UpdateNotificationSettingsApiArg = SettingsNotifications;
export type GetSecuritySettingsApiResponse = /** status 200 OK */ SettingsSecurity;
export type GetSecuritySettingsApiArg = void;
export type UpdateSecuritySettingsApiResponse = unknown;
export type UpdateSecuritySettingsApiArg = SettingsSecurity;
export type GetPlanBillingSettingsApiResponse = /** status 200 OK */ SettingsPlanBilling;
export type GetPlanBillingSettingsApiArg = void;
export type UpdatePlanBillingSettingsApiResponse = unknown;
export type UpdatePlanBillingSettingsApiArg = SettingsPlanBilling;
export type GetTeamMembersSettingsApiResponse = /** status 200 OK */ SettingsTeamMember[];
export type GetTeamMembersSettingsApiArg = void;
export type CreateTeamMemberSettingsApiResponse = unknown;
export type CreateTeamMemberSettingsApiArg = SettingsTeamMember;
export type DeleteTeamMemberSettingsApiResponse = unknown;
export type DeleteTeamMemberSettingsApiArg = {
	memberId: string;
};
export type UpdateTeamMemberSettingsApiResponse = unknown;
export type UpdateTeamMemberSettingsApiArg = SettingsTeamMember[];

export type SettingsAccount = {
	id: string;
	name?: string;
	username?: string;
	title?: string;
	company?: string;
	about?: string;
	email?: string;
	phone?: string;
	country?: string;
	language?: string;
};

export type SettingsNotifications = {
	id: string;
	communication?: boolean;
	security?: boolean;
	meetups?: boolean;
	comments?: boolean;
	mention?: boolean;
	follow?: boolean;
	inquiry?: boolean;
};

export type SettingsSecurity = {
	id: string;
	currentPassword?: string;
	newPassword?: string;
	twoStepVerification?: boolean;
	askPasswordChange?: boolean;
};

export type SettingsPlanBilling = {
	id: string;
	plan?: string;
	cardHolder?: string;
	cardNumber?: string;
	cardExpiration?: string;
	cardCVC?: string;
	country?: string;
	zip?: string;
};

export type SettingsTeamMember = {
	id: string;
	avatar?: string;
	name?: string;
	email?: string;
	role?: string;
};

export const {
	useGetAccountSettingsQuery,
	useUpdateAccountSettingsMutation,
	useGetNotificationSettingsQuery,
	useUpdateNotificationSettingsMutation,
	useGetSecuritySettingsQuery,
	useUpdateSecuritySettingsMutation,
	useGetPlanBillingSettingsQuery,
	useUpdatePlanBillingSettingsMutation,
	useGetTeamMembersSettingsQuery,
	useCreateTeamMemberSettingsMutation,
	useDeleteTeamMemberSettingsMutation,
	useUpdateTeamMemberSettingsMutation
} = injectedRtkApi;
