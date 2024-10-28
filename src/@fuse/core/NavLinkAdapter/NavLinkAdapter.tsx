import { forwardRef, CSSProperties, ReactNode } from 'react';
import Link from '@fuse/core/Link';
import usePathname from '@fuse/hooks/usePathname';
import clsx from 'clsx';
import useNavigate from '@fuse/hooks/useNavigate';

export type NavLinkAdapterPropsType = {
	activeClassName?: string;
	activeStyle?: CSSProperties;
	children?: ReactNode;
	to?: string;
	href?: string;
	className?: string;
	style?: CSSProperties;
	role?: string;
	exact?: boolean;
};

/**
 * The NavLinkAdapter component is a wrapper around the Next.js Link component.
 * It adds the ability to navigate programmatically using the useRouter hook.
 * The component is memoized to prevent unnecessary re-renders.
 */
const NavLinkAdapter = forwardRef<HTMLAnchorElement, NavLinkAdapterPropsType>((props, ref) => {
	const { activeClassName = 'active', activeStyle, role = 'button', to, href, exact = false, ..._props } = props;
	const navigate = useNavigate();
	const pathname = usePathname();
	const targetUrl = to || href;
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		navigate(targetUrl);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			navigate(targetUrl);
		}
	};

	const isActive = exact ? pathname === targetUrl : pathname.startsWith(targetUrl);

	return (
		<Link
			to={targetUrl}
			passHref
			legacyBehavior
		>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/no-static-element-interactions */}
			<a
				ref={ref}
				role={role}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				className={clsx(
					_props.className,
					isActive ? activeClassName : '',
					pathname === targetUrl && 'pointer-events-none'
				)}
				style={isActive ? { ..._props.style, ...activeStyle } : _props.style}
			>
				{props.children}
			</a>
		</Link>
	);
});

export default NavLinkAdapter;
