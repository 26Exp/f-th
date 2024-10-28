import AuthGuardRedirect from '@auth/AuthGuardRedirect';
import authRoles from '@auth/authRoles';
import GuestRoleExample from './GuestRoleExample';

function GuestRoleExamplePage() {
	return (
		<AuthGuardRedirect auth={authRoles.onlyGuest}>
			<GuestRoleExample />
		</AuthGuardRedirect>
	);
}

export default GuestRoleExamplePage;
