import { useEffect } from "react";
import {useState, useRef} from "react";
import {useSelector} from 'react-redux';

const body = document.querySelector("body");

function Youtube() {
    const pop = useRef(null);
    const frame = useRef(null);

    const path = process.env.PUBLIC_URL;
    const logoSrc = `${path}/img/began_bg.png`;

    
    let [isPop,setIsPop] = useState(false);
    let [index,setIndex] = useState(0);

    const youtube = useSelector(state=>state);
    const vidData = youtube.youtubeReducer.youtube;
    console.log(vidData);

    useEffect(() => {
        frame.current.classList.add("on");
    },[]);

    return(
        <main className="youtube">
            <div className="topPic">
            <aside ref={pop}>
                    <div className="top" ></div>
                    <div className="right"></div>
                    <div className="bottom"></div>
                    <div className="left"></div>
                    <div className="topLeft"></div>
                </aside>
                        
                <p>Youtube</p>
                <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, doloribus!</span>
            </div>
            <div className="inner" >
                <h1><a href="#">Youtube</a></h1>
                <img className="logoBg" src={logoSrc} alt="logoBg" />
                <section className="frame" ref={frame}>
                    {
                        vidData.map((item,index) => {
                            let tit = item.snippet.title;
                            let tit_len = tit.length;
                            let date = item.snippet.publishedAt;

                            return(
                                <article key={index} >
                                    <div className="inner">
                                        <div className="pic" onClick={() => {
                                            setIsPop(true);
                                            setIndex(index);
                                        }}>
                                            <img alt="thumbnails" src={item.snippet.thumbnails.medium.url} />
                                            
                                        </div>
                                        <div className="txt">
                                            <h2>{(tit_len > 30) ? tit = tit.substr(0,30)+"..." : tit}</h2>
                                            <span>{date}</span>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas suscipit dignissimos placeat et quo voluptatem voluptate nulla assumenda repellendus. Doloremque?</p>
                                            <a href="#" onClick={e => {
                                                e.preventDefault();
                                            }}>MORE INFO</a>
                                        </div>
                                    </div>
                                </article>
                            )
                        })
                    }
                </section>
            </div>
            {isPop ? <Pop /> : null}
        </main>
    )

    function Pop(){

        useEffect(() => {
            body.style.overflow = "hidden";

            return() => {
                body.style.overflow = "auto"
            }
        })
        return(
            <aside className="pop">
                <iframe src={"https://www.youtube.com/embed/"+vidData[index].snippet.resourceId.videoId} width='100%' height='100%' allowFullScreen></iframe>
                <span onClick={() => {
                    setIsPop(false);
                }}>Close</span>
            </aside>
        )
    }
}

export default Youtube;