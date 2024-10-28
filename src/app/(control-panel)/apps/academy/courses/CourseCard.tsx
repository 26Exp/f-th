import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Link from '@fuse/core/Link';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import CourseInfo from '../CourseInfo';
import CourseProgress from '../CourseProgress';
import { Course } from '../AcademyApi';

type CourseCardProps = {
	course: Course;
};

/**
 * The CourseCard component.
 */
function CourseCard(props: CourseCardProps) {
	const { course } = props;

	function buttonStatus() {
		switch (course.activeStep) {
			case course.totalSteps:
				return 'Completed';
			case 0:
				return 'Start';
			default:
				return 'Continue';
		}
	}

	return (
		<Card className="flex flex-col h-384 shadow">
			<CardContent className="flex flex-col flex-auto p-16">
				<CourseInfo course={course} />
			</CardContent>
			<CourseProgress course={course} />
			<CardActions
				className="items-center justify-end py-16 px-16"
				sx={(theme) => ({
					backgroundColor: lighten(theme.palette.background.default, 0.03),
					...theme.applyStyles('light', {
						backgroundColor: lighten(theme.palette.background.default, 0.4)
					})
				})}
			>
				<Button
					to={`/apps/academy/courses/${course.id}/${course.slug}`}
					component={Link}
					className="px-12"
					color="secondary"
					variant="contained"
					size="small"
					endIcon={<FuseSvgIcon size={16}>heroicons-outline:arrow-small-right</FuseSvgIcon>}
				>
					{buttonStatus()}
				</Button>
			</CardActions>
		</Card>
	);
}

export default CourseCard;
