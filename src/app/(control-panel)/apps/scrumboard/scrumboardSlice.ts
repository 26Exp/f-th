import { WithSlice, createSlice } from '@reduxjs/toolkit';
import rootReducer from '@/store/rootReducer';
import { ScrumboardCard } from './ScrumboardApi';

const initialState: {
	cardDialog: {
		open: boolean;
		data: ScrumboardCard | null;
	};
} = {
	cardDialog: {
		open: false,
		data: null
	}
};

/**
 * The Scrumboard Slice.
 */
export const scrumboardSlice = createSlice({
	name: 'scrumboardApp',
	initialState,
	reducers: {
		openCardDialog: (state, action) => {
			state.cardDialog = { open: true, data: action.payload as ScrumboardCard };
		},
		closeCardDialog: (state) => {
			state.cardDialog = initialState.cardDialog;
		}
	},
	selectors: {
		selectCardDialogOpen: (state) => state.cardDialog.open,
		selectCardDialogData: (state) => state.cardDialog.data
	}
});

/**
 * Lazy load
 * */
rootReducer.inject(scrumboardSlice);
const injectedSlice = scrumboardSlice.injectInto(rootReducer);
declare module '@/store/rootReducer' {
	export interface LazyLoadedSlices extends WithSlice<typeof scrumboardSlice> {}
}

export const { openCardDialog, closeCardDialog } = scrumboardSlice.actions;

export const { selectCardDialogOpen, selectCardDialogData } = injectedSlice.selectors;

export type CardSliceType = typeof scrumboardSlice;

export default scrumboardSlice.reducer;
