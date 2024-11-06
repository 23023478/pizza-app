import React, { useState } from "react";
import ReactDOM from "react-dom/client";
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


function Pizza({ name, ingredients, price, photoName, onFavorite, isFavorite }) {
    return (
        <div className="pizza">
            <img src={photoName} alt={name} width="300" />
            <h2>{name}</h2>
            <p>Ingredients: {ingredients}</p>
            <p>Price: ${price}</p>
            <button onClick={onFavorite} class='btn'>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
        </div>
    );
}

function Order() {
    return (
        <div className="order">
            <p>We're currently open</p>
            <button class='btn'>Order Now</button>
        </div>
    );
}

function Menu({ pizzas, favorites, onFavorite }) {
    return (
        <div className="menu">
            <h2>Our Menu</h2>
            {pizzas.map((pizza) => (
                <Pizza
                    key={pizza.name}
                    {...pizza}
                    onFavorite={() => onFavorite(pizza.name)}
                    isFavorite={favorites.includes(pizza.name)}
                />
            ))}
        </div>
    );
}

function Favorites({ pizzas }) {
    return (
        <div className="favorites">
            <h1>Your Favorites</h1>
            {pizzas.length > 0 ? (
                pizzas.map((pizza) => (
                    <Pizza key={pizza.name} {...pizza} isFavorite={true} />
                ))
            ) : (
                <p>No favorites added.</p>
            )}
        </div>
    );
}

function Footer() {
    const currentHour = new Date().getHours();
    const isOpen = currentHour >= 10 && currentHour <= 22;

    return (
        <footer className="footer">
            {isOpen ? <Order /> : <p>Sorry, we're closed</p>}
        </footer>
    );
}

function App() {
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleFavorite = (pizzaName) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(pizzaName)
                ? prevFavorites.filter((name) => name !== pizzaName)
                : [...prevFavorites, pizzaName]
        );
    };

    const filteredPizzas = pizzaData.filter((pizza) =>
        pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const favoritePizzas = pizzaData.filter((pizza) =>
        favorites.includes(pizza.name)
    );

    const currentHour = new Date().getHours();
    const isOpen = currentHour >= 10 && currentHour <= 22;

    return (
        <div className="container">
            <header>
                <h1 style={{color:"orange", fontSize:"48px", textTransform:"uppercase"}}>Carrie's Pizza Co.</h1>;
                {isOpen && <h2 className="tagline">Authentic Italian Cuisine, all from our stone oven</h2>}
                <input class='btn'
                    type="text"
                    placeholder="Search for a pizza..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </header>
            <Menu pizzas={filteredPizzas} favorites={favorites} onFavorite={toggleFavorite} />
            <Favorites pizzas={favoritePizzas} />
            <Footer />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
