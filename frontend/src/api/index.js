import {TOKEN} from "../configs/constants";

const API_URL = "https://funny-bulldog-86.localtunnel.me/";

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
}
