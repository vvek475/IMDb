import { createContext ,useState } from 'react';

const TogglebarVissibilityContext=createContext()

export function TogglebarVissibility({children}){
    const [visibility,setvisibility]=useState(false)
    function Togglevisibility(){
        setvisibility((state)=>state?false:true)
    }
    return (
        <TogglebarVissibilityContext.Provider value={[visibility,setvisibility,Togglevisibility]}>
            {children}
        </TogglebarVissibilityContext.Provider>
    )
}
export default TogglebarVissibilityContext
