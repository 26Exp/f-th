import AuthGuardRedirect from '@auth/AuthGuardRedirect';
import authRoles from '@auth/authRoles';
import StaffRoleExample from './StaffRoleExample';

function StaffRoleExamplePage() {
	return (
		<AuthGuardRedirect auth={authRoles.staff}>
			<StaffRoleExample />
		</AuthGuardRedirect>
	);
}

export default StaffRoleExamplePage;
