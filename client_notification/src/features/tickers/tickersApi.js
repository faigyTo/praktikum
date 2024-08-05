import axios from "axios";

let baseUrl = "http://localhost:5000/api/tickers";

const getAllTickers = (page, perPage, column,val,type,start,end) => {
    return axios.get(`${baseUrl}?page=${page}&&perPage=${perPage}&&column=${column}&&val=${val}
    &&type=${type}&&start=${start}&&end=${end}`);
}

const getTickersCount=()=>{
    return axios.get(`${baseUrl}/count`);
}

export {getAllTickers,getTickersCount};

