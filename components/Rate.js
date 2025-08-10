"use client"
  
import React from 'react'  
import {sendEmail1} from '../app/api/sendEmail1/sendEmail1'

export default function Rate() {   
 
 
    const handleChange = (e) => {  

        const name = e.target.name;
        const value = e.target.value;
        setInputs((prevState) => ({ ...prevState, [name]: value}));
    };



    return (
        <>
<style
  dangerouslySetInnerHTML={{
    __html:
      "\n.custom-header-1 {\n    background-color: #231f20 ;\n}\n\n\n    \n  "
  }}
/>

<style
  dangerouslySetInnerHTML={{
    __html:
      "\n.myTextt {\n        display: inline-flex;\n    transform-style: preserve-3d;\n    backface-visibility: hidden;\n    transition: transform .4s ease, background-color .4s ease;\n    height: 42px;\n    border-radius: 4px;\n    margin: 0;\n    background-color: #fff;\n    border: 1px solid #FFF;\n    padding: 3px;\n    box-shadow: 0 17px 9px -15px rgb(0 0 0 / 50%);\n}\n\n\n    \n  "
  }}
/>


<style
  dangerouslySetInnerHTML={{
    __html: "\n.custom-header-1 {\n    height: 310px; \n}\n\n\n    \n  "
  }}
/>


            <div className="custom-header-1">
                <div className="container-xl">
                    <br />
                    <h4 className="text-center pt-3" style={{color: "#fff"}}>Leave Review</h4>
                </div>
            </div>
            <div className="container-xl  custom-page-1 " style={{background: "#f4f4f4", maxWidth:"700px"}}>
                <div>
                    <div className="pl-5 pt-4 pr-5">
                        <form action={async formData => { await sendEmail1(formData); }} style={{textAlign:"center"}}>
                            <div className="">
                                <div className="">
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <input
                                                className="form-control myTextt"
                                                name="name"
                                                type="text"
                                                placeholder="Name"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <textarea
                                                className="form-control form-control-text-area myTextt"
                                                name="message"
                                                placeholder="Message"
                                                rows={3}
                                                required
                                                onChange={handleChange}
                                                defaultValue={""}
                                            />
                                        </div>
                                    </div> 
                                </div>

                            </div>
                            <div className="form-group row pt-2">
                                <div className="col-sm-12">
                                    <button type="submit" className="klaviyo_submit_button" style={{padding: "1em", minWidth: "10%" }}>
                                        Send
                                    </button>
                                </div>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>

            </div>
            <div className="clearfix" />

        </>

    )
}
