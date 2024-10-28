import { forwardRef, ComponentType, memo, Component } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type WithRouterProps = {
	pathname: ReturnType<typeof usePathname>;
	params: Record<string, string>;
	router: ReturnType<typeof useRouter>;
};

/**
 * The withRouterAndRef function is a higher-order component that wraps a component with the usePathname, useRouter, and useSearchParams hooks from Next.js.
 * It passes the pathname, params, and router objects as props to the wrapped component.
 * The component is memoized to prevent unnecessary re-renders.
 */
const withRouterAndRef = <Props extends WithRouterProps>(Component: ComponentType<Props>) =>
	memo(
		forwardRef((props: Omit<Props, keyof WithRouterProps>, ref) => {
			const pathname = usePathname();
			const router = useRouter();
			const searchParams = useSearchParams();
			const params = Object.fromEntries(searchParams.entries());

			return (
				<Component
					{...(props as Props)}
					pathname={pathname}
					params={params}
					router={router}
					forwardRef={ref}
				/>
			);
		})
	);

withRouterAndRef.displayName = `withRouterAndRef(${Component.name})`;

export default withRouterAndRef;
