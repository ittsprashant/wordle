import React, { useRef, useLayoutEffect, useState, useEffect, useMemo } from 'react'

function RowRevamp(props) {

  const {activeRow, order, finalList, successAlert} = props;

  let inputRef = useRef(null);
  let inputRef0 = useRef(null);
  let inputRef1 = useRef(null);
  let inputRef2 = useRef(null);
  let inputRef3 = useRef(null);
  let inputRef4 = useRef(null);


  const [value0, setValue0] = useState();
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [value4, setValue4] = useState();

  useLayoutEffect(() => {
    if(activeRow === order){
    inputRef0.current.focus()
    // setActiveRowNumber
    }
    // else{
    //   document.removeEventListener("onKeyDown", myFocus)
    // }
    // return () => {
    //   second
    // };
  }, [activeRow, order])

  useEffect(() => {

    if (finalList && Object.keys(finalList).length && (value0 && value1 && value2 && value3 && value4)) {

      let tempList = finalList?.[activeRow - 1]?.detail

      for (let i = 1; i <= 5; i++) {

        if (document.getElementById(`r-${activeRow}-row-${i}`)) {
          // document.getElementById(`r-${activeRow}-row-${i}`).id = `row-${activeRow}-${i}-color-${tempList[i-1].key}`
          document.getElementById(`r-${activeRow}-row-${i}`).id = `color-${tempList[i - 1]?.key}`

        }

      }


      if (successAlert && order == activeRow) {

        setTimeout(() => {
          alert("success")


        }, 2000);

      }
    }

  }, [finalList])

  useEffect(() => {

    if(activeRow === order && value4){

      let inputs = document.querySelectorAll(".activeInp");

      // let inputs = document.getElementsByIds("input")
      let character = "";
      for(let i = 0; i < inputs.length; i++){
        character = character + inputs[i].value;
       }
       props.handleCompleteWord(character, activeRow)
      
    }

  },[value4])

  // const myFocus = () => {

  // }

  const changeFnt = (e, number) => {

    let value = "";

    if ((e.which >= 65 && e.which <= 90) || e.which == 8) {
      value = e.key
    }


    if (value && (activeRow === order)) {


      if (value == "Backspace") {

        if (number === 0) {
          setValue0("")
          inputRef0.current.focus()
        }
        else if (number === 1) {
          setValue1("")
          inputRef0.current.focus()
        }
        else if (number === 2) {
          setValue2("")
          inputRef1.current.focus()
        }
        else if (number === 3) {
          setValue3("")
          inputRef2.current.focus()
        }
        else if (number === 4) {
          setValue4("")
          inputRef3.current.focus()
        }


      }
      else {
        if (number === 0) {
          setValue0(value)
          timeOutFnt(inputRef1)
        }
        else if (number === 1) {
          setValue1(value)
          timeOutFnt(inputRef2)
        }
        else if (number === 2) {
          setValue2(value)
          timeOutFnt(inputRef3)
        }
        else if (number === 3) {
          setValue3(value)
          timeOutFnt(inputRef4)
        }
        else if (number === 4) {
          setValue4(value)
          timeOutFnt(inputRef4)
        }

      }
    }

  }

  const timeOutFnt = (refValue) => {
    setTimeout(() => {
      refValue.current.focus();
    },0)
  }





  return (
    <>
    <div className="inputGroup">
      <input id={`r-${order}-row-1`} value={value0} className={activeRow == order ? "activeInp":""} ref={inputRef0} maxLength="1" onKeyDown={(e) => {changeFnt(e, 0)}} disabled={activeRow === order && !successAlert ? false : true}
      style={{animationDelay:"0ms"}}/>
      <input id={`r-${order}-row-2`} value={value1} className={activeRow == order ? "activeInp":""} ref={inputRef1} maxLength="1" onKeyDown={(e) => {changeFnt(e, 1)}} disabled={activeRow === order && !successAlert ? false : true}
      style={{animationDelay:"100ms"}}/>
      <input id={`r-${order}-row-3`} value={value2} className={activeRow == order ? "activeInp":""} ref={inputRef2} maxLength="1" onKeyDown={(e) => {changeFnt(e, 2)}} disabled={activeRow === order && !successAlert ? false : true}
      style={{animationDelay:"200ms"}}/>
      <input id={`r-${order}-row-4`} value={value3} className={activeRow == order ? "activeInp":""} ref={inputRef3} maxLength="1" onKeyDown={(e) => {changeFnt(e, 3)}} disabled={activeRow === order && !successAlert ? false : true}
      style={{animationDelay:"300ms"}}/>
      <input id={`r-${order}-row-5`} value={value4} className={activeRow == order ? "activeInp":""} ref={inputRef4} maxLength="1" onKeyDown={(e) => {changeFnt(e, 4)}} disabled={activeRow === order && !successAlert ? false : true}
      style={{animationDelay:"400ms"}}/>
    </div>
    </>
    
  )
}

export default React.memo(RowRevamp)