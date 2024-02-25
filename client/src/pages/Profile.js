import config from "../config.json";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const token = "Bearer " + localStorage.getItem("token");

    if (!token) {
      // Redirect to login page if token is not present
      navigate("/login");
      return;
    }

    fetchProfile(token);
  }, []);

  const fetchProfile = async (token) => {
    try {
      const apiUrl = `${config.API_URL}/api/me`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await response.json();
      if (data.success) {
        // If success, set profile data
        setProfileData(data.data);
      } else {
        // If success is false, redirect to login page
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Handle error if needed
    }
  };

  return (
    <div>
      {profileData ? (
        <div>
          <h2>Profile Details</h2>
          <p>First Name: {profileData.firstname}</p>
          <p>Last Name: {profileData.lastname}</p>
          <p>Email/username: {profileData.username}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
