export default function calcSma(data, length, func) {
	let EndSliceData = data.slice(-length);
	return EndSliceData.reduce((acc, elem) => acc + func(elem) / length, 0)
}