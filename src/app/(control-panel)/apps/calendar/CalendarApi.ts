import { apiService as api } from 'src/store/apiService';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import { Dictionary } from '@fullcalendar/core/internal';
import { setSelectedLabels } from './calendarAppSlice';

export const addTagTypes = ['calendar_events', 'calendar_event', 'calendar_labels', 'calendar_label'] as const;

const CalendarApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCalendarEvents: build.query<GetCalendarEventsApiResponse, GetCalendarEventsApiArg>({
				query: () => ({ url: `/api/mock/calendar/events` }),
				providesTags: ['calendar_events']
			}),
			createCalendarEvent: build.mutation<CreateCalendarEventApiResponse, CreateCalendarEventApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/calendar/events`,
					method: 'POST',
					body: queryArg.Event
				}),
				invalidatesTags: ['calendar_events']
			}),
			updateCalendarEvent: build.mutation<UpdateCalendarEventApiResponse, UpdateCalendarEventApiArg>({
				query: (event) => ({
					url: `/api/mock/calendar/events/${event.id}`,
					method: 'PUT',
					body: event
				}),
				invalidatesTags: ['calendar_event', 'calendar_events']
			}),
			deleteCalendarEvent: build.mutation<DeleteCalendarEventApiResponse, DeleteCalendarEventApiArg>({
				query: (id) => ({
					url: `/api/mock/calendar/events/${id}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['calendar_event', 'calendar_events']
			}),
			getCalendarLabels: build.query<GetCalendarLabelsApiResponse, GetCalendarLabelsApiArg>({
				query: () => ({ url: `/api/mock/calendar/labels` }),
				providesTags: ['calendar_labels'],
				async onQueryStarted(id, { dispatch, queryFulfilled }) {
					try {
						const { data: labels } = await queryFulfilled;
						dispatch(setSelectedLabels(labels.map((item) => item.id)));
					} catch (err) {
						dispatch(showMessage({ message: 'Error loading Labels!' }));
					}
				}
			}),
			createCalendarLabel: build.mutation<CreateCalendarLabelApiResponse, CreateCalendarLabelApiArg>({
				query: (Label) => {
					return {
						url: `/api/mock/calendar/labels`,
						method: 'POST',
						body: Label
					};
				},
				invalidatesTags: ['calendar_label', 'calendar_labels']
			}),
			updateCalendarLabel: build.mutation<UpdateCalendarLabelApiResponse, UpdateCalendarLabelApiArg>({
				query: (Label) => ({
					url: `/api/mock/calendar/labels/${Label.id}`,
					method: 'PUT',
					body: Label
				}),
				invalidatesTags: ['calendar_labels']
			}),
			deleteCalendarLabel: build.mutation<DeleteCalendarLabelApiResponse, DeleteCalendarLabelApiArg>({
				query: (id) => ({
					url: `/api/mock/calendar/labels/${id}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['calendar_events', 'calendar_labels']
			})
		}),
		overrideExisting: false
	});

export type GetCalendarEventsApiResponse = /** status 200 OK */ Event[];
export type GetCalendarEventsApiArg = void;

export type CreateCalendarEventApiResponse = /** status 200 OK */ Event;
export type CreateCalendarEventApiArg = {
	Event: Event;
};

export type UpdateCalendarEventApiResponse = /** status 200 OK */ Event;
export type UpdateCalendarEventApiArg = Event;

export type DeleteCalendarEventApiResponse = unknown;
export type DeleteCalendarEventApiArg = string;

export type GetCalendarLabelsApiResponse = /** status 200 OK */ Label[];
export type GetCalendarLabelsApiArg = void;

export type CreateCalendarLabelApiResponse = /** status 200 OK */ Label;
export type CreateCalendarLabelApiArg = Label;

export type UpdateCalendarLabelApiResponse = /** status 200 OK */ Label;
export type UpdateCalendarLabelApiArg = Label;

export type DeleteCalendarLabelApiResponse = unknown;
export type DeleteCalendarLabelApiArg = string;

export type Event = {
	id: string;
	title: string;
	allDay: boolean;
	start: string;
	end: string;
	extendedProps?: Dictionary;
};

export type Label = {
	id: string;
	title: string;
	color: string;
};

export const {
	useGetCalendarEventsQuery,
	useCreateCalendarEventMutation,
	useUpdateCalendarEventMutation,
	useDeleteCalendarEventMutation,
	useGetCalendarLabelsQuery,
	useCreateCalendarLabelMutation,
	useUpdateCalendarLabelMutation,
	useDeleteCalendarLabelMutation
} = CalendarApi;

export default CalendarApi;

export type CalendarApiType = {
	[CalendarApi.reducerPath]: ReturnType<typeof CalendarApi.reducer>;
};
