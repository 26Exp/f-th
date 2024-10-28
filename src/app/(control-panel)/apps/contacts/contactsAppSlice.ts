import { WithSlice, createSlice } from '@reduxjs/toolkit';
import rootReducer from '@/store/rootReducer';

const initialState = { searchText: '' };

/**
 * The Contacts App slice.
 */
export const contactsAppSlice = createSlice({
	name: 'contactsApp',
	initialState,
	reducers: {
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload as string;
			},
			prepare: (event: React.ChangeEvent<HTMLInputElement>) => ({
				payload: `${event?.target?.value}` || '',
				meta: undefined,
				error: null
			})
		},
		resetSearchText: (state) => {
			state.searchText = initialState.searchText;
		}
	},
	selectors: {
		selectSearchText: (state) => state.searchText
	}
});

/**
 * Lazy load
 * */
rootReducer.inject(contactsAppSlice);
const injectedSlice = contactsAppSlice.injectInto(rootReducer);

declare module '@/store/rootReducer' {
	export interface LazyLoadedSlices extends WithSlice<typeof contactsAppSlice> {}
}

export const { setSearchText, resetSearchText } = contactsAppSlice.actions;

export type searchTextSliceType = typeof contactsAppSlice;

export const { selectSearchText } = injectedSlice.selectors;

const searchTextReducer = contactsAppSlice.reducer;

export default searchTextReducer;
