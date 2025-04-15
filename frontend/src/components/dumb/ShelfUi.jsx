export default function ShelfUi(props) {
    const movieList = props.data
    console.log(movieList)
    return (
        <div className="d-flex">
            {movieList.map((singleMovie, index) => {
                { console.log(singleMovie) }
                return (
                    <div key={`${singleMovie.title}-card-${index}`}>
                        <h1>{singleMovie.title}</h1>
                        <span>{singleMovie.abstract}</span>
                    </div>
                )
            })}
        </div>
    )
}