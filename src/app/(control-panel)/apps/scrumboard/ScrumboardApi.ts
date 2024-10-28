import { apiService as api } from 'src/store/apiService';
import { DropResult } from '@hello-pangea/dnd';
import { PartialDeep } from 'type-fest';
import _ from 'lodash';
import { createSelector } from '@reduxjs/toolkit';
import BoardModel from './models/BoardModel';
import CardModel from './models/CardModel';
import reorder, { reorderQuoteMap } from './utils/reorder';

export const addTagTypes = [
	'scrumboard_members',
	'scrumboard_board_lists',
	'scrumboard_member',
	'scrumboard_board_list',
	'scrumboard_board_labels',
	'scrumboard_board_label',
	'scrumboard_board_cards',
	'scrumboard_board_card',
	'scrumboard_boards',
	'scrumboard_board'
] as const;

const ScrumboardApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getScrumboardMembers: build.query<GetScrumboardMembersApiResponse, GetScrumboardMembersApiArg>({
				query: () => ({ url: `/api/mock/scrumboard/members` }),
				providesTags: ['scrumboard_members']
			}),
			createScrumboardMember: build.mutation<CreateScrumboardMemberApiResponse, CreateScrumboardMemberApiArg>({
				query: (member) => ({
					url: `/api/mock/scrumboard/members`,
					method: 'POST',
					body: member
				}),
				invalidatesTags: ['scrumboard_members']
			}),
			getScrumboardMember: build.query<GetScrumboardMemberApiResponse, GetScrumboardMemberApiArg>({
				query: (memberId) => ({
					url: `/api/mock/scrumboard/members/${memberId}`
				}),
				providesTags: ['scrumboard_member']
			}),
			updateScrumboardMember: build.mutation<UpdateScrumboardMemberApiResponse, UpdateScrumboardMemberApiArg>({
				query: (member) => ({
					url: `/api/mock/scrumboard/members/${member.id}`,
					method: 'PUT',
					body: member
				}),
				invalidatesTags: ['scrumboard_member']
			}),
			deleteScrumboardMember: build.mutation<DeleteScrumboardMemberApiResponse, DeleteScrumboardMemberApiArg>({
				query: (memberId) => ({
					url: `/api/mock/scrumboard/members/${memberId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_members']
			}),
			getScrumboardBoardLists: build.query<GetScrumboardBoardListsApiResponse, GetScrumboardBoardListsApiArg>({
				query: (boardId) => ({
					url: `/api/mock/scrumboard/lists`,
					params: { boardId }
				}),
				providesTags: ['scrumboard_board_lists']
			}),
			createScrumboardBoardList: build.mutation<
				CreateScrumboardBoardListApiResponse,
				CreateScrumboardBoardListApiArg
			>({
				query: (listItem) => ({
					url: `/api/mock/scrumboard/lists`,
					method: 'POST',
					body: listItem
				}),
				invalidatesTags: ['scrumboard_board_lists', 'scrumboard_board']
			}),
			getScrumboardBoardList: build.query<GetScrumboardBoardListApiResponse, GetScrumboardBoardListApiArg>({
				query: (listId) => ({
					url: `/api/mock/scrumboard/lists/${listId}`
				}),
				providesTags: ['scrumboard_board_lists', 'scrumboard_board_list']
			}),
			updateScrumboardBoardList: build.mutation<
				UpdateScrumboardBoardListApiResponse,
				UpdateScrumboardBoardListApiArg
			>({
				query: (list) => ({
					url: `/api/mock/scrumboard/lists/${list.id}`,
					method: 'PUT',
					body: list
				}),
				invalidatesTags: ['scrumboard_board_lists', 'scrumboard_board_list']
			}),
			deleteScrumboardBoardList: build.mutation<
				DeleteScrumboardBoardListApiResponse,
				DeleteScrumboardBoardListApiArg
			>({
				query: (listId) => ({
					url: `/api/mock/scrumboard/lists/${listId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_board_lists', 'scrumboard_board']
			}),
			getScrumboardBoardLabels: build.query<GetScrumboardBoardLabelsApiResponse, GetScrumboardBoardLabelsApiArg>({
				query: (boardId) => ({
					url: `/api/mock/scrumboard/labels`,
					params: { boardId }
				}),
				providesTags: ['scrumboard_board_labels']
			}),
			createScrumboardBoardLabel: build.mutation<
				CreateScrumboardBoardLabelApiResponse,
				CreateScrumboardBoardLabelApiArg
			>({
				query: (queryArg) => ({
					url: `/api/mock/scrumboard/labels`,
					method: 'POST',
					body: { ...queryArg.label, boardId: queryArg.boardId }
				}),
				invalidatesTags: ['scrumboard_board_labels']
			}),
			getScrumboardBoardLabel: build.query<GetScrumboardBoardLabelApiResponse, GetScrumboardBoardLabelApiArg>({
				query: (labelId) => ({
					url: `/api/mock/scrumboard/labels/${labelId}`
				}),
				providesTags: ['scrumboard_board_label']
			}),
			updateScrumboardBoardLabel: build.mutation<
				UpdateScrumboardBoardLabelApiResponse,
				UpdateScrumboardBoardLabelApiArg
			>({
				query: (label) => ({
					url: `/api/mock/scrumboard/labels/${label.id}`,
					method: 'PUT',
					body: label
				}),
				invalidatesTags: ['scrumboard_board_label']
			}),
			deleteScrumboardBoardLabel: build.mutation<
				DeleteScrumboardBoardLabelApiResponse,
				DeleteScrumboardBoardLabelApiArg
			>({
				query: (labelId) => ({
					url: `/api/mock/scrumboard/labels/${labelId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_board_labels']
			}),
			getScrumboardBoardCards: build.query<
				GetScrumboardBoardCardListApiResponse,
				GetScrumboardBoardCardListApiArg
			>({
				query: (boardId) => ({
					url: `/api/mock/scrumboard/cards`,
					params: { boardId }
				}),
				providesTags: ['scrumboard_board_cards']
			}),
			createScrumboardBoardCard: build.mutation<
				CreateScrumboardBoardCardApiResponse,
				CreateScrumboardBoardCardApiArg
			>({
				query: (queryArg) => ({
					url: `/api/mock/scrumboard/cards`,
					method: 'POST',
					body: CardModel({
						...queryArg.card,
						boardId: queryArg.boardId,
						listId: queryArg.listId
					})
				}),
				invalidatesTags: ['scrumboard_board_cards', 'scrumboard_board']
			}),
			updateScrumboardBoardCard: build.mutation<
				UpdateScrumboardBoardCardApiResponse,
				UpdateScrumboardBoardCardApiArg
			>({
				query: (card) => ({
					url: `/api/mock/scrumboard/cards/${card.id}`,
					method: 'PUT',
					body: card
				}),
				invalidatesTags: ['scrumboard_board_cards']
			}),
			deleteScrumboardBoardCard: build.mutation<
				DeleteScrumboardBoardCardApiResponse,
				DeleteScrumboardBoardCardApiArg
			>({
				query: (cardId) => ({
					url: `/api/mock/scrumboard/cards/${cardId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_board_cards']
			}),
			getScrumboardBoards: build.query<GetScrumboardBoardsApiResponse, GetScrumboardBoardsApiArg>({
				query: () => ({ url: `/api/mock/scrumboard/boards` }),
				providesTags: ['scrumboard_boards']
			}),
			createScrumboardBoard: build.mutation<CreateScrumboardBoardApiResponse, CreateScrumboardBoardApiArg>({
				query: (board) => ({
					url: `/api/mock/scrumboard/boards`,
					method: 'POST',
					body: BoardModel(board)
				}),
				invalidatesTags: ['scrumboard_boards', 'scrumboard_board']
			}),
			getScrumboardBoard: build.query<GetScrumboardBoardApiResponse, GetScrumboardBoardApiArg>({
				query: (boardId) => ({
					url: `/api/mock/scrumboard/boards/${boardId}`
				}),
				providesTags: ['scrumboard_board']
			}),
			updateScrumboardBoard: build.mutation<UpdateScrumboardBoardApiResponse, UpdateScrumboardBoardApiArg>({
				query: (board) => ({
					url: `/api/mock/scrumboard/boards/${board.id}`,
					method: 'PUT',
					body: board
				}),
				invalidatesTags: ['scrumboard_board', 'scrumboard_boards']
			}),
			deleteScrumboardBoard: build.mutation<DeleteScrumboardBoardApiResponse, DeleteScrumboardBoardApiArg>({
				query: (boardId) => ({
					url: `/api/mock/scrumboard/boards/${boardId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_boards']
			}),
			updateScrumboardBoardListOrder: build.mutation<
				UpdateScrumboardBoardListOrderApiResponse,
				UpdateScrumboardBoardListOrderApiArg
			>({
				query: (queryArg) => {
					const { orderResult, board } = queryArg;

					const ordered = reorder(
						_.merge([], board.lists),
						orderResult.source.index,
						orderResult.destination.index
					);

					return {
						url: `/api/mock/scrumboard/boards/${board.id}`,
						method: 'PUT',
						body: { ...board, lists: ordered }
					};
				},
				onQueryStarted: async (queryArg, { dispatch, queryFulfilled }) => {
					const { orderResult, board } = queryArg;

					// Optimistically update the state
					const ordered = reorder(
						_.merge([], board.lists),
						orderResult.source.index,
						orderResult.destination.index
					) as ScrumboardBoardList[];

					dispatch(
						ScrumboardApi.util.updateQueryData('getScrumboardBoard', board.id, (draft) => {
							draft.lists = ordered;
						})
					);

					try {
						await queryFulfilled; // Wait for the mutation to complete
					} catch {
						// Handle error if needed (e.g., revert the optimistic update)
					}
				},
				invalidatesTags: ['scrumboard_boards', 'scrumboard_board']
			}),
			updateScrumboardBoardCardOrder: build.mutation<
				UpdateScrumboardBoardCardOrderApiResponse,
				UpdateScrumboardBoardCardOrderApiArg
			>({
				query: (queryArg) => {
					const { orderResult, board } = queryArg;

					const ordered = reorderQuoteMap(
						_.merge([], board.lists),
						orderResult.source,
						orderResult.destination
					);

					return {
						url: `/api/mock/scrumboard/boards/${board.id}`,
						method: 'PUT',
						body: { ...board, lists: ordered }
					};
				},
				onQueryStarted: async (queryArg, { dispatch, queryFulfilled }) => {
					const { orderResult, board } = queryArg;

					// Optimistically update the state
					const ordered = reorderQuoteMap(
						_.merge([], board.lists),
						orderResult.source,
						orderResult.destination
					);

					dispatch(
						ScrumboardApi.util.updateQueryData('getScrumboardBoard', board.id, (draft) => {
							draft.lists = ordered;
						})
					);

					try {
						await queryFulfilled; // Wait for the mutation to complete
					} catch {
						// Handle error if needed (e.g., revert the optimistic update)
					}
				},
				invalidatesTags: ['scrumboard_board_list', 'scrumboard_board']
			})
		}),
		overrideExisting: false
	});

export default ScrumboardApi;

export type ScrumboardApiType = {
	[ScrumboardApi.reducerPath]: ReturnType<typeof ScrumboardApi.reducer>;
};

export type GetScrumboardMembersApiResponse = /** status 200 OK */ ScrumboardMember[];
export type GetScrumboardMembersApiArg = void;

export type CreateScrumboardMemberApiResponse = unknown;
export type CreateScrumboardMemberApiArg = ScrumboardMember;

export type GetScrumboardBoardListsApiResponse = /** status 200 OK */ ScrumboardList[];
export type GetScrumboardBoardListsApiArg = string /** board id */;

export type CreateScrumboardBoardListApiResponse = unknown;
export type CreateScrumboardBoardListApiArg = Omit<ScrumboardList, 'id'>;

export type GetScrumboardMemberApiResponse = /** status 200 OK */ ScrumboardMember;
export type GetScrumboardMemberApiArg = string /** member id */;

export type UpdateScrumboardMemberApiResponse = unknown;
export type UpdateScrumboardMemberApiArg = PartialDeep<ScrumboardMember>;

export type DeleteScrumboardMemberApiResponse = unknown;
export type DeleteScrumboardMemberApiArg = string /** member id */;

export type GetScrumboardBoardListApiResponse = /** status 200 OK */ ScrumboardList;
export type GetScrumboardBoardListApiArg = string;

export type UpdateScrumboardBoardListApiResponse = unknown;
export type UpdateScrumboardBoardListApiArg = ScrumboardList;

export type DeleteScrumboardBoardListApiResponse = unknown;
export type DeleteScrumboardBoardListApiArg = string;

export type GetScrumboardBoardLabelsApiResponse = /** status 200 OK */ ScrumboardLabel[];
export type GetScrumboardBoardLabelsApiArg = string /** board id */;

export type CreateScrumboardBoardLabelApiResponse = unknown;
export type CreateScrumboardBoardLabelApiArg = {
	boardId: string;
	label: PartialDeep<ScrumboardLabel>;
};

export type GetScrumboardBoardLabelApiResponse = /** status 200 OK */ ScrumboardLabel;
export type GetScrumboardBoardLabelApiArg = string;

export type UpdateScrumboardBoardLabelApiResponse = unknown;
export type UpdateScrumboardBoardLabelApiArg = ScrumboardLabel;

export type DeleteScrumboardBoardLabelApiResponse = unknown;
export type DeleteScrumboardBoardLabelApiArg = string;

export type GetScrumboardBoardCardListApiResponse = /** status 200 OK */ ScrumboardCard[];
export type GetScrumboardBoardCardListApiArg = string /** board id */;

export type CreateScrumboardBoardCardApiResponse = /** status 200 OK */ ScrumboardCard;
export type CreateScrumboardBoardCardApiArg = {
	boardId: string;
	listId: string;
	card: PartialDeep<ScrumboardCard>;
};

export type UpdateScrumboardBoardCardApiResponse = unknown;
export type UpdateScrumboardBoardCardApiArg = PartialDeep<ScrumboardCard>;

export type DeleteScrumboardBoardCardApiResponse = unknown;
export type DeleteScrumboardBoardCardApiArg = string;

export type GetScrumboardBoardsApiResponse = /** status 200 OK */ ScrumboardBoard[];
export type GetScrumboardBoardsApiArg = void;

export type CreateScrumboardBoardApiResponse = unknown;
export type CreateScrumboardBoardApiArg = PartialDeep<ScrumboardBoard>;

export type GetScrumboardBoardApiResponse = /** status 200 OK */ ScrumboardBoard;
export type GetScrumboardBoardApiArg = string /** board id */;

export type UpdateScrumboardBoardApiResponse = unknown;
export type UpdateScrumboardBoardApiArg = PartialDeep<ScrumboardBoard>;

export type DeleteScrumboardBoardApiResponse = unknown;
export type DeleteScrumboardBoardApiArg = string /** board id */;

export type UpdateScrumboardBoardListOrderApiResponse = unknown;
export type UpdateScrumboardBoardListOrderApiArg = {
	orderResult: {
		source: DropResult['source'];
		destination: DropResult['destination'];
	};
	board: ScrumboardBoard;
};
export type UpdateScrumboardBoardCardOrderApiResponse = unknown;
export type UpdateScrumboardBoardCardOrderApiArg = {
	orderResult: {
		source: DropResult['source'];
		destination: DropResult['destination'];
	};
	board: ScrumboardBoard;
};

export type ScrumboardMember = {
	id: string;
	name: string;
	avatar: string;
	class: string;
};

export type ScrumboardList = {
	id: string;
	boardId: string;
	title: string;
};

export type ScrumboardBoardList = {
	id: string;
	cards: ScrumboardCard['id'][];
};

export type ScrumboardLabel = {
	id: string;
	boardId: string;
	title: string;
};

export type ScrumboardAttachment = {
	id: string;
	name: string;
	src: string;
	url: string;
	time: number;
	type: string;
};

export type ScrumboardCheckListItem = {
	id: number;
	name: string;
	checked: boolean;
};

export type ScrumboardChecklist = {
	id?: string;
	name: string;
	checkItems: ScrumboardCheckListItem[];
};

export type ScrumboardCard = {
	id: string;
	boardId: string;
	listId: string;
	title: string;
	description: string;
	labels: string[];
	dueDate?: number | null;
	attachmentCoverId: string;
	memberIds: string[];
	attachments: ScrumboardAttachment[];
	subscribed: boolean;
	checklists: ScrumboardChecklist[];
	activities: {
		id: string;
		type: string;
		idMember: string;
		message: string;
		time: number;
	}[];
};

export type ScrumboardBoard = {
	id: string;
	title: string;
	description: string;
	icon: string;
	lastActivity: string;
	members: string[];
	settings: {
		subscribed: boolean;
		cardCoverImages: boolean;
	};
	lists: {
		id: string;
		cards?: string[];
	}[];
};

export type ScrumboardComment = {
	id: string;
	type: string;
	idMember: string;
	message: string;
	time: number;
};

export const {
	useGetScrumboardMembersQuery,
	useCreateScrumboardMemberMutation,
	useGetScrumboardBoardListsQuery,
	useCreateScrumboardBoardListMutation,
	useGetScrumboardMemberQuery,
	useUpdateScrumboardMemberMutation,
	useDeleteScrumboardMemberMutation,
	useGetScrumboardBoardListQuery,
	useUpdateScrumboardBoardListMutation,
	useDeleteScrumboardBoardListMutation,
	useGetScrumboardBoardLabelsQuery,
	useCreateScrumboardBoardLabelMutation,
	useGetScrumboardBoardLabelQuery,
	useUpdateScrumboardBoardLabelMutation,
	useDeleteScrumboardBoardLabelMutation,
	useGetScrumboardBoardCardsQuery,
	useCreateScrumboardBoardCardMutation,
	useUpdateScrumboardBoardCardMutation,
	useDeleteScrumboardBoardCardMutation,
	useGetScrumboardBoardsQuery,
	useCreateScrumboardBoardMutation,
	useGetScrumboardBoardQuery,
	useUpdateScrumboardBoardMutation,
	useDeleteScrumboardBoardMutation,
	useUpdateScrumboardBoardListOrderMutation,
	useUpdateScrumboardBoardCardOrderMutation
} = ScrumboardApi;

export const selectLabelById = (boardId: string, id: string) =>
	createSelector(
		(ScrumboardApi.endpoints.getScrumboardBoardLabels.select(boardId),
		(labels) => _.find(labels, { id }) as ScrumboardLabel)
	);
