import smaParamsJson from './sma.json' assert {'type': 'json'};

export default class sma {

	valueFunc = undefined;

	calcSma(data, length, func) {
		let dataEndSliceData = data.slice(-length);
		return dataEndSliceData.reduce((acc, elem) => acc + func(elem) / length, 0)
	}

	checkNotificationByUpOrDown(a,b){
		return (a>b&&(a-b)/a>smaParamsJson.minimalDiffPrecents);
	}

	execute(data, params) {
		// {length,upOrDown,symbol,func}

		let { length, upOrDown, func } = params;
		console.log(`--------------- sma_${upOrDown}_${length} --------------------`);
		if (!this.valueFunc)
			this.valueFunc = eval('(' + func + ')');
		let todayCandle = data[length - 1];
		let todaySma = this.calcSma(data, length, this.valueFunc);
		let todayValue = this.valueFunc(data[data.length - 1]);
		let obj = {
			up: (todayValue, todaySma, todayCandle) => {
				return this.checkNotificationByUpOrDown(todayValue,todaySma)?{ type: `sma_${upOrDown}_${length}`, candle: todayCandle }
				: { type: "sma", candle: undefined };
			}, down: (todayValue, todaySma, todayCandle) => {
				if (todaySma > todayValue && (todaySma - todayValue) / todaySma > smaParamsJson.minimalDiffPrecents)
					return { type: `sma_${upOrDown}_${length}`, candle: todayCandle };
				return { type: "sma", candle: undefined };
			}
		}
		console.log("today sma->", todaySma, "today value->", todayValue);
		return obj[upOrDown](todayValue, todaySma, todayCandle);
	}
}

