import { useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function RadialBar() {
	const [state] = useState({
		options: {
			labels: ['RadialBar'],
			plotOptions: {
				radialBar: {
					hollow: {
						size: '70%'
					}
				}
			}
		},
		series: [68]
	});

	return (
		<div className="radialbar">
			<Chart
				options={state.options}
				series={state.series}
				type="radialBar"
				height="380"
			/>
		</div>
	);
}

export default RadialBar;
