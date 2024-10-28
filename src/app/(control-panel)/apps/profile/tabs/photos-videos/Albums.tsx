import FuseLoading from '@fuse/core/FuseLoading';
import { motion } from 'framer-motion';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import { useGetProfileAlbumsQuery } from '../../ProfileApi';
import Album from './Album';

function Albums() {
	const { data: albums, isLoading } = useGetProfileAlbumsQuery();

	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 }
	};

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="show"
			className="w-full"
		>
			{albums.map((album) => (
				<div
					key={album.id}
					className="mb-48"
				>
					<ListSubheader
						component={motion.div}
						variants={item}
						className="flex items-center px-0 mb-24 bg-transparent"
					>
						<Typography className="text-2xl font-semibold leading-tight">{album.name}</Typography>
						<Typography
							className="mx-12 font-medium leading-tight"
							color="text.secondary"
						>
							{album.info}
						</Typography>
					</ListSubheader>

					<div className="overflow-hidden flex flex-wrap -m-8">
						<Album album={album} />
					</div>
				</div>
			))}
		</motion.div>
	);
}

export default Albums;
