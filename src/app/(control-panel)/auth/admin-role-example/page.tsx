import AuthGuardRedirect from '@auth/AuthGuardRedirect';
import authRoles from '@auth/authRoles';
import AdminRoleExample from './AdminRoleExample';

function AdminRoleExamplePage() {
	return (
		<AuthGuardRedirect auth={authRoles.admin}>
			<AdminRoleExample />
		</AuthGuardRedirect>
	);
}

export default AdminRoleExamplePage;
