import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Component from './Component';
import Configuration from './Configuration';

function App() {
	const [history, setHistory] = useState([]);

	useEffect(() => {
		// connect with background.js
		chrome.runtime.connect({ name: "popup" });
		chrome.runtime.sendMessage({ message: "Hola desde el popup", action: 'test' }, (response) => {
			if (response) {
				console.log(response.response)
				setHistory(response.response)
			}
		});

	}, []);

	return (
		<>
			<h1>History</h1>
			<Configuration />
			<input type="text" placeholder='Search' />
			<div className='divider' />
			<Component history={history} />
		</>
	);
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
