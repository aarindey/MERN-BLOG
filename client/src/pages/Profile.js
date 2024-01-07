// Profile.js
import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-header">
          <h2 className="text-center">User Profile</h2>
        </div>
        <div className="card-body text-center">
          {user ? (
            <div>
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: "100px", height: "100px" }}
              />
              <h4 className="card-title">{user.name}</h4>
              <p className="card-text">Email: {user.email}</p>
              {/* Add other fields as needed */}
            </div>
          ) : (
            <p className="card-text">
              No user information available. Please log in.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
