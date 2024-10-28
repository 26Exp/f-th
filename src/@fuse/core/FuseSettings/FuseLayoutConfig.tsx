import { Control, Controller } from 'react-hook-form';
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Switch,
	TextField,
	Typography
} from '@mui/material';
import { AnyFormFieldType } from '@fuse/core/FuseSettings/ThemeFormConfigTypes';
import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import FuseLayoutConfigs from './FuseLayoutConfigs';

type FuseSettingsControllerProps = {
	key?: string;
	name: keyof FuseSettingsConfigType;
	control: Control<FuseSettingsConfigType>;
	title?: string;
	item: AnyFormFieldType;
};

function FuseLayoutConfig(props: FuseSettingsControllerProps) {
	const { item, name, control } = props;

	switch (item.type) {
		case 'radio':
			return (
				<Controller
					key={name}
					name={name}
					control={control}
					render={({ field }) => (
						<FormControl
							component="fieldset"
							className="FuseSettings-formControl"
						>
							<FormLabel
								component="legend"
								className="text-base"
							>
								{item.title}
							</FormLabel>
							<RadioGroup
								{...field}
								aria-label={item.title}
								className="FuseSettings-group"
								row={item?.options?.length < 4}
							>
								{item?.options?.map((opt: { value: string; name: string }) => (
									<FormControlLabel
										key={opt.value}
										value={opt.value}
										control={<Radio />}
										label={opt.name}
									/>
								))}
							</RadioGroup>
						</FormControl>
					)}
				/>
			);
		case 'switch':
			return (
				<Controller
					key={name}
					name={name}
					control={control}
					render={({ field: { onChange, value } }) => (
						<FormControl
							component="fieldset"
							className="FuseSettings-formControl"
						>
							<FormLabel
								component="legend"
								className="text-base"
							>
								{item.title}
							</FormLabel>
							<Switch
								checked={value as boolean}
								onChange={(ev, checked) => onChange(checked)}
								aria-label={item.title}
							/>
						</FormControl>
					)}
				/>
			);
		case 'number':
			return (
				<div
					key={name}
					className="FuseSettings-formControl"
				>
					<Controller
						name={name}
						control={control}
						render={({ field: { onChange, value } }) => {
							const [val, setVal] = useState(value);
							const [error, setError] = useState('');
							const debouncedOnChange = useRef(debounce(onChange, 500)).current;

							const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
								const _val = ev.target.value;

								setVal(_val);

								if (item.min && +_val < item.min) {
									setError(`Value is too low (min: ${item.min})`);
									return;
								}

								if (item.max && +_val > item.max) {
									setError(`Value is too high (max: ${item.max})`);
									return;
								}

								setError('');
								debouncedOnChange(_val);
							};

							useEffect(() => {
								setVal(value);
							}, [value]);

							return (
								<TextField
									value={val}
									onChange={handleChange}
									label={item.title}
									type="number"
									InputLabelProps={{ shrink: true }}
									variant="outlined"
									error={!!error}
									helperText={error}
									InputProps={{
										inputProps: {
											min: item.min,
											max: item.max
										}
									}}
								/>
							);
						}}
					/>
				</div>
			);
		case 'group':
			return (
				<div
					key={name}
					className="FuseSettings-formGroup"
				>
					<Typography
						className="FuseSettings-formGroupTitle"
						color="text.secondary"
					>
						{item.title}
					</Typography>
					<FuseLayoutConfigs
						value={item.children}
						prefix={name}
						control={control}
					/>
				</div>
			);
		default:
			return '';
	}
}

export default FuseLayoutConfig;
