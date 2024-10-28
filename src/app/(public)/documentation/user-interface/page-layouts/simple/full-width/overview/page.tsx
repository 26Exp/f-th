import PageLayoutOverview from '../../../components/PageLayoutOverview';
import overviews from '../../../constants/overviews';

function SimpleFullWidthOverviewComponent() {
	return <PageLayoutOverview layoutOptions={overviews.simple.fullWidth} />;
}

export default SimpleFullWidthOverviewComponent;
