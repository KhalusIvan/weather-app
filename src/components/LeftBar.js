import React from 'react'
import transparent_bg from '../img/transparent-bg.png'

export const LeftBar = (props) => {
    const leftBarInfo = props.leftBarInfo
    const root = document.documentElement;
    let img = new Image(200, 200);
    img.src = 'picture.jpg';

    function changeTheme(e) {
        if (e.target.checked) {
            root.style.setProperty('--color-white', "#212331");
            root.style.setProperty('--color-grey', "#e6e6e6");
            root.style.setProperty('--color-container-wrap', "#100E1C");
            root.style.setProperty('--color-light-grey', "#6D6D6D");
            root.style.setProperty('--color-night-temp', "#6D6D6D");
        } else {
            root.style.setProperty('--color-white', "white");
            root.style.setProperty('--color-grey', "#48484A");
            root.style.setProperty('--color-container-wrap', "#E5E5E5");
            root.style.setProperty('--color-light-grey', "#ACACAC");
            root.style.setProperty('--color-night-temp', "#D3D3D3");
        }
    }

    function openSearch() {
        document.getElementById('search').style.left = '0%';
    }

    return (
        <>
            <section className="weather">
                <div className="weather__btn">
                    <button id='showSearch' onClick={() => { openSearch() }} className="weather__btn-search">Поиск города</button>
                    <label className="weather__btn-theme">
                        <input onClick={(e) => { changeTheme(e) }} type="checkbox" className='weather__btn-theme-inp' />
                        <span className="weather__btn-theme-round">
                            <svg className="weather__btn-theme-switcher" xmlns="http://www.w3.org/2000/svg">
                                <path className="weather__btn-theme-switcher--path" d="M10.6067 2.12132C9.83451 1.34916 8.89689 0.8358 7.9126 0.572756C8.44717 2.57528 7.93381 4.79418 6.36403 6.36396C4.79425 7.93374 2.57535 8.4471 0.572826 7.91253C0.83587 8.89682 1.34923 9.83444 2.12139 10.6066C4.46333 12.9485 8.26473 12.9485 10.6067 10.6066C12.9486 8.26466 12.9486 4.46326 10.6067 2.12132Z" fill="#E6E6E6" />
                            </svg>
                        </span>
                    </label>
                </div>
                <img id="current_icon" src={leftBarInfo === undefined ? transparent_bg : leftBarInfo.icon} alt="precipitation" className="weather__image" />
                <div>
                    <p id='current__temperature' className="temperature">{leftBarInfo === undefined ? '' : leftBarInfo.temp}<span>°C</span></p>
                    <p id="current__description" className="weather__description">{leftBarInfo === undefined ? '' : leftBarInfo.description}</p>
                    <p id='current__feels' className="weather__feel">Ощущается как {leftBarInfo === undefined ? '' : leftBarInfo.feels_like} °C</p>
                    <div className="weather__wrap">
                        <p className="weather__day">Сегодня</p>
                        <p id="current_date" className="weather__data">{leftBarInfo === undefined ? '' : leftBarInfo.date}</p>
                    </div>
                    <div className="weather__city">
                        <div className="weather__city-locator"></div>
                        <div id='current__city' className="weather__city-name">{leftBarInfo === undefined ? '' : leftBarInfo.city}</div>
                    </div>
                </div>
            </section>
        </>
    )
}
