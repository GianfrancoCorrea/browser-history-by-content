import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import HistoryList from './components/HistoryList';
import Configuration from './components/Configuration';
import Search from './components/Search';

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
			<Search />
			<div className='divider' />
			<HistoryList history={history} />
		</>
	);
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
