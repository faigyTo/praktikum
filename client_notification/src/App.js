import './App.css';
import NavBar from './features/navBar/NavBar';
import AllTickers from './features/tickers/AllTickers';
 import { red, grey,green } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";


const nightStyle = createTheme({
  palette: {
    primary: {
      // light: red[50],
      main: green[300],
      // dark: red[900],
      contrastText: '#000',
    },
    secondary: {
      light: grey[900],
      main: grey[800],
      dark: grey[900],
      contrastText: '#000',
    },
    background: {
      // default: orange[50],
      // paper: orange[50]
    }
  }
});


function App() {
  return (<div>

    <ThemeProvider theme={nightStyle}>
      <CssBaseline />
      <NavBar />
      <AllTickers />
    </ThemeProvider >
  </div>
  );
}

export default App;
