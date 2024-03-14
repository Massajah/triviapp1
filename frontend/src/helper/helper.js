import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import axios from "axios" 


export function earnPoints_Number(result, answers, point) {
    return result.map((element, q) => answers[q] === element).filter(q => q).map(q => point).reduce((prev, curr) => prev + curr, 0)
    + result.map((element, q) => element === undefined).filter(q => q).map(q => 0).reduce((prev, curr) => prev + curr, 0)
    + result.map((element, q) => answers[q] !== element && element !== undefined).filter(q => q).map(q => - point).reduce((prev, curr) => prev + curr, 0)
}

export function corr_ans_Number(result, answers, point) {
    return result.map((element, q) => answers[q] === element).filter(q => q).map(q => point).reduce((prev, curr) => prev + curr, 0)
}

export function incorr_ans_Number(result, answers, point) {
    return result.map((element, q) => answers[q] !== element && element !== undefined).filter(q => q).map(q => point).reduce((prev, curr) => prev + curr, 0)
}

export function no_ans_Number(result, answers, point) {
    return result.map((element, q) => element === undefined).filter(q => q).map(q => point).reduce((prev, curr) => prev + curr, 0)
}

export function CheckUserExist({ children }) {
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

export async function getServerData(url, callback) {
    const data = await (await axios.get(url))?.data
    return callback ? callback(data) : data
}

export async function postServerData(url, result, callback) {
    const data = await (await axios.post(url, result))?.data
    return callback ? callback(data) : data
}
