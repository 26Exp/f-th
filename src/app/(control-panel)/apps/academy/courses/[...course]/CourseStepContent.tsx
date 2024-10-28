import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import FuseLoading from '@fuse/core/FuseLoading';
import { CourseStep, useGetAcademyCourseStepContentQuery } from '../../AcademyApi';

type CourseStepContentProps = {
	step: CourseStep;
};

function CourseStepContent(props: CourseStepContentProps) {
	const { step } = props;
	const theme = useTheme();
	const { data: stepContent, isLoading } = useGetAcademyCourseStepContentQuery(step?.id, {
		skip: !step?.id
	});

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Paper className="w-full max-w-lg mx-auto sm:my-8 lg:mt-16 p-24 sm:p-40 sm:py-48 rounded-xl shadow overflow-hidden">
			<Typography
				variant="h4"
				className="mb-16 font-500"
			>
				{step?.title}
			</Typography>

			<Typography
				className="text-2xl mb-32"
				variant="h5"
			>
				{step?.subtitle}
			</Typography>

			<div
				className="prose prose-sm dark:prose-invert w-full max-w-full"
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={{ __html: stepContent?.html || '' }}
				dir={theme.direction}
			/>
		</Paper>
	);
}

export default CourseStepContent;
