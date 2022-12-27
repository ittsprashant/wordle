import React, { useEffect, useState } from 'react'
import { isDisabled } from '../Utilities/Functions';

function Row(props) {
    const {enabledRows, order, colorObj, activeRow, fList, successAlert} = props;
    const [word, setWord] = useState("");
    const [list, setList] = useState([]);


    useEffect(() => {

            props.handleSetWord(word, order);

    },[word])

    useEffect(() => {

        if(list?.length == 5 && order == activeRow)
        props.handleSetList1(list, order);

    },[list])

    useEffect(() => {

        let newList = [...fList];
            let list2 = [];

        if(newList?.length == 5 && colorObj && Object.keys(colorObj)){

            newList.forEach((element,index) => {
                // list2.push([element , colorObj[element.toLowerCase()]])
                // list2.push(element + "-" + colorObj[element.toLowerCase()])
                list2.push({"text":element, "color":colorObj[element.toLowerCase()]})
            });

        setList(list2);

            if (successAlert && order == activeRow) {

                setTimeout(() => {
                    alert("success")

                }, 100);

            }
        }

    },[props?.colorObj])


    const inputChar = (e, columnNumber) => {

        let str = "";
        let y = [...list]
        let character = e.target.value;
        y[columnNumber-1] = character;

            if(character){

            str = word.slice(0,columnNumber-1) + character  +word.slice(columnNumber-1, word.length)
        document.getElementById(`${order}"-c-"${columnNumber+1}`).active()

            }
            else{
                str = word.slice(0,columnNumber-1) + word.slice(columnNumber)
            }
            setList(y)
            setWord(str)


    }

    const getColor = (color, l) => {

        if(color){
            // let x = color.split("-")[1]
            let x = color
            return x
        }

    }

    const getClassName = (item) => {
        if(item){
            return `card-inactive-${item}`
        }
    }

    

    return (
        <div id={order} className={(order== enabledRows[0]) ? "activeClass":"inactiveClass"}>
            <input value={list?.[0]?.text} id={order+"-c-1"} className={getClassName(list?.[1]?.color)} style={{animationDelay:"0ms"}} disabled={isDisabled(enabledRows, order)} onChange={(e) => inputChar(e, 1)} maxLength="1"></input>
            <input value={list?.[1]?.text} id={order+"-c-2"} className={getClassName(list?.[1]?.color)} disabled={isDisabled(enabledRows, order)} style={{animationDelay:"100ms"}} onChange={(e) => inputChar(e, 2)} maxLength="1"></input>
            <input value={list?.[2]?.text} id={order+"-c-3"} className={getClassName(list?.[2]?.color)} disabled={isDisabled(enabledRows, order)} style={{animationDelay:"200ms"}} onChange={(e) => inputChar(e, 3)} maxLength="1"></input>
            <input value={list?.[3]?.text} id={order+"-c-4"} className={getClassName(list?.[3]?.color)} disabled={isDisabled(enabledRows, order)} style={{animationDelay:"300ms"}} onChange={(e) => inputChar(e, 4)} maxLength="1"></input>
            <input value={list?.[4]?.text} id={order+"-c-5"} className={getClassName(list?.[4]?.color)} disabled={isDisabled(enabledRows, order)} style={{animationDelay:"400ms"}} onChange={(e) => inputChar(e, 5)} maxLength="1"></input>
        </div>
    )
}

export default (Row);