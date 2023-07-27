import { useState, useEffect } from "react";
const APIKEY = "d0cade60";

export const useMovies = (query) => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	//Fetch movies effect
	useEffect(() => {
		// callback?.();

		const controller = new AbortController();
		async function fetchMovies() {
			try {
				setIsLoading(true);
				setError("");
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
					{ signal: controller.signal }
				);

				if (!res.ok)
					return new Error("Something went wrong with fetching movies");

				const data = await res.json();
				// .then((res) => res.json())
				// .then((data) => setMovies((movies) => (movies = data.Search)));
				if (data.Response === "False") throw new Error("Movie not found");

				setMovies(data.Search);
				setError("");
			} catch (error) {
				console.log(error.message);

				if (error.name !== "AbortError") {
					setError(error.message);
				}
			} finally {
				setIsLoading(false);
			}
		}
		if (query.length < 3) {
			setMovies([]);
			setError("");
			return;
		}

		// handleCloseMovie();
		fetchMovies();

		return () => {
			controller.abort();
		};
	}, [query]);

	return { movies, isLoading, error };
};
