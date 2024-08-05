import selectNotificationsFromDB from "../adapters/selectNotification/testSelectFromDB.js"

export const getAllTickers = async (req, res) => {
	let { column,val,type,start,end } = req.query;
	let perPage = req.query.perPage || 15;
	let page = req.query.page||1;


	try {
		let data = [];
		if(column!=""&&val!=""&&type!=""&&start!=0&&end!=0){
			data=await selectNotificationsFromDB({column,val,type,start,end});
		}
		else if (column!=""&&val!="") {
			data = await selectNotificationsFromDB({column,val});
		}
		else if(type!=""&&start!=0&&end!=0){
			data=await selectNotificationsFromDB({type,start,end})
		}		
		else {
			data=await selectNotificationsFromDB({});
		}
		data=data.slice((page-1)*perPage,((page-1)*perPage)+perPage);
		res.json(data);
	}
	catch (err) {
		res.status(500).json(err);
	}
}

export const getTickersCount=async(req,res)=>{
	try{
		let data=await selectNotificationsFromDB({});
		let count=data.length;
		return res.json({count});
	}
	catch(err){

	}
}


