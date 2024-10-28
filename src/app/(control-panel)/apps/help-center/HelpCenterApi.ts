import apiService from 'src/store/apiService';

export const addTagTypes = [
	'help_center_guides',
	'help_center_guides_by_category',
	'help_center_guide',
	'help_center_guide_categories',
	'help_center_faqs',
	'help_center_faqs_by_category',
	'help_center_most_asked_faqs',
	'help_center_faq_categories'
] as const;

const HelpCenterApi = apiService
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getHelpCenterGuides: build.query<GetHelpCenterGuidesApiResponse, GetHelpCenterGuidesApiArg>({
				query: () => ({ url: `/api/mock/help-center/guides` }),
				providesTags: ['help_center_guides']
			}),
			getHelpCenterGuidesByCategory: build.query<
				GetHelpCenterGuidesByCategoryApiResponse,
				GetHelpCenterGuidesByCategoryApiArg
			>({
				query: (queryArg) => ({
					url: `/api/mock/help-center/guides`,
					params: {
						categoryId: queryArg.categoryId
					}
				}),
				providesTags: ['help_center_guides_by_category']
			}),
			getHelpCenterGuideById: build.query<GetHelpCenterGuideByIdApiResponse, GetHelpCenterGuideByIdApiArg>({
				query: (guideId) => ({
					url: `/api/mock/help-center/guides/${guideId}`
				}),
				providesTags: ['help_center_guide']
			}),
			getHelpCenterGuideCategories: build.query<
				GetHelpCenterGuideCategoriesApiResponse,
				GetHelpCenterGuideCategoriesApiArg
			>({
				query: () => ({ url: `/api/mock/help-center/guide-categories` }),
				providesTags: ['help_center_guide_categories']
			}),
			getHelpCenterFaqs: build.query<GetHelpCenterFaqsApiResponse, GetHelpCenterFaqsApiArg>({
				query: () => ({ url: `/api/mock/help-center/faqs` }),
				providesTags: ['help_center_faqs']
			}),
			getHelpCenterFaqsByCategory: build.query<
				GetHelpCenterFaqsByCategoryApiResponse,
				GetHelpCenterFaqsByCategoryApiArg
			>({
				query: (queryArg) => ({
					url: `/api/mock/help-center/faqs`,
					params: {
						categoryId: queryArg.categoryId
					}
				}),
				providesTags: ['help_center_faqs_by_category']
			}),
			getHelpCenterMostlyFaqs: build.query<GetMostlyFaqsApiResponse, GetMostlyFaqsApiArg>({
				query: () => ({ url: `/api/mock/help-center/faqs/most` }),
				providesTags: ['help_center_most_asked_faqs']
			}),
			getHelpCenterFaqCategories: build.query<
				GetHelpCenterFaqCategoriesApiResponse,
				GetHelpCenterFaqCategoriesApiArg
			>({
				query: () => ({ url: `/api/mock/help-center/faqs-categories` }),
				providesTags: ['help_center_faq_categories']
			})
		}),
		overrideExisting: false
	});
export default HelpCenterApi;

export type GetHelpCenterGuidesApiResponse = /** status 200 OK */ Guide[];
export type GetHelpCenterGuidesApiArg = void;

export type GetHelpCenterGuidesByCategoryApiResponse = /** status 200 OK */ Guide[];
export type GetHelpCenterGuidesByCategoryApiArg = {
	categoryId: string;
};

export type GetHelpCenterGuideByIdApiResponse = /** status 200 OK */ Guide;
export type GetHelpCenterGuideByIdApiArg = string;

export type GetHelpCenterGuideCategoriesApiResponse = /** status 200 OK */ GuideCategory[];
export type GetHelpCenterGuideCategoriesApiArg = void;

export type GetHelpCenterFaqsApiResponse = /** status 200 OK */ Faq[];
export type GetHelpCenterFaqsApiArg = void;

export type GetHelpCenterFaqsByCategoryApiResponse = /** status 200 OK */ Faq[];
export type GetHelpCenterFaqsByCategoryApiArg = {
	categoryId: string;
};

export type GetMostlyFaqsApiResponse = /** status 200 OK */ Faq[];
export type GetMostlyFaqsApiArg = void;

export type GetHelpCenterFaqCategoriesApiResponse = /** status 200 OK */ FaqCategory[];
export type GetHelpCenterFaqCategoriesApiArg = void;

export type Guide = {
	id: string;
	categoryId: string;
	slug: string;
	title: string;
	subtitle: string;
	content: string;
};

export type GuideCategory = {
	id: string;
	slug: string;
	title: string;
};

export type Faq = {
	id: string;
	categoryId: string;
	question: string;
	answer: string;
};

export type FaqCategory = {
	id: string;
	slug: string;
	title: string;
};

export const {
	useGetHelpCenterGuidesQuery,
	useGetHelpCenterGuidesByCategoryQuery,
	useGetHelpCenterGuideByIdQuery,
	useGetHelpCenterGuideCategoriesQuery,
	useGetHelpCenterFaqsQuery,
	useGetHelpCenterFaqsByCategoryQuery,
	useGetHelpCenterMostlyFaqsQuery,
	useGetHelpCenterFaqCategoriesQuery
} = HelpCenterApi;
