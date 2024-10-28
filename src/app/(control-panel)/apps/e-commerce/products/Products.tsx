'use client';

import GlobalStyles from '@mui/material/GlobalStyles';
import ProductsHeader from './ProductsHeader';
import ProductsTable from './ProductsTable';

/**
 * The products page.
 */
function Products() {
	return (
		<>
			<GlobalStyles
				styles={() => ({
					'#root': {
						maxHeight: '100vh'
					}
				})}
			/>
			<div className="w-full h-full flex flex-col px-16">
				<ProductsHeader />
				<ProductsTable />
			</div>
		</>
	);
}

export default Products;
