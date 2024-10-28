'use client';

import _ from 'lodash';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { ChangeEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import FusePageSimple from '@fuse/core/FusePageSimple';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { styled } from '@mui/material/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import CourseCard from './CourseCard';
import { Course, useGetAcademyCategoriesQuery, useGetAcademyCoursesQuery } from '../AcademyApi';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	}
}));

const container = {
	show: {
		transition: {
			staggerChildren: 0.04
		}
	}
};

const item = {
	hidden: {
		opacity: 0,
		y: 10
	},
	show: {
		opacity: 1,
		y: 0
	}
};

/**
 * The Courses page.
 */
function Courses() {
	const { data: courses, isLoading } = useGetAcademyCoursesQuery();
	const { data: categories } = useGetAcademyCategoriesQuery();

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const [filteredData, setFilteredData] = useState<Course[]>(courses);
	const [searchText, setSearchText] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [hideCompleted, setHideCompleted] = useState(false);

	useEffect(() => {
		function getFilteredArray() {
			if (courses && searchText.length === 0 && selectedCategory === 'all' && !hideCompleted) {
				return courses;
			}

			return _.filter(courses, (item) => {
				if (selectedCategory !== 'all' && item.category !== selectedCategory) {
					return false;
				}

				if (hideCompleted && item.progress.completed > 0) {
					return false;
				}

				return item.title.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (courses) {
			setFilteredData(getFilteredArray());
		}
	}, [courses, hideCompleted, searchText, selectedCategory]);

	function handleSelectedCategory(event: SelectChangeEvent<string>) {
		setSelectedCategory(event.target.value);
	}

	function handleSearchText(event: ChangeEvent<HTMLInputElement>) {
		setSearchText(event.target.value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Root
			header={
				<Box className="relative overflow-hidden flex shrink-0 items-center justify-center px-16 py-32 md:p-64">
					<div className="flex flex-col items-center justify-center  mx-auto w-full">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { delay: 0 } }}
						>
							<PageBreadcrumb color="secondary" />
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { delay: 0 } }}
						>
							<Typography
								color="inherit"
								className="text-center text-5xl sm:text-48 font-extrabold tracking-tight mt-4"
							>
								What do you want to learn today?
							</Typography>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { delay: 0.3 } }}
						>
							<Typography
								color="inherit"
								className="text-15 sm:text-2xl mt-16 sm:mt-24 opacity-75 tracking-tight max-w-md text-center"
							>
								Our courses will step you through the process of a building small applications, or
								adding new features to existing applications.
							</Typography>
						</motion.div>
					</div>

					<svg
						className="absolute inset-0 pointer-events-none"
						viewBox="0 0 960 540"
						width="100%"
						height="100%"
						preserveAspectRatio="xMidYMax slice"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g
							className="opacity-5"
							fill="none"
							stroke="currentColor"
							strokeWidth="100"
						>
							<circle
								r="234"
								cx="196"
								cy="23"
							/>
							<circle
								r="234"
								cx="790"
								cy="491"
							/>
						</g>
					</svg>
				</Box>
			}
			content={
				<div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
					<div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
						<div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
							<FormControl
								className="flex w-full sm:w-136"
								variant="outlined"
							>
								<InputLabel id="category-select-label">Category</InputLabel>
								<Select
									labelId="category-select-label"
									id="category-select"
									label="Category"
									value={selectedCategory}
									onChange={handleSelectedCategory}
								>
									<MenuItem value="all">
										<em> All </em>
									</MenuItem>
									{categories?.map((category) => (
										<MenuItem
											value={category.slug}
											key={category.id}
										>
											{category.title}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<TextField
								label="Search for a course"
								placeholder="Enter a keyword..."
								className="flex w-full sm:w-256 mx-8"
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={handleSearchText}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						</div>

						<FormControlLabel
							label="Hide completed"
							control={
								<Switch
									onChange={(ev) => {
										setHideCompleted(ev.target.checked);
									}}
									checked={hideCompleted}
									name="hideCompleted"
								/>
							}
						/>
					</div>
					{filteredData &&
						(filteredData.length > 0 ? (
							<motion.div
								className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 mt-32 sm:mt-40"
								variants={container}
								initial="hidden"
								animate="show"
							>
								{filteredData.map((course) => {
									return (
										<motion.div
											variants={item}
											key={course.id}
										>
											<CourseCard course={course} />
										</motion.div>
									);
								})}
							</motion.div>
						) : (
							<div className="flex flex-1 items-center justify-center">
								<Typography
									color="text.secondary"
									className="text-3xl my-24"
								>
									No courses found!
								</Typography>
							</div>
						))}
				</div>
			}
			scroll={isMobile ? 'normal' : 'page'}
		/>
	);
}

export default Courses;
