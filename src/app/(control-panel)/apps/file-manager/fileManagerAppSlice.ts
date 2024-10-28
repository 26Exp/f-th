import { WithSlice, createSlice } from '@reduxjs/toolkit';
import rootReducer from '@/store/rootReducer';

const initialState: { selectedItemId: string | null } = { selectedItemId: null };

/**
 * The File Manager App slice.
 */
export const fileManagerAppSlice = createSlice({
	name: 'fileManagerApp',
	initialState,
	reducers: {
		setSelectedItemId: (state, action) => {
			state.selectedItemId = action.payload as string;
		},
		resetSelectedItemId: (state) => {
			state.selectedItemId = initialState.selectedItemId;
		}
	},
	selectors: {
		selectSelectedItemId: (state) => state.selectedItemId
	}
});

/**
 * Lazy load
 * */
rootReducer.inject(fileManagerAppSlice);
const injectedSlice = fileManagerAppSlice.injectInto(rootReducer);
declare module '@/store/rootReducer' {
	export interface LazyLoadedSlices extends WithSlice<typeof fileManagerAppSlice> {}
}

export const { setSelectedItemId, resetSelectedItemId } = fileManagerAppSlice.actions;

export const { selectSelectedItemId } = injectedSlice.selectors;

export type selectedItemIdSliceType = typeof fileManagerAppSlice;

export default fileManagerAppSlice.reducer;
