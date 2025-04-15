import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

function MovieProvider({ children }) {

    const [movies, setMovies] = useState({
        state: "loading"
    })

    useEffect(() => {
        fetch("http://localhost:3000/movies")
            .then((res) => res.json())
            .then((data) => {
                setMovies({
                    state: "success",
                    movie_data: data
                })
            })
            .catch((err) => {
                setMovies({
                    state: "error",
                    message: `error type: ${err}`
                })
            })
    }, [])

    return (
        <MovieContext.Provider
            value={{ movies }}
        >
            {children}
        </MovieContext.Provider>
    );
}

function useMovies() {
    const context = useContext(MovieContext);
    return context;
}



export { MovieProvider, useMovies };