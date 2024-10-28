import { WithSlice, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import rootReducer from '@/store/rootReducer';
import { MailboxMail } from './MailboxApi';

const initialState: {
	selectedMailIds: string[];
	searchText: string;
} = { selectedMailIds: [], searchText: '' };

/**
 * The Mailbox App slice.
 */
export const mailboxAppSlice = createSlice({
	name: 'mailboxApp',
	initialState,
	reducers: {
		setSelectedMailIds: (state, action) => {
			state.selectedMailIds = action.payload as string[];
		},
		selectAllMails: (state, action) => {
			const mailList = action.payload as MailboxMail[];
			state.selectedMailIds = mailList.map((mail) => mail.id);
		},
		deselectAllMails: (state) => {
			state.selectedMailIds = initialState.selectedMailIds;
		},
		toggleInSelectedMails: (state, action) => {
			const mailId = action.payload as string;
			state.selectedMailIds = _.xor(state.selectedMailIds, [mailId]);
		},
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload as string;
			},
			prepare: (event: React.ChangeEvent<HTMLInputElement>) => ({
				payload: event.target.value || '',
				meta: undefined,
				error: null
			})
		}
	},
	selectors: {
		selectSelectedMailIds: (state) => state.selectedMailIds,
		selectSearchText: (state) => state.searchText
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(mailboxAppSlice);
const injectedSlice = mailboxAppSlice.injectInto(rootReducer);
declare module '@/store/rootReducer' {
	export interface LazyLoadedSlices extends WithSlice<typeof mailboxAppSlice> {}
}

export const { selectSelectedMailIds, selectSearchText } = injectedSlice.selectors;

export const { setSelectedMailIds, toggleInSelectedMails, deselectAllMails, selectAllMails, setSearchText } =
	mailboxAppSlice.actions;

const selectedMailIdsReducer = mailboxAppSlice.reducer;

export type selectedMailIdsSliceType = typeof mailboxAppSlice;

export default selectedMailIdsReducer;
