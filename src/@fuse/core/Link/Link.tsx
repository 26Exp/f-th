'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode, forwardRef } from 'react';

type CustomLinkProps = Omit<NextLinkProps, 'href'> & {
	to?: string;
	href?: string;
	children?: ReactNode;
	className?: string;
	role?: string;
};

const Link = forwardRef<HTMLAnchorElement, CustomLinkProps>(({ to, href, children, className, role, ...rest }, ref) => {
	return (
		<NextLink
			className={className}
			href={to || href || ''}
			role={role}
			ref={ref}
			{...rest}
		>
			{children}
		</NextLink>
	);
});

export default Link;
