import { apiService as api } from 'src/store/apiService';
import { LabelColorsType } from './@mailView/[...mailParams]/labelColors';

export const addTagTypes = [
	'mailbox_mail',
	'mailbox_mails',
	'mailbox_filters',
	'mailbox_labels',
	'mailbox_label',
	'mailbox_folders'
] as const;

const MailboxApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMailboxMails: build.query<GetMailboxMailsApiResponse, GetMailboxMailsApiArg>({
				query: (params) => ({
					url: `/api/mock/mailbox/mails`,
					params
				}),
				providesTags: ['mailbox_mails']
			}),
			getMailboxMail: build.query<GetMailboxMailApiResponse, GetMailboxMailApiArg>({
				query: (mailId) => ({
					url: `/api/mock/mailbox/mails/${mailId}`
				}),
				providesTags: ['mailbox_mail']
			}),
			updateMailboxMails: build.mutation<UpdateMailboxMailsApiResponse, UpdateMailboxMailsApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/mailbox/mails`,
					method: 'PUT',
					body: queryArg
				}),
				invalidatesTags: ['mailbox_mails', 'mailbox_mail']
			}),
			createMailboxMail: build.mutation<CreateMailboxMailApiResponse, CreateMailboxMailApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/mailbox/mails`,
					method: 'POST',
					body: queryArg.mail
				}),
				invalidatesTags: ['mailbox_mails']
			}),
			getMailboxFilters: build.query<GetMailboxFiltersApiResponse, GetMailboxFiltersApiArg>({
				query: () => ({ url: `/api/mock/mailbox/filters` }),
				providesTags: ['mailbox_filters']
			}),
			getMailboxLabels: build.query<GetMailboxLabelsApiResponse, GetMailboxLabelsApiArg>({
				query: () => ({ url: `/api/mock/mailbox/labels` }),
				providesTags: ['mailbox_labels']
			}),
			updateMailboxLabel: build.mutation<UpdateMailboxLabelApiResponse, UpdateMailboxLabelApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/mailbox/labels/${queryArg.labelSlug}`,
					method: 'PUT',
					body: queryArg.label
				}),
				invalidatesTags: ['mailbox_label', 'mailbox_labels']
			}),
			getMailboxFolders: build.query<GetMailboxFoldersApiResponse, GetMailboxFoldersApiArg>({
				query: () => ({ url: `/api/mock/mailbox/folders` }),
				providesTags: ['mailbox_folders']
			})
		}),
		overrideExisting: false
	});

export default MailboxApi;

export type RouteParams = {
	[key: string]: unknown;
};

export type GetMailboxMailsApiResponse = /** status 200 OK */ MailboxMail[];
export type GetMailboxMailsApiArg = RouteParams;

export type UpdateMailboxMailsApiResponse = unknown;
export type UpdateMailboxMailsApiArg = Partial<MailboxMail>[];

export type CreateMailboxMailApiResponse = unknown;
export type CreateMailboxMailApiArg = {
	/** folder slug */
	folderSlug: string;
	mail: MailboxMail;
};

export type GetMailboxMailApiResponse = MailboxMail;
export type GetMailboxMailApiArg = string;

export type GetMailboxFiltersApiResponse = /** status 200 OK */ MailboxFilter[];
export type GetMailboxFiltersApiArg = void;

export type GetMailboxLabelsApiResponse = /** status 200 OK */ MailboxLabel[];
export type GetMailboxLabelsApiArg = void;

export type UpdateMailboxLabelApiResponse = /** status 200 OK */ MailboxLabel;
export type UpdateMailboxLabelApiArg = {
	/** label slug */
	labelSlug: string;
	label: MailboxLabel;
};

export type GetMailboxFoldersApiResponse = /** status 200 OK */ MailboxFolder[];
export type GetMailboxFoldersApiArg = void;

export type MailboxMailAttachment = {
	type: string;
	name: string;
	size: number;
	preview?: string;
	downloadUrl?: string;
};

export type MailboxMail = {
	id: string;
	type: string;
	from: {
		avatar: string;
		contact: string;
		email: string;
	};
	to: string;
	cc?: string[];
	bcc?: string[];
	date: string;
	subject: string;
	content: string;
	attachments: MailboxMailAttachment[];
	starred: boolean;
	important: boolean;
	unread: boolean;
	folder: string;
	labels: string[];
};

export type MailboxFilter = {
	id: string;
	title: string;
	slug: string;
	icon: string;
};

export type MailboxLabel = {
	id: string;
	title?: string;
	slug?: string;
	color?: LabelColorsType;
};

export type MailboxFolder = {
	id: string;
	title: string;
	slug: string;
	icon: string;
};

export type MailboxAction =
	| 'important'
	| 'starred'
	| 'unread'
	| 'folder'
	| 'labels'
	| 'label'
	| 'sent'
	| 'drafts'
	| 'trash'
	| 'spam'
	| 'all';

export const {
	useGetMailboxMailsQuery,
	useUpdateMailboxMailsMutation,
	useCreateMailboxMailMutation,
	useGetMailboxFiltersQuery,
	useGetMailboxLabelsQuery,
	useUpdateMailboxLabelMutation,
	useGetMailboxFoldersQuery,
	useGetMailboxMailQuery
} = MailboxApi;

export type MailboxApiType = {
	[MailboxApi.reducerPath]: ReturnType<typeof MailboxApi.reducer>;
};
