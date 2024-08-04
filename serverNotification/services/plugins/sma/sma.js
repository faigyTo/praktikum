import connectAndSave from '../../../adapters/saveNotifications/testConnection.js';
import calcSma from '../../pluginsFunctions/calcSma.js';

export default class sma {

	valueFunc = undefined;

	

	checkNotificationByUpOrDown(a, b, todayCandle, symbol, upOrDown, length,minimalDiffPrecents,funcName) {
		if (a > b && (a - b) / a > minimalDiffPrecents) {
			connectAndSave(`sma_${upOrDown}_${funcName}_${length}`,symbol,todayCandle.Date,todayCandle.High,todayCandle.Low,todayCandle.Open,todayCandle.Close,todayCandle.Volume);      
			return { type: `sma_${upOrDown}_${length}`, symbol, candle: todayCandle }
		}
		return { type: "sma", candle: undefined };
	}


	execute(symbol, data, params) {

		let { length, upOrDown, func,minimalDiffPrecents } = params;
		let funcName=func.split('.')[1];
		if (!this.valueFunc)
			this.valueFunc = eval('(' + func + ')');
		let todayCandle = data[length - 1];

		let todayValue = this.valueFunc(data[data.length - 1]);
		let obj = {
			up: (todayValue, todaySma, todayCandle, symbol, length,minimalDiffPrecents,funcName) => {
				return this.checkNotificationByUpOrDown(todayValue, todaySma, todayCandle, symbol, "up", length,minimalDiffPrecents,funcName);
			}, down: (todayValue, todaySma, todayCandle, symbol, length,minimalDiffPrecents,funcName) => {
				return this.checkNotificationByUpOrDown(todaySma, todayValue, todayCandle, symbol, "down", length,minimalDiffPrecents,funcName);
			}
		}
		if (data.length >= length) {
			let todaySma = calcSma(data, length, this.valueFunc);
			obj[upOrDown](todayValue, todaySma, todayCandle, symbol, length,minimalDiffPrecents,funcName);
		}
	}
}