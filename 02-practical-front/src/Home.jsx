import { useEffect, useState } from "react";
import Movielist from "./components/MovieList";
import axios from "axios";


const Home = () => {
    const [ListMovieData, setListMovieData] = useState([])

    useEffect(() => {
        getMovieList();
    }, []);

    const getMovieList = async () => {
        axios.get('http://localhost:3000/movies')
            .then(response => {
                setListMovieData(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            }
        )
    }


    return ( 
        <div>
            <Movielist movies= {ListMovieData}/>
        </div>


    );
}
 
export default Home;