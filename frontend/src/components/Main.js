import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Main.css'
import { useDispatch } from 'react-redux'
import { setUserId } from '../redux/result_reducer'
import { setUserCategory, setUserDifficulty } from '../redux/question_reducer'
import { Button, MenuItem, TextField } from '@mui/material'
import Categories from '../data/Categories'
import Difficulties from '../data/Difficulties'

export default function Main() {

const [category, setCategory] = useState(9)
const [difficulty, setDifficulty] = useState("medium")

  const inputRef = useRef(null)
  const dispatch = useDispatch()

  function startQuiz() {
    if(inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value))
      dispatch(setUserCategory(category))
      dispatch(setUserDifficulty(difficulty))
      
    }
  }


  return (
    <div className='container'>

      <div className='container2'>
      <form id='form'>
        <input ref={inputRef} className='userid' type='text' placeholder='Username' maxLength={20} />
      </form>

      <div className='selectbox'>
      <TextField
      sx={{
        border: '2px solid #BAE6FD',
        borderRadius: 1,
      }}
      InputLabelProps={{
        style: { color: '#BAE6FD', backgroundColor: 'var(--blue-80, #0C4A6E)' },
      }}
      InputProps={{ style: { color: '#BAE6FD' } }}
        select
        label="Select Category"
        variant='outlined'
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        
      >
        {Categories.map((cat) => (
          <MenuItem className='list' key={cat.category} value={cat.value}>
            {cat.category}
          </MenuItem>
        ))
        }
      </TextField>
      </div>

      <div className='selectbox'>
      <TextField
        select
        sx={{
          border: '2px solid #FEF9C3',
          borderRadius: 1,
        }}
        InputLabelProps={{
          style: { color: '#FEF9C3', backgroundColor: 'var(--blue-80, #0C4A6E)' },
        }}
        InputProps={{ style: { color: '#FEF9C3' } }}
        label="Select Difficulty"
        variant='outlined'
        onChange={(e) => setDifficulty(e.target.value)}
        value={difficulty}
      >
        {Difficulties.map((dif) => (
          <MenuItem className='list' key={dif.difficult} value={dif.value}>
            {dif.difficult}
          </MenuItem>
        ))
        }
      </TextField>
      </div>

      <div className='start'>
        <Button className='btn' component={Link} to={'quiz'} onClick={startQuiz} variant='outlined'>Start</Button>
      </div>
      <div className='help'>
        <Button className='btn' component={Link} to={'info'} variant='outlined'>Info</Button>
      </div>
      </div>
    </div>
  )
}
