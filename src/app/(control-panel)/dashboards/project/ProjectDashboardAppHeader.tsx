import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import _ from 'lodash';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { darken } from '@mui/material/styles';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import useUser from '@auth/useUser';
import { useGetProjectDashboardProjectsQuery } from './ProjectDashboardApi';

/**
 * The ProjectDashboardAppHeader page.
 */
function ProjectDashboardAppHeader() {
	const { data: projects } = useGetProjectDashboardProjectsQuery();

	const { data: user, isGuest } = useUser();

	const [selectedProject, setSelectedProject] = useState<{ id: number; menuEl: HTMLElement | null }>({
		id: 1,
		menuEl: null
	});

	function handleChangeProject(id: number) {
		setSelectedProject({
			id,
			menuEl: null
		});
	}

	function handleOpenProjectMenu(event: React.MouseEvent<HTMLElement>) {
		setSelectedProject({
			id: selectedProject.id,
			menuEl: event.currentTarget
		});
	}

	function handleCloseProjectMenu() {
		setSelectedProject({
			id: selectedProject.id,
			menuEl: null
		});
	}

	return (
		<div className="flex flex-col w-full px-24 sm:px-32">
			<div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
				<div className="flex flex-auto items-start min-w-0">
					<Avatar
						sx={(theme) => ({
							background: (theme) => darken(theme.palette.background.default, 0.05),
							color: theme.palette.text.secondary
						})}
						className="flex-0 w-64 h-64 mt-4"
						alt="user photo"
						src={user?.photoURL}
					>
						{user?.displayName?.[0]}
					</Avatar>
					<div className="flex flex-col min-w-0 mx-16">
						<PageBreadcrumb />
						<Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
							{isGuest ? 'Hi Guest!' : `Welcome back, ${user?.displayName || user?.email}!`}
						</Typography>

						<div className="flex items-center">
							<FuseSvgIcon
								size={20}
								color="action"
							>
								heroicons-solid:bell
							</FuseSvgIcon>
							<Typography
								className="mx-6 leading-6 truncate"
								color="text.secondary"
							>
								You have 2 new messages and 15 new tasks
							</Typography>
						</div>
					</div>
				</div>
				<div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-8">
					<Button
						className="whitespace-nowrap"
						variant="contained"
						color="primary"
						startIcon={<FuseSvgIcon size={20}>heroicons-solid:envelope</FuseSvgIcon>}
					>
						Messages
					</Button>
					<Button
						className="whitespace-nowrap"
						variant="contained"
						color="secondary"
						startIcon={<FuseSvgIcon size={20}>heroicons-solid:cog-6-tooth</FuseSvgIcon>}
					>
						Settings
					</Button>
				</div>
			</div>
			<div className="flex items-center">
				<Button
					onClick={handleOpenProjectMenu}
					className="flex items-center border border-solid border-b-0 rounded-b-0 h-36 px-16 text-md sm:text-base"
					sx={(theme) => ({
						backgroundColor: `${theme.palette.background.default}!important`,
						borderColor: theme.palette.divider
					})}
					endIcon={
						<FuseSvgIcon
							size={16}
							color="action"
						>
							heroicons-solid:chevron-down
						</FuseSvgIcon>
					}
				>
					{_.find(projects, ['id', selectedProject.id])?.name}
				</Button>
				<Menu
					id="project-menu"
					anchorEl={selectedProject.menuEl}
					open={Boolean(selectedProject.menuEl)}
					onClose={handleCloseProjectMenu}
				>
					{projects &&
						projects.map((project) => (
							<MenuItem
								key={project.id}
								onClick={() => {
									handleChangeProject(project.id);
								}}
							>
								{project.name}
							</MenuItem>
						))}
				</Menu>
			</div>
		</div>
	);
}

export default ProjectDashboardAppHeader;
