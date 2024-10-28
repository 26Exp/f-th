import { apiService as api } from 'src/store/apiService';
import { PartialObjectDeep } from 'type-fest/source/partial-deep';
import ChatMessageModel from './models/ChatMessageModel';

const demoUserId = 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df';

export const addTagTypes = [
	'messenger_contacts',
	'messenger_contact',
	'messenger_chats',
	'messenger_chat',
	'messenger_user_profile'
] as const;

const MessengerApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMessengerContacts: build.query<GetMessengerContactsApiResponse, GetMessengerContactsApiArg>({
				query: () => ({ url: `/api/mock/messenger/contacts` }),
				providesTags: ['messenger_contacts']
			}),
			getMessengerContact: build.query<GetMessengerContactApiResponse, GetMessengerContactApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/messenger/contacts/${queryArg}`
				}),
				providesTags: ['messenger_contact']
			}),
			updateMessengerContact: build.mutation<UpdateMessengerContactApiResponse, UpdateMessengerContactApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/messenger/contacts/${queryArg.id}`,
					method: 'PUT',
					body: queryArg
				}),
				invalidatesTags: ['messenger_contact']
			}),
			deleteMessengerContact: build.mutation<DeleteMessengerContactApiResponse, DeleteMessengerContactApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/messenger/contacts/${queryArg}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['messenger_contact']
			}),
			getMessengerChats: build.query<GetMessengerChatsApiResponse, GetMessengerChatsApiArg>({
				query: () => ({ url: `/api/mock/messenger/chat-list` }),
				providesTags: ['messenger_chats']
			}),
			createMessengerChat: build.mutation<CreateMessengerChatApiResponse, CreateMessengerChatApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/messenger/chat-list`,
					method: 'POST',
					body: queryArg
				}),
				invalidatesTags: ['messenger_chats']
			}),
			getMessengerChat: build.query<GetMessengerChatApiResponse, GetMessengerChatApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/messenger/messages`,
					params: { chatId: queryArg }
				}),
				providesTags: ['messenger_chat']
			}),
			deleteMessengerChat: build.mutation<DeleteMessengerChatApiResponse, DeleteMessengerChatApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/messenger/messages`,
					params: { chatId: queryArg },
					method: 'DELETE'
				}),
				invalidatesTags: ['messenger_chats']
			}),
			sendMessengerMessage: build.mutation<SendMessengerMessageApiResponse, SendMessengerMessageApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/messenger/messages`,
					method: 'POST',
					body: ChatMessageModel({
						chatId: queryArg.chatId,
						contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
						value: queryArg.message
					})
				}),
				invalidatesTags: ['messenger_chat', 'messenger_chats']
			}),
			getMessengerUserProfile: build.query<GetMessengerUserProfileApiResponse, GetMessengerUserProfileApiArg>({
				query: () => ({ url: `/api/mock/messenger/profiles/${demoUserId}` }),
				providesTags: ['messenger_user_profile']
			}),
			updateMessengerUserProfile: build.mutation<
				UpdateMessengerUserProfileApiResponse,
				UpdateMessengerUserProfileApiArg
			>({
				query: (queryArg) => ({
					url: `/api/mock/messenger/profiles/${demoUserId}`,
					method: 'PUT',
					body: queryArg
				}),
				invalidatesTags: ['messenger_user_profile']
			})
		}),
		overrideExisting: false
	});
export default MessengerApi;

export type GetMessengerContactsApiResponse = /** status 200 OK */ Contact[];
export type GetMessengerContactsApiArg = void;

export type GetMessengerContactApiResponse = /** status 200 OK */ Contact;
export type GetMessengerContactApiArg = string;

export type UpdateMessengerContactApiResponse = unknown;
export type UpdateMessengerContactApiArg = Contact;

export type DeleteMessengerContactApiResponse = unknown;
export type DeleteMessengerContactApiArg = string;

export type GetMessengerChatsApiResponse = /** status 200 OK */ Chat[];
export type GetMessengerChatsApiArg = void;

export type CreateMessengerChatApiResponse = /** status 200 OK */ Chat;
export type CreateMessengerChatApiArg = PartialObjectDeep<Chat, object>;

export type GetMessengerChatApiResponse = /** status 200 OK */ Message[];
export type GetMessengerChatApiArg = string;

export type DeleteMessengerChatApiResponse = unknown;
export type DeleteMessengerChatApiArg = string;

export type SendMessengerMessageApiArg = {
	chatId: string;
	message: string;
};
export type SendMessengerMessageApiResponse = Message[];

export type GetMessengerUserProfileApiResponse = Profile;
export type GetMessengerUserProfileApiArg = void;

export type UpdateMessengerUserProfileApiResponse = Profile;
export type UpdateMessengerUserProfileApiArg = PartialObjectDeep<Profile, object>;

export type ContactStatusType = 'online' | 'do-not-disturb' | 'away' | 'offline';

export type Contact = {
	id: string;
	avatar?: string | null;
	name: string;
	about: string;
	details: {
		emails: {
			email: string;
			label: string;
		}[];
		phoneNumbers: {
			country: string;
			phoneNumber: string;
			label: string;
		}[];
		title?: string;
		company: string;
		birthday: string;
		address: string;
	};
	attachments: {
		media: string[];
		docs: string[];
		links: string[];
	};
	status: ContactStatusType;
};

export type Chat = {
	id: string;
	contactIds: string[];
	unreadCount: number;
	muted: boolean;
	lastMessage: string;
	lastMessageAt: string;
};

export type Message = {
	id: string;
	chatId: string;
	contactId: string;
	value: string;
	createdAt: string;
};

export type Task = {
	id: string;
	type: string;
	title: string;
	notes: string;
	completed: boolean;
	dueDate?: string | null;
	priority: number;
	tags: string[];
	assignedTo?: string;
	subTasks: {
		id: string;
		title: string;
		completed: boolean;
	}[];
	order: number;
};

export type Profile = {
	id: string;
	name: string;
	email: string;
	avatar: string;
	about: string;
};

export const {
	useGetMessengerContactsQuery,
	useGetMessengerContactQuery,
	useUpdateMessengerContactMutation,
	useDeleteMessengerContactMutation,
	useGetMessengerChatsQuery,
	useCreateMessengerChatMutation,
	useGetMessengerChatQuery,
	useDeleteMessengerChatMutation,
	useGetMessengerUserProfileQuery,
	useUpdateMessengerUserProfileMutation,
	useSendMessengerMessageMutation
} = MessengerApi;
