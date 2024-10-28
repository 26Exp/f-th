import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import FuseLoading from '@fuse/core/FuseLoading';
import { useAppSelector } from 'src/store/hooks';
import ContactListItem from './ContactListItem';
import {
	Contact,
	GroupedContacts,
	selectFilteredContactList,
	selectGroupedFilteredContacts,
	useGetContactsListQuery
} from '../ContactsApi';

/**
 * The contacts list.
 */
function ContactsList() {
	const { data, isLoading } = useGetContactsListQuery();
	const filteredData = useAppSelector(selectFilteredContactList(data));
	const groupedFilteredContacts = useAppSelector(selectGroupedFilteredContacts(filteredData));

	if (isLoading) {
		return <FuseLoading />;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There are no contacts!
				</Typography>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
			className="flex flex-col flex-auto w-full max-h-full border-x-1"
		>
			{Object.entries(groupedFilteredContacts).map(([key, group]: [string, GroupedContacts]) => {
				return (
					<div
						key={key}
						className="relative"
					>
						<Typography
							color="text.secondary"
							className="px-32 py-4 text-base font-medium"
						>
							{key}
						</Typography>
						<Divider />
						<List className="w-full m-0 p-0">
							{group?.children?.map((item: Contact) => (
								<ContactListItem
									key={item.id}
									contact={item}
								/>
							))}
						</List>
					</div>
				);
			})}
		</motion.div>
	);
}

export default ContactsList;
