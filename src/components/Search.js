import React, { useRef, useState } from 'react'
import searchImg from '../img/search.png'
import closeImg from '../img/cancel.svg'

export const Search = (props) => {
    let inputField = useRef(null)
    const searchHist = localStorage.getItem('searchHistory') === null ? localStorage.getItem('searchHistory') : localStorage.getItem('searchHistory').split(",")
    let startInputText = searchHist === null ? 'Москва' : searchHist[0]
    let [inputText, setInputText] = useState(startInputText)
    const regex = /[а-яА-ЯЁё -ії]$/

    function closeSearch() {
        document.getElementById('search').style.left = '-100%';
    }

    function checkInput() {
        let inp = inputField.current.value
        if (inp.length > 0) {
            inp = inp.toLowerCase()
            inp = inp.charAt(0).toUpperCase() + inp.slice(1);
            console.log(regex.test(inp))
            if(!regex.test(inp)){
                inp = inp.slice(0, inp.length - 1)
                if (window.innerWidth < 1400)
                    document.getElementById('find__city').style.marginTop = "50px";
                else
                    document.getElementById('search__history').style.marginTop = "60px";
                document.getElementById('alert__city').innerHTML = "Разрешена только кирилица";
                setTimeout(()=>{
                    document.getElementById('alert__city').innerHTML = "";
                    document.getElementById('find__city').style.removeProperty("margin-top");
                    document.getElementById('search__history').style.removeProperty("margin-top");
                }, 2000) 
            }
        }
        setInputText(inp)
    }

    function SearchHistoryList() {
        if (searchHist === null)
            return '';
        let list = searchHist.map(el => {
            return <li key={el} onClick={() => { setInputText(el); props.getSearch(el) }} className="search__history-item">
                <p className="search__history-city">{el}</p>
                <div className="search__history-arrow"></div>
            </li>
        })
        return list
    }

    function cleatInput() {
        setInputText("")
        inputField.current.focus();
    }

    return (
        <div id='search' className="weather__search">
            <button onClick={() => { closeSearch() }} id="closeSearch" className="weather__search__quit"></button>
            <form onSubmit={(e) => { e.preventDefault(); props.getSearch(inputField.current.value) }} className="weather__search__field">
                <div className="weather__search__field__input">
                    <img src={searchImg} alt='search' className="weather__search__field__input__img" />
                    <svg style={{opacity: inputText.length===0?"0":"1"}} onClick={()=>{cleatInput()}} className="weather__search__field__input__close" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                    </svg>
                    <input onChange={() => { checkInput() }} ref={inputField} autoComplete='off' id="input__city" type="text" className="weather__search__field__input__inp" value={inputText} />
                    <p id="alert__city" className="weather__search__field__input__alert"></p>
                </div>
                <button id="find__city" className="weather__search__field__button">Найти</button>
            </form>
            <ul id="search__history" className="search__history-list">
                <SearchHistoryList />
            </ul>
        </div>
    )
}
