import React, { useRef, useState } from 'react'
import { Detail } from './Detail'

export const RightBar = (props) => {
    const rightBarWeekInfo = props.rightBarWeekInfo
    const rightBarHourInfo = props.rightBarHourInfo
    const btn__slider_right = useRef(null);
    const btn__slider_left = useRef(null);
    const predication__list = useRef(null);
    const [isShowDays, setIsShowDays] = useState(true)
    const days = { "0": "Вс", "1": "Пн", "2": "Вт", "3": "Ср", "4": "Чт", "5": "Пт", "6": "Сб" }
    const months = { "0": "янв", "1": "фер", "2": "мар", "3": "апр", "4": "май", "5": "июн", "6": "июл", "7": "авг", "8": "сен", "9": "окт", "10": "ноя", "11": "дек" }

    function changeSlider(isDaily) {
        if (isDaily) {
            predication__list.current.scrollLeft = 0;
            btn__slider_right.current.classList.remove('btn__slider-disabled')
            btn__slider_left.current.classList.add('btn__slider-disabled')
            document.getElementById('predication__link-hour').classList.remove("predication__link-active")
            document.getElementById('predication__link-week').classList.add("predication__link-active")
        } else {
            predication__list.current.scrollLeft = 0;
            btn__slider_right.current.classList.remove('btn__slider-disabled')
            btn__slider_left.current.classList.add('btn__slider-disabled')
            document.getElementById('predication__link-hour').classList.add("predication__link-active")
            document.getElementById('predication__link-week').classList.remove("predication__link-active")
        }
        setIsShowDays(isDaily)
    }

    function slideLeft() {
        btn__slider_right.current.classList.remove('btn__slider-disabled')
        predication__list.current.scrollLeft -= 125;
        console.log(predication__list.current.scrollLeft)
        if (predication__list.current.scrollLeft - 125 <= 0) {
            btn__slider_left.current.classList.add('btn__slider-disabled')
        } else {
            btn__slider_left.current.classList.remove('btn__slider-disabled')
        }

    }

    function slideRight() {
        let scrolledRange = predication__list.current.scrollWidth - predication__list.current.clientWidth
        btn__slider_left.current.classList.remove('btn__slider-disabled')
        predication__list.current.scrollLeft += 125;
        if (predication__list.current.scrollLeft + 125 >= scrolledRange) {
            btn__slider_right.current.classList.add('btn__slider-disabled')
        } else {
            btn__slider_right.current.classList.remove('btn__slider-disabled')
        }
    }

    function DailyWeather() {
        let dailyWeather = rightBarWeekInfo.map((el, i) => {
            let date = new Date(0)
            date.setUTCSeconds(el.dt);
            let dayForm = i === 0 ? 'Завтра' : `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`
            return <li key={date} className="predication__item">
                <h3 className="predication__item-title">{dayForm}</h3>
                <img src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="precipitation" className="predication__item-img" />
                <div className="predication__temp-wrap">
                    <p className="predication__temp-now">{Math.round(el.temp.max)}°C</p>
                    <p className="predication__temp-feel">{Math.round(el.temp.min)}°C</p>
                </div>
            </li>
        })
        return dailyWeather
    }

    function HourlyWeather() {
        let hourlyWeather = rightBarHourInfo.map(el => {
            let date = new Date(0)
            date.setUTCSeconds(el.dt);
            let hourTime = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            return <li key={date} className="predication__item">
                <h3 className="predication__item-title">{hourTime}:00</h3>
                <img src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="precipitation" className="predication__item-img" />
                <p className="predication__temp-wrap-one">
                    {Math.round(el.temp)}°C
                </p>
            </li>
        })
        return hourlyWeather
    }

    return (
        <div className="container__wrap">
            <section className="predication">
                <div className="predication__wrap">
                    <h1 className="predication__title">Прогноз </h1>
                    <div className="predication__link-wrap">
                        <button id="predication__link-week" onClick={() => { changeSlider(true) }} className="predication__link-week predication__link-active">на неделю</button>
                        <button id="predication__link-hour" onClick={() => { changeSlider(false) }} className="predication__link-hour">почасовой</button>
                    </div>
                </div>
                <ul ref={predication__list} id="predication__list" className="predication__list">
                    {
                        rightBarWeekInfo === undefined || props.isLoad ? (
                            <>
                                <li className="predication__item">
                                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </li>
                                <li className="predication__item">
                                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </li>
                                <li className="predication__item">
                                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </li>
                                <li className="predication__item">
                                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </li>
                                <li className="predication__item">
                                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </li>
                                <li className="predication__item">
                                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </li>
                                <li className="predication__item">
                                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </li>
                                <li className="predication__item">
                                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </li>
                            </>
                        ) : isShowDays ? (
                            <DailyWeather />
                        ) : (
                            <HourlyWeather />
                        )
                    }
                </ul>
                <div className="btn__slider-wrap">
                    <button ref={btn__slider_left} onClick={() => slideLeft()} className="btn__slider-prev btn__slider-disabled btn__slider"></button>
                    <button ref={btn__slider_right} onClick={() => slideRight()} className="btn__slider-next btn__slider"></button>
                </div>
            </section>
            <Detail rightBarCurrent={props.rightBarCurrent} isLoad={props.isLoad} />
        </div>
    )
}
