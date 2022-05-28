import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsClapping } from "@fortawesome/free-solid-svg-icons";

function Join() {
    const pop = useRef(null);

    const initVal = {
        userid : '',
        pwd1 : '',
        pwd2 : '',
        email : '',
        gender : '',
        interests : '',
        dimensions : '',
        comments : ''
    }

    const [val, setVal] = useState(initVal);
    const [err, setErr] = useState({});
    const [ isSubmit , setIsSubmit] = useState(false);
    const [success, setSuccess] = useState(false);
    

    const handleChange = e => {
        const {name, value} = e.target;
        setVal({...val, [name] : value});
    }

    const handleCheck = e => {
        const {name} = e.target;
        const ischeck = e.target.checked;
        setVal({...val,[name] : ischeck})
    } 

    const handleSelect = e => {
        const {name} = e.target;
        const isSelected = e.target.options[e.target.selectedIndex].value;
        setVal({...val, [name] : isSelected});
    }

    const handleSubmit = e =>{
        e.preventDefault();

        setIsSubmit(true);
        setErr(check(val));
    }

    const check = val => {
        let errs = {};
        const eng = /[a-zA-Z]/;
        const num = /[0-9]/;
        const spc = /[!@#$%^&*]/;

        if(!val.userid || val.userid.length < 5) {
            errs.userid = `아이디를 5글자 이상 입력하세요.`
        }
        if(!val.pwd1 || val.pwd1.length < 5 || !eng.test(val.pwd1) || !num.test(val.pwd1) || !spc.test(val.pwd1)) {
            errs.pwd1 = `문자, 숫자, 특수문자를 모두 포함한 5글자 이상 입력하세요.`
        }
        if(!val.pwd2 || val.pwd1 !== val.pwd2) {
            errs.pwd2 = `비밀번호가 일치하지 않습니다.`
        }
        if(!val.email || val.email.length < 8 || !/@/.test(val.email) ) {
            errs.email = `이메일 주소를 8글자 이상 입력하세요.`
        }
        if(!val.gender ) {
            errs.gender = `성별을 선택하세요.`;
        }
        if(!val.interests) {
            errs.interests = `관심사를 하나 이상 선택하세요.`;
        }
        if(!val.dimensions) {
            errs.dimensions = `원하는 치수를 선택해주세요.`;
        }
        if(!val.comments || val.comments < 10) {
            errs.comments = `남기는 말을 10글자 이상 입력하세요.`;
        }

        return errs;
    }

    useEffect(() => {
        const len = Object.keys(err).length;
        if(len === 0 && isSubmit) {
            console.log('인증 성공');
            setSuccess(true);
        }else {
            console.log('인증 실패');
            setSuccess(false);
        }
    },[err]);

    return(
        <div id="join">
            <div className="topPic">
            <aside ref={pop}>
                    <div className="top"></div>
                    <div className="right"></div>
                    <div className="bottom"></div>
                    <div className="left"></div>
                    <div className="topLeft"></div>
                </aside>
                        
                <p>Join</p>
                <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, doloribus!</span>
            </div>
            <div className="inner">
                <div className="pic">

                </div>
                <h2>REQUEST A CUSTOM PIECE</h2>
                <p className="p1">We can't wait to hear more about your vision! We'll send you in an email within a few business days with a quote to get started.</p>
                <div className="icons">
                    <a href="#" className="message"><i className="fas fa-envelope"></i>blgwoodnash@gmail.com</a>
                    <a href="#" className="phone"><i className="fas fa-phone-alt"></i>847-767-2126</a>
                    <span>PAYMENT & CANCELLATION POLICIES</span>
                </div>
               
                <p className="p2">
                We require a 50% deposit to start production on a piece, which is non-refundable. Remaining balance is due upon delivery or pickup. You may cancel your piece at any time, but once production has started we cannot use your deposit towards another piece as the materials and supplies have already been purchased. 
                </p>

                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend className="h">회원가입 입력 폼 양식</legend>

                        <table>
                            <caption className="h">회원가입 입력</caption>
                            <tbody>
                                {/* user-id */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="userid">USER ID</label>
                                    </th> 
                                    <td>
                                        <input 
                                        type="text" 
                                        name="userid" 
                                        id="userid"
                                        placeholder="FIRST AND LAST NAME"
                                        onChange={handleChange}
                                        />
                                        <span className="err">{err.userid}</span>
                                    </td>
                                </tr>
                                {/* password1 */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="pwd1">PASSWORD1</label>
                                    </th> 
                                    <td>
                                        <input 
                                        type="password" 
                                        name="pwd1" 
                                        id="pwd1"
                                        placeholder="PASSWORD"
                                        onChange={handleChange}
                                        />
                                        <span className="err">{err.pwd1}</span>
                                    </td>
                                </tr>
                                {/* password2 */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="pwd2">RE-PASSWORD1</label>
                                    </th> 
                                    <td>
                                        <input 
                                        type="password" 
                                        name="pwd2" 
                                        id="pwd2"
                                        placeholder="CHECK PASSWORD"
                                        onChange={handleChange}
                                        />
                                        <span className="err">{err.pwd2}</span>
                                    </td>
                                </tr>
                                {/* email */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="email">E-MAIL</label>
                                    </th> 
                                    <td>
                                        <input 
                                        type="email" 
                                        name="email" 
                                        id="email"
                                        placeholder="EMAIL ADDRESS"
                                        onChange={handleChange}
                                        />
                                        <span className="err">{err.email}</span>
                                    </td>
                                </tr>
                                {/* dimensions */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="dimensions">DIMENSIONS</label>
                                    </th>
                                    <td>
                                        <select name="dimensions" id="dimensions" onChange={handleSelect}>
                                            <option value="">DESIRED DIMENSIONS</option>
                                            <option value="single">1,000 * 2,100</option>
                                            <option value="double">1,100 * 2,100</option>
                                            <option value="queen">1,300 * 2,100</option>
                                            <option value="king">1,700 * 2,100</option>
                                        </select>
                                        <span className="err">{err.dimensions}</span>
                                    </td>
                                </tr>
                                {/* comments */}
                                <tr>
                                    <th scope="row">
                                        <label htmlFor="comments">COMMENTS</label>
                                    </th> 
                                    <td>
                                        <textarea 
                                        col="30"
                                        rows="10"
                                        name="comments" 
                                        id="comments"
                                        placeholder="QUESTIONS / COMMENTS"
                                        onChange={handleChange}
                                        />
                                        <span className="err">{err.comments}</span>
                                    </td>
                                </tr>
                                {/* gender */}
                                <tr>
                                    <th scope="row">GENDER</th>
                                    <td>
                                        <label htmlFor="male">MALE</label>
                                        <input 
                                        type="radio" 
                                        name="gender"
                                        id="male" 
                                        onChange={handleCheck}
                                        />

                                        <label htmlFor="female">FEMALE</label>
                                        <input 
                                        type="radio" 
                                        name="gender" 
                                        id="female" 
                                        onChange={handleCheck}
                                        />
                                        <span className="err">{err.gender}</span>
                                    </td>
                                </tr>
                                {/* interests */}
                                <tr>
                                    <th scope="row">INTERESTS</th>
                                    <td>
                                        <label htmlFor="benches">BANCHES</label>
                                        <input 
                                        type="checkbox" 
                                        id="banches" 
                                        name="interests"
                                        onChange={handleCheck}
                                        />

                                        <label htmlFor="tables">TABLES</label>
                                        <input 
                                        type="checkbox" 
                                        id="tables" 
                                        name="interests"
                                        onChange={handleCheck}
                                        />

                                        <label htmlFor="beds">BEDS</label>
                                        <input 
                                        type="checkbox" 
                                        id="beds" 
                                        name="interests"
                                        onChange={handleCheck}
                                        />

                                        <span className="err">{err.interests}</span>
                                    </td>
                                </tr>
                                {/* btn set */}
                                <tr>
                                    <th colSpan={2} className="btnSet">
                                        <input type="reset" value="CANCEL" />
                                        <input type="submit" value="SUBMIT" />
                                   </th>
                                </tr>
                            </tbody>
                        </table>
                    </fieldset>
                </form>
                {success ? <Pop /> : null} 
            </div>
        </div>
    )

    function Pop() {
        return(
            <aside className="pop">
                <h1>회원가입을 축하드립니다!</h1>
                <div className="clapPic">
                    <FontAwesomeIcon icon={faHandsClapping} />
                </div>
                <button className="close" onClick={e => {
                    setSuccess(false);
                }}>CHECK</button>
            </aside>
        )
    }
}

export default Join;