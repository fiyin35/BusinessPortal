import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import AppRoutes from "./routes"
import { history } from "./shared/_helpers/history";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    // <BrowserRouter>
    <HistoryRouter history={history}>
        <AppRoutes/>
        </HistoryRouter>
    // </BrowserRouter>
  );
}

export default App;
