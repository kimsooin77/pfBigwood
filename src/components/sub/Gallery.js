import axios from "axios";
import {useEffect , useRef, useState} from "react";
import Masonry from "react-masonry-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";



const body = document.querySelector("body");

const masonryOptions = {
    fitWidth :false,
    //columnWidth :200,
    gutter :0,
    itemSelector : ".item"
}

function Gallery() {
    const pop = useRef(null);

    let [items,setItems] = useState([]);
    let [loading, setLoading] = useState(true);
    let [isPop,setIsPop] = useState(false);
    let [index,setIndex] = useState(0);
    let [interest,setInterest] = useState(true);
    let [tree,setTree] = useState(true);
    let [sunset,setSunset] = useState(true);

    let list = useRef(null);
    let input = useRef(null);

    useEffect(() =>{
        setLoading(true);
        setInterest(false);
        setTree(true);
        setSunset(false);

        getFlickr({
            type : "tree",
            count : 15
        });
    },[]);

    return(
        <section  className="gallery">
            <div className="topPic">
            <aside ref={pop}>
                    <div className="top"></div>
                    <div className="right"></div>
                    <div className="bottom"></div>
                    <div className="left"></div>
                    <div className="topLeft"></div>
                </aside>
                        
                <p>Gallery</p>
                <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, doloribus!</span>
            </div>
            <div className="inner">
                <h1>Our Gallery</h1>

                <div className="boxes">
                    <div className="titPic">
                        <FontAwesomeIcon icon={faPagelines} />
                    </div>
                    <div className="tagBox">
                        <div className="inner">
                            <button  onClick={e => {
                                if(!interest) {
                                    list.current.classList.remove("on");
                                    setLoading(true);
                                    setInterest(true);
                                    setTree(false);
                                    setSunset(false);
                                    btnActive(e.target);
                                    getFlickr({
                                        type : "interest",
                                        count : 15
                                    })
                                }
                                
                            }}>INTEREST</button>
                            <button className="on" onClick={e => {
                                if(!tree){
                                    list.current.classList.remove("on");
                                    setLoading(true);
                                    btnActive(e.target);
                                    setInterest(false);
                                    setTree(true);
                                    setSunset(false);
                                    getFlickr({
                                        type : "tree",
                                        count : 15
                                    })

                                }
                            }}>TREE</button>
                            <button onClick={e => {
                                if(!sunset) {
                                    list.current.classList.remove("on");
                                    setLoading(true);
                                    btnActive(e.target);
                                    setInterest(false);
                                    setTree(false);
                                    setSunset(true);
                                    getFlickr({
                                        type : "sunset",
                                        count : 15
                                    })
                                }
                            }}>SUNSET</button>
                        </div>
                    </div>
                    <div className="searchBox">
                        <input type="text" ref={input} onKeyPress={e => {
                            if(e.key !== "Enter") return;

                            list.current.classList.remove("on");
                            setLoading(true);
                            
                            const tags = input.current.value;
                            input.current.value = "";

                            getFlickr({
                                type : "search",
                                count : 15,
                                tags : tags
                            });
                        }
                    
                        } />
                        <button
                            onClick={() => {
                                const tags = input.current.value;
                                if(tags === "") return;

                                list.current.classList.remove("on");
                                setLoading(true);

                                input.current.value = "";

                                getFlickr({
                                    type : "search",
                                    count : 15,
                                    tags : tags
                                });
                            }}
                            >SEARCH</button>
                    </div>
                </div>

                {(
                    loading 
                    ? 
                    <div class="load">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="shadow"></div>
                        <div class="shadow"></div>
                        <div class="shadow"></div>
                        <span>Loading</span>
                    </div>
                    : 
                    ""
                )}
                
                <div className="list" ref={list}>
                    <Masonry 
                        className={"frame"}
                        elementType={"ul"}
                        disableImagesLoaded={false}
                        updateOnEachImageLoad={false}
                        options={masonryOptions}
                    >
                        {
                            items.map((item,index) => {
                                const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;

                                return(
                                    <li key={index} className="item">
                                        <div className="inner">
                                            <div className="pic" onClick={()=> {
                                                setIsPop(true);
                                                setIndex(index);
                                                console.log(index);
                                            }}>
                                                <img src={imgSrc} />
                                            </div>
                                            <h2>{item.title}</h2>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </Masonry>
                </div>
            </div>

            {isPop ? <Pop /> : null}
        </section>
    )

    async function getFlickr(opt) {

        let url = "";

        const baseURL = "https://www.flickr.com/services/rest/?";
        const method1 = "flickr.interestingness.getList";
        const method2 = "flickr.photos.search";
        const method3 = "flickr.galleries.getPhotos";
        const method4 = "flickr.galleries.getPhotos";
        const key  = "7bc9dd83db29619be503141072e9b905";
        const count = opt.count;


        if(opt.type === "interest") {
             url = `${baseURL}method=${method1}&api_key=${key}&per_page=${count}&format=json&nojsoncallback=1`;
        }
        else if(opt.type === "tree") {
            let galleryId = "72157720445868717";
            url = `${baseURL}method=${method3}&api_key=${key}&per_page=${count}&format=json&nojsoncallback=1&privacy_filter=1&gallery_id=${galleryId}`;
        }
        else if(opt.type === "sunset") {
            let galleryId = "72157720487993310";
            url = `${baseURL}method=${method4}&api_key=${key}&per_page=${count}&format=json&nojsoncallback=1&privacy_filter=1&gallery_id=${galleryId}`;

        }
        else if(opt.type === "search") {
             url = 
            `${baseURL}method=${method2}&api_key=${key}&per_page=${count}&format=json&nojsoncallback=1&tags=${opt.tags}`;
        }else {
            console.error("api요청 타입을 interest, tree, sunset, search 중에서 지정하세요.")
        }

        await axios
            .get(url)
            .then(json => {
                setItems(json.data.photos.photo);
            });

        setTimeout(() => {
            list.current.classList.add("on");
            setLoading(false);
        },2000);
    }

    function btnActive(btn) {
        const galleryBtn = document.querySelectorAll(".gallery .inner .boxes .tagBox .inner button");

        for(let btn of galleryBtn) {
            btn.classList.remove("on");
        }
        btn.classList.add("on");
    }

    function Pop() {
        const imgSrc = `https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`;

        useEffect(()=> {
            console.log("pop 생성");
            body.style.overflow = "hidden";

            return() => {
                console.log("pop 제거");
                body.style.overflow = 'auto';
            }
        },[]);

        return(
            <aside className="pop">
                <img src={imgSrc} />
                <p>{items[index].title}</p>
                <span onClick={() => {
                    setIsPop(false);
                }}>Close</span>
            </aside>
        )
    }
}

export default Gallery;

