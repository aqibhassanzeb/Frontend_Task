import React from 'react'
import logo from '../../assets/logo.png'
import './Landing.css'
import { useNavigate } from 'react-router-dom'
const Landing = () => {

    const navigate = useNavigate()
    const UserData = [
        {
            name: 'Manage',
            headibg: 'Simplify teaching and learning',
            image: require('../../assets/firstimage.png'),
            list: "Add students directly, or share a code or link so the whole class can join",
            list2: "Set up a class in minutes and create class work that appear on students’ calendars",
            list3: "Easily communicate with guardians and automatically send them updates",
        },

        {
            name: 'MEASURE',
            headibg: 'Move students forward',
            image: require('../../assets/one.png'),
            list: "Store frequently used feedback in your comment bank for fast, personalized responses",
            list2: "Grade consistently and transparently with rubrics integrated into student work",
            list3: "Enable originality reports to let students scan their own work for potential plagiarism",
        },
        {
            name: 'SECURE',
            headibg: 'Keep your data protected',
            image: require('../../assets/third.png'),
            list: "Ensure each user has a unique sign-in to keep individual accounts secure",
            list2: "Restrict Classroom activity to members of the class",
            list3: "Protect student privacy - student data is never used for advertising purposes",
        },
        {
            name: 'COLLABORATE',
            headibg: 'Strengthen student connections',
            image: require('../../assets/fourth.png'),
            list: "Connect with your students from anywhere with a hybrid approach for in-class and virtual classes",
            list2: "Communicate important announcements to the Stream page",
            list3: "Enable face-to-face connections with students using Google Meet built into Classroom",
        }
    ]
    return (
        <div>
            <div style={{ height: "64px" }} className="border d-flex justify-content-between align-items-center px-3 py-2">
                <img src={logo} className="logoimage" alt="" />

                <button className="sign-btn" onClick={() => navigate('./login')}>Sign In</button>
            </div>
            <div className="userimage">

                <div className="d-flex align-items-center flex-column position-relative p-2 h-100 w-100 justify-content-center">
                    <h1 className="text-white  font-weight-bold m-0 heading_get" >Get more time to teach</h1>
                    <h1 className="text-white  font-weight-bold heading_get" >and inspire learners with Classroom</h1>
                    <p className="text-white m-0 para_text" style={{ fontSize: "18px" }}>A free and easy tool helping educators efficiently manage and assess progress, while</p>
                    <p className="text-white para_text" style={{ fontSize: "18px" }} >enhancing connections with learners from school, from home, or on the go.</p>
                </div>

            </div>

            <div className="container">
                <div className="row my-4 ">

                    {
                        UserData.map((data, index) => {
                            if ((1 + index) % 2 !== 0) {
                                return (
                                    <>
                                        <div key={index} className="col-md-12 col-lg-7 col-sm-12  my-4 ">
                                            <div className="spanMaindiv ">
                                                <span className="span_data">{data.name}</span>
                                                <h3 className="map_head">{data.headibg}</h3>
                                                <ul className="p-0">
                                                    <li className="list_data">{data.list}</li>
                                                    <li className="list_data">{data.list2}</li>
                                                    <li className="list_data">{data.list3}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-12   col-lg-4 offset-lg-1   col-sm-12 my-4">
                                            <img src={data.image} className="userlistimga" alt="" />
                                        </div>
                                    </>
                                )
                            } else {

                            }
                            return (
                                <>
                                    <div className='d-lg-flex flex-lg-row-reverse'>

                                        <div key={index} className="col-md-12 col-lg-6 col-sm-12  offset-lg-2 my-4 ">
                                            <div className="spanMaindiv ">
                                                <span className="span_data">{data.name}</span>
                                                <h3 className="map_head">{data.headibg}</h3>
                                                <ul className="p-0">
                                                    <li className="list_data">{data.list}</li>
                                                    <li className="list_data">{data.list2}</li>
                                                    <li className="list_data">{data.list3}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-12  col-lg-4   col-sm-12 my-4">
                                            <img src={data.image} className="userlistimga" alt="" />
                                        </div>
                                    </div>

                                </>
                            )
                        }
                        )}
                </div>
            </div>
            <div className="footer_section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 main_Footer ">
                            <div className="image_text ">
                                <img src={logo} className="logoimage" alt="" />
                                <div className="d-flex">
                                    <p className="m-0 pl-4 pr-4  privacy">Privacy</p>
                                    <p className="m-0 pl-4  privacy2">Terms & Conditions</p>
                                </div>
                            </div>
                            <p className="m-0 copyright">Copyright © 2020 Froebels. All rights reserved</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Landing