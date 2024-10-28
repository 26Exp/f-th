import FuseUtils from '@fuse/utils';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppSelector } from 'src/store/hooks';
import FuseLoading from '@fuse/core/FuseLoading';
import MailListItem from './MailListItem';
import { selectSearchText } from '../mailboxAppSlice';
import { MailboxMail } from '../MailboxApi';
import useGetMails from '../hooks/useGetMails';

/**
 * The mail list.
 */
function MailList() {
	const { data: mails, isLoading } = useGetMails();

	const searchText = useAppSelector(selectSearchText);

	const [filteredData, setFilteredData] = useState<MailboxMail[]>([]);

	const { t } = useTranslation('mailboxApp');

	useEffect(() => {
		function getFilteredArray() {
			if (searchText.length === 0) {
				return mails;
			}

			return FuseUtils.filterArrayByString<MailboxMail>(mails, searchText);
		}

		if (mails) {
			setFilteredData(getFilteredArray());
		}
	}, [mails, searchText]);

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!filteredData || filteredData?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center p-24 min-h-full"
			>
				<FuseSvgIcon
					className="icon-size-128 mb-16"
					color="disabled"
					size={24}
				>
					heroicons-outline:envelope
				</FuseSvgIcon>
				<Typography
					className="mt-16 text-2xl font-semibold tracking-tight"
					color="text.secondary"
				>
					{t('NO_MESSAGES')}
				</Typography>
			</motion.div>
		);
	}

	return (
		<List className="p-0 w-full min-h-full">
			{filteredData.map((mail) => (
				<MailListItem
					mail={mail}
					key={mail.id}
				/>
			))}
		</List>
	);
}

export default MailList;
