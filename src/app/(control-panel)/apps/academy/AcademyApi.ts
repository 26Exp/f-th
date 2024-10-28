import apiService from 'src/store/apiService';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import { PartialDeep } from 'type-fest';

export const addTagTypes = ['academy_courses', 'academy_course', 'academy_categories'] as const;

const AcademyApi = apiService
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAcademyCourses: build.query<GetAcademyCoursesApiResponse, GetAcademyCoursesApiArg>({
				query: () => ({ url: `/api/mock/academy/courses` }),
				providesTags: ['academy_courses']
			}),
			getAcademyCourse: build.query<GetAcademyCourseApiResponse, GetAcademyCourseApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/academy/courses/${queryArg.courseId}`
				}),
				providesTags: ['academy_course']
			}),
			updateAcademyCourse: build.mutation<UpdateAcademyCourseApiResponse, UpdateAcademyCourseApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/academy/courses/${queryArg.courseId}`,
					method: 'PUT',
					body: queryArg.data
				}),
				async onQueryStarted(id, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						dispatch(showMessage({ message: 'Course Saved' }));
					} catch (err) {
						dispatch(showMessage({ message: 'Error Saving the course!' }));
					}
				},
				invalidatesTags: ['academy_courses', 'academy_course']
			}),
			deleteAcademyCourse: build.mutation<DeleteAcademyCourseApiResponse, DeleteAcademyCourseApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/academy/courses/${queryArg.courseId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['academy_courses']
			}),
			getAcademyCourseSteps: build.query<GetAcademyCourseStepsApiResponse, GetAcademyCourseStepsApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/academy/course-steps`,
					params: {
						// courseId: queryArg.courseId
						courseId: '0' // demo
					}
				}),
				providesTags: ['academy_course']
			}),
			getAcademyCourseStepContent: build.query<
				GetAcademyCourseStepContentApiResponse,
				GetAcademyCourseStepContentApiArg
			>({
				query: (stepId) => ({
					// url: `/api/mock/academy/course-step-contents/${stepId}`,
					url: `/api/mock/academy/course-step-contents/0` // demo
				}),
				providesTags: ['academy_course']
			}),
			getAcademyCategories: build.query<GetAcademyCategoriesApiResponse, GetAcademyCategoriesApiArg>({
				query: () => ({ url: `/api/mock/academy/categories` }),
				providesTags: ['academy_categories']
			})
		}),
		overrideExisting: false
	});

export default AcademyApi;

export type GetAcademyCoursesApiResponse = /** status 200 OK */ Course[];
export type GetAcademyCoursesApiArg = void;

export type GetAcademyCourseApiResponse = /** status 200 OK */ Course;
export type GetAcademyCourseApiArg = {
	courseId: string;
};

export type UpdateAcademyCourseApiResponse = unknown;
export type UpdateAcademyCourseApiArg = {
	courseId: string;
	data: PartialDeep<Course>;
};

export type GetAcademyCourseStepsApiResponse = /** status 200 OK */ CourseStep[];
export type GetAcademyCourseStepsApiArg = {
	courseId: string;
};

export type GetAcademyCourseStepContentApiResponse = /** status 200 OK */ CourseStepContent;
export type GetAcademyCourseStepContentApiArg = string;

export type DeleteAcademyCourseApiResponse = unknown;
export type DeleteAcademyCourseApiArg = {
	courseId: string;
};

export type GetAcademyCategoriesApiResponse = /** status 200 OK */ Category[];
export type GetAcademyCategoriesApiArg = void;

export type CourseStepContent = {
	id: string;
	stepId: string;
	html: string;
};

export type CourseStep = {
	id: string;
	courseId: string;
	order: number;
	title: string;
	subtitle: string;
	content: string;
};

export type Course = {
	id: string;
	title: string;
	slug: string;
	description: string;
	category: string;
	duration: number;
	totalSteps: number;
	updatedAt: string;
	featured: boolean;
	progress: {
		currentStep: number;
		completed: number;
	};
	activeStep?: number;
	steps?: CourseStep[];
};

export type Category = {
	id: string;
	title: string;
	slug: string;
	color: string;
};

export const {
	useGetAcademyCoursesQuery,
	useGetAcademyCourseQuery,
	useUpdateAcademyCourseMutation,
	useDeleteAcademyCourseMutation,
	useGetAcademyCourseStepsQuery,
	useGetAcademyCourseStepContentQuery,
	useGetAcademyCategoriesQuery
} = AcademyApi;
