import _ from 'lodash';
import clsx from 'clsx';
import orderStatuses from './constants/orderStatuses';

/**
 * The orders status properties.
 */
type OrdersStatusProps = {
	name: string;
};

/**
 * The orders status component.
 */
function OrdersStatus(props: OrdersStatusProps) {
	const { name } = props;

	return (
		<div
			className={clsx(
				'inline text-md font-semibold py-4 px-12 rounded-full truncate',
				_.find(orderStatuses, { name })?.color
			)}
		>
			{name}
		</div>
	);
}

export default OrdersStatus;
