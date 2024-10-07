import React from "react";
import "../Card.css";

function Card(prop) {
  return (
    <div className="card">
      <img src={prop.img} alt="item-img" />
      <p>
        <strong>Name:</strong> {prop.name}
      </p>
      <p>
        <strong>Location:</strong> {prop.location}
      </p>
      <p>
        <strong>Contact No:</strong> +{prop.contact}
      </p>
      <p>
        <strong>Item Description:</strong> {prop.description}
      </p>
    </div>
  );
}

export default Card;
