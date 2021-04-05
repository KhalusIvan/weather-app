import React, { useState, useEffect } from 'react';
import { LeftBar } from './components/LeftBar';
import { RightBar } from './components/RightBar';
import { Search } from './components/Search';
import './style/style.css'

function App() {
  let [info, setInfo] = useState({})
  let [isLoad, setIsLoad] = useState(false)
  const days = { "0": "Вс", "1": "Пн", "2": "Вт", "3": "Ср", "4": "Чт", "5": "Пт", "6": "Сб" }
  const months = { "0": "янв", "1": "фер", "2": "мар", "3": "апр", "4": "май", "5": "июн", "6": "июл", "7": "авг", "8": "сен", "9": "окт", "10": "ноя", "11": "дек" }
  const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];

  useEffect(() => {
    let lastCity = localStorage.getItem('searchHistory') === null ? localStorage.getItem('searchHistory') : localStorage.getItem('searchHistory').split(",")[0]
    getSearch(lastCity)
  }, [])

  function closeSearch() {
    document.getElementById('search').style.left = '-100%';
  }

  function windDirection(deg) {
    if (deg > 337.5 || deg <= 22.5) {
      return directions[0]
    } else if (deg > 22.5 && deg <= 67.5) {
      return directions[1]
    } else if (deg > 67.5 && deg <= 112.5) {
      return directions[2]
    } else if (deg > 112.5 && deg <= 157.5) {
      return directions[3]
    } else if (deg > 157.5 && deg <= 202.5) {
      return directions[4]
    } else if (deg > 202.5 && deg <= 247.5) {
      return directions[5]
    } else if (deg > 247.5 && deg <= 292.5) {
      return directions[6]
    } else if (deg > 292.5 && deg <= 337.5) {
      return directions[7]
    }
  }

  async function getSearch(city) {
    if (city === null)
      city = 'Москва'
    if (window.innerWidth < 1400)
      document.getElementById('find__city').style.marginTop = "50px";
    else
      document.getElementById('search__history').style.marginTop = "60px";
    
    document.getElementById('alert__city').innerHTML = '<div class="lds-ellipsis lds-ellipsis-search"><div></div><div></div><div></div><div></div></div>';
    let responseCity = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${city}&format=json&addressdetails=1&limit=1`);
    let resultCity = await responseCity.json();
    if (resultCity.length === 0) {
      document.getElementById('alert__city').innerHTML = "Упс! Город не найден, попробуйте другой";
      return 0
    }
    setIsLoad(true)
    document.getElementById('alert__city').innerHTML = "";
    closeSearch()
    document.getElementById('find__city').style.removeProperty("margin-top");
    document.getElementById('search__history').style.removeProperty("margin-top");
    let searchHist = localStorage.getItem('searchHistory') === null ? localStorage.getItem('searchHistory') : localStorage.getItem('searchHistory').split(",")
    let lat = (parseFloat(resultCity[0].boundingbox[0]) + parseFloat(resultCity[0].boundingbox[1])) / 2
    let lon = (parseFloat(resultCity[0].boundingbox[2]) + parseFloat(resultCity[0].boundingbox[3])) / 2
    let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=3138cd0db2274a956254f9a14ea386e3&units=metric&lang=ru`);
    let result = await response.json();
    let date = new Date()
    let leftBarInfoClone = {}
    leftBarInfoClone.date = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`
    leftBarInfoClone.icon = `http://openweathermap.org/img/wn/${result.current.weather[0].icon}@4x.png`
    leftBarInfoClone.temp = Math.round(result.current.temp)
    leftBarInfoClone.feels_like = Math.round(result.current.feels_like)
    leftBarInfoClone.city = city
    leftBarInfoClone.description = result.current.weather[0].description
    let rightBarCurrentClone = {}
    rightBarCurrentClone.humidity = result.current.humidity
    rightBarCurrentClone.visibility = result.current.visibility / 1000
    rightBarCurrentClone.pressure = Math.round(result.current.pressure * 0.75)
    rightBarCurrentClone.wind_speed = result.current.wind_speed
    rightBarCurrentClone.wind_direction = windDirection(result.current.wind_deg)
    rightBarCurrentClone.wind_degree = result.current.wind_deg + 45
    if (searchHist === null || searchHist.length === 0) {
      localStorage.setItem("searchHistory", city)
    } else if (searchHist.indexOf(city) === -1) {
      if (searchHist.length < 5) {
        searchHist.unshift(city)
        localStorage.setItem("searchHistory", searchHist)
      } else {
        searchHist.unshift(city)
        searchHist.pop()
        localStorage.setItem("searchHistory", searchHist)
      }
    } else {
      searchHist.splice(searchHist.indexOf(city), 1);
      searchHist.unshift(city)
      localStorage.setItem("searchHistory", searchHist)
    }
    setInfo({ leftBarInfo: leftBarInfoClone, rightBarCurrent: rightBarCurrentClone, rightBarWeekInfo: result.daily.slice(1, 8), rightBarHourInfo: result.hourly.slice(1, 13) })
    setIsLoad(false)
  }

  return (
    <div className="container">
      <Search getSearch={getSearch} isLoad={isLoad} />
      <LeftBar leftBarInfo={info.leftBarInfo} isLoad={isLoad} />
      <RightBar rightBarCurrent={info.rightBarCurrent} rightBarWeekInfo={info.rightBarWeekInfo} rightBarHourInfo={info.rightBarHourInfo} isLoad={isLoad} />
    </div>
  );
}

export default App;
