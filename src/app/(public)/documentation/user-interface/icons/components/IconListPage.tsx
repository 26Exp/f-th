'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FuseHighlight from '@fuse/core/FuseHighlight';
import FuseLoading from '@fuse/core/FuseLoading';
import { useGetIconsListQuery } from '../IconsApi';
import IconListItem from './IconListItem';

type IconListPageProps = {
	pageTitle: string;
	referenceUrl?: string;
	apiUrl: string;
	iconSet: string;
};

const IconListPage = React.memo((props: IconListPageProps) => {
	const { pageTitle, referenceUrl, apiUrl, iconSet } = props;
	const { data: listData, isLoading } = useGetIconsListQuery(apiUrl);

	const [selectedIcon, setSelectedIcon] = useState('');
	const [filteredData, setFilteredData] = useState<string[]>([]);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: { searchText: '', size: 32 }
	});

	const { watch, control } = methods;
	const form = watch();
	const searchText = watch('searchText');

	useEffect(() => {
		setSelectedIcon(listData?.[0]);
	}, [listData]);

	useEffect(() => {
		if (listData) {
			setFilteredData(searchText.length > 0 ? listData.filter((item) => item.includes(searchText)) : listData);
		}
	}, [listData, searchText]);

	const handleSelect = useCallback((icon: string) => {
		setSelectedIcon(icon);
	}, []);

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!listData) {
		return null;
	}

	return (
		<div>
			<div className="flex flex-col sm:flex-row flex-0 sm:items-center sm:justify-between mb-32">
				<div className="flex-1 min-w-0">
					<Typography className="text-4xl font-extrabold leading-none tracking-tight">{pageTitle}</Typography>
				</div>
				<div>
					{referenceUrl && (
						<Button
							className="mt-12 sm:mt-0"
							variant="contained"
							color="secondary"
							component="a"
							href={referenceUrl}
							target="_blank"
							role="button"
							startIcon={<FuseSvgIcon>heroicons-solid:arrow-top-right-on-square</FuseSvgIcon>}
						>
							Official docs
						</Button>
					)}
				</div>
			</div>
			<div className="flex-auto">
				<Typography className="text-2xl font-700 mb-16">Usage</Typography>

				<FuseHighlight
					component="pre"
					className="language-jsx my-24"
					copy
				>
					{`
              <FuseSvgIcon className="text-48" size={${form.size}} color="action">${iconSet}:${selectedIcon}</FuseSvgIcon>
            `}
				</FuseHighlight>

				<Typography className="text-2xl font-700 mt-32 mb-16">Icons</Typography>

				<div className="flex flex-col md:flex-row justify-center md:items-end my-24 xs:flex-col md:space-x-16">
					<div className="flex flex-1">
						<Controller
							name="searchText"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									id="searchText"
									label="Search an icon"
									placeholder="Search.."
									className="flex-auto"
									slotProps={{
										inputLabel: {
											shrink: true
										}
									}}
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>

					<Controller
						name="size"
						control={control}
						render={({ field }) => (
							<FormControl sx={{ mt: 2, minWidth: 120 }}>
								<InputLabel htmlFor="max-width">Size</InputLabel>
								<Select
									autoFocus
									{...field}
									label="Size"
								>
									<MenuItem value={16}>16</MenuItem>
									<MenuItem value={20}>20</MenuItem>
									<MenuItem value={24}>24</MenuItem>
									<MenuItem value={32}>32</MenuItem>
									<MenuItem value={40}>40</MenuItem>
									<MenuItem value={48}>48</MenuItem>
									<MenuItem value={64}>64</MenuItem>
								</Select>
							</FormControl>
						)}
					/>
				</div>

				<div className="grid grid-cols-2  sm:grid-cols-4 gap-8">
					{filteredData?.map((icon) => (
						<IconListItem
							key={icon}
							icon={icon}
							size={form.size}
							iconSet={iconSet}
							onIconSelect={handleSelect}
							sx={{ borderColor: icon === selectedIcon && 'secondary.main' }}
						/>
					))}

					{filteredData?.length === 0 && (
						<div className="col-span-6 flex flex-auto items-center justify-center w-full h-full p-32 md:p-128">
							<Typography
								color="text.secondary"
								variant="h5"
							>
								No results!
							</Typography>
						</div>
					)}
				</div>
			</div>
		</div>
	);
});

export default IconListPage;
