'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Link from '@fuse/core/Link';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	}
}));

/**
 * The OverviewPageLayoutsUI component provides an overview of Fuse React's page layouts.
 */
function OverviewPageLayoutsUI() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				Page Layouts
			</Typography>

			<section className="prose prose-sm dark:prose-invert">
				<Typography
					variant="h5"
					className="text-2xl font-700 mb-16"
				>
					Introduction
				</Typography>
				<Typography paragraph>
					Page layouts in Fuse React are pre-designed, customizable templates that serve as the foundation for
					your application's pages. They offer a balance between consistency and flexibility, allowing you to
					rapidly develop user interfaces while maintaining a cohesive look and feel across your application.
				</Typography>

				<Typography
					variant="h6"
					className="text-xl font-600 mt-24 mb-16"
				>
					Key Benefits
				</Typography>
				<ul>
					<li>
						<strong>Consistency:</strong> Ensure a uniform look and feel across your application, enhancing
						user experience and navigation.
					</li>
					<li>
						<strong>Efficiency:</strong> Accelerate development by starting with pre-built, tested layouts.
					</li>
					<li>
						<strong>Flexibility:</strong> Easily customize and extend layouts to meet specific requirements.
					</li>
					<li>
						<strong>Maintainability:</strong> Simplify future updates and modifications with a standardized
						structure.
					</li>
				</ul>

				<Typography
					variant="h6"
					className="text-xl font-600 mt-24 mb-16"
				>
					Using Page Layouts
				</Typography>
				<Typography paragraph>
					Fuse React's page layouts are designed to be intuitive and easy to implement. Simply copy the
					desired layout component and customize it to fit your needs. This approach allows for rapid
					prototyping and development while maintaining a consistent user interface across your application.
				</Typography>
			</section>

			<section className="mt-32">
				<Typography
					variant="h5"
					className="text-2xl font-700 mb-16"
				>
					Available Page Layout Components
				</Typography>
				<ul className="list-disc pl-24">
					<li className="mb-8">
						<Link
							to="/documentation/user-interface/page-layouts/simple/full-width"
							className="text-blue-500 hover:underline"
						>
							FusePageSimple
						</Link>
						- A versatile layout for general-purpose pages.
					</li>
					<li className="mb-8">
						<Link
							to="/documentation/user-interface/page-layouts/carded/with-sidebars"
							className="text-blue-500 hover:underline"
						>
							FusePageCarded
						</Link>
						- A layout featuring a prominent card-style content area.
					</li>
				</ul>
			</section>

			<Typography
				paragraph
				className="mt-32"
			>
				Explore the documentation for each layout component to learn more about their specific features and
				usage guidelines. By leveraging these pre-built layouts, you can significantly streamline your
				development process and create consistent, user-friendly interfaces with ease.
			</Typography>
		</>
	);
}

export default OverviewPageLayoutsUI;
