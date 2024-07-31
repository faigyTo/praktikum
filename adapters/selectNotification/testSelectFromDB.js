import config from "../config.json" assert {"type": "json"};

async function importAdapter(adapterPath) {
	return await import(adapterPath);
}


export default async function selectNotificationsFromDB(query) {
	const adapterModule = await importAdapter(config.selectFromDB.adapter);
	const IConnection = adapterModule.default;
	const connection = new IConnection(config.selectFromDB.connectionString);
	let data=await connection.selectNotification(query);
	return data;
}