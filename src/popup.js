import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import HistoryList from './components/HistoryList';
import Configuration from './components/Configuration';
import Search from './components/Search';
import { clearHistoryAPI } from './api/apiService';
import { clearCache, loadLocalCache } from './cache';

function App() {
	const [history, setHistory] = useState([]);
	const [searchResults, setSearchResults] = useState(null);

	useEffect(() => {
		loadLocalCache()
	}, [])


	useEffect(() => {
		chrome.runtime.sendMessage({ action: 'getHistory' }, (response) => {
			if (response) {
				setHistory(response.response)
			}
		});

	}, []);

	const handleSearch = (results) => {
		console.log('%c 🍛 results: ', 'font-size:12px;background-color: #B03734;color:#fff;', results);
		setSearchResults(results);
	};

	const handleClear = () => {
		return clearHistoryAPI().then(() => {
			clearCache()
		})
	}


	return (
		<>
			<h1>History</h1>
			<Configuration />
			<button onClick={handleClear}>Clear DB & cache</button>
			<Search onSearch={handleSearch} />
			<div className='divider' />
			<HistoryList history={history} searchResults={searchResults} />
		</>
	);
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
