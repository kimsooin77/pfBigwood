function Bigan() {
    const path = process.env.PUBLIC_URL;
    const imgSrc1 = `${path}/img/beganPic1.jpg`;
    const imgSrc2 = `${path}/img/beganPic2.jpg`;
    const began_bg = `${path}/img/began_bg.png`;

    return(
        <section id="bigan">
            <div className="inner">
                <div className="pic1">
                    <img src={imgSrc1}  />
                </div>
                <h2>HOW IT ALL BEGAN</h2>
                <p>After my military career as a Marine and my final tour in 2019, like many veterans, it was my first time since joining the military in my early 20’s where I had to go back to basics and decide on my next journey and career path. I grew up in the family business of building and renovating homes, so I have always been familiar with the process of making homes and people’s lives more beautiful. Through my first job after the Marine’s, I sort of fell into the wood business and began selling high quality slabs to builders and people doing DIY projects at home. I started experimenting with building furniture and discovered how amazing it was to watch a piece come together, as well as how happy it made my customers to take them home. I believe that so many moments and memories in life start in the home, and soon, the idea of Big Wood was born. I now run the business with help from some of my closest lifelong friends, family, and wife here in Nashville, TN!</p>
                <div className="began_bg">
                    <img src={ began_bg} />
                </div>
                <div className="pic2">
                    <img src={imgSrc2} />
                </div>
            </div>
        </section>
    )
}

export default Bigan;