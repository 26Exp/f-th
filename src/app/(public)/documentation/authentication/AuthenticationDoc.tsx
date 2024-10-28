import Typography from '@mui/material/Typography';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Link from '@mui/material/Link';

function AuthenticationDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				Authentication in Fuse React with Next.js App Router
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				Fuse React uses Auth.js (formerly NextAuth.js) for authentication management, integrated with Next.js
				13's App Router. Auth.js is a complete open-source authentication solution that works seamlessly with
				Next.js applications.
			</Typography>
			<Typography
				variant="h5"
				className="mt-32 mb-8 font-700"
			>
				Key Features of Auth.js with App Router
			</Typography>
			<ul className="list-disc list-inside mb-16">
				<li>Seamless integration with Next.js 13 App Router</li>
				<li>Support for OAuth providers and custom credentials</li>
				<li>Server-side session management</li>
				<li>Built-in CSRF protection</li>
				<li>TypeScript support</li>
			</ul>
			<Typography
				variant="h5"
				className="mt-32 mb-8 font-700"
			>
				Configuration
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				You can findout the auth.js config file at @auth/authjs.ts.
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				You can add your own providers like facebook, github, twitter, etc. Checkout the authjs documentation to
				know more about it.
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				This is an example configuration for adding google login provider:
			</Typography>
			<FuseHighlight
				component="pre"
				className="language-typescript mb-24"
			>
				{`
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Add other providers here
  ],
  // Add custom configuration options here
})

export { handler as GET, handler as POST }
				`}
			</FuseHighlight>
			<Typography
				variant="h5"
				className="mt-32 mb-8 font-700"
			>
				Custom Session Handling
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				In Fuse React, we've extended the default Auth.js session handling to include additional user data. When
				a user logs in, we fetch additional user information from an API and add it to the session. This allows
				us to store and access more detailed user information throughout the application.
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				Here's how it's implemented in the <code>authJs.ts</code> file:
			</Typography>
			<FuseHighlight
				component="pre"
				className="language-typescript mb-24"
			>
				{`
// src/@auth/authJs.ts
// ... other imports and configurations ...

const config = {
  // ... other config options ...
  callbacks: {
    async session({ session, token }) {
      if (token.accessToken && typeof token.accessToken === 'string') {
        session.accessToken = token.accessToken;
      }

      if (session && token.sub && typeof token.sub === 'string') {
        const userId = token.sub;
        const userDbData = await fetchUserData(userId, session);
        session.db = userDbData || null;
      }

      return session;
    }
  },
  // ... other config options ...
};

async function fetchUserData(userId: string, session: Session): Promise<User | null> {
  // Fetch user data from API or create a new user if not found
  // ... implementation details ...
}

// Extend the Session type to include our custom properties
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    db: User;
  }
}
				`}
			</FuseHighlight>
			<Typography
				className="mb-16"
				component="p"
			>
				This custom session handling allows us to store additional user information, such as roles, settings, or
				any other custom fields, making it easily accessible throughout the application.
			</Typography>
			<Typography
				variant="h5"
				className="mt-32 mb-8 font-700"
			>
				useUser Hook
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				Fuse React provides a custom <code>useUser</code> hook that simplifies access to user data and provides
				utility functions for user management. This hook is built on top of Auth.js's <code>useSession</code>{' '}
				hook and provides additional functionality.
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				Here's an overview of the <code>useUser</code> hook:
			</Typography>
			<FuseHighlight
				component="pre"
				className="language-typescript mb-24"
			>
				{`
// src/@auth/useUser.tsx
import { useSession, signOut } from 'next-auth/react';
// ... other imports ...

function useUser(): useUser {
  const { data, update } = useSession();

  const user = useMemo(() => data?.db, [data]);
  const isGuest = useMemo(() => !user?.role || user?.role?.length === 0, [user]);

  async function handleUpdateUser(updates: Partial<User>) {
    // Update user data
  }

  async function handleUpdateUserSettings(newSettings: User['settings']) {
    // Update user settings
  }

  // ... other utility functions ...

  return {
    data: user,
    isGuest,
    signOut: handleSignOut,
    updateUser: handleUpdateUser,
    updateUserSettings: handleUpdateUserSettings
  } as useUser;
}

export default useUser;
				`}
			</FuseHighlight>
			<Typography
				className="mb-16"
				component="p"
			>
				The <code>useUser</code> hook provides the following:
			</Typography>
			<ul className="list-disc list-inside mb-16">
				<li>Access to the current user's data</li>
				<li>A flag indicating if the current user is a guest</li>
				<li>Functions to update user data and settings</li>
				<li>A wrapper for the signOut function</li>
			</ul>
			<Typography
				className="mb-16"
				component="p"
			>
				You can use this hook in your components to easily access and manage user data:
			</Typography>
			<FuseHighlight
				component="pre"
				className="language-tsx mb-24"
			>
				{`
import useUser from '@auth/useUser';

function UserProfile() {
  const { data: user, updateUser, isGuest } = useUser();

  if (isGuest) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      {/* Add more user profile information and management here */}
    </div>
  );
}
				`}
			</FuseHighlight>
			<Typography
				className="mt-32 mb-16"
				component="p"
			>
				By leveraging the custom session handling and the <code>useUser</code> hook, Fuse React provides a
				powerful and flexible way to manage user authentication and data throughout your application.
			</Typography>
			<Typography
				variant="h5"
				className="mt-32 mb-8 font-700"
			>
				Further Resources
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				For more detailed information and advanced usage, refer to the following resources:
			</Typography>
			<ul className="list-disc list-inside mb-16">
				<li>
					<Link
						to="https://authjs.dev"
						target="_blank"
						rel="noopener noreferrer"
					>
						Auth.js Official Documentation
					</Link>
				</li>
			</ul>
			<Typography
				className="mt-32 mb-16"
				component="p"
			>
				By leveraging Auth.js with Next.js App Router, Fuse React provides a robust, flexible, and secure
				authentication system that integrates seamlessly with server components and can be easily customized to
				meet your project's specific requirements.
			</Typography>
		</>
	);
}

export default AuthenticationDoc;
