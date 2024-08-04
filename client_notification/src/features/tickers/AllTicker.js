import React, { useState } from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import './ticker.css';

function TradingViewComponent() {
	const [showChart, setShowChart] = useState(false);
	const [symbol, setSymbol] = useState('NASDAQ:AAPL');

	const handleButtonClick = () => {
		// כאן תוכלי להוסיף לוגיקה נוספת אם נדרש
		setShowChart(true);
	};

	const handleCloseChart = () => {
		setShowChart(false);
	};

	return (
		<div className="trading-view-container">	
			{!showChart && (
				<button onClick={handleButtonClick}>הצג נתונים</button>
			)}
			{showChart && (
				<div className="trading-view-widget">
					<button className="close-button" onClick={handleCloseChart}>✖</button>
					<TradingViewWidget
						symbol={symbol}
						theme="Light"
						autosize
						interval="D"
						timezone="Etc/UTC"
						style="1"
						locale="en"
						toolbar_bg="#f1f3f6"
						enable_publishing={false}
						allow_symbol_change={true}
						container_id="tradingview_chart"
					/>
				</div>
			)}
		</div>
	);
}

export default TradingViewComponent;