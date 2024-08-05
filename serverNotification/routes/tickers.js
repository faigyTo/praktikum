import { Router } from "express";
import { getAllTickers, getTickersCount } from "../controllers/tickers.js";

const tickerRouter=Router();

tickerRouter.get("/",getAllTickers);
tickerRouter.get("/count",getTickersCount);

export default tickerRouter;