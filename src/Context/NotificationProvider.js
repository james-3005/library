import React, {createContext, useState, useContext} from 'react'
import SuccessNotification from '../Components/Atoms/SuccessNotification/SuccessNotification'
import FailNotification from '../Components/Atoms/FailNotification/FailNotification'

const NotificationContext= createContext();
export const useNoti = () => useContext(NotificationContext);
export function NotificationProvider({children}) {
    const [noti, setNoti]= useState([]);
    const addNoti = (val, type="success") => {
        if(type === "success")
            setNoti(<SuccessNotification key={Math.random()} text={val}/>);
        else 
            setNoti(<FailNotification key={Math.random()} text={val}/>);
    }
    const value = {
        noti,
        addNoti,
    }
    
    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}
