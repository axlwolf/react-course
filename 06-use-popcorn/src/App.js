import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const APIKEY = "d0cade60";

export default function App() {
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState(null);

	// Custom hooks for fetching movies
	const { movies, isLoading, error } = useMovies(query);
	const [watched, setWatched] = useLocalStorageState([], "watched");

	// Handler
	const handleSelectMovie = (movieId) => {
		setSelectedId((selectedId) => (movieId === selectedId ? null : movieId));
	};

	function handleCloseMovie() {
		setSelectedId(null);
	}

	const handleAddWatchedMovie = (movie) => {
		setWatched((watchedMovie) => [...watchedMovie, movie]);

		// localStorage.setItem("watched", JSON.stringify([...watched, movie]));
	};

	const handleRemoveWatchedMovie = (movieId) => {
		setWatched(() => watched.filter((movie) => movie.imdbID !== movieId));
	};

	return (
		<>
			<NavBar>
				<SearchBar query={query} setQuery={setQuery} />
				<Results movies={movies} />
			</NavBar>
			<Main>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
					)}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onAddWatchedMovie={handleAddWatchedMovie}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMoviesList
								watched={watched}
								onRemoveWatchedMovie={handleRemoveWatchedMovie}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

const Loader = () => {
	return <p className="loader">Loading...</p>;
};

const ErrorMessage = ({ message }) => {
	return <p className="error">⛔{message}⛔</p>;
};

const NavBar = ({ children }) => {
	return (
		<nav className="nav-bar">
			<Logo />
			{children}
		</nav>
	);
};

const SearchBar = ({ query, setQuery }) => {
	const inputEl = useRef(null);

	useKey("Enter", () => {
		if (document.activeElement === inputEl.current) return;

		inputEl.current.focus();
		setQuery("");
	});

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputEl}
		/>
	);
};

const Logo = () => {
	return (
		<div className="logo">
			<span role="img">🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
};

const Results = ({ movies }) => {
	return (
		<p className="num-results">
			Found <strong>{movies.length}</strong> results
		</p>
	);
};

const Main = ({ children }) => {
	return <main className="main">{children}</main>;
};

const Box = ({ children }) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="box">
			<button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
				{isOpen ? "–" : "+"}
			</button>
			{isOpen && children}
		</div>
	);
};

const MoviesList = ({ movies, onSelectMovie }) => {
	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<MovieItem
					movie={movie}
					key={movie.imdbID}
					onSelectMovie={onSelectMovie}
				/>
			))}
		</ul>
	);
};

const MovieItem = ({ movie, onSelectMovie }) => {
	return (
		<li onClick={() => onSelectMovie(movie.imdbID)}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
};

const MovieDetails = ({
	selectedId,
	onCloseMovie,
	onAddWatchedMovie,
	watched,
}) => {
	// States
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState("");

	// Refs
	const countRef = useRef(0);

	useEffect(() => {
		if (userRating) countRef.current = countRef.current + 1;
	}, [userRating]);

	//Derived state
	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)
		?.userRating;

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	// if (imdbRating > 8) [isTop, setIsTop] = useState(true);

	// if (imdbRating > 8) return <p>Greates ever!!</p>;

	// const [isTop, setIsTop] = useState(imdbRating > 8);

	// console.log(isTop);
	// useEffect(() => {
	// 	setIsTop(imdbRating > 8);
	// }, [imdbRating]);

	// const isTop = imdbRating > 8;
	// console.log(isTop);

	// const [avgRating, setAvgRating] = useState(0);

	function handleAddWatchedMovie() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(" ").at(0)),
			userRating,
			countRatingDecisions: countRef.current,
		};
		onAddWatchedMovie(newWatchedMovie);
		onCloseMovie();
		// setAvgRating(Number(imdbRating));
		// setAvgRating((avgRating) => (avgRating + userRating) / 2);
	}

	useEffect(() => {
		async function getMovieDetails() {
			setIsLoading(true);

			const res = await fetch(
				`http://www.omdbapi.com/?apikey=${APIKEY}&i=${selectedId}`
			);

			const data = await res.json();
			setMovie(data);
			setIsLoading(false);
		}

		getMovieDetails();
	}, [selectedId]);

	useEffect(() => {
		if (!title) return;
		document.title = `Movie | ${title}`;

		// Cleanup function to put the original title back
		return () => {
			document.title = "usePopcorn";
			console.log(`Clean up effect for Movie ${title}`);
		};
	}, [title]);

	useKey("Escate", onCloseMovie);

	return (
		<div className="details">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className="btn-back" onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of the ${movie} movie`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span>
								{imdbRating} IMDB rating
							</p>
						</div>
					</header>
					{/* <p>{avgRating}</p> */}
					<section>
						<div className="rating">
							{!isWatched ? (
								<>
									<StarRating
										maxRating={10}
										size={24}
										onSetRating={setUserRating}
									/>
									{userRating > 0 && (
										<button className="btn-add" onClick={handleAddWatchedMovie}>
											+ Add to list
										</button>
									)}
								</>
							) : (
								<p>
									You rated this movie {watchedUserRating} <span>⭐</span>
								</p>
							)}
						</div>

						<p>
							<em>{plot}</em>
						</p>
						<p>Starring by: {actors}</p>
						<p>Directed by: {director}</p>
					</section>
				</>
			)}
		</div>
	);
};

const WatchedSummary = ({ watched }) => {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));

	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating.toFixed(2)}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating.toFixed(2)}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime.toFixed(2)} min</span>
				</p>
			</div>
		</div>
	);
};

const WatchedMoviesList = ({ watched, onRemoveWatchedMovie }) => {
	return (
		<ul className="list list-movies">
			{watched.map((movie) => (
				<WatchedMoviesItem
					movie={movie}
					key={movie.imdbID}
					onRemoveWatchedMovie={onRemoveWatchedMovie}
				/>
			))}
		</ul>
	);
};

const WatchedMoviesItem = ({ movie, onRemoveWatchedMovie }) => {
	return (
		<li>
			<img src={movie.poster} alt={`${movie.title} poster`} />
			<h3>{movie.title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
				<button
					className="btn-delete"
					onClick={() => onRemoveWatchedMovie(movie.imdbID)}
				>
					x
				</button>
			</div>
		</li>
	);
};
