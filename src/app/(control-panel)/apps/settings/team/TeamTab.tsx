'use client';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useGetTeamMembersSettingsQuery, useUpdateTeamMemberSettingsMutation } from '../SettingsApi';

const roles = [
	{
		label: 'Read',
		value: 'read',
		description: 'Can read and clone this repository. Can also open and comment on issues and pull requests.'
	},
	{
		label: 'Write',
		value: 'write',
		description: 'Can read, clone, and push to this repository. Can also manage issues and pull requests.'
	},
	{
		label: 'Admin',
		value: 'admin',
		description:
			'Can read, clone, and push to this repository. Can also manage issues, pull requests, and repository settings, including adding collaborators.'
	}
];

function TeamTab() {
	const { data: teamMembers } = useGetTeamMembersSettingsQuery();
	const [updateTeamMembers] = useUpdateTeamMemberSettingsMutation();

	function handleRemoveMember(email: string) {
		updateTeamMembers(teamMembers?.filter((member) => member.email !== email));
	}

	return (
		<div>
			<TextField
				className="w-full mb-24"
				label="Add team member"
				placeholder="Enter email"
				InputLabelProps={{
					shrink: true
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<FuseSvgIcon size={20}>heroicons-outline:user</FuseSvgIcon>
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<IconButton>
								<FuseSvgIcon size={20}>heroicons-outline:plus-circle</FuseSvgIcon>
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
			<Divider />
			{teamMembers?.length === 0 && (
				<Typography
					className="text-center my-32"
					color="textSecondary"
				>
					No team members found.
				</Typography>
			)}
			<List>
				{teamMembers?.map((member) => (
					<ListItem
						divider
						key={member.email}
						disablePadding
						className="py-12 flex flex-col items-start sm:items-center  sm:flex-row space-y-16 sm:space-y-0"
					>
						<div className="flex flex-1 items-center">
							<ListItemAvatar>
								<Avatar
									src={member.avatar}
									alt={`Avatar °${member.name}`}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={member.name}
								secondary={member.email}
								classes={{ secondary: 'truncate' }}
							/>
						</div>

						<div className="flex items-center space-x-4">
							<div>
								<Select
									sx={{
										'& .MuiSelect-select': {
											minHeight: '0!important'
										}
									}}
									value={member.role}
									size="small"
								>
									{roles.map((role) => (
										<MenuItem
											key={role.value}
											value={role.value}
										>
											{role.label}
										</MenuItem>
									))}
								</Select>
							</div>
							<IconButton onClick={() => handleRemoveMember(member.email)}>
								<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
							</IconButton>
						</div>
					</ListItem>
				))}
			</List>
		</div>
	);
}

export default TeamTab;
