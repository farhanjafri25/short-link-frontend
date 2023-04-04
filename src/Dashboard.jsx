import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LinkForm.css";
import { useCallback } from "react";

function Dashboard() {
  const [link, setLink] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [linkAnalytics, setLinkAnalytics] = useState([]);

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleAddLink = useCallback(async () => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(
      `http://localhost:3002/link/add-link`,
      {
        url: link,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    if (response.data.message === "Success") {
      alert("Link Added Succesfully");
    } else {
      alert(`${response.data.message}`);
    }
  }, [link]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  const handleGetLinkAnalytics = async () => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get(`http://localhost:3002/link/analytics`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(`link analytics response`, response.data.data.docs);
    const data = response.data.data.docs;
    if (data.length === 0) {
      alert("You dont have any link history");
    } else {
      setLinkAnalytics(data);
      setShowAnalytics(true);
    }
  };

  const handleCloseAnalytics = () => {
    setShowAnalytics(false);
  };

  const handleGetUserLink = useCallback(async () => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get(`http://localhost:3002/link/user/link`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(`users link response`, response.data);
    const link = response?.data?.data?.url;
    if (link) {
      await navigator.clipboard.writeText(link);
      alert(`Link Copied to clipboard ${link}`);
    } else {
      alert(`You don't have any links generated yet.`);
    }
  }, []);

  return (
    <div className="link-form">
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h3>Get Or Generate a Link </h3>
      <input
        minLength={5}
        required
        className="linkTextBox"
        value={link}
        onChange={handleLinkChange}
        placeholder="Type a link to Add"
      />
      <div className="button-container">
        <button onClick={handleAddLink}>Add New Link</button>
        <button onClick={handleGetUserLink}>Copy Generated Link</button>
        <button onClick={handleGetLinkAnalytics}>Get Analytics</button>
        {showAnalytics && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseAnalytics}>
                &times;
              </span>
              <h2>Analytics</h2>
              <ul>
                {linkAnalytics.map((link) => (
                  <li key={link?.id}>
                    <p>Link: {link?.url}</p>
                    <p>Link Code: {link?.shortCode}</p>
                    <p>Is Active: {link?.isActive ? "true" : "false"}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
