import "../index.css"
import React, { useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom/client";

function Popup() {
	return (
		<div className="App" style={{ height: 300, width: 300 }}>
      hello
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
);
