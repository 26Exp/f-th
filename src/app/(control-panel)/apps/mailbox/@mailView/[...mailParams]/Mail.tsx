'use client';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import MailLabel from './MailLabel';
import MailToolbar from './MailToolbar';
import MailAttachment from '../../components/MailAttachment';
import MailInfo from './MailInfo';
import useGetMail from '../../hooks/useGetMail';
import SelectMailMessage from './SelectMailMessage';

/**
 * The mail details.
 */
function Mail() {
	const { data: mail, isLoading, isUninitialized } = useGetMail();

	if (isLoading) {
		return <FuseLoading />;
	}

	if (isUninitialized) {
		return <SelectMailMessage />;
	}

	if (!mail) {
		return null;
	}

	return (
		<>
			<div className="z-10 relative flex flex-col flex-0 w-full border-b">
				<MailToolbar />

				<div className="flex flex-wrap items-center py-20 px-24">
					<div className="flex flex-auto my-4 mr-16 text-2xl">{mail.subject}</div>
					{mail.labels && mail.labels.length > 0 && (
						<div className="flex flex-wrap items-center justify-start -mx-4">
							{mail.labels.map((labelId) => (
								<MailLabel
									className="m-4"
									key={labelId}
									labelId={labelId}
								/>
							))}
						</div>
					)}
				</div>
			</div>

			<Box
				sx={{ backgroundColor: 'background.default' }}
				className="flex flex-col flex-auto shrink-0 lg:shrink p-12 lg:overflow-y-auto"
			>
				<Paper className="flex flex-col flex-0 w-full shadow rounded-xl overflow-hidden">
					<div className="flex flex-col py-32 px-24">
						<div className="flex items-start w-full">
							<Avatar src={mail.from.avatar} />

							<div className="ml-16 min-w-0">
								<Typography className="font-semibold truncate">
									{mail.from.contact.split('<')[0].trim()}
								</Typography>

								<div className="flex items-center mt-2 leading-5">
									<div>to</div>
									<div className="mx-4 font-semibold">me</div>
									{(mail.cc?.length ?? 0) + (mail.bcc?.length ?? 0) > 0 && (
										<div>
											<span className="mx-4">and</span>
											<span className="mx-4 font-semibold">
												{(mail.cc?.length ?? 0) + (mail.bcc?.length ?? 0)}
											</span>
											<span className="mx-4 font-semibold">
												{(mail.cc?.length ?? 0) + (mail.bcc?.length ?? 0) === 1
													? 'other'
													: 'others'}
											</span>
										</div>
									)}
									<MailInfo />
								</div>
							</div>
						</div>
						<Typography
							className="flex mt-32 whitespace-pre-line leading-relaxed"
							variant="body2"
							dangerouslySetInnerHTML={{ __html: mail.content }}
						/>

						{mail.attachments && mail.attachments?.length > 0 && (
							<div className="flex flex-col w-full">
								<div className="flex items-center mt-48">
									<FuseSvgIcon size={20}>heroicons-solid:paper-clip</FuseSvgIcon>
									<div className="mx-8 font-semibold">{mail.attachments.length} Attachments</div>
								</div>

								<div className="flex flex-wrap -m-12 mt-12">
									{mail.attachments.map((attachment, index) => (
										<MailAttachment
											key={index}
											attachment={attachment}
										/>
									))}
								</div>
							</div>
						)}
					</div>

					<Box
						className="flex w-full p-24 border-t"
						sx={{ backgroundColor: 'background.default' }}
					>
						<div className="flex flex-wrap w-full -m-4">
							<Button
								className="m-4"
								color="secondary"
								startIcon={<FuseSvgIcon size={18}>heroicons-solid:arrow-uturn-left</FuseSvgIcon>}
								variant="outlined"
								size="small"
							>
								Reply
							</Button>
							<Button
								className="m-4"
								color="secondary"
								startIcon={<FuseSvgIcon size={18}>heroicons-solid:arrow-uturn-left</FuseSvgIcon>}
								variant="outlined"
								size="small"
							>
								Reply All
							</Button>

							<Button
								className="m-4"
								color="secondary"
								startIcon={<FuseSvgIcon size={18}>heroicons-solid:chevron-double-right</FuseSvgIcon>}
								variant="outlined"
								size="small"
							>
								Forward
							</Button>
						</div>
					</Box>
				</Paper>
			</Box>
		</>
	);
}

export default Mail;
