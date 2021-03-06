import { useEffect } from 'react';
import { useRef, useState } from 'react';
import {NavLink} from 'react-router-dom';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

function Header(){
    const path = process.env.PUBLIC_URL;
    const gnbMo = useRef(null);
    const popup = useRef(null);
    const checkBox = useRef(null);
    const logoPic = `${path}/img/logoPic.png`;
    const mainPic1 = `${path}/img/mainhomeBg.jpg`;
    const mainPic2 = `${path}/img/department22.jpg`;
    const mainPic3 = `${path}/img/homeBg.jpg`;
    const [isShow,setIsShow] = useState(false);

    useEffect(() => {
      if(!document.cookie.includes("pop=true")){
        popup.current.classList.add("on");
      }
    },[]);

    const handleCookie = () => {
      if(checkBox.current.checked) {
        document.cookie = "pop=true; path=/; max-age=86400"; 
      }else {
        document.cookie = "pop=true; path=/; max-age=-1";
      }
      popup.current.classList.remove("on");
      popup.current.classList.add("off");
    }

    return (
      <header>
        <div className="inner">
           <Swiper
            spaceBetween={0}
            loop={true}
            pagination={{
              clickable: true,
            }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide><div className="pic"><img alt='mainPic' src={mainPic1} /></div></SwiperSlide>
              <SwiperSlide><div className="pic"><img alt='mainPic2' src={mainPic2} /></div></SwiperSlide>
              <SwiperSlide><div className="pic"><img alt='mainPic3' src={mainPic3} /></div></SwiperSlide>
            </Swiper>
          <div className="wrap">
            <h1><NavLink exact to="/" ><img src={logoPic}  /><span>BIG WOOD</span></NavLink></h1>
  
            <ul id="gnb">
              <li><NavLink exact to="/department">Department</NavLink></li>
              <li><NavLink exact to="/community">Community</NavLink></li>
              <li><NavLink exact to="/gallery">Gallery</NavLink></li>
              <li><NavLink exact to="/youtube">Youtube</NavLink></li>
              <li><NavLink exact to="/location">Location</NavLink></li>
              <li><NavLink exact to="/join">Join</NavLink></li>
            </ul>
            
          </div>
          
          <div className='menuBtn' onClick={ () => setIsShow(true)}>
              <span>?????? ??????</span>
          </div>
          <ul id="gnbMo" ref={gnbMo} className={isShow ? "yes" : "no"} >
              <li><NavLink exact to="/" ><img src={logoPic}  /><span></span></NavLink></li>
              <li><NavLink exact to="/department">Department</NavLink></li>
              <li><NavLink exact to="/community">Community</NavLink></li>
              <li><NavLink exact to="/gallery">Gallery</NavLink></li>
              <li><NavLink exact to="/youtube">Youtube</NavLink></li>
              <li><NavLink exact to="/location">Location</NavLink></li>
              <li><NavLink exact to="/join">Join</NavLink></li>
              <li><a href="#" onClick={ e => {
                e.preventDefault();

                setIsShow(false)
              }}>X</a></li>
            </ul>

            <aside id="popup" ref={popup}>
              <div className="inner">
                <div className="content">
                  <h1>Big Wood</h1> 
                  <span>???????????????.<br /> ?????????????????? ???????????????. <br />??? ???????????? Crome??? ??????????????? ????????????. <br />?????? ????????? <strong>"???????????????"</strong>??? ?????? ???????????? ??? ????????????.<br /><br /> ???????????????.</span>
                  <div onClick={handleCookie} className='closeBtn'>CLOSE</div>
                </div>

                <div className="wrap">
                  <input type="checkbox" ref={checkBox} name="ck" id="ck" />
                  <label >?????? ?????? ?????? ??????</label>
                </div>
              </div>
            </aside>
        </div>
      </header>
    )
  }
  
  export default Header;