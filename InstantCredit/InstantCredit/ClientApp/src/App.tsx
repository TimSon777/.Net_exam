import * as React from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {Counter} from './components/Counter';
import './custom.css'
import {CreditCalculation} from "./components/CreditCalculation/CreditCalculation";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from '@mui/x-date-pickers';
import ru from "date-fns/locale/ru";

export function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
            <Layout>
                <Route exact path='/' component={Home}/>
                <Route path='/counter' component={Counter}/>
                <Route path='/credit/calculate' component={CreditCalculation}/>
            </Layout>
        </LocalizationProvider>
    )
}