import { createContext, useContext, useEffect, useReducer } from "react";

const API_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

const reducer = (state, action) => {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };
		case "cities/loaded":
			return { ...state, isLoading: false, cities: action.payload };
		case "city/loaded":
			return { ...state, isLoading: false, currentCity: action.payload };
		case "city/created":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};
		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((city) => city.id !== action.payload),
				currentCity: {},
			};
		case "rejected":
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			throw new Error("Unknowm action type");
	}
};

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		const fetchCities = async () => {
			dispatch({ type: "loading" });
			try {
				const res = await fetch(`${API_URL}/cities`);
				const data = await res.json();
				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({
					type: "rejected",
					payload: "There was an error loading cities...",
				});
			}
		};
		fetchCities();
		return () => {};
	}, []);

	const getCurrentCity = async (id) => {
		if (Number(id) === currentCity.id) return;

		dispatch({ type: "loading" });

		try {
			const res = await fetch(`${API_URL}/cities/${id}`);
			const data = await res.json();

			dispatch({ type: "city/loaded", payload: data });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error loading the city...",
			});
		}
	};

	const createCity = async (newCity) => {
		dispatch({ type: "loading" });

		try {
			const res = await fetch(`${API_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			//setCurrentCity(data);
			dispatch({ type: "city/created", payload: data });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error creating the city...",
			});
		}
	};

	const deleteCity = async (id) => {
		dispatch({ type: "loading" });

		try {
			await fetch(`${API_URL}/cities/${id}`, {
				method: "DELETE",
			});
			dispatch({ type: "city/deleted", payload: id });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error deleting the city...",
			});
		}
	};

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCurrentCity,
				createCity,
				deleteCity,
				error,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

const useCities = () => {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw new Error(`CitiesContext was used outside of the CitiesProvider`);
	return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
