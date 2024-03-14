import '../styles/Result.css'
import { Link } from 'react-router-dom'
import ResultTable from './ResultTable';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { useDispatch, useSelector } from 'react-redux';
import { corr_ans_Number, earnPoints_Number, incorr_ans_Number, no_ans_Number } from '../helper/helper';
import { usePublishResult } from '../hooks/setResult';

export default function Result() {

  const dispatch = useDispatch()
  const { questions : {answers, userDifficulty, userCategory}, result : {result, userId}} = useSelector(state => state)

  let points = 0
  let category = ""

  if(userDifficulty === "easy"){
     points = 10
  }
  if(userDifficulty === "medium"){
    points = 12.5
  }
  if(userDifficulty === "hard"){
  points = 15
  }

  if(userCategory === 9) {
    category = "General Knowledge"
  }
  if(userCategory === 10) {
    category = "Books"
  }
  if(userCategory === 11) {
    category = "Films"
  }
  if(userCategory === 12) {
    category = "Music"
  }
  if(userCategory === 13) {
    category = "Musicals and Theaters"
  }
  if(userCategory === 14) {
    category = "Television"
  }
  if(userCategory === 15) {
    category = "Video Games"
  }
  if(userCategory === 16) {
    category = "Board Games"
  }
  if(userCategory === 17) {
    category = "Science and Nature"
  }
  if(userCategory === 18) {
    category = "Computer"
  }
  if(userCategory === 19) {
    category = "Mathematics"
  }
  if(userCategory === 20) {
    category = "Mythology"
  }
  if(userCategory === 21) {
    category = "Sports"
  }
  if(userCategory === 22) {
    category = "Geography"
  }
  if(userCategory === 23) {
    category = "History"
  }
  if(userCategory === 24) {
    category = "Politics"
  }
  if(userCategory === 25) {
    category = "Art"
  }
  if(userCategory === 26) {
    category = "Celebrities"
  }
  if(userCategory === 27) {
    category = "Animals"
  }
  if(userCategory === 28) {
    category = "Vehicles"
  }
  if(userCategory === 29) {
    category = "Comics"
  }
  if(userCategory === 30) {
    category = "Gadgets"
  }
  if(userCategory === 31) {
    category = "Japanese Anime"
  }
  if(userCategory === 32) {
    category = "Cartoon and Animations"
  }

  const earnPoints = earnPoints_Number(result, answers, points)
  const corr_ans = corr_ans_Number(result, answers, 1)
  const incorr_ans = incorr_ans_Number(result, answers, 1)
  const no_ans = no_ans_Number(result, answers, 1)

  usePublishResult({ 
    result, 
    username : userId, 
    points: earnPoints, 
    })

  function onRestart() {
    dispatch(resetAllAction())
    dispatch(resetResultAction())
  }

  return (
    <>
    <div className='result-container'>

      <div className='result flex-center'>
        <div className='flex'>
          <span>Username:</span>
          <span className='bold'>{userId || ''}</span>
        </div>

        <div className='flex'>
          <span>Category:</span>
          <span className='bold'>{category || ''}</span>
        </div>

        <div className='flex'>
          <span>Difficulty:</span>
          <span className='bold'>{userDifficulty || ''}</span>
        </div>

        <div className='flex'>
          <span>Correct answers:</span>
          <span className='bold'>{corr_ans || 0}</span>
        </div>

        <div className='flex'>
          <span>Incorrect answers:</span>
          <span className='bold'>{incorr_ans || 0}</span>
        </div>

        <div className='flex'>
          <span>No answer:</span>
          <span className='bold'>{no_ans || 0}</span>
        </div>
       
        <div className='flex_green'>
          <span>Points: </span>
          <span className='bold'>{earnPoints || 0}</span>
        </div>
      </div>

      <div className='result-table'>
        <h1 className='top-text'>TOP10</h1>
        <ResultTable />
      </div>
    </div>

    <div className='start'>
        <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
    </div>

</>
  )
}
