import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'src/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { toggleChatPanel } from './messengerPanelSlice';

type ChatPanelToggleButtonProps = {
	children?: React.ReactNode;
};

/**
 * The chat panel toggle button.
 */
function MessengerPanelToggleButton(props: ChatPanelToggleButtonProps) {
	const { children = <FuseSvgIcon>heroicons-outline:chat-bubble-left-right</FuseSvgIcon> } = props;
	const dispatch = useAppDispatch();

	return <IconButton onClick={() => dispatch(toggleChatPanel())}>{children}</IconButton>;
}

export default MessengerPanelToggleButton;
