import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { counterReducer } from './../store/index';

const Counter = () => {
  
  const counter = useSelector((state) => state.counterReducer)
  const theme = useSelector((state) => state.themeReducer)
  const dispatch = useDispatch()

  return (
    <div style={{backgroundColor: theme.bgColor, color: theme.textColor}}>
      <p>The value of the counter is {counter}</p>
      <button onClick={() =>dispatch({type:'INCREASE' , payload: 10})}>Increase by 10</button>
      <button onClick={() =>dispatch({type:'INCREASE' , payload: 5})}>Increase by 5</button>
      <button onClick={() =>dispatch({type:'DECREASE' , payload: 5})}>Decrease by 5</button>
    </div>
  )
}

export default Counter