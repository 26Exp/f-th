import Typography from '@mui/material/Typography';
import useSelectMailsTitle from '../hooks/useSelectMailsTitle';

/**
 * The mail list title.
 */
function MailListTitle() {
	const title = useSelectMailsTitle();

	return <Typography className="hidden sm:flex font-semibold uppercase mx-8">{title}</Typography>;
}

export default MailListTitle;
