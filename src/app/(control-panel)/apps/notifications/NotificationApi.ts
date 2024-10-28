import { apiService as api } from 'src/store/apiService';
import { ReactNode } from 'react';

export const addTagTypes = ['notifications', 'notification'] as const;

const NotificationApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAllNotifications: build.query<GetAllNotificationsApiResponse, GetAllNotificationsApiArg>({
				query: () => ({ url: `/api/mock/notifications` }),
				providesTags: ['notifications']
			}),
			createNotification: build.mutation<CreateNotificationApiResponse, CreateNotificationApiArg>({
				query: (notification) => ({
					url: `/api/mock/notifications`,
					method: 'POST',
					body: notification
				}),
				invalidatesTags: ['notifications']
			}),
			deleteNotifications: build.mutation<DeleteNotificationsApiResponse, DeleteNotificationsApiArg>({
				query: (notificationIds) => ({
					url: `/api/mock/notifications`,
					method: 'DELETE',
					body: notificationIds
				}),
				invalidatesTags: ['notifications']
			}),
			getNotification: build.query<GetNotificationApiResponse, GetNotificationApiArg>({
				query: (notificationId) => ({
					url: `/api/mock/notifications/${notificationId}`
				}),
				providesTags: ['notification']
			}),
			deleteNotification: build.mutation<DeleteNotificationApiResponse, DeleteNotificationApiArg>({
				query: (notificationId) => ({
					url: `/api/mock/notifications/${notificationId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['notifications']
			})
		}),
		overrideExisting: false
	});
export default NotificationApi;

export type GetAllNotificationsApiResponse = /** status 200 OK */ Notification[];
export type GetAllNotificationsApiArg = void;

export type CreateNotificationApiResponse = unknown;
export type CreateNotificationApiArg = Notification;

export type DeleteNotificationsApiResponse = unknown;
export type DeleteNotificationsApiArg = string[];

export type GetNotificationApiResponse = /** status 200 OK */ Notification;
export type GetNotificationApiArg = string; /** notification id */

export type DeleteNotificationApiResponse = unknown;
export type DeleteNotificationApiArg = string; /** notification id */

export type Notification = {
	id?: string;
	icon?: string;
	title?: string;
	description?: string;
	time?: string;
	read?: boolean;
	link?: string;
	useRouter?: boolean;
	variant?: 'success' | 'info' | 'error' | 'warning' | 'alert' | 'primary' | 'secondary';
	image?: string;
	children?: ReactNode;
};

export const {
	useGetAllNotificationsQuery,
	useCreateNotificationMutation,
	useDeleteNotificationsMutation,
	useGetNotificationQuery,
	useDeleteNotificationMutation
} = NotificationApi;
