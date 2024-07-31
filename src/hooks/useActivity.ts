import { useContext } from "react"
import { ActivityContext } from "../context/ActivityContext"



export const useActivity = () => {
    const context = useContext(ActivityContext);

    if(!context){
        throw Error('The useActivity hook should be use in an ActivityProvider');
    }

    return context;
}