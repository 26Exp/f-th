import { WithSlice, createSlice } from '@reduxjs/toolkit';
import rootReducer from '@/store/rootReducer';

const initialState: {
	selectedChatId: string;
	open: boolean;
} = {
	selectedChatId: '',
	open: false
};

/**
 * The slice for the contacts.
 */
export const messengerPanelSlice = createSlice({
	name: 'chatPanel',
	initialState,
	reducers: {
		setSelectedChatId: (state, action) => {
			state.selectedChatId = action.payload as string;
		},
		removeSelectedChatId: (state) => {
			state.selectedChatId = '';
		},
		toggleChatPanel: (state) => {
			state.open = !state;
		},
		openChatPanel: (state) => {
			state.open = true;
		},
		closeChatPanel: (state) => {
			state.open = false;
		}
	},
	selectors: {
		selectSelectedChatId: (state) => state.selectedChatId,
		selectChatPanelOpen: (state) => state.open
	}
});

/**
 * Lazy load
 * */
rootReducer.inject(messengerPanelSlice);
const injectedSlice = messengerPanelSlice.injectInto(rootReducer);
declare module '@/store/rootReducer' {
	export interface LazyLoadedSlices extends WithSlice<typeof messengerPanelSlice> {}
}

export const { setSelectedChatId, openChatPanel, toggleChatPanel, removeSelectedChatId, closeChatPanel } =
	messengerPanelSlice.actions;

export const { selectSelectedChatId, selectChatPanelOpen } = injectedSlice.selectors;

export type contactsSliceType = typeof messengerPanelSlice;

export default messengerPanelSlice.reducer;
