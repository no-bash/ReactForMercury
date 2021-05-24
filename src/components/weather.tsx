import React, { FC } from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,  } from 'swiper';
import { WeatherData } from "../store/types";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/components/navigation/navigation.scss';
import "swiper/swiper.scss";
import { info } from "console";

interface WeatherProps {
  data: WeatherData;
}

const Weather: FC<WeatherProps> = ({ data }) => {

  // data.daily.forEach(function(index, info){
  //   console.log((data.daily[info].temp.day- 273.15).toFixed(0));
  // });

  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  let res = "";
  let day = 0;
  data.daily.forEach(function(index, info){
    const celsius = (data.daily[info].temp.day - 273.15).toFixed(0);
    const feelsLikeCelsius = (data.daily[info].feels_like.day - 273.15).toFixed(0);
    let date = new Date();
    date.setDate(date.getDate() + day);
    console.log(date);
    res = res +
      `<div class="hero__card">
        <div class="hero__card-info">
          <p class="hero__card-info--date">${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}</p>
          <p class="hero__card-info--temp">${celsius}°</p>
          <p class="feels-like">
            ощущается как ${feelsLikeCelsius}°
          </p>
        </div>
        <div class="hero__card-icon">
          <img
            src="http://openweathermap.org/img/wn/${data.daily[info].weather[0].icon}.png" alt="" />
        </div>
      </div>`;
      day++;
  })
  return (
    <main className="main">
      <div className="header">
        <span className="header__logo">Mercury academy</span>
        <a className="header__link" href="/">
          github.com/no-bash
        </a>
      </div>
      <section className="hero">
        <h2 className="hero__title">{data.name} Прогноз по 3 дня</h2>
      
          <Swiper 
            spaceBetween={50}
            slidesPerView={1}
            navigation
            
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            
            <SwiperSlide className="hero__cards" dangerouslySetInnerHTML={{__html: res}}>
            </SwiperSlide>
          
            


            
          </Swiper>
        
      </section>
      <h2 className="hero__title">Посмотрите погоду на день </h2>
      <div className="input-block">
        <select className="select">
          <option>Введите название города</option>
          <option>Самара</option>
          <option>Казань</option>
          <option>Тольчтти</option>
        </select>
        <input type="date" placeholder="Выберите дату" className="input-date" />
      </div>
      <div className="hero__card hero__card-orange">
        <div className="hero__card-info">
          <p className="hero__card-info--date">16.05.2021</p>
          <p className="hero__card-info--temp">31°</p>
          <p className="feels-like">ощущается как 31°</p>
        </div>
        <div className="hero__card-icon">
          <img
            src={`http://openweathermap.org/img/wn/.png`}
            alt=""
          />
        </div>
      </div>
    </main>
  );
};

export default Weather;
