import smaParamsJson from './sma.json' assert {'type': 'json'};

export default class sma {
	calcSma(data, length, func) {
		let dataEndSliceData = data.slice(-length);
		return dataEndSliceData.reduce((acc, elem) => acc + func(elem) / length, 0)
	}
	execute(data, params) {
		// {length,upOrDown,symbol,func}
		let { length, upOrDown, func } = params;
		console.log(`--------------- sma_${upOrDown}_${length} --------------------`);
		let funcConverted = eval('(' + func + ')');
		let todayCandle = data[length - 1];
		let todaySma = this.calcSma(data, length, funcConverted);
		let todayValue = funcConverted(data[data.length - 1]);
		console.log("today sma->", todaySma, "today value->", todayValue);
		if (upOrDown == "up" && todayValue > todaySma && (todayValue - todaySma) / todayValue > smaParamsJson.minimalDiffPrecents) {
			console.log("find", { type: `sma_${upOrDown}_${length}`, value: todayValue, volume: todayCandle.Volume });
			return { type: `sma_${upOrDown}_${length}`, value: todayValue, volume: todayCandle.Volume };
		}
		else if (upOrDown == "down" && todaySma > todayValue && (todaySma - todayValue) / todaySma > smaParamsJson.minimalDiffPrecents) {
			console.log("find", { type: `sma_${upOrDown}_${length}`, value: todayValue, volume: todayCandle.Volume });
			return { type: `sma_${upOrDown}_${length}`, value: todayValue, volume: todayCandle.Volume };
		}
		else {
			console.log("not find", { type: undefined });
			return { type: undefined };
		}
	}
}

