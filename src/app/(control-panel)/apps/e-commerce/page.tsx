import { redirect } from 'next/navigation';

function ECommerceApp() {
	redirect(`/apps/e-commerce/products`);
	return null;
}

export default ECommerceApp;
