import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setYoutube} from '../../redux/actions.js';

function Intro() {
    const youtube = useSelector(state => state);
    const dispatch = useDispatch();
    const vidData = youtube.youtubeReducer.youtube;

    const api_key = "AIzaSyCx0QSN0lGvhIu9p-zYnEGvkJUvf3p_6vI";
    const playListId = 'PL5vDjxZRg7CT8LqNznxeqBKRL9b93tEko';
    const num = 5;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${api_key}&playlistId=${playListId}&maxResults=${num}`;
    
    const fetchYoutube = async () => {
        const response = await axios
            .get(url)
            .catch(err => console.error(err))
        dispatch(setYoutube(response.data.items));
    }

    useEffect(() => {
        fetchYoutube();
        console.log(vidData[4].snippet.thumbnails.medium.url);
    },[url]);
    return(
        <section id="intro">
            <div className="inner">
                <h2>RECENT YOUTUBE</h2>
                <div className="vidBox">
                    {
                        vidData.map((vid,index) => {
                            if(index < 5) {
                                return(
                                    <img alt="thumbnails" key={index} src={vid.snippet.thumbnails.medium.url} />
                                )
                            }
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Intro;