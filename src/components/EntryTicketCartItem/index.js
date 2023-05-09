import React from "react";
import "./style.css";

const EntryTicketCartItem = ({ entryTicketItem }) => {
  const { group, name, price, quantity } = entryTicketItem;

  return (
    <li className="entry-ticket-cart-item">
      <div className="entry-ticket-cart-item-container">
        <img src={require("./../../assets/voa-logo.png")} alt="Entry Ticket" />
        <div>
          <h3>{name}</h3>
          <p>Price per item: ${price}</p>
          <p>Quantity: {quantity}</p>
          {group && (
            <div>
              <p>Group:</p>
              <ul>
                {group.children.map((child) => (
                  <li key={child.visitor_id}>{child.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default EntryTicketCartItem;