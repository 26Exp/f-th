import { WithSlice, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { DeepPartial } from 'react-hook-form';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { formatISO } from 'date-fns/formatISO';
import rootReducer from '@/store/rootReducer';
import { Event } from './CalendarApi';

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export type EventDialogType = {
	type: 'new' | 'edit';
	props: {
		open: boolean;
		anchorPosition?: { top: number; left: number };
	};
	data?: DeepPartial<Event> | null;
};

const initialState: { selectedLabels: string[]; eventDialog: EventDialogType } = {
	selectedLabels: [],
	eventDialog: {
		type: 'new',
		props: {
			open: false,
			anchorPosition: { top: 200, left: 400 }
		},
		data: null
	}
};

/**
 * The CalendarApp labels slice.
 */
export const calendarAppSlice = createSlice({
	name: 'calendarApp',
	initialState,
	reducers: {
		setSelectedLabels: (state, action) => {
			state.selectedLabels = action.payload as string[];
		},
		toggleSelectedLabels: (state, action) => {
			state.selectedLabels = _.xor(state.selectedLabels, [action.payload]) as string[];
		},

		openNewEventDialog: {
			prepare: (selectInfo: Partial<DateSelectArg>) => {
				const { start, end, jsEvent } = selectInfo;
				const payload: EventDialogType = {
					type: 'new',
					props: {
						open: true,
						anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX }
					},
					data: {
						start: formatISO(start),
						end: formatISO(end)
					}
				};
				return { payload, meta: undefined, error: null };
			},
			reducer: (state, action) => {
				state.eventDialog = action.payload as EventDialogType;
			}
		},
		openEditEventDialog: {
			prepare: (clickInfo: EventClickArg) => {
				const { jsEvent, event } = clickInfo;
				const { id, title, allDay, start, end, extendedProps } = event;

				const payload: EventDialogType = {
					type: 'edit',
					props: {
						open: true,
						anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX }
					},
					data: {
						id,
						title,
						allDay,
						extendedProps,
						start: formatISO(start),
						end: formatISO(end)
					}
				};
				return { payload, meta: undefined, error: null };
			},
			reducer: (state, action) => {
				state.eventDialog = action.payload as EventDialogType;
			}
		},
		closeNewEventDialog: (state) => {
			state.eventDialog = initialState.eventDialog;
		},
		closeEditEventDialog: (state) => {
			state.eventDialog = {
				...initialState.eventDialog,
				type: 'edit'
			};
		}
	},
	selectors: {
		selectSelectedLabels: (state) => state.selectedLabels,
		selectEventDialog: (state) => state.eventDialog
	}
});

/**
 * Lazy load
 * */
rootReducer.inject(calendarAppSlice);
const injectedSlice = calendarAppSlice.injectInto(rootReducer);
declare module '@/store/rootReducer' {
	export interface LazyLoadedSlices extends WithSlice<typeof calendarAppSlice> {}
}

export const { selectSelectedLabels, selectEventDialog } = injectedSlice.selectors;

export const {
	toggleSelectedLabels,
	setSelectedLabels,
	closeNewEventDialog,
	openEditEventDialog,
	closeEditEventDialog,
	openNewEventDialog
} = calendarAppSlice.actions;

export type labelsSliceType = typeof calendarAppSlice;

export default calendarAppSlice.reducer;
