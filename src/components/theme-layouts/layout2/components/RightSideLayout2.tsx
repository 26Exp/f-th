import { lazy, memo, Suspense } from 'react';

const QuickPanel = lazy(() => import('@/components/theme-layouts/components/quickPanel/QuickPanel'));
const MessengerPanel = lazy(() => import('@/app/(control-panel)/apps/messenger/messengerPanel/MessengerPanel'));
const NotificationPanel = lazy(() => import('@/app/(control-panel)/apps/notifications/NotificationPanel'));

/**
 * The right side layout 2.
 */
function RightSideLayout2() {
	return (
		<Suspense>
			<QuickPanel />

			<MessengerPanel />

			<NotificationPanel />
		</Suspense>
	);
}

export default memo(RightSideLayout2);
