import { Router } from "express";
import { getAllTickers } from "../controllers/tickers.js";

const tickerRouter=Router();

tickerRouter.get("/",getAllTickers);

export default tickerRouter;