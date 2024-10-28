import PageLayoutOverview from '../../../components/PageLayoutOverview';
import overviews from '../../../constants/overviews';

function CardedWithSidebarsOverviewComponent() {
	return <PageLayoutOverview layoutOptions={overviews.carded.withSidebars} />;
}

export default CardedWithSidebarsOverviewComponent;
