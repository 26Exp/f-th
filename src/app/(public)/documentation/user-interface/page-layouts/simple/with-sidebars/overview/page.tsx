import PageLayoutOverview from '../../../components/PageLayoutOverview';
import overviews from '../../../constants/overviews';

function SimpleWithSidebarsOverviewComponent() {
	return <PageLayoutOverview layoutOptions={overviews.simple.withSidebars} />;
}

export default SimpleWithSidebarsOverviewComponent;
