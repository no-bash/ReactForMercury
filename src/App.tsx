import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';

import {RootState} from './store';
import Search from './components/search';
import Alert from './components/alert';
import Weather from './components/weather';
import {setAlert} from './store/actions/alertActions';
import {SetError} from './store/actions/weatherActions';


const App: FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);
  const alertMessage = useSelector((state: RootState) => state.alert.message);


  return (
    <div className="App">
      <Search title="#меркури.погода"/>
      {loading ? <h2 className="asd">Loading</h2> : weatherData && <Weather data={weatherData}/>}

      {alertMessage && <Alert message={alertMessage} onClose={()=>dispatch(setAlert(''))}/>}
      {error && <Alert message={error} onClose={()=> dispatch(SetError())}  />}
    </div>
  );
}

export default App;
