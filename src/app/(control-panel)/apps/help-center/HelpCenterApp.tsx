'use client';

import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import { lighten, ThemeProvider } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import Link from '@fuse/core/Link';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import { useMainThemeDark } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import FaqList from './faqs/FaqList';
import { useGetHelpCenterFaqCategoriesQuery, useGetHelpCenterFaqsByCategoryQuery } from './HelpCenterApi';

/**
 * The help center home.
 */
function HelpCenterApp() {
	const mainThemeDark = useMainThemeDark();
	const { data: faqsCategories } = useGetHelpCenterFaqCategoriesQuery();
	const mostFaqCategoryId = faqsCategories?.[0]?.id;
	const { data: faqsMost } = useGetHelpCenterFaqsByCategoryQuery(
		{ categoryId: mostFaqCategoryId },
		{ skip: !mostFaqCategoryId }
	);

	return (
		<div className="flex flex-col flex-auto min-w-0">
			<ThemeProvider theme={mainThemeDark}>
				<Box
					className="relative pt-32 pb-112 px-16 sm:pt-80 sm:pb-192 sm:px-64 overflow-hidden"
					sx={(theme) => ({
						backgroundColor: 'primary.dark',
						color: theme.palette.getContrastText(theme.palette.primary.main)
					})}
				>
					<div className="flex flex-col items-center justify-center  mx-auto w-full">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { delay: 0 } }}
						>
							<PageBreadcrumb color="secondary" />
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { delay: 0 } }}
						>
							<Typography className="mt-4 text-5xl sm:text-48 font-extrabold tracking-tight leading-tight text-center">
								How can we help you today?
							</Typography>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { delay: 0.3 } }}
						>
							<Typography
								color="text.secondary"
								className="mt-12 sm:text-2xl text-center tracking-tight"
							>
								Search for a topic or question, check out our FAQs and guides, contact us for detailed
								support
							</Typography>
						</motion.div>
						<motion.div
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
						>
							<OutlinedInput
								sx={{ backgroundColor: 'transparent' }}
								className="flex flex-1 items-center px-16 mx-8 rounded-full h-44 max-w-full w-320 sm:w-sm mt-40 sm:mt-80"
								placeholder="Enter a question, topic or keyword"
								fullWidth
								startAdornment={
									<InputAdornment position="start">
										<FuseSvgIcon color="disabled">heroicons-solid:magnifying-glass</FuseSvgIcon>
									</InputAdornment>
								}
								inputProps={{
									'aria-label': 'Search'
								}}
							/>
						</motion.div>
					</div>
					<svg
						className="absolute inset-0 pointer-events-none"
						viewBox="0 0 960 540"
						width="100%"
						height="100%"
						preserveAspectRatio="xMidYMax slice"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g
							className="opacity-5"
							fill="none"
							stroke="currentColor"
							strokeWidth="100"
						>
							<circle
								r="234"
								cx="196"
								cy="23"
							/>
							<circle
								r="234"
								cx="790"
								cy="491"
							/>
						</g>
					</svg>
				</Box>
			</ThemeProvider>
			<div className="flex flex-col items-center px-24 sm:px-40">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-y-32 md:gap-y-0 md:gap-x-24 w-full max-w-sm md:max-w-4xl -mt-64 sm:-mt-96">
					<Card
						component={Link}
						to="/apps/help-center/faqs"
						role="button"
						className="relative flex flex-col shadow hover:shadow-lg overflow-hidden transition-shadow ease-in-out duration-150"
					>
						<div className="flex flex-col flex-auto items-center justify-center p-32 text-center">
							<div className="text-2xl font-semibold">FAQs</div>
							<div
								className="md:max-w-160 mt-4"
								color="text.secondary"
							>
								Frequently asked questions and answers
							</div>
						</div>
						<Box
							className="flex items-center justify-center py-16 px-32"
							sx={(theme) => ({
								backgroundColor: lighten(theme.palette.background.default, 0.02),
								...theme.applyStyles('light', {
									backgroundColor: lighten(theme.palette.background.default, 0.4)
								})
							})}
						>
							<Typography
								color="secondary"
								className="mx-8"
							>
								Go to FAQs
							</Typography>
							<FuseSvgIcon
								size={20}
								color="secondary"
							>
								heroicons-solid:arrow-small-right
							</FuseSvgIcon>
						</Box>
					</Card>
					<Card
						component={Link}
						to="/apps/help-center/guides"
						role="button"
						className="relative flex flex-col shadow hover:shadow-lg overflow-hidden transition-shadow ease-in-out duration-150"
					>
						<div className="flex flex-col flex-auto items-center justify-center p-32 text-center">
							<div className="text-2xl font-semibold">Guides</div>
							<div
								className="md:max-w-160 mt-4"
								color="text.secondary"
							>
								Articles and resources to guide you
							</div>
						</div>
						<Box
							className="flex items-center justify-center py-16 px-32"
							sx={(theme) => ({
								backgroundColor: lighten(theme.palette.background.default, 0.02),
								...theme.applyStyles('light', {
									backgroundColor: lighten(theme.palette.background.default, 0.4)
								})
							})}
						>
							<Typography
								color="secondary"
								className="mx-8"
							>
								Check guides
							</Typography>
							<FuseSvgIcon
								size={20}
								color="secondary"
							>
								heroicons-solid:arrow-small-right
							</FuseSvgIcon>
						</Box>
					</Card>
					<Card
						component={Link}
						to="/apps/help-center/support"
						role="button"
						className="relative flex flex-col shadow hover:shadow-lg overflow-hidden transition-shadow ease-in-out duration-150"
					>
						<div className="flex flex-col flex-auto items-center justify-center p-32 text-center">
							<div className="text-2xl font-semibold">Support</div>
							<div
								className="md:max-w-160 mt-4"
								color="text.secondary"
							>
								Contact us for more detailed support
							</div>
						</div>
						<Box
							className="flex items-center justify-center py-16 px-32"
							sx={(theme) => ({
								backgroundColor: lighten(theme.palette.background.default, 0.02),
								...theme.applyStyles('light', {
									backgroundColor: lighten(theme.palette.background.default, 0.4)
								})
							})}
						>
							<Typography
								color="secondary"
								className="mx-8"
							>
								Contact us
							</Typography>
							<FuseSvgIcon
								size={20}
								color="secondary"
							>
								heroicons-solid:arrow-small-right
							</FuseSvgIcon>
						</Box>
					</Card>
				</div>
			</div>
			<Typography className="mt-96 px-16 text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-center">
				Most frequently asked questions
			</Typography>
			<Typography
				className="mt-8 px-16 text-xl text-center"
				color="text.secondary"
			>
				Here are the most frequently asked questions you may check before getting started
			</Typography>
			<div className="flex flex-col w-full px-16 items-center my-48">
				<FaqList
					className="w-full max-w-4xl"
					list={faqsMost}
				/>
			</div>
		</div>
	);
}

export default HelpCenterApp;
