import {TOKEN} from "../configs/constants";

const API_URL = "http://localhost:3090";

export default class API {
    static signUp(email, password){
        return fetch(`${API_URL}/signup`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        })
    }

    static signIn(email, password){
        return fetch(`${API_URL}/signIn`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        })
    }

    static postData(text){
        return fetch(`${API_URL}/word`, {
            method: "POST",
            headers: {"Authorization": localStorage.getItem(TOKEN)},
            body: JSON.stringify({
                text
            })
        })
    }

    static getWords(date){
        return fetch(`${API_URL}/wordsForUser`, {
            method: "POST",
            headers: {"Authorization": localStorage.getItem(TOKEN)},
            body: JSON.stringify({
                date
            })
        })
    }

    static verifyAccount(email, hash){
        return fetch(`${API_URL}/verify-account/${email}/${hash}`, {
            method: "POST",
            headers: {"Authorization": localStorage.getItem(TOKEN)}
        })
    }

    static resetPassword(email){
        return fetch(`${API_URL}/reset-password`, {
            method: "POST",
            headers: {"Authorization": localStorage.getItem(TOKEN)},
            body: JSON.stringify({
                email
            })
        })
    }
}
