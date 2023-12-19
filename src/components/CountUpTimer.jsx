import React, { useState, useEffect, useRef } from "react";

export function CountUpTimer() {
	const [timer, setTimer] = useState('00:00:00');
	const [isRunning, setIsRunning] = useState(false);

	const intervalId = useRef(null); // useRefを使ってintervalIdを管理

	const handleClickStart = () => {
		setIsRunning(true);
		chrome.runtime.sendMessage({ type: 'start' }, (res) => {
			intervalId.current = setInterval(updateTimer, 1000); // intervalId.currentにセット
		});
	};

	const handleClickStop = () => {
		chrome.runtime.sendMessage({ type: 'stop' }, () => {
			if (intervalId.current) clearInterval(intervalId.current); // intervalId.currentをclearIntervalに渡す
			setIsRunning(false);
		});
	};

	const handleClickFinish = () => {
		chrome.runtime.sendMessage({ type: 'finish'}, () => {
			if (intervalId.current) clearInterval(intervalId.current); // 同じくintervalId.currentをclearIntervalに渡す
			setIsRunning(false);
		});
	};

	const updateTimer = () => {
		chrome.runtime.sendMessage({ type: 'update'}, (res) => {
			setTimer(res);
		});
	};

	useEffect(() => {
		chrome.runtime.sendMessage({ type: 'init' }, (res) => {
			setTimer(res.display);
			if (res.isRunning) {
				intervalId.current = setInterval(updateTimer, 1000);
				setIsRunning(true);
			}
		});
	}, []);

	return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-lg text-center">{timer}</div>
      <div className="flex justify-center absolute bottom-0 mb-2 space-x-4">
        <button onClick={handleClickStart} disabled={isRunning} className={`w-12 p-2 ${isRunning ? 'bg-gray-400' : 'bg-blue-400 hover:bg-blue-200'}`}>start</button>
        <button onClick={handleClickStop} disabled={!isRunning} className={`w-12 p-2 ${isRunning ? 'bg-green-400 hover:bg-green-200' : 'bg-gray-400'}`}>stop</button>
        <button onClick={handleClickFinish} className="w-12 p-2 bg-red-400 hover:bg-red-200">finish</button>
      </div>
    </div>
	);
}