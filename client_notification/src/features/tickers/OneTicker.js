import React from 'react';
import { Button, TableCell, TableRow } from '@mui/material';




const OneTicker = ({ ticker,setShow ,setSymbol}) => {


    const showTicker = (symbol,date) => {
        setSymbol(symbol);
        setShow(true);
    }


    return (
             
            <TableRow hover sx={{ cursor: 'pointer' }}>
                <TableCell>{ticker.type}</TableCell>
                <TableCell align="right">{ticker.symbol}</TableCell>
                <TableCell align="right">{ticker.date}</TableCell>
                <TableCell align="right">{ticker.high}</TableCell>
                <TableCell align="right">{ticker.low}</TableCell>
                <TableCell align="right">{ticker.open}</TableCell>
                <TableCell align="right">{ticker.close}</TableCell>
                <TableCell align="right">{ticker.volume}</TableCell>
                <TableCell><Button 
                variant="contained" 
                color="primary" 
                size='small'
                onClick={() => { showTicker(ticker.symbol, ticker.date) }}
            >
                View Ticker
            </Button></TableCell>
            </TableRow>

    );
};

export default OneTicker;
