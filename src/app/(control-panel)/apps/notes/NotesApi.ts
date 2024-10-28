import { apiService as api } from 'src/store/apiService';

export const addTagTypes = [
	'notes_list',
	'notes_item',
	'notes_labels',
	'notes_label',
	'notes_archived_items',
	'notes_reminder_items'
] as const;

const NotesApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getNotesList: build.query<GetNotesListApiResponse, GetNotesListApiArg>({
				query: (routeParams) => {
					const { filter, id } = routeParams;

					if (filter === 'labels') {
						return {
							url: `/api/mock/notes/items`,
							params: {
								labels: id
							}
						};
					}

					if (filter === 'archive') {
						return {
							url: `/api/mock/notes/items`,
							params: {
								archived: true
							}
						};
					}

					if (filter === 'reminders') {
						return {
							url: `/api/mock/notes/items`,
							params: {
								reminder: 'not_null'
							}
						};
					}

					return {
						url: `/api/mock/notes/items`
					};
				},
				providesTags: ['notes_list']
			}),
			createNotesItem: build.mutation<CreateNotesItemApiResponse, CreateNotesItemApiArg>({
				query: (note) => ({
					url: `/api/mock/notes/items`,
					method: 'POST',
					body: note
				}),
				invalidatesTags: ['notes_list', 'notes_item']
			}),
			getNotesItem: build.query<GetNotesItemApiResponse, GetNotesItemApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/notes/items/${queryArg.noteId}`
				}),
				providesTags: ['notes_item']
			}),
			updateNotesItem: build.mutation<UpdateNotesItemApiResponse, UpdateNotesItemApiArg>({
				query: (note) => ({
					url: `/api/mock/notes/items/${note.id}`,
					method: 'PUT',
					body: note
				}),
				invalidatesTags: ['notes_item', 'notes_list']
			}),
			deleteNotesItem: build.mutation<DeleteNotesItemApiResponse, DeleteNotesItemApiArg>({
				query: (noteId) => ({
					url: `/api/mock/notes/items/${noteId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['notes_list']
			}),
			getNotesLabels: build.query<GetNotesLabelsApiResponse, GetNotesLabelsApiArg>({
				query: () => ({ url: `/api/mock/notes/labels` }),
				providesTags: ['notes_labels']
			}),
			createNotesLabel: build.mutation<CreateNotesLabelApiResponse, CreateNotesLabelApiArg>({
				query: (noteLabel) => ({
					url: `/api/mock/notes/labels`,
					method: 'POST',
					body: noteLabel
				}),
				invalidatesTags: ['notes_label', 'notes_labels']
			}),
			getNotesLabel: build.query<GetNotesLabelApiResponse, GetNotesLabelApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/notes/labels/${queryArg.labelId}`
				}),
				providesTags: ['notes_label']
			}),
			updateNotesLabel: build.mutation<UpdateNotesLabelApiResponse, UpdateNotesLabelApiArg>({
				query: (notesLabel) => ({
					url: `/api/mock/notes/labels/${notesLabel.id}`,
					method: 'PUT',
					body: notesLabel
				}),
				invalidatesTags: ['notes_labels']
			}),
			deleteNotesLabel: build.mutation<DeleteNotesLabelApiResponse, DeleteNotesLabelApiArg>({
				query: (labelId) => ({
					url: `/api/mock/notes/labels/${labelId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['notes_labels']
			}),
			getNotesArchivedItems: build.query<GetNotesArchivedItemsApiResponse, GetNotesArchivedItemsApiArg>({
				query: () => ({ url: `/api/mock/notes/archive` }),
				providesTags: ['notes_archived_items']
			}),
			getNotesReminderItems: build.query<GetNotesReminderItemsApiResponse, GetNotesReminderItemsApiArg>({
				query: () => ({ url: `/api/mock/notes/reminder` }),
				providesTags: ['notes_reminder_items']
			})
		}),
		overrideExisting: false
	});
export { NotesApi };

export type RouteParams = Partial<{
	filter: string;
	id: string;
}>;

export type GetNotesListApiResponse = /** status 200 OK */ NotesNote[];
export type GetNotesListApiArg = RouteParams;

export type CreateNotesItemApiResponse = unknown;
export type CreateNotesItemApiArg = NotesNote;

export type GetNotesItemApiResponse = /** status 200 OK */ NotesNote;
export type GetNotesItemApiArg = {
	/** note id */
	noteId: string;
};

export type UpdateNotesItemApiResponse = unknown;
export type UpdateNotesItemApiArg = NotesNote;

export type DeleteNotesItemApiResponse = unknown;
export type DeleteNotesItemApiArg = string;

export type GetNotesLabelsApiResponse = /** status 200 OK */ NotesLabel[];
export type GetNotesLabelsApiArg = void;

export type CreateNotesLabelApiResponse = unknown;
export type CreateNotesLabelApiArg = NotesLabel;

export type GetNotesLabelApiResponse = /** status 200 OK */ NotesLabel;
export type GetNotesLabelApiArg = {
	/** label id */
	labelId: string;
};

export type UpdateNotesLabelApiResponse = unknown;
export type UpdateNotesLabelApiArg = NotesLabel;

export type DeleteNotesLabelApiResponse = unknown;
export type DeleteNotesLabelApiArg = string;

export type GetNotesArchivedItemsApiResponse = /** status 200 OK */ NotesNote[];
export type GetNotesArchivedItemsApiArg = void;

export type GetNotesReminderItemsApiResponse = /** status 200 OK */ NotesNote[];
export type GetNotesReminderItemsApiArg = void;

export type NoteListItemType = {
	id: string;
	content: string;
	completed: boolean;
};

export type NotesNote = {
	id: string;
	title: string;
	content: string;
	tasks?: NoteListItemType[];
	image?: string | null;
	reminder?: string | null;
	labels: string[];
	archived: boolean;
	createdAt: string;
	updatedAt?: string | null;
};

export type NotesLabel = {
	id: string;
	title: string;
};

export const {
	useGetNotesListQuery,
	useCreateNotesItemMutation,
	useGetNotesItemQuery,
	useUpdateNotesItemMutation,
	useDeleteNotesItemMutation,
	useGetNotesLabelsQuery,
	useCreateNotesLabelMutation,
	useGetNotesLabelQuery,
	useUpdateNotesLabelMutation,
	useDeleteNotesLabelMutation,
	useGetNotesArchivedItemsQuery,
	useGetNotesReminderItemsQuery
} = NotesApi;

export type NotesApiType = {
	[NotesApi.reducerPath]: ReturnType<typeof NotesApi.reducer>;
};
