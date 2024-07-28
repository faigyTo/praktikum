import smaParamsJson from './sma.json' assert {'type': 'json'};
// import { connectToDB } from '../../../config/DBConfig.js';
// import saveNotifactionInDB from '../../../controllers/saveNotificationsInDB.js';

export default class sma {

	valueFunc = undefined;

	calcSma(data, length, func) {

		let EndSliceData = data.slice(-length);
		return EndSliceData.reduce((acc, elem) => acc + func(elem) / length, 0)
	}

	checkNotificationByUpOrDown(a, b, todayCandle, upOrDown, length) {
		console.log('---xxxx', todayCandle)
		if (a > b && (a - b) / a > smaParamsJson.minimalDiffPrecents) {
			//saveNotificationInDB(`sma_${upOrDown}_${length}`,todayCandle.Symbol,todayCandle.Date,todayCandle.High,todayCandle.Low,todayCandle.Open,todayCandle.Close,todayCandle.Volume);            return { type: `sma_${upOrDown}_${length}`, candle: todayCandle }}
			return { type: `sma_${upOrDown}_${length}`, candle: todayCandle }
		}
		return { type: "sma", candle: undefined };
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
			up: (todayValue, todaySma, todayCandle, length) => {
				return this.checkNotificationByUpOrDown(todayValue, todaySma, todayCandle, "up", length);
			}, down: (todayValue, todaySma, todayCandle, length) => {
				return this.checkNotificationByUpOrDown(todaySma, todayValue, todayCandle, "down", length);
			}
		}
		console.log("today sma->", todaySma, "today value->", todayValue);
		return obj[upOrDown](todayValue, todaySma, todayCandle, length);
	}
}