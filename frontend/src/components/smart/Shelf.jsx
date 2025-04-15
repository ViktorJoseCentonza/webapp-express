import { useMovies } from "../../contexts/MovieContext";
import ShelfUi from "../dumb/ShelfUi";
export default function Shelf() {

    const { movies } = useMovies()

    switch (movies.state) {
        case 'loading':
            return <h1>loading...</h1>

        case 'success':
            return <ShelfUi data={movies.movie_data} />

        case 'error':
            return (
                <>
                    <h1>{movies.state}</h1>
                    <span>{movies.message}</span>
                </>
            )
    }

}