import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import TradingViewWidget from 'react-tradingview-widget';
import './ticker.css';

import {
    FormControlLabel, Switch, Paper, Box, Table, TableBody, TableContainer, TableCell, TableHead,
    TablePagination, TableRow, TableSortLabel, Typography,
    TextField, Slider, Button, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import OneTicker from './OneTicker';
import { getAllTickers,getTickersCount } from './tickersApi';


function createData(id, type, symbol, date, high, low, open, close, volume, view) {
    return {
        type,
        symbol,
        date,
        high,
        low,
        open,
        close,
        volume,
        view
    };
}





// פה אמורה להיות פונקציה ליבוא הנתונים מהשרת.
// const rows = [
//     createData(88, 'sma_up_Close_10', 'AACG', '2023-01-16', 1.45, 1.38, 1.38, 1.38, 1800),
//     createData(89, 'sma_up_Close_20', 'AACI', '2023-01-30', 11, 10.02, 10.7, 10.02, 127000),
//     createData(90, 'sma_up_Volume_50', 'AACI', '2023-03-14', 10.04, 10.04, 10.04, 10.04, 0),
//     createData(91, 'sma_up_Close_20', 'AACG', '2023-01-30', 1.48, 1.43, 1.48, 1.44, 21600),
//     createData(92, 'sma_up_Close_10', 'AACI', '2023-01-16', 10.18, 10.17, 10.18, 10.17, 1300),
//     createData(93, 'sma_up_Volume_50', 'AACG', '2023-03-14', 1.99, 1.8, 1.8, 1.99, 24000),
//     createData(94, 'sma_up_Close_10', 'AACT', '2023-06-26', 10.16, 10.14, 10.14, 10.15, 225200),
//     createData(95, 'sma_up_Close_20', 'AACT', '2023-07-11', 10.16, 10.16, 10.16, 10.16, 0),
//     createData(96, 'sma_up_Volume_50', 'AACT', '2023-08-22', 10.24, 10.2, 10.24, 10.2, 54200),
//     createData(97, 'sma_up_Volume_50', 'AACIU', '2023-03-14', 10, 10, 10, 10, 0),
//     createData(98, 'sma_up_Close_10', 'AACIU', '2023-01-16', 10.13, 10.13, 10.13, 10.13, 0),
//     createData(99, 'sma_up_Close_20', 'AACIU', '2023-01-30', 10.45, 10.45, 10.45, 10.45, 0),
//     createData(100, 'sma_up_Close_20', 'AADI', '2023-01-30', 12.74, 12.41, 12.7, 12.62, 50300),
//     createData(101, 'sma_up_Close_10', 'AADI', '2023-01-16', 13.28, 12.84, 13, 12.96, 63800),
//     createData(102, 'sma_down_Close_10', 'AAGR', '2023-01-16', 7.261649, 7.175627, 7.232975, 7.189964, 336335),
//     createData(103, 'sma_down_Close_20', 'AAGR', '2023-01-30', 7.200717, 7.197133, 7.197133, 7.200717, 1814),
//     createData(104, 'sma_down_Close_20', 'AAIN', '2023-01-30', 23.370001, 23.209999, 23.370001, 23.35, 1600),
//     createData(105, 'sma_down_Close_10', 'AAIN', '2023-01-16', 23.48, 23, 23.48, 23.02, 1300),
//     createData(106, 'sma_down_Close_50', 'AAIN', '2023-03-14', 23.056, 22.016001, 23, 22.5, 7400),
//     createData(107, 'sma_down_Close_50', 'AADI', '2023-03-14', 8.86, 7.72, 8.2, 8.02, 157700),
//     createData(108, 'sma_down_Close_50', 'AAGR', '2023-03-14', 7.247312, 7.247312, 7.247312, 7.247312, 52592),
//     createData(109, 'sma_down_Close_10', 'AA', '2023-01-16', 55.490002, 54.060001, 54.610001, 54.860001, 5288200),
//     createData(110, 'sma_up_Close_10', 'A', '2023-01-16', 158.110001, 155.029999, 156.679993, 155.399994, 1602200),
//     createData(111, 'sma_up_Close_20', 'A', '2023-01-30', 153.460007, 150.210007, 151.610001, 152.080002, 1995400),
//     createData(112, 'sma_up_Volume_50', 'A', '2023-03-14', 135.929993, 132.199997, 135.929993, 134.029999, 2016700),
//     createData(113, 'sma_down_Close_50', 'AA', '2023-03-14', 42.470001, 38.849998, 42.330002, 39.77, 9434500),
// ];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
    },
    {
        id: 'symbol',
        numeric: true,
        disablePadding: false,
        label: 'Symbol',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'high',
        numeric: true,
        disablePadding: false,
        label: 'High',
    },
    {
        id: 'low',
        numeric: true,
        disablePadding: false,
        label: 'Low',
    },
    {
        id: 'open',
        numeric: true,
        disablePadding: false,
        label: 'Open',
    },
    {
        id: 'close',
        numeric: true,
        disablePadding: false,
        label: 'Close',
    },
    {
        id: 'volume',
        numeric: true,
        disablePadding: false,
        label: 'Volume',
    },
    {
        id: 'view',
        numeric: true,
        disablePadding: false,
        label: 'View',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}

                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ fontWeight: 'bold', padding: '8px', width: headCell.id === 'type' ? '100px' : null }}


                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};




