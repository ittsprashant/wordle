import React, { useEffect, useState, useCallback } from 'react'
import { checkWordValidity } from '../Utilities/Functions';
import Row from './Row';

function Home() {

    const[firstWord, setFirstWord] = useState("");
    const[secondWord, setSecondWord] = useState("");
    const[thirdWord, setThirdWord] = useState("");
    const[fourthWord, setFourthWord] = useState("");
    const[fifthWord, setFifthWord] = useState("");
    const[finalWord, setFinalWord] = useState("");
    const[enabledRows, setEnabledRows] = useState([1]);
    const[activeRow, setActiveRow] = useState(1);
    const[success,setSuccess] = useState(false);
    const[fList, setFlist] = useState([]);
    const[successAlert, setSuccessAlert] = useState(false);

    const todaysWord = "CHORD";
    const todaysList = todaysWord.toLowerCase().split("");

    useEffect(() => {

        if(success){
            setSuccess(false);
            findCorrectPositions(finalWord.toLowerCase(), todaysWord, activeRow)
        }

    },[finalWord, success, activeRow])

    const findCorrectPositions = useCallback(
        (pseudoWord, actualWord, activeRowNumber) => {
            let list = pseudoWord.split("")
            // let actualList÷
            // console.log("pos=>", actualWord, pseudoWord, list, todaysList)

            let x = list.reduce((acc, curr) => {

                if (todaysList.indexOf(curr) == list.indexOf(curr)) {
                    acc[curr] = "green"
                }
                else if (todaysList.includes(curr)) {
                    acc[curr] = "orange"
                }
                else {
                    acc[curr] = "grey"
                }
                return acc



            }, {})

            if (activeRowNumber === 1) {
                setFirstWord(x)
            }
            else if (activeRowNumber === 2) {
                setSecondWord(x)
            }
            else if (activeRowNumber === 3) {
                setThirdWord(x)
            }
            else if (activeRowNumber === 4) {
                setFourthWord(x)
            }
            else if (activeRowNumber === 5) {
                setFifthWord(x)
            }

            if(todaysWord.toLowerCase() === pseudoWord){
                // alert("success")
                setSuccessAlert(true);
            // setEnabledRows([activeRowNumber + 1])

            }
            else
            setEnabledRows([activeRowNumber + 1])

        },
        [],
    )


    const setWord = useCallback(
      (value, row) => {
        setActiveRow(row)
        setFinalWord(value)
      },
      [],
    )

    const setListList = useCallback((value, row)=>{

        setFlist(value)

    },[])


    const enter = useCallback(
        () => {

            if (!successAlert) {
                if (finalWord.length == 5) {
                    checkWordValidity(finalWord)
                        .then(res => {
                            if (res.length) {
                                setSuccess(true);
                            }
                            else
                                alert("Word does not exist in dictionary!")
                        })
                }
                else
                    alert("Complete the word to submit")
            }
        },
        [finalWord, successAlert],
    )
    

    return (
        <div>
            <h2>Wordle</h2>
            <Row id="row-1" enabledRows={enabledRows} order={1} handleSetWord = {setWord} handleSetList1 = {setListList} colorObj = {firstWord} activeRow={activeRow} fList={fList} successAlert={successAlert}/>
            <Row id="row-2" enabledRows={enabledRows} order={2} handleSetWord = {setWord} handleSetList1 = {setListList} colorObj = {secondWord} activeRow={activeRow} fList={fList} successAlert={successAlert}/>
            <Row id="row-3" enabledRows={enabledRows} order={3} handleSetWord = {setWord} handleSetList1 = {setListList} colorObj = {thirdWord} activeRow={activeRow} fList={fList} successAlert={successAlert}/>
            <Row id="row-4" enabledRows={enabledRows} order={4} handleSetWord = {setWord} handleSetList1 = {setListList} colorObj = {fourthWord} activeRow={activeRow} fList={fList} successAlert={successAlert}/>
            <Row id="row-5" enabledRows={enabledRows} order={5} handleSetWord = {setWord} handleSetList1 = {setListList} colorObj = {fifthWord} activeRow={activeRow} fList={fList} successAlert={successAlert}/>

            <button className='enter-btn' onClick={()=> {enter()}}>Enter</button>

        </div>
    )
}

export default React.memo(Home)