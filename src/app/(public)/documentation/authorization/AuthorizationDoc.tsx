'use client';

import Typography from '@mui/material/Typography';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Link from '@fuse/core/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FuseNavigation from '@fuse/core/FuseNavigation/FuseNavigation';
import authProtectedNavigationExamples from './authProtectedNavigationExamples';
import authProtectedNavigationExamplesRaw from './authProtectedNavigationExamples.ts?raw';

function AuthorizationDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				Authorization in Fuse React
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Fuse React implements a robust authorization system using Auth.js (formerly NextAuth.js) with custom
				extensions to handle user roles and permissions. This system is primarily managed through the{' '}
				<code>authJs.ts</code> file and the <code>useUser</code> hook.
			</Typography>

			<Typography
				variant="h5"
				className="mt-32 mb-8 font-700"
			>
				Implementing Authorization
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				To implement authorization in your components:
			</Typography>

			<ol className="list-decimal list-inside mb-16">
				<li>
					Use the <code>useUser</code> hook to access user data and roles
				</li>
				<li>Check the user's roles to determine access to certain features or components</li>
				<li>
					Use the <code>isGuest</code> flag to differentiate between authenticated and unauthenticated users
				</li>
			</ol>

			<Table>
				<TableHead>
					<TableRow>
						<TableCell className="font-semibold text-base">Authorization Role (auth) options</TableCell>
						<TableCell />
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<code>null</code>
						</TableCell>
						<TableCell>Do not check, allow everyone</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>[]</code>
						</TableCell>
						<TableCell>Only guest allowed</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>[admin,user]</code>
						</TableCell>
						<TableCell>Only 'admin' and 'user' roles are allowed</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<Typography
				className="mb-16"
				component="p"
			>
				Example usage in a component:
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-tsx mb-24"
			>
				{`
import useUser from '@auth/useUser';

function ProtectedComponent() {
  const { data: user, isGuest } = useUser();

  if (isGuest) {
    return <p>Please sign in to access this content.</p>;
  }

  if (!user.role.includes('admin')) {
    return <p>You don't have permission to view this content.</p>;
  }

  return <p>Welcome, Admin! Here's your protected content.</p>;
}
				`}
			</FuseHighlight>

			<Typography
				variant="h5"
				className="mt-32 mb-8 font-700"
			>
				Route-level Authorization with AuthGuardRedirect
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Fuse React provides an <code>AuthGuardRedirect</code> component that allows you to implement route-level
				authorization. This component can be used in layout files to restrict access to entire sections of your
				application based on user roles.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Here's a basic example of how to use <code>AuthGuardRedirect</code>:
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-tsx mb-24"
			>
				{`
import AuthGuardRedirect from '@auth/AuthGuardRedirect';

function Layout({ children }) {
	return (
		<AuthGuardRedirect auth={['admin']}>
			{children}
		</AuthGuardRedirect>
	);
}
				`}
			</FuseHighlight>

			<Typography
				className="mb-16"
				component="p"
			>
				In this example, only users with the 'admin' role will be able to access the routes wrapped by this
				layout. Users without the required role will be redirected to a default location (usually the login page
				or a "not authorized" page).
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				For more detailed information on how to use <code>AuthGuardRedirect</code> in your routing
				configuration, please refer to the{' '}
				<Link to="/documentation/configuration/routing">Routing Documentation</Link>.
			</Typography>

			<Typography
				variant="h6"
				className="mt-32 mb-8 font-700"
			>
				Navigation Item Configuration:
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				You can control the navigation <b>item/group/collapse</b> visibility by adding <b>auth</b>
				property in <code>src/configs/NavigationConfig.tsx</code>.
			</Typography>

			<Typography
				className="mt-32 mb-8"
				variant="subtitle2"
			>
				Example Usage:
			</Typography>

			<div className="flex lg:grid-cols-2 gap-12">
				<div className="flex flex-1">
					<FuseNavigation navigation={authProtectedNavigationExamples} />
				</div>
				<div className="flex flex-1 ">
					<FuseHighlight
						component="pre"
						className="language-js mb-32 max-h-sm overflow-y-auto"
					>
						{authProtectedNavigationExamplesRaw}
					</FuseHighlight>
				</div>
			</div>

			<Typography
				variant="h5"
				className="mt-32 mb-8 font-700"
			>
				Best Practices
			</Typography>

			<ul className="list-disc list-inside mb-16">
				<li>
					Always use the <code>useUser</code> hook to access user data and perform authorization checks
				</li>
				<li>
					Implement role-based access control by checking user roles before rendering sensitive components or
					performing protected actions
				</li>
				<li>
					Use the <code>isGuest</code> flag to differentiate between authenticated and unauthenticated users
				</li>
				<li>Combine client-side checks with server-side validation for robust security</li>
				<li>
					Use <code>AuthGuardRedirect</code> for route-level protection to prevent unauthorized access to
					entire sections of your application
				</li>
				<li>
					Keep your authorization logic centralized and reusable to maintain consistency across your
					application
				</li>
			</ul>

			<Typography
				className="mt-32 mb-16"
				component="p"
			>
				By leveraging the custom Auth.js configuration and the <code>useUser</code> hook, Fuse React provides a
				flexible and powerful authorization system that can be easily integrated into your application's
				components and logic. Remember to always combine client-side authorization checks with server-side
				validation to ensure the security of your application.
			</Typography>
		</>
	);
}

export default AuthorizationDoc;
