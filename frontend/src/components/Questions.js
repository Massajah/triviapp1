import React, { useEffect, useState } from 'react'
import { useFetchQuestion } from '../hooks/FetchQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { updateResult } from '../hooks/setResult';

export default function Questions({ onChecked }) {

    const [checked, setChecked] = useState(undefined)
    const { trace } = useSelector(state => state.questions)
    const result = useSelector(state => state.result.result)
    const [{ isLoading, apiData, serverError }] = useFetchQuestion()
    //useSelector(state => console.log(state))
    const questions = useSelector(state => state.questions.queue[state.questions.trace])

    const [options, setOptions] = useState();

    const dispatch = useDispatch()

    const entities = {
      '&#039;': "'",
      '&quot;': '"',
      '&ouml;': 'ö',
      '&auml;': 'ä',
      '&aring;': 'å',
      '&amp;': '&'
    };

    useEffect(() => {
      console.log(apiData);
    })

    useEffect(() => {
      setOptions(
        questions &&
          handleShuffle([
            questions?.correct_answer,
            ...questions?.incorrect_answers,
          ])
      );
    }, [questions]);
  

  useEffect (() => {
    dispatch(updateResult({ trace, checked }))
  }, [checked])

    function onSelect(q) {
        onChecked(q)
        setChecked(q)
        dispatch(updateResult({ trace, checked }))
    }

    const handleShuffle = (options) => {
      return options.sort(() => Math.random() - 0.5);
    };

    if(isLoading) return <h3 className='text-light'>isLoading</h3>
    if(serverError) return <h3 className='text-light'>{serverError || 'Unknown Error'}</h3>

  return (
    <div className='questions'>
      <h2 className='text-light-q'>Question: {trace+1}/25</h2>
      <h4 className='text-light-c'>Category: {questions?.category}</h4>
      <h4 className='text-light-c'>Difficulty: {questions?.difficulty}</h4>
        <h2 className='text-light-question'>{questions?.question.replace(/&#?\w+;/g, match => entities[match])}</h2>

        <ul key={questions?.question}>
            {
                options?.map((q, i) => (
                    <li key={i}>
                        <input 
                            type='radio'
                            value={false}
                            name='options'
                            id={`q${i}-option`}
                            onChange={() => onSelect(q)}
                        />

                        <label className='text-primary' htmlFor={`q${i}-option`}>{q.replace(/&#?\w+;/g, match => entities[match])}</label>
                        <div className={`check ${result[trace] == q ? 'checked' : ''}`}></div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
