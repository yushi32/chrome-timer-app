import "../index.css"
import React from "react";
import ReactDOM from "react-dom/client";

import { CountUpTimer } from "./components/CountUpTimer";

function Popup() {
	return (
		<div className="App flex items-center justify-center" style={{ height: 150, width: 300 }}>
			<CountUpTimer />
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
);
