import React from "react";
import { Listing } from "../../types/listing";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({
  listing,
}: ListingCardProps): React.JSX.Element {
  return (
    <article className="listing-card">
      <img src={listing.image} alt={listing.title} />

      <div>
        <h3>{listing.title}</h3>
        <p>{listing.address}</p>

        <ul>
          <li>{listing.beds} letti</li>
          <li>{listing.baths} bagni</li>
          <li>{listing.size} m²</li>
        </ul>

        <strong>€ {listing.price.toLocaleString("it-IT")}</strong>
      </div>
    </article>
  );
}
