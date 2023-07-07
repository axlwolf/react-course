import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const pizzaData = [
	{
		name: "Focaccia",
		ingredients: "Bread with italian olive oil and rosemary",
		price: 6,
		photoName: "pizzas/focaccia.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Margherita",
		ingredients: "Tomato and mozarella",
		price: 10,
		photoName: "pizzas/margherita.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Spinaci",
		ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
		price: 12,
		photoName: "pizzas/spinaci.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Funghi",
		ingredients: "Tomato, mozarella, mushrooms, and onion",
		price: 12,
		photoName: "pizzas/funghi.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Salamino",
		ingredients: "Tomato, mozarella, and pepperoni",
		price: 15,
		photoName: "pizzas/salamino.jpg",
		soldOut: true,
	},
	{
		name: "Pizza Prosciutto",
		ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
		price: 18,
		photoName: "pizzas/prosciutto.jpg",
		soldOut: false,
	},
];

function App() {
	return (
		<main className="container">
			<Hader />
			<Menu />
			<Footer />
		</main>
	);
}

function Hader() {
	//const styles = { color: "red", fontSize: "48px", textTransform: "uppercase" };
	return (
		<header className="header">
			<h1>Fast React Pizza Co.</h1>
		</header>
	);
}

function Menu() {
	const pizzas = pizzaData;
	//const pizzas = [];
	const numPizzas = pizzas.length;

	return (
		<div className="menu">
			<h2>Our Menu</h2>

			{/*  Short circuit
			{numPizzas > 0 && (
				<ul className="pizzas">
					{pizzas.map((pizza) => (
						<Pizza pizzaObj={pizza} key={pizza.name} />
					))}
				</ul>
			)}
            */}
			{/* Ternary operator */}
			{numPizzas > 0 ? (
				<>
					<p>
						Authentic Italian cousine. 6 creative dishes to choose from. All
						from our stone oven, all organic, all delicious.
					</p>

					<ul className="pizzas">
						{pizzas.map((pizza) => (
							<Pizza pizzaObj={pizza} key={pizza.name} />
						))}
					</ul>
				</>
			) : (
				<p>We're still working on our menu. Please come back later</p>
			)}
		</div>
	);
}

function Pizza({ pizzaObj }) {
	console.log(pizzaObj);
	// if (pizzaObj.soldOut) return null;

	return (
		<li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
			<img src={pizzaObj.photoName} alt={pizzaObj.name}></img>
			<div>
				<h3>{pizzaObj.name}</h3>
				<p>{pizzaObj.ingredients}</p>
				{/* {pizzaObj.soldOut ? (
					<span>SOLD OUT</span>
				) : (
					<span>{pizzaObj.price}</span>
				)} */}
				<span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
			</div>
		</li>
	);
}

function Footer() {
	const hour = new Date().getHours();
	const openHour = 12;
	const closeHour = 22;
	const isOpen = hour >= openHour && hour <= closeHour;
	console.log(isOpen);

	// if (hour >= openHour && hour <= closeHour) alert("We are currently open");
	// else alert("Sorry, we are closed");
	// if (!isOpen) return <p>We're happy to welcome you between {closeHour}:00</p>;

	return (
		<footer className="footer">
			{isOpen ? (
				<Order closeHour={closeHour} openHour={openHour} />
			) : (
				<p>We're happy to welcome you between {closeHour}:00</p>
			)}
		</footer>
	);
	//return React.createElement("footer", null, "We are currently working");
}

function Order({ closeHour, openHour }) {
	return (
		<section className="order">
			<p>
				We are open from {openHour}:00 to {closeHour}:00. Come to visit us or
				order Online.
			</p>
			<button className="btn">Order</button>
		</section>
	);
}

const root = createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
