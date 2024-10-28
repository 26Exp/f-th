import Typography from '@mui/material/Typography';
import FuseHighlight from '@fuse/core/FuseHighlight';
import TitleReferenceLink from 'src/components/TitleReferenceLink';
import Link from '@fuse/core/Link';

/**
 * Api Configuration Doc
 * This document provides information on how to configure the api.
 */
function ApiConfigurationDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				API Configuration
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				This document explains how to configure and use API routes in the Fuse React Next.js project.
			</Typography>

			<Typography
				className="mt-24 mb-10"
				variant="h6"
			>
				API Routes Structure <TitleReferenceLink id="api-routes-structure" />
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Our API routes are structured using Next.js server-side API routing mechanism. They are located in the
				`app/api` directory.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Example of an API route structure:
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-typescript"
			>
				{`
app/
  api/
    mock/
      users/
        route.ts
        [id]/
          route.ts
      notes/
        items/
          route.ts
          [id]/
            route.ts
        labels/
          route.ts
          [id]/
            route.ts
				`}
			</FuseHighlight>

			<Typography
				className="mt-24 mb-10"
				variant="h6"
			>
				Mock API and Database <TitleReferenceLink id="mock-api-database" />
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				We use our custom mock API utility (`mockApi`) and JSON files to simulate database connections and
				operations. This allows for easy demonstration and testing of API endpoints without a real database.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				The mock database data is defined in `mockDb.json`, and the `mockApi` utility provides methods for CRUD
				operations on this data.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Mock API endpoints are created using OpenAPI specifications. You can find these specifications in the
				file <code>@mock-utils/mockOpenApiSpecs.json</code>.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				For detailed documentation on the mock API, please visit the{' '}
				<Link to="/documentation/development/api-integration/mock-api">Mock API Documentation</Link> page.
			</Typography>

			<Typography
				className="mt-24 mb-10"
				variant="h6"
			>
				API Route Example <TitleReferenceLink id="api-route-example" />
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Here's an example of how an API route is implemented:
			</Typography>

			<FuseHighlight
				component="pre"
				className="language-typescript"
			>
				{`
import mockApi from 'src/@mock-utils/mockApi';

export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('users');
	const items = await api.findAll(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

export async function POST(req: Request) {
	const api = mockApi('users');
	const requestData = await req.json();
	const newItem = await api.create(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}
				`}
			</FuseHighlight>

			<Typography
				className="mt-24 mb-10"
				variant="h6"
			>
				Connecting to a Real Database <TitleReferenceLink id="real-database-connection" />
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				To connect these API routes to a real database, you would replace the `mockApi` calls with your actual
				database operations. The structure and HTTP methods (GET, POST, PUT, DELETE) would remain the same.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Remember to handle errors and edge cases appropriately when connecting to a real database.
			</Typography>
		</>
	);
}

export default ApiConfigurationDoc;
