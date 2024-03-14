import React, { useState } from 'react'
import Questions from './Questions';
import { useSelector, useDispatch} from 'react-redux'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';
import { Navigate } from 'react-router-dom'

export default function Quiz() {

  const [check, setCheck] = useState(undefined)

  const result = useSelector(state => state.result.result)
  const { queue, trace} = useSelector(state => state.questions)
  const dispatch = useDispatch()

  console.log(result);
  
  function onNext(){
    if (trace < queue.length) {
      dispatch(MoveNextQuestion())
      
      if(result.length <= trace) {
        dispatch(PushAnswer(check))
      }
    }

    setCheck(undefined)
  }

  function onPrev(){
    if (trace > 0) {
      dispatch(MovePrevQuestion())
    }
  }

  function onChecked(check) {
    console.log(check);
    setCheck(check)
  }

  if (result.length && result.length >= queue.length) {
    return <Navigate to={'/result'} replace={true}/>
  }

  return (
    <div className='container'>
  
        <div className='container2'>
        <Questions onChecked={onChecked} />

      <div className='grid'>
        { trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div> }
        <button className='btn next' onClick={onNext}>Next</button>
      </div>
      </div>
    </div>
  )
}
