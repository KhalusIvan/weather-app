import React from 'react'

export const Detail = (props) => {
    const rightBarCurrent = props.rightBarCurrent
    return (
        <section className="details">
            <h2 className="details__title">Подробно на сегодня</h2>
            <ul className="details__list">
                <li className="details__item">
                    <p className="details__description">Скорость ветра</p>
                    <div id='current__windSpeed' className="details__value">
                        {rightBarCurrent === undefined || props.isLoad ? (
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        ) : (
                            rightBarCurrent.wind_speed
                        )}<span> м/с</span>
                    </div>
                    <div className="details__wrap">
                        {rightBarCurrent === undefined || props.isLoad ? (
                            <></>
                        ) : (
                            <>
                                <span id='current__windDir-vector' className="details__span" style={{ transform: `rotate(${rightBarCurrent.wind_degree}deg)` }}></span>
                                <span id='current__windDir-text'>{rightBarCurrent.wind_direction}</span>
                            </>
                        )}
                    </div>
                </li>
                <li className="details__item">
                    <p className="details__description">Влажность</p>
                    <div id='current__humidity' className="details__value">
                        {rightBarCurrent === undefined || props.isLoad ? (
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        ) : (
                            rightBarCurrent.humidity
                        )} <span> %</span>
                    </div>
                    <div className="details__bar">
                        <div className="details__percent">
                            <span>0</span>
                            <span>50</span>
                            <span>100</span>
                        </div>
                        <div className='details__range'>
                            <div className='details__range-bg'></div>
                            <div className='details__range-line' style={{ width: `${rightBarCurrent === undefined ? '0%' : rightBarCurrent.humidity + "%"}` }}></div>
                        </div>
                        <div className="details__percent-symbol">
                            <span>%</span>
                        </div>
                    </div>
                </li>
                <li className="details__item">
                    <p className="details__description">Видимость</p>
                    <div id='current__visibility' className="details__value">
                        {rightBarCurrent === undefined || props.isLoad ? (
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        ) : (
                            rightBarCurrent.visibility
                        )}<span> км</span>
                    </div>
                </li>
                <li className="details__item">
                    <p className="details__description">Давление</p>
                    <div id='current__pressure' className="details__value-pressure">
                        {rightBarCurrent === undefined || props.isLoad ? (
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        ) : (
                            rightBarCurrent.pressure
                        )}<span> мм рт.ст.</span>
                    </div>
                </li>
            </ul>
        </section>
    )
}
