// Create.js
import React from "react";
import CreatePostForm from "../components/CreatePostForm";
import axios from "axios";
import config from "../config.json";

const Create = () => {
  const handlePost = async (postData, headers) => {
    // Use the API URL directly from config.json
    const apiUrl = `${config.API_URL}/api/posts`;

    // Send the post data to the server
    try {
      const response = await axios.post(apiUrl, postData, headers);
      console.log("Post successful:", response.data);
    } catch (error) {
      console.log("Error while creatin blog ", error);
      throw error;
    }
  };

  return (
    <div>
      <CreatePostForm onPost={handlePost} />
    </div>
  );
};

export default Create;
