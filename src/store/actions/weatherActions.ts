import {ThunkAction} from 'redux-thunk';
import {RootState} from '..';
import {WeatherAction, WeatherData, WeatherError, GET_WEATHER, SET_LOADING, SET_ERROR, WeatherState} from '../types';


export const getWeather = (lat: String, lon: String): ThunkAction<void, RootState, null, WeatherAction> => {
    console.log(lat, lon);
    return async dispatch =>{
        try{
            const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=abe80b26546e92c691b1a5ebbe2d48fb`);
            //const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${lat}&appid=${process.env.REACT_APP_API_KEY}`);

            if(!res.ok){
                const resData: WeatherError = await res.json();
                throw new Error(resData.message);
            }

            const resData: WeatherData = await res.json();
            console.log(resData);
            dispatch({
                type: GET_WEATHER,
                payload: resData
            });
        }catch(err){
            dispatch({
                type: SET_ERROR,
                payload: err.message
            });
        }
    }
}

export const setLoading = (): WeatherAction =>{
    return{
        type:SET_LOADING
    }
}

export const SetError = (): WeatherAction =>{
    return{
        type: SET_ERROR,
        payload: ''
    }
}