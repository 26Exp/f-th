import Typography from '@mui/material/Typography';

/**
 * Code Splitting Doc
 * This document provides information on how to use code splitting.
 */
function CodeSplittingDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				Code Splitting
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				By code-splitting your app, you can "lazy-load" only the content that's needed by users at any given
				moment, significantly boosting your app's performance. In addition to avoiding loading code that the
				user may never need, you also reduce the amount of code needed for the initial load.
			</Typography>

			<Typography
				className="text-2xl mt-20 mb-10 font-700"
				variant="h5"
			>
				Comprehensive Guide
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				For comprehensive guidance, please refer to our documentation on usage guidelines. Discover the
				intricacies of lazy-loaded slices by exploring the Redux-Toolkit documentation available at{' '}
				<a
					href="https://redux-toolkit.js.org/api/combineSlices#withlazyloadedslices"
					target="_blank"
					rel="noreferrer"
				>
					Redux-Toolkit Lazy Loaded Slices
				</a>
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Additionally, delve into the specifics of code splitting for RTK-Query at{' '}
				<a
					href="https://redux-toolkit.js.org/rtk-query/usage/code-splitting"
					target="_blank"
					rel="noreferrer"
				>
					RTK-Query Code Splitting
				</a>
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				In all Fuse React applications, we employ lazy-loaded slices and RTK-Query to enhance performance and
				efficiency.
			</Typography>
		</>
	);
}

export default CodeSplittingDoc;
