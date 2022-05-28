import {useEffect, useState, useRef} from 'react';


function Community() {
    const pop = useRef(null);

    const path = process.env.PUBLIC_URL;
    const pic1 = `${path}/img/gallery1.jpg`;

    const input = useRef(null);
    const textarea = useRef(null);
    const showBox = useRef(null);
    const updateInput = useRef(null);
    const updateTextarea = useRef(null);

    const getLocalItems = () => {
        let data = localStorage.getItem("posts");

        if(data) {
            return JSON.parse(data);
        }else {
            return [
                { title : 'Hey there', content : 'Lorem ipsum dolor amet.'},
                { title : 'Hello', content : 'Lorem ipsum dolor amet.'},
                { title : 'Hi!', content : 'Lorem ipsum dolor amet.'},
                { title : 'Smile', content : 'Lorem ipsum dolor amet.'}
            ];
        }
    }

    const [posts, setPosts] = useState(getLocalItems);

    const createPost = () => {
        if(!input.current.value || !textarea.current.value) {
            alert('제목과 본문을 입력하세요.')
            return;
        }
        setPosts([
            {
                title : input.current.value,
                content : textarea.current.value
            }
            ,...posts
        ]);

        input.current.value = '';
        textarea.current.value = '';
    }

    const deletePost = index => {
        setPosts(
            posts.filter((_,inputIndex) => index !== inputIndex)
        )
    }

    const enableUpdate = index => {
        setPosts(
            posts.map((post,postIndex) => {
                if(postIndex === index) post.enableUpdate = true;
                return post;
            })
        ) 
        console.log(posts);
    }

    const disableUpdate = index => {
        setPosts(
            posts.map((post,postIndex) => {
                if(postIndex === index) post.enableUpdate = false;
                return post;
            })
        )
        console.log(posts);
    }

    const updatePost = index => {
        if(!updateInput.current.value || !updateTextarea.current.value) {
            alert('수정할 제목과 본문을 모두 입력하세요.');
            return;
        }
        setPosts(
            posts.map((post,postIndex) => {
                if(postIndex === index){
                    post.title = updateInput.current.value;
                    post.content = updateTextarea.current.value;
                    post.enableUpdate = false;
                }
                return post;
            })
        )
        console.log(posts);
    }

    useEffect(()=> {
        localStorage.setItem("posts", JSON.stringify(posts));
    },[posts]);

    return(
        <main className="community content">
            <div className="topPic">
                <aside ref={pop}>
                    <div className="top"></div>
                    <div className="right"></div>
                    <div className="bottom"></div>
                    <div className="left"></div>
                    <div className="topLeft"></div>
                </aside>
                        
                <p>Community</p>
                <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, doloribus!</span>
            </div>

            <div className="inner">
                <h1>Frequently Asked Questions</h1>
                <p>We’re on a mission to build the world’s best community for creatives to share, grow, and get hired.</p>

                <section className="inputBox">
                    <input 
                        type="text" 
                        placeholder='제목을 입력하세요' 
                        ref={input} 
                        />
                    <br />
                    <textarea 
                        placeholder='본문을 입력하세요' 
                        ref={textarea} 
                        cols="30" rows="5"
                        > 
                    </textarea>
                    <br />
                    <button onClick={() => {
                        input.value = '';
                        textarea.value = '';
                    }}>cancel</button>
                    <button onClick={createPost}>create</button>
                </section>

                <section className="showBox" ref={showBox}>
                    {
                        posts.map((post,index) => {
                            return(
                                <article key={index}>
                                    {
                                        // 1. 수정 버튼 클릭시 enableUpdate = true로 변함
                                        // 2. true인 값은 input과 textarea 입력과 취소 버튼을 출력
                                        // 3. false인 값은 (수정버튼을 클릭하지 않은 article) 원래 초기값인 defualtValue값을 출력
                                        post.enableUpdate
                                        ? 
                                        <>
                                            <div className="post">
                                                
                                                    <input ref={updateInput} type="text" defaultValue={post.title} />
                                                    <textarea ref={updateTextarea} defaultValue={post.content}></textarea>
                                                
                                            </div>

                                            <ul className="btns">
                                                <li onClick={() => updatePost(index)}>input</li>
                                                <li onClick={() => disableUpdate(index)}>cancel</li>
                                                
                                            </ul>
                                        </>
                                        :
                                        <>
                                            <div className="post">
                                                <h2>{post.title}</h2>
                                                <p>{post.content}</p>
                                            </div>

                                            <ul className="btns">
                                                <li onClick={() => enableUpdate(index)}>modify</li>
                                                <li onClick={() => deletePost(index)}>delete</li>
                                            </ul>
                                        </>
                                    }
                                </article>
                            )
                        })
                    }
                </section>

                <div className="backPic">

                </div>
                <div className="asidePic">
                    <div className="pic1">
                        <img alt='asidePic' src={pic1} />
                    </div>
                </div>
            
            
            </div>
        </main>


    )
}

export default Community;