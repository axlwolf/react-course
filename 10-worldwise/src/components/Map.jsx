import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
	const [searchParams, setSearchParams] = useSearchParams();

	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	const navigate = useNavigate();

	console.log(lat, lng);

	return (
		<section
			className={styles.mapContainer}
			onClick={() => {
				navigate("form");
			}}
		>
			Map
			<h3>
				Position: {lat}, {lng}
			</h3>
			<button
				onClick={() => {
					setSearchParams({ lat: 23, lng: 50 });
				}}
			>
				Change position
			</button>
		</section>
	);
}

export default Map;
