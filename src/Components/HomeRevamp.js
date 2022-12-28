import React, { useEffect, useState } from 'react';
import { checkWordValidity } from '../Utilities/Functions';
import RowRevamp from "./RowRevamp";

function HomeRevamp() {

  const[activeRow, setActiveRow] = useState(1);
  const[successAlert, setSuccessAlert] = useState(false);
  const[finalWord, setFinalWord] = useState("");
  const[success, setSuccess] = useState();
  const[enterDisabled, setEnterDisabled] = useState(false);
  const[mainList, setMainList] = useState([{"order":1, value:"", detail:[]}, {"order":2, value:"", detail:[]}, {"order":3, value:"", detail:[]}, {"order":4, value:"", detail:[]}, {"order":5, value:"", detail:[]}])
  const todaysWord = "CHORD";
  const todaysList = todaysWord.toLowerCase().split("");

  useEffect(()=>{

    if(success){
      setSuccess(false);
      setFinalWord("");
      setActiveRow(activeRow+1);
    }

  },[success, mainList])

  const setCompleteWord = (word, rowNumber) => {
    if(word && word?.length == 5){
      localStorage.setItem("rowNumber", rowNumber)
      setFinalWord(word)
    }
  }


  const enter = () => {

    setEnterDisabled(true);

    if(!successAlert){
    if (finalWord.length == 5) {
      checkWordValidity(finalWord)
          .then(res => {
              if (res.length) {
                  checkWord(finalWord);
                  setSuccess(true);
              }
              else
                  alert("Word does not exist in dictionary!")

                  setEnterDisabled(false);
              
          })
  }
  else{
      alert("Complete the word to submit")
    setEnterDisabled(false);

  }
}
else{

}



  }

  const checkWord = (word) => {

    let list = word.split("")
    let oldList = [...mainList];
    let number = localStorage.getItem("rowNumber");

    oldList[number-1].value = word;

    list.forEach((element,index) => {

      if(todaysList.indexOf(element) == list.indexOf(element)){
        // oldList[number-1].detail[index].value = element; 
        // oldList[number-1].detail[index].key = 2; 

        let obj = {};
        obj.value = element;
        obj.key = 2
        oldList[number-1].detail.push(obj)

      }
      else if(todaysList.includes(element)){

        let obj = {};
        obj.value = element;
        obj.key = 1
        oldList[number-1].detail.push(obj)


        // oldList[number-1].detail[index].value = element; 
        // oldList[number-1].detail[index].key = 1; 

      }
      else{
        // oldList[number-1].detail[index].value = element; 
        // oldList[number-1].detail[index].key = 0; 

        let obj = {};
        obj.value = element;
        obj.key = 0
        oldList[number-1].detail.push(obj)
      }
      
    });


    if(todaysWord.toLowerCase() === word){
      // alert("success")
      setSuccessAlert(true);
  // setEnabledRows([activeRowNumber + 1])

  }

    setMainList(oldList)
    return;

  }

  return (
    <div style={{padding:"2px"}}>
      <h2>Wordle</h2>

      {mainList.map((item, index) => {
        return (
          <RowRevamp key={`order-${index}`} successAlert={successAlert} finalList={mainList} activeRow={activeRow} item={item} order={item.order} handleCompleteWord={setCompleteWord}/>
        )
      })}

    <button className='enter-btn' disabled={enterDisabled} onClick={()=> {enter()}}>Enter</button>


    </div>
  )
}

export default HomeRevamp