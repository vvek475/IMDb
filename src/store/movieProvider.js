import { createContext ,useState } from 'react';

const MovieProvider=createContext()

export function Movieselectfuncn({children}){
    const [movieid,setmovieid]=useState(27205)
    return (
        <MovieProvider.Provider value={[movieid,setmovieid]}>
            {children}
        </MovieProvider.Provider>
    )
}
export default MovieProvider