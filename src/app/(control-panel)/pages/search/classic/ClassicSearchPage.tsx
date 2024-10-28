'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import { blue, green } from '@mui/material/colors';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import exampleSearchResponse from '../constants/exampleSearchResponse';
import SearchItemType from '../types/SearchItemType';

/**
 * The classic search page.
 */
function ClassicSearchPage() {
	const [data, setData] = useState<SearchItemType[]>([]);

	useEffect(() => {
		setTimeout(() => {
			setData(exampleSearchResponse);
		}, 100);
	}, []);

	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<FusePageSimple
			header={
				<div className="flex flex-col w-full max-w-md flex-1 px-24 pt-24 sm:pt-32 sm:px-32">
					<PageBreadcrumb className="mb-12" />

					<Paper className="flex h-44 w-full items-center rounded-lg shadow">
						<Input
							placeholder="Search..."
							disableUnderline
							fullWidth
							inputProps={{
								'aria-label': 'Search'
							}}
						/>
						<FuseSvgIcon
							className="mx-12"
							color="action"
						>
							heroicons-outline:magnifying-glass
						</FuseSvgIcon>
					</Paper>
				</div>
			}
			content={
				<div className="flex h-full w-full max-w-md flex-auto flex-col p-24 pt-0 sm:p-32 sm:pt-0">
					<div className="flex flex-1 flex-col">
						{data.length > 0 && (
							<motion.div
								variants={container}
								initial="hidden"
								animate="show"
							>
								<motion.div variants={item}>
									<Typography
										color="text.secondary"
										className="mx-12 my-12 text-md"
									>
										{data.length} results
									</Typography>
								</motion.div>

								{data.map((_item) => (
									<motion.div
										variants={item}
										className="mb-28"
										key={_item.id}
									>
										<Typography
											className="cursor-pointer text-17"
											sx={{
												color: blue[800]
											}}
										>
											{_item.title}
										</Typography>
										<Typography
											sx={{
												color: green[800]
											}}
										>
											{_item.url}
										</Typography>
										<Typography className="text-md">{_item.excerpt}</Typography>
									</motion.div>
								))}
							</motion.div>
						)}
					</div>

					<div className="mt-48 flex justify-center">
						<Pagination
							count={10}
							color="secondary"
						/>
					</div>
				</div>
			}
		/>
	);
}

export default ClassicSearchPage;
