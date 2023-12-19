import "../index.css"
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import { Header } from "./components/Header";
import { CountUpTimer } from "./components/CountUpTimer";
import { Logs } from "./components/Logs";

const components = {
  countup: CountUpTimer,
  logs: Logs,
};

function Popup() {
	const [mode, setMode] = useState('countup');

	const ActiveComponent = components[mode];

	return (
		<div className="App flex flex-col items-center justify-center" style={{ height: 250, width: 320 }}>
			<Header mode={mode} setMode={setMode} />
			<ActiveComponent />
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
);
