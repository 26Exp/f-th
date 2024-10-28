import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

/**
 * Development Server Doc
 * This document provides information on how to run the development server.
 */
function DevelopmentServerDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				Starting the Development Server
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				While in your working directory, execute the following command in the console application:
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-bash my-16"
			>
				{` npm run dev `}
			</FuseHighlight>

			<Typography
				className="mb-16"
				component="p"
			>
				And that's it. The generator will take care of everything and will initiate the Fuse React server.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				You can check your console application for further information about the server. By default, it will be
				running on <b>http://localhost:3000</b> although it could change depending on your setup.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				For more information on the Next.js App Router and development server, please refer to the{' '}
				<Link
					to="https://nextjs.org/docs/app/api-reference/next-cli#development"
					target="_blank"
					rel="noopener noreferrer"
				>
					official Next.js documentation
				</Link>
				.
			</Typography>

			<div className="my-24 px-24 py-16 border-1 border-red rounded-xl">
				<Typography className="mb-8 font-500 text-15 text-red">Important:</Typography>
				<Typography component="div">
					In case of runtime errors on first run, make sure you are running an LTS release of Node.js and that
					all dependencies are correctly installed. If issues persist, try deleting the node_modules folder
					and running `npm install` again.
				</Typography>
			</div>
		</>
	);
}

export default DevelopmentServerDoc;
