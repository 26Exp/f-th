'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import FuseNavigation from '@fuse/core/FuseNavigation';
import FuseNavItemModel from '@fuse/core/FuseNavigation/models/FuseNavItemModel';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import { useMemo } from 'react';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import MailCompose from './MailCompose';
import { useGetMailboxFiltersQuery, useGetMailboxFoldersQuery, useGetMailboxLabelsQuery } from '../../MailboxApi';

/**
 * The mailbox app sidebar content.
 */
function MailboxAppSidebarContent() {
	const { data: folders } = useGetMailboxFoldersQuery();
	const { data: labels } = useGetMailboxLabelsQuery();
	const { data: filters } = useGetMailboxFiltersQuery();

	const { t } = useTranslation('mailboxApp');

	const navigationItems = useMemo(
		() => ({
			folders: folders?.map((item) => ({
				...item,
				type: 'item',
				url: `/apps/mailbox/folders/${item.slug}`
			})),
			filters: filters?.map((item) => ({
				...item,
				type: 'item',
				url: `/apps/mailbox/filters/${item.slug}`
			})),
			labels: labels?.map((item) =>
				FuseNavItemModel({
					...item,
					type: 'item',
					url: `/apps/mailbox/labels/${item.slug}`,
					icon: 'heroicons-outline:tag',
					sx: {
						'& > .fuse-list-item-icon': {
							color: `${item.color}!important`,
							opacity: 0.6
						}
					}
				})
			)
		}),
		[folders, filters, labels]
	);

	return (
		<div className="flex-auto border-l-1">
			<div className="mb-24 mt-40 mx-24">
				<div className="h-24">
					<PageBreadcrumb
						maxItems={3}
						className=""
					/>
				</div>

				<Typography className="text-4xl font-extrabold tracking-tight leading-none">Mailbox</Typography>
				<MailCompose className="mt-24" />
			</div>

			{['FOLDERS', 'FILTERS', 'LABELS'].map((section, index) => (
				<motion.div
					key={section}
					className="mb-24"
					initial={false}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.1 * (index + 1) }}
				>
					<Typography
						className="px-28 py-10 uppercase text-md font-600"
						color="secondary.main"
					>
						{t(section)}
					</Typography>

					<FuseNavigation
						navigation={navigationItems[section.toLowerCase()] as FuseNavItemType[]}
						className="px-12"
					/>
				</motion.div>
			))}
		</div>
	);
}

export default MailboxAppSidebarContent;