const AllTickers = () => {
    let [tickersArr, setTickersArr] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('symbol');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    let [show, setShow] = React.useState(false);
    let [symbol, setSymbol] = React.useState('');
    let [RangeColumn, setRangeColumn] = React.useState('');
    let [flag, setFlag] = React.useState(false);
    const [rows,setRows] = React.useState([]);
    let [len,setLen]=React.useState(0);

    let [selectedColumn, setSelectedColumn] = React.useState('');
    let [searchText, setSearchText] = React.useState('');
    let [priceRange, setPriceRange] = React.useState([0, 0]); // Adjust min and max as needed

    const handleColumnChange = (event) => {
        setSelectedColumn(event.target.value);
    };

    const handleColumnRangeChange = (event) => {
        setRangeColumn(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        console.log(event.target.value);
    };

    const handlePriceRangeChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleCloseChart = () => {
        setShow(false);
    };


    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage,flag],
    );



    const insertDataToTable = (tickersArr) => {
        tickersArr.forEach((item) => {
            rows.push(createData(item.NotificationCode, item.Type, item.Symbol, item.Date, item.High, item.Low, item.Open, item.Close, item.Volume));
        })
    }

    React.useEffect(() => {
        getAllTickers(page + 1, rowsPerPage, selectedColumn, searchText, RangeColumn, priceRange[0], priceRange[1]).
            then(res => {
                setTickersArr(res.data);
                // setRows(res.data.map((item)=>{
                //     createData(item.NotificationCode, item.Type, item.Symbol, item.Date, item.High, item.Low, item.Open, item.Close, item.Volume);                
                // })); 
                insertDataToTable(res.data);
                console.log(rows);              
                setFlag(false);
            }).
            catch(err => {
                console.log(err);
            })
    }, [flag])

    React.useEffect(()=>{
        getTickersCount().then(res=>{
            setLen(res.data.count);
        }).catch(err=>{
            console.log(err);
        })

        getAllTickers(page+1,rowsPerPage).then(res=>{
            setTickersArr(res.data);
            insertDataToTable(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },[])

    return (
        <>
            <div className="trading-view-container">
                {!show && (<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2, justifyContent: 'center' }}>
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel id="select-column-label">Column</InputLabel>
                        <Select
                            labelId="select-column-label"
                            id="select-column"
                            value={selectedColumn}
                            onChange={handleColumnChange}
                            label="Column"
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="type">Type</MenuItem>
                            <MenuItem value="symbol">Symbol</MenuItem>
                            <MenuItem value="date">Date</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="open">Open</MenuItem>
                            <MenuItem value="close">Close</MenuItem>
                            <MenuItem value="volume">Volume</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        id="search-field"
                        label="Search"
                        variant="outlined"
                        value={searchText}
                        onChange={handleSearchChange}
                        sx={{ minWidth: 120 }}
                    />


                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel id="select-column-label">Range Column</InputLabel>
                        <Select
                            labelId="select-RangeColumn-label"
                            id="select-RangeColumn"
                            value={RangeColumn}
                            onChange={handleColumnRangeChange}
                            label="RangeColumn"
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="open">Open</MenuItem>
                            <MenuItem value="close">Close</MenuItem>
                            <MenuItem value="volume">Volume</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 200 }}>
                        <Typography id="price-slider" gutterBottom>
                            Range
                        </Typography>
                        <Slider
                            value={priceRange}
                            onChange={handlePriceRangeChange}
                            valueLabelDisplay="auto"
                            min={0} // Change this to your actual min value
                            max={4000} // Change this to your actual max value
                        />
                    </FormControl>

                    <Button variant="contained" color="primary" onClick={() => { setFlag(true); console.log("hello!!!"); }}>
                        Search
                    </Button>
                </Box>)}

                {!show && (<Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '90%', mb: 2, mx: 'auto', padding: '16px' }}>
                        <TableContainer>
                            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {visibleRows.map((row, index) => (
                                        <OneTicker key={row.id} ticker={row} setShow={setShow} setSymbol={setSymbol} />
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={len}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                    <FormControlLabel
                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                        label="Dense padding"
                    />
                </Box>)}
                {show && (
                    <div className="trading-view-widget">
                        <button className="close-button" onClick={handleCloseChart}>✖</button>
                        <TradingViewWidget
                            symbol={symbol}
                            theme="Light"
                            autosize
                            interval="D"
                            timezone="Etc/UTC"
                            style="1"
                            locale="en"
                            toolbar_bg="#f1f3f6"
                            enable_publishing={false}
                            allow_symbol_change={true}
                            container_id="tradingview_chart"
                        // range={range}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default AllTickers;
