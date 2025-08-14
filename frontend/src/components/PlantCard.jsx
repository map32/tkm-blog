import React from 'react';

export default function PlantCard({ plant, index }) {
  // Attempt to load the first image based on ID
  const imageSrc = `/plants/${plant.id}_${index}.jpg`;

  return (
    <div className="card">
        <img
          src={imageSrc}
          alt={plant.name}
          onError={(e) => (e.target.style.display = "none")}
        />
        <h3>{plant.name}</h3>
        <p>{plant.name_latin}</p>
    </div>
  );
}