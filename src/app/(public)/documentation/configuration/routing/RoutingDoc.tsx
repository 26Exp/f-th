import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import controlPanelLayoutRaw from '@/app/(control-panel)/layout.tsx?raw';
import publicLayoutRaw from '@/app/(public)/layout.tsx?raw';

/**
 * Routing Documentation
 *
 * This document provides detailed information on how to effectively use the routing system in Fuse React.
 * It covers modular route configuration, customization options, and automatic route management.
 */

function RoutingDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				Routing in Fuse React with Next.js App Router
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Fuse React utilizes Next.js 13's App Router for handling routing in the application. This modern routing
				system provides a file-system based router built on top of server components, supporting layouts, nested
				routing, loading states, error handling, and more.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				For comprehensive information on Next.js App Router, refer to the{' '}
				<Link
					href="https://nextjs.org/docs/app/building-your-application/routing"
					target="_blank"
					rel="noopener noreferrer"
				>
					official Next.js documentation
				</Link>
				.
			</Typography>

			<Typography
				variant="h5"
				className="mb-20 font-700"
			>
				Key Concepts
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				1. <strong>File-based Routing:</strong> Routes are defined by the file structure in the <code>app</code>{' '}
				directory.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				2. <strong>Layouts:</strong> Shared UI for multiple pages is defined in <code>layout.tsx</code> files.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				3. <strong>Route Groups:</strong> Organize routes without affecting the URL structure using parentheses
				in folder names.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				4. <strong>Dynamic Routes:</strong> Create routes with dynamic parameters using square brackets, e.g.,{' '}
				<code>[id]</code>.
			</Typography>

			<Typography
				variant="h5"
				className="mt-32 mb-20 font-700"
			>
				Using MainLayout in layout.tsx
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Fuse React provides a <code>MainLayout</code> component that can be used in <code>layout.tsx</code>{' '}
				files to structure the overall layout of your pages. This component allows you to show or hide various
				sections of the main theme layout.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Here's an example of how to use <code>MainLayout</code> in a public layout:
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-typescript mb-24"
			>
				{publicLayoutRaw}
			</FuseHighlight>

			<Typography
				className="mb-16"
				component="p"
			>
				In this example, the navbar, toolbar, side panels, and footer are hidden for all routes under the
				(public) group.
			</Typography>

			<Typography
				variant="h5"
				className="mt-32 mb-20 font-700"
			>
				Route Access Restriction with AuthGuardRedirect
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Fuse React includes an <code>AuthGuardRedirect</code> component that can be used to restrict access to
				certain routes based on user roles. Here's an example of how to use it in a control panel layout:
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-typescript mb-24"
			>
				{controlPanelLayoutRaw}
			</FuseHighlight>

			<Typography
				className="mb-16"
				component="p"
			>
				In this example, access to all routes under the (control-panel) group is restricted to users with the
				'admin' role. If a user without the required role tries to access these routes, they will be redirected.
			</Typography>

			<Typography
				variant="h5"
				className="mt-32 mb-20 font-700"
			>
				Best Practices
			</Typography>

			<Typography
				component="ul"
				className="list-disc list-inside mb-16"
			>
				<li>
					Use route groups (folders with parentheses) to organize your routes logically without affecting the
					URL structure.
				</li>
				<li>
					Implement shared layouts for groups of related pages to maintain consistency and reduce code
					duplication.
				</li>
				<li>
					Utilize the <code>AuthGuardRedirect</code> component to implement role-based access control for your
					routes.
				</li>
				<li>
					Take advantage of Next.js 13 features like server components and streaming for improved performance
					and user experience.
				</li>
			</Typography>

			<Typography
				className="mt-32 mb-16"
				component="p"
			>
				By leveraging Next.js App Router and Fuse React's custom components like <code>MainLayout</code> and{' '}
				<code>AuthGuardRedirect</code>, you can create a powerful, flexible, and secure routing system for your
				application.
			</Typography>
		</>
	);
}

export default RoutingDoc;
