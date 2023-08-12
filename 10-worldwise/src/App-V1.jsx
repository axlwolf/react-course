import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";

const API_URL = "http://localhost:8000";

function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchCities = async () => {
			try {
				setIsLoading(true);
				const res = await fetch(`${API_URL}/cities`);
				const data = await res.json();
				console.log(data);
				setCities(data);
			} catch (error) {
				console.log("There was an error fetching cities");
			} finally {
				setIsLoading(false);
			}
		};
		fetchCities();
		return () => {};
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />}></Route>
				<Route path="product" element={<Product />}></Route>
				<Route path="pricing" element={<Pricing />}></Route>
				<Route path="login" element={<Login />}></Route>
				<Route path="app" element={<AppLayout />}>
					<Route index element={<Navigate replace to="cities" />}></Route>

					{/* <Route
						index
						element={
							<CityList cities={cities} isLoading={isLoading}></CityList>
						}
					></Route> */}
					<Route
						path="cities"
						element={
							<CityList cities={cities} isLoading={isLoading}></CityList>
						}
					></Route>
					<Route path="cities/:id" element={<City />}></Route>
					<Route
						path="countries"
						element={
							<CountriesList
								cities={cities}
								isLoading={isLoading}
							></CountriesList>
						}
					></Route>
					<Route path="form" element={<Form />}></Route>
				</Route>
				<Route path="*" element={<PageNotFound />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
