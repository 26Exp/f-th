import { WithSlice, createSlice } from '@reduxjs/toolkit';
import rootReducer from '@/store/rootReducer';

const initialState: {
	dialogs: {
		noteDialogId: string | null;
		labelsDialogOpen: boolean;
	};
	searchText: string;
	variateDesc: boolean;
} = {
	dialogs: {
		noteDialogId: null,
		labelsDialogOpen: false
	},
	searchText: '',
	variateDesc: false
};

/**
 * The Notes App slice.
 */
export const notesAppSlice = createSlice({
	name: 'notesApp',
	initialState,
	reducers: {
		openNoteDialog: (state, action) => {
			state.dialogs.noteDialogId = action.payload as string;
		},
		closeNoteDialog: (state) => {
			state.dialogs.noteDialogId = null;
		},
		openLabelsDialog: (state) => {
			state.dialogs.labelsDialogOpen = true;
		},
		closeLabelsDialog: (state) => {
			state.dialogs.labelsDialogOpen = false;
		},
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload as string;
			},
			prepare: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => ({
				payload: event.target.value || '',
				meta: undefined,
				error: null
			})
		},
		toggleVariateDescSize: (state) => {
			state.variateDesc = !state.variateDesc;
		}
	},
	selectors: {
		selectNoteDialogId: (state) => state.dialogs.noteDialogId,
		selectLabelsDialogOpen: (state) => state.dialogs.labelsDialogOpen,
		selectSearchText: (state) => state.searchText,
		selectVariateDescSize: (state) => state.variateDesc
	}
});

/**
 * Lazy load
 * */
rootReducer.inject(notesAppSlice);
const injectedSlice = notesAppSlice.injectInto(rootReducer);
declare module '@/store/rootReducer' {
	export interface LazyLoadedSlices extends WithSlice<typeof notesAppSlice> {}
}

export const {
	openNoteDialog,
	closeNoteDialog,
	closeLabelsDialog,
	openLabelsDialog,
	setSearchText,
	toggleVariateDescSize
} = notesAppSlice.actions;

export const { selectNoteDialogId, selectLabelsDialogOpen, selectSearchText, selectVariateDescSize } =
	injectedSlice.selectors;

export type notesAppSliceType = typeof notesAppSlice;

export default notesAppSlice.reducer;
