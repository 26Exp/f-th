import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

/**
 * Production Doc
 * This document provides information on how to build the application for production using Next.js App Router.
 */
function ProductionDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				Production Build
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				The following command builds the application into an output directory:
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-bash my-16"
			>
				{` npm run build `}
			</FuseHighlight>

			<Typography
				className="mb-16"
				component="p"
			>
				This command compiles the application into the <code>.next</code> directory.
			</Typography>

			<Typography
				variant="h6"
				className="mt-32 mb-16"
			>
				Build Output
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				The production build creates optimized assets in the <code>.next</code> folder:
			</Typography>

			<ul>
				<li>HTML files for statically generated pages</li>
				<li>JavaScript bundles for client-side runtime</li>
				<li>Server-side code for handling API routes and server-side rendering</li>
			</ul>

			<Typography
				variant="h6"
				className="mt-32 mb-16"
			>
				Running the Production Build
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				To start the application in production mode, run:
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-bash my-16"
			>
				{` npm run start `}
			</FuseHighlight>

			<Typography
				className="mb-16"
				component="p"
			>
				This command starts the Next.js production server.
			</Typography>

			<Typography
				variant="h6"
				className="mt-32 mb-16"
			>
				Environment Variables
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Ensure that all necessary environment variables are set for the production environment. You can use{' '}
				<code>.env.production</code> file for production-specific variables.
			</Typography>

			<Typography
				variant="h6"
				className="mt-32 mb-16"
			>
				Analyzing the Bundle
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				To analyze the production bundle size, you can use:
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-bash my-16"
			>
				{` ANALYZE=true npm run build `}
			</FuseHighlight>

			<Typography
				className="mb-16"
				component="p"
			>
				This will generate a report to help you optimize your application's bundle size.
			</Typography>
		</>
	);
}

export default ProductionDoc;
