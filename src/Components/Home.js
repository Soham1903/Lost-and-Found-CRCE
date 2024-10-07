import React, { useEffect, useState } from "react";
import "../Home.css";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

function Home() {
  // Moved ItemList inside Home for better structure
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchItems = async (query = "") => {
    const response = await fetch(
      `https://lost-found-crce.vercel.app/api/items/?search=${query}`
    );
    if (response.ok) {
      const data = await response.json();
      setItems(data);
    } else {
      console.error("Failed to fetch items");
    }
  };

  // Fetch all items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Function to handle the search
  const handleSearch = () => {
    fetchItems(searchQuery);
  };

  return (
    <div className="container">
      {" "}
      {/* Fixed spelling */}
      <div className="Navbar">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR38SIlZslB0msS8ormg2fc83g5xx4nTFpyrgdGgOHw_mAJ2Rec7a8Z6TVihbTP9iJ5n5Q&usqp=CAU"
          alt="crce-logo"
        />
        <h1>Lost and Found</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search an item"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <button onClick={() => navigate("/upload")}>Upload</button>
      </div>
      <div className="items">
        {items.map((item, index) => (
          <Card
            key={index}
            img={`https://lost-and-found-crce.vercel.app/${item.image}`}
            name={item.name}
            location={item.location}
            description={item.description}
            contact={item.contact}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
