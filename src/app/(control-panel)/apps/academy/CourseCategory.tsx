import { darken, lighten } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import _ from 'lodash';
import { Course, useGetAcademyCategoriesQuery } from './AcademyApi';

type CourseCategoryProps = {
	slug: Course['slug'];
};

/**
 * The CourseCategory component.
 */
function CourseCategory(props: CourseCategoryProps) {
	const { slug } = props;

	const { data: categories } = useGetAcademyCategoriesQuery();

	const category = _.find(categories, { slug });

	if (!category) {
		return null;
	}

	return (
		<Chip
			className="font-semibold text-md"
			label={category?.title}
			sx={(theme) => ({
				color: lighten(category?.color, 0.8),
				backgroundColor: darken(category?.color, 0.1),
				...theme.applyStyles('light', {
					color: darken(category?.color, 0.4),
					backgroundColor: lighten(category?.color, 0.8)
				})
			})}
			size="small"
		/>
	);
}

export default CourseCategory;
