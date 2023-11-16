"use client";
import React, { useState, useEffect } from "react";
import { Register } from "../Register";

const WebSocketComponent = () => {
  const [websocket, setWs] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket("ws://localhost:4040");

    // Set the WebSocket instance in the state
    setWs(ws);

    // Cleanup function when the component unmounts
    return () => {
      ws.close();
    };
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  // Rest of your WebSocketComponent logic

  return <div>WebSocket Component</div>;
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: "" };
  }

  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });

    // WebSocket Connection
  }

  render() {
    if (!this.state.userData) {
      // If userData is null or undefined, return some placeholder content or loading indicator
      return <div>Please login</div>;
    }

    return (
      <div className="flex h-100">
        <div className="bg-[#6158FF] w-1/4 h-screen">contacts</div>
        <div className="flex flex-col bg-[#ffffff] w-3/4 h-screen p-2">
          <div className="flex-grow">messages</div>
          <div className="flex mx-2">
            <input
              type="text"
              className="bg-[#ECEAEB] p-2 flex-grow rounded-md"
              placeholder="Type here"
            />
            <button className="p-2 bg-[#473DFF text-white]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <WebSocketComponent />
      </div>
    );
  }
}

export default Home;
