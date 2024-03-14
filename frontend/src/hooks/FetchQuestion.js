import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Action from '../redux/question_reducer'
import { getServerData } from "../helper/helper"

export const useFetchQuestion = () => {
    
    const dispatch = useDispatch();
    
    const cat = useSelector(state => state.questions.userCategory)
    const dif = useSelector(state => state.questions.userDifficulty)
    const [getData, setGetData] = useState({ isLoading : false, apiData : [], serverError: null});

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading : true}));

        (async (category = cat, difficulty = dif) => {
            try {
                let q = await getServerData(`https://opentdb.com/api.php?amount=25${
                    category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`, (data) => data)
                const question = q.results
                const answers = question.map(ans => ans.correct_answer)

                if(question.length > 0){
                    setGetData(prev => ({...prev, isLoading : false}))
                    setGetData(prev => ({...prev, apiData : {question, answers}}))

                    dispatch(Action.startExamAction({ question : question, answers}))
                } else{
                    throw new Error("No Question Available")
                }
            } catch (error) {
                setGetData(prev => ({...prev, isLoading : false}))
                setGetData(prev => ({...prev, serverError : error}))
            }
        })()
    }, [dispatch])

    return [getData, setGetData]
}

export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction())
    } catch (error) {
        console.log(error);
    }
}

export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction())
    } catch (error) {
        console.log(error);
    }
}
