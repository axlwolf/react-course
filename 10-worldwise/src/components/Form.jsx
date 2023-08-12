// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useNavigate } from "react-router-dom";

import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Button from "../components/Button";
import Message from "../components/Message";
import Spinner from "../components/Spinner";

import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

const flagemojiToPNG = (flag) => {
	var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
		.map((char) => String.fromCharCode(char - 127397).toLowerCase())
		.join("");
	return (
		<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
	);
};

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

function Form() {
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [emoji, setEmoji] = useState();
	const [geoCodingError, setGeoCodingError] = useState("");
	const [startDate, setStartDate] = useState(new Date());

	const [lat, lng] = useUrlPosition();
	const { createCity, isLoading } = useCities();
	const navigate = useNavigate();

	useEffect(
		function () {
			if (!lat && !lng) return;

			async function fetchCityData() {
				try {
					setIsLoadingGeocoding(true);
					setGeoCodingError("");

					const res = await fetch(
						`${BASE_URL}?latitude=${lat}&longitude=${lng}`
					);
					const data = await res.json();

					if (!data.countryCode)
						throw new Error(
							"That doesn't seem to be a city. Click somewhere else 😉"
						);

					setCityName(data.city || data.locality || "");
					setCountry(data.countryName);
					setEmoji(convertToEmoji(data.countryCode));
				} catch (err) {
					setGeoCodingError(err.message);
				} finally {
					setIsLoadingGeocoding(false);
				}
			}
			fetchCityData();
		},
		[lat, lng]
	);

	if (isLoadingGeocoding) return <Spinner />;

	if (!lat && !lng)
		return <Message message="Start by clicking somewhere on the map" />;

	if (geoCodingError) return <Message message={geoCodingError} />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!cityName || !date) return;
		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};
		await createCity(newCity);
		navigate("/app/cities");
	};

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ""}`}
			onSubmit={handleSubmit}
		>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				{emoji ? (
					<span className={styles.flag}>{flagemojiToPNG(emoji)}</span>
				) : (
					<span className={styles.flag}></span>
				)}
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker
					id="date"
					selected={startDate}
					onChange={(date) => setStartDate(date)}
					dateFormat="dd/MM/yyyy"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
