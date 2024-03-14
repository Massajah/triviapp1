import React from 'react'
import { Link } from 'react-router-dom'

export default function Info() {
  return (
    <div className='container'>

      <div className='container2'>
      <h4 className='text-light-info'>INFO</h4>
      <p className='text-light-info'>- 25 questions from the category you choose</p>
      <p className='text-light-info'>- You can go back and change your answer</p>
      <p className='text-light-info'>- Easy: Correct answer = 10pts, incorrect answer = -10pts, no answer = 0pts</p>
      <p className='text-light-info'>- Medium: Correct answer = 12.5pts, incorrect answer = -12.5pts, no answer = 0pts</p>
      <p className='text-light-info'>- Hard: Correct answer = 15pts, incorrect answer = -15pts, no answer = 0pts</p>
      <p className='text-light-info'>- Top 10 scores are shown at the end </p>
      <div className='help'>
        <Link className='btn' to={'/'}>Back</Link>
      </div>
      </div>
    </div>
  )
}

