import React, {useEffect} from "react";
import API from "../api";

export function useAuth() {
    const [loading, setLoading] = React.useState(true);
    const [history, setHistory] = React.useState([]);
    const [availablePageCount, setPageCount] = React.useState(0);

    const signUp = (email, password) => API.signUp(email, password);


    useEffect(
        () => {
            async function fetchHistory() {
                const response = await API.getHistory();
                const result = await response.json();
                if(result.result === "ok"){
                    setHistory(result.deals);
                    setLoading(false);
                    setPageCount(result.deals.length / 10);
                }
            }
            fetchHistory();
        },
        []
    )

    return {
        loading,
        history,
        availablePageCount
    }
}
