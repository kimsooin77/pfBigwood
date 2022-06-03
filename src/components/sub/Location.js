import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";

function Location() {
    const pop = useRef(null);

    const {kakao} = window;
    const container = useRef(null);
    const btnBranch = useRef(null);
    const [index, setIndex] = useState(0);
    const [map, setMap] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [places,setPlaces] = useState([]);
    const path = process.env.PUBLIC_URL;

    
    const info = [
        {
          title : "LA", 
          latlng : new kakao.maps.LatLng(37.3933466,126.6446259),
          imgSrc : process.env.PUBLIC_URL+"/img/marker1.png", 
          imgSize : new kakao.maps.Size(170, 99),
          imgPos : {offset: new kakao.maps.Point(116, 99)}
        },
        {
          title : "San Francisco", 
          latlng : new kakao.maps.LatLng(37.5842897,127.1359799),
          imgSrc : process.env.PUBLIC_URL+"/img/marker2.png", 
          imgSize : new kakao.maps.Size(170, 99),
          imgPos : {offset: new kakao.maps.Point(116, 99)}
        },
        {
          title : "NEW YORK", 
          latlng : new kakao.maps.LatLng(37.6666482,127.0412337),
          imgSrc : process.env.PUBLIC_URL+"/img/marker3.png", 
          imgSize : new kakao.maps.Size(170, 99),
          imgPos : {offset: new kakao.maps.Point(116, 99)}
        }
      ];
      

    const [mapInfo] = useState(info);

    useEffect(() => {
        axios
            .get(`${path}/db/locationInfo.json`)
            .then(json => {
                setPlaces(json.data.data);
            });
    },[])

    useEffect(() => {
        container.current.innerHTML="";
        const options = {
            center: mapInfo[index].latlng, 
            level: 3 
        }

        const map = new kakao.maps.Map(container.current, options);
        setMap(map);

        new kakao.maps.Marker({
            map : map,
            position :mapInfo[index].latlng,
            title: mapInfo[index].title,
            image : new kakao.maps.MarkerImage(mapInfo[index].imgSrc, mapInfo[index].imgSize, mapInfo[index].imgPos)
        });

        map.setCenter(mapInfo[index].latlng);

        const mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl,kakao.maps.ControlPosition.TOPRIGHT);
        map.setZoomable(true);
        map.setDraggable(true);

        for(const btn of btnBranch.current.children) btn.classList.remove("on");
        btnBranch.current.children[index].classList.add("on");

        const mapSet = () => map.setCenter(mapInfo[index].latlng);
        window.addEventListener("resize", mapSet);

        return () => {
            window.removeEventListener("resize", mapSet);
        }

    },[index]);

    
    return(
        <div id="location">
            <div className="topPic">
            <aside ref={pop}>
                    <div className="top"></div>
                    <div className="right"></div>
                    <div className="bottom"></div>
<<<<<<< HEAD
                    <div className="left" ></div>
                    <div className="topLeft"></div>
=======
                    <div className="left"></div>
                    <div className="topLeft"}></div>
>>>>>>> d39775a9b1896f5bb1a4ba49068c1b96fc73561f
                </aside>
                        
                <p>Location</p>
                <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, doloribus!</span>
            </div>
            <div className="inner">

            <div className="txtBox">
                {
                    places.map((item,index) => {
                        return(
                            <article key={index}>
                                <h1>{item.title}</h1>
                                <p>{item.address}</p>
                                <p>{item.num}</p>
                                <span>{item.email}</span>
                            </article>
                        )
                    })
                }
                </div>
                
                <div id="map" ref={container}></div>
                <div className="wrap">
                    <h1>BIG WOOD Info</h1>
                    <h2>Contacts</h2>
                    <ul className="contacts">
                        <li><p>Phone</p> <span>+1 (800) 123 45 46</span></li>
                        <li><p>Address</p> <span>34th Ave, Queens, NY 11106</span></li>
                        <li><p>Website</p><span>www.bigwood.com</span></li>
                    </ul>
                    <h2>Opening Hours</h2>
                    <ul className="opening">
                        <li><p>Monday - Saturday</p><span>10 a.m. - 5 p.m.</span></li>
                        <li><p>Sunday</p><span>11 a.m. - 5 p.m.</span></li>
                    </ul>
                </div>
                
                <div className="btns">
                    <ul className="branch" ref={btnBranch}>
                        <li onClick={() => {
                            setIndex(0);
                        }}>LA</li>
                        <li onClick={() => {
                            setIndex(1);
                        }}>San Francisco</li>
                        <li onClick={() => {
                            setIndex(2);
                        }}>NEW YORK</li>
                    </ul>
                    <ul className="traffic">

                    {
                        toggle ?
                            <li onClick={()=>{
                                map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  
                                
                                setToggle(!toggle);
                            }}>Turn Off Traffic Info</li>
                            //토글값이 false일때 켜기버튼 활성화
                            :            
                            <li onClick={()=>{           
                                map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                                
                                setToggle(!toggle);
                            }}>View Traffic Info</li>  
                    }

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Location;
