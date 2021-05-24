import React, {FC, FormEvent, useState} from 'react';
import { useDispatch} from 'react-redux';
import { getEffectiveTypeRoots } from 'typescript';

import {setAlert} from '../store/actions/alertActions';
import {getWeather, setLoading } from '../store/actions/weatherActions';


interface SearchProps{
    title: string;
}


const Search: FC<SearchProps> = ({title}) => {
    const citys = [
        {
            name: "Samara",
            lat: "53.241505",
            lon: "50.221245"
        },
        {
            name: "Saratov",
            lat: "51.533557",
            lon: "46.034257"
        },
        {
            name: "Tolyatti",
            lat: "53.507836",
            lon: "49.420393"
        },
        {
            name: "Kazan",
            lat: "55.796127",
            lon: "49.106405"
        },
        {
            name: "Krasnodar",
            lat: "45.035470",
            lon: "38.975313"
        },
        
    ];

    var citysMap = new Map();
    
    Object.keys(citys).map(function(key, index) {
        citysMap.set(citys[index].name, citys[index]);
      });

    const dispatch = useDispatch();

    let [city2, setCity2] = useState('');

    const submitHandler = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(city2.trim() ===''){
            return dispatch(setAlert('Fill in all the fields and the weather will be displayed.'));
        }
        dispatch(setLoading());
        dispatch(getWeather(citys[parseInt(city2)].lat, citys[parseInt(city2)].lon));
    }
    const setCitySelect = function(event: React.ChangeEvent<{ value: unknown }>){
        setCity2(event.target.value as string);
    }
    
    return(
        <div className="left-block">
            <div className="hero__input-block">
                <h1 className="input-block__title">{title}</h1>
                <form onSubmit={submitHandler}>
                <select 
                    className="select"
                    onChange={setCitySelect}
                >
                    <option value="">Не выбранно </option>
                   {Object.keys(citys).map(function(key, index) {
                        return (
                            <option value={index}>{citys[index].name}</option>
                        );
                    })}

                </select>
                <button className="btn">
                    Select 
                </button>
                </form>
            </div>
        </div>
    );
}

export default Search;