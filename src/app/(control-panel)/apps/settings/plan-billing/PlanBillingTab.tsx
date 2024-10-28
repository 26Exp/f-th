'use client';

import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import _ from 'lodash';
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import {
	SettingsPlanBilling,
	useGetPlanBillingSettingsQuery,
	useUpdatePlanBillingSettingsMutation
} from '../SettingsApi';

type FormType = SettingsPlanBilling;

const plans = [
	{
		value: 'basic',
		label: 'Basic',
		details: 'Starter plan for individuals.',
		price: 9
	},
	{
		value: 'team',
		label: 'Team',
		details: 'Collaborate up to 10 people.',
		price: 29
	},
	{
		value: 'enterprise',
		label: 'Enterprise',
		details: 'For bigger businesses.',
		price: 99
	}
];

const defaultValues: FormType = {
	id: '',
	plan: 'team',
	cardHolder: '',
	cardNumber: '',
	cardExpiration: '',
	cardCVC: '',
	country: '',
	zip: ''
};

/**
 * Form Validation Schema
 */
const schema = z.object({
	plan: z.enum(['basic', 'team', 'enterprise']),
	cardHolder: z.string(),
	cardNumber: z.string(),
	cardExpiration: z.string(),
	cardCVC: z.string(),
	country: z.string(),
	zip: z.string()
});

function PlanBillingTab() {
	const { data: planBillingSettings } = useGetPlanBillingSettingsQuery();
	const [updatePlanBillingSettings] = useUpdatePlanBillingSettingsMutation();

	const { control, reset, handleSubmit, formState } = useForm<FormType>({
		defaultValues,
		mode: 'all',
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		reset(planBillingSettings);
	}, [planBillingSettings, reset]);

	/**
	 * Form Submit
	 */
	function onSubmit(formData: FormType) {
		updatePlanBillingSettings(formData);
	}

	return (
		<div className="w-full max-w-3xl">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="w-full">
					<Typography className="text-xl">Change your plan</Typography>
					<Typography color="text.secondary">Upgrade or downgrade your current plan.</Typography>
				</div>
				<div className="mt-32 grid w-full gap-16 sm:grid-cols-3">
					<div className="sm:col-span-3">
						<Alert severity="info">
							Changing the plan will take effect immediately. You will be charged for the rest of the
							current month.
						</Alert>
					</div>
					<Controller
						name="plan"
						control={control}
						render={({ field }) => (
							<>
								{plans.map((plan) => (
									<Paper
										sx={(theme) => ({
											'&.selected': {
												border: `3px solid ${theme.palette.secondary.main}`
											}
										})}
										className={clsx(
											' flex flex-1 cursor-pointer flex-col items-start justify-start rounded-md p-24 border-3 border-transparent relative',
											field.value === plan.value ? 'selected' : ''
										)}
										onClick={() => field.onChange(plan.value)}
										key={plan.value}
									>
										{field.value === plan.value && (
											<FuseSvgIcon
												className="absolute right-0 top-0 mr-12 mt-12"
												size={24}
												color="secondary"
											>
												heroicons-solid:check-circle
											</FuseSvgIcon>
										)}
										<Typography className="font-semibold uppercase">{plan.label}</Typography>
										<Typography
											className="mt-4"
											color="text.secondary"
										>
											{plan.details}
										</Typography>
										<div className="flex-auto" />
										<div className="flex items-end mt-8 text-lg">
											<Typography>
												{plan.price.toLocaleString('en-US', {
													style: 'currency',
													currency: 'USD'
												})}
											</Typography>
											<Typography color="text.secondary"> / month</Typography>
										</div>
									</Paper>
								))}
							</>
						)}
					/>
				</div>

				<div className="mb-40 mt-48 border-t" />
				<div className="w-full">
					<Typography className="text-xl">Payment Details</Typography>
					<Typography color="text.secondary">
						Update your billing information. Make sure to set your location correctly as it could affect
						your tax rates.
					</Typography>
				</div>
				<div className="mt-32 grid w-full grid-cols-4 gap-24">
					<div className="col-span-4">
						<Controller
							control={control}
							name="cardHolder"
							render={({ field }) => (
								<TextField
									{...field}
									label="Card holder"
									placeholder="Card holder"
									id="cardHolder"
									error={!!errors.cardHolder}
									helperText={errors?.cardHolder?.message}
									variant="outlined"
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<FuseSvgIcon size={20}>heroicons-solid:user-circle</FuseSvgIcon>
											</InputAdornment>
										)
									}}
								/>
							)}
						/>
					</div>
					<div className="col-span-4 sm:col-span-2">
						<Controller
							control={control}
							name="cardNumber"
							render={({ field }) => (
								<TextField
									{...field}
									label="Card number"
									placeholder="Card number"
									id="cardNumber"
									error={!!errors.cardNumber}
									helperText={errors?.cardNumber?.message}
									variant="outlined"
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<FuseSvgIcon size={20}>heroicons-solid:credit-card</FuseSvgIcon>
											</InputAdornment>
										)
									}}
								/>
							)}
						/>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<Controller
							control={control}
							name="cardExpiration"
							render={({ field }) => (
								<TextField
									{...field}
									label="Expiration date"
									placeholder="MM / YY"
									id="cardExpiration"
									error={!!errors.cardExpiration}
									helperText={errors?.cardExpiration?.message}
									variant="outlined"
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<FuseSvgIcon size={20}>heroicons-solid:credit-card</FuseSvgIcon>
											</InputAdornment>
										)
									}}
								/>
							)}
						/>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<Controller
							control={control}
							name="cardCVC"
							render={({ field }) => (
								<TextField
									{...field}
									label="CVC / CVC2"
									placeholder="CVC / CVC2"
									id="cardCVC"
									error={!!errors.cardCVC}
									helperText={errors?.cardCVC?.message}
									variant="outlined"
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<FuseSvgIcon size={20}>heroicons-solid:lock-closed</FuseSvgIcon>
											</InputAdornment>
										)
									}}
								/>
							)}
						/>
					</div>
					<div className="col-span-4 sm:col-span-2">
						<Controller
							control={control}
							name="country"
							render={({ field }) => (
								<TextField
									{...field}
									label="Country"
									placeholder="County"
									id="country"
									error={!!errors.country}
									helperText={errors?.country?.message}
									variant="outlined"
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<FuseSvgIcon size={20}>heroicons-solid:map</FuseSvgIcon>
											</InputAdornment>
										)
									}}
								/>
							)}
						/>
					</div>
					<div className="col-span-4 sm:col-span-2">
						<Controller
							control={control}
							name="zip"
							render={({ field }) => (
								<TextField
									{...field}
									label="ZIP / Postal code"
									placeholder="ZIP / Postal code"
									id="zip"
									error={!!errors.zip}
									helperText={errors?.zip?.message}
									variant="outlined"
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<FuseSvgIcon size={20}>heroicons-solid:hashtag</FuseSvgIcon>
											</InputAdornment>
										)
									}}
								/>
							)}
						/>
					</div>
				</div>

				<Divider className="mb-40 mt-44 border-t" />
				<div className="flex items-center justify-end space-x-8">
					<Button
						variant="outlined"
						disabled={_.isEmpty(dirtyFields)}
						onClick={() => reset(planBillingSettings)}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						type="submit"
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
}

export default PlanBillingTab;
