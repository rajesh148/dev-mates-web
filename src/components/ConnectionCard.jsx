import React from "react";

const ConnectionCard = ({ connection }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } =
    connection;
  return (
    <div className="flex justify-center">
      <div className="card card-side w-1/2 bg-base-300 shadow-xl my-4">
        <figure>
          <img className="w-48" src={photoUrl} alt="User icon" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
