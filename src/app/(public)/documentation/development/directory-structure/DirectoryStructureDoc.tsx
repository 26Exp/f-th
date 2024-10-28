import Typography from '@mui/material/Typography';
import FuseHighlight from '@fuse/core/FuseHighlight';

/**
 * Directory Structure Doc
 * This document explains the directory structure and naming conventions used in the Fuse React Next.js project.
 */
function DirectoryStructureDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				Directory Structure and Naming Conventions
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				This document explains the directory structure and naming conventions used in the Fuse React Nextjs
				project. The project follows a modular approach based on route settings determined from config files.
				The directory structure and naming conventions are designed to make it easy to navigate and understand
				the codebase.
			</Typography>
			<FuseHighlight
				component="pre"
				className="language-jsx my-24"
			>
				{`
				.
				├── @auth
				├── @fuse
				├── @i18n
				├── @mock-utils
				├── app
				│   ├── (control-panel)
				│   │   ├── apps
				│   │   ├── auth
				│   │   ├── dashboards
				│   │   ├── documentation
				│   │   ├── layout.tsx
				│   │   ├── sign-in
				│   │   ├── sign-out
				│   │   └── sign-up
				│   ├── api
				│   ├── auth
				│   ├── layout.tsx
				│   └── page.tsx
				├── components
				├── configs
				├── contexts
				├── store
				├── styles
				└── utils`}
			</FuseHighlight>
			<Typography
				className="mb-16"
				component="p"
			>
				The directory structure of this Fuse React Nextjs project is organized by feature and functionality,
				with each major section having its own directory.
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				<strong>Key Directories:</strong>
			</Typography>
			<ul className="list-disc list-inside mb-16">
				<li>
					<code>app/</code>: The main application directory using Next.js 13+ App Router.
				</li>
				<li>
					<code>@auth/</code>: AuthJs configuration and utilities.
				</li>
				<li>
					<code>@fuse/</code>: Fuse core components and utilities.
				</li>
				<li>
					<code>@i18n/</code>: Internationalization configuration and utilities.
				</li>
				<li>
					<code>@mock-utils/</code>: Mock utilities for data fetching and manipulation.
				</li>
				<li>
					<code>components/</code>: Reusable React components.
				</li>
				<li>
					<code>configs/</code>: Configuration files for various aspects of the application.
				</li>
				<li>
					<code>contexts/</code>: React context providers.
				</li>
				<li>
					<code>store/</code>: State management related files, likely using Redux.
				</li>
				<li>
					<code>styles/</code>: CSS and style-related files.
				</li>
				<li>
					<code>utils/</code>: Utility functions and scripts.
				</li>
			</ul>
			<Typography
				className="mb-16"
				component="p"
			>
				<strong>Naming Conventions:</strong>
			</Typography>
			<ul className="list-disc list-inside mb-16">
				<li>
					React components use PascalCase (e.g., <code>MainLayout.tsx</code>, <code>PageTitle.tsx</code>).
				</li>
				<li>
					Utility functions and configuration files use camelCase (e.g., <code>apiFetch.ts</code>,{' '}
					<code>navigationConfig.ts</code>).
				</li>
				<li>
					API routes and page components within the <code>app/</code> directory use the <code>page.tsx</code>{' '}
					naming convention as per Next.js 13+ standards.
				</li>
				<li>Feature-specific components and utilities are grouped in directories named after the feature.</li>
			</ul>
			<Typography
				className="mb-16"
				component="p"
			>
				This structure supports a modular and scalable approach to building complex applications with Fuse React
				Nextjs, incorporating features like authentication, internationalization, and various UI components
				typical of an admin dashboard or control panel.
			</Typography>
		</>
	);
}

export default DirectoryStructureDoc;
