import React from "react";
import { listings } from "../../data/listings.mock.tsx";
import ListingCard from "./ListingCard.tsx";

export default function ListingsSection(): React.JSX.Element {
  return (
    <section>
      <h2>Nuovi annunci</h2>

      <div className="listings-grid">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}
