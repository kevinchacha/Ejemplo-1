import { useState } from "react"
import { UserContext } from "./components/contexts/UserContext"
import { Routers } from "./routers/Routers";


export const Inventary = () => {
    const [user, setUser] = useState({});
    const [editData, setEditData] = useState(null)
    return ( 
        <UserContext.Provider value={{
            user,
            setUser,
            editData,
            setEditData
        }}>
            <Routers / >
        </UserContext.Provider>
    )
}