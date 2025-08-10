'use client'
import { useState, useEffect } from 'react'
import { sendEmail } from '../app/api/sendEmail/sendEmail'
import { TempProps1 } from "../types"; 

interface CarCardProps {
    temp: TempProps1;
}


const Footer = () => {
    
    const [isFoot1, setIsFoot1] = useState(true);
    const [isFoot2, setIsFoot2] = useState(true);
    const [isFoot3, setIsFoot3] = useState(true);
    const [allTemp, setTemp] = useState<any>()








    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/category");
                const data = await response.json();
                setTemp(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);


    const handleFoot = () => {
        var d2 = document.getElementById("footId1");
        setIsFoot1(!isFoot1);
        if (d2) {
            if (isFoot1) {
                d2.className += " open";
            }
            else {
                d2.classList.remove("open");
            }
        }
    };

    const handleFoot2 = () => {
        var d2 = document.getElementById("footId2");
        setIsFoot2(!isFoot2);
        if (d2) {
            if (isFoot2) {
                d2.className += " open";
            }
            else {
                d2.classList.remove("open");
            }
        }
    };

    const handleFoot3 = () => {
        var d2 = document.getElementById("footId3");
        setIsFoot3(!isFoot3);
        if (d2) {
            if (isFoot3) {
                d2.className += " open";
            }
            else {
                d2.classList.remove("open");
            }
        }
    };

    return (
        <footer
            data-roybell=""
            data-location="footer"
            id="SiteFooter"
            className="SiteFooter hide"
        >
            <style
                type="text/css"
                dangerouslySetInnerHTML={{
                    __html:
                        '.NewsletterSignupModalWrapper{z-index:9999999999999;display:none;position:fixed;top:0;right:0;bottom:0;left:0}.NewsletterSignupModalWrapper_Backdrop{opacity:0;transition:opacity .3s ease;position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,0.4);z-index:1}.NewsletterSignupModal{opacity:0;transition:opacity .3s ease;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);max-width:346px;max-height:477px;min-height:477px;width:calc(100vw - 40px);height:calc(100vh - 40px);z-index:2;background-color:#f4f4f4}.NewsletterSignupModal img{object-fit:cover;width:100%;position:absolute;bottom:-1px}.NewsletterSignupModal_Close{position:absolute;z-index:2;top:15px;right:11px;width:20px;height:20px;background:none;border:none;cursor:pointer;outline:none}.NewsletterSignupModal_Close:before,.NewsletterSignupModal_Close:after{content:\'\';position:absolute;width:23px;height:1px;background:#fff;top:50%;left:50%}.NewsletterSignupModal_Close:before{transform:translate(-50%, -50%) rotate(45deg)}.NewsletterSignupModal_Close:after{transform:translate(-50%, -50%) rotate(-45deg)}.NewsletterSignupModal_Inner{padding:58px 18px 0 18px}.NewsletterSignupModal_Inner .NewsletterSignup_InputWrapper_Front{border:1px solid #ccc}.NewsletterSignupModal_Inner_Disclaimer a,.NewsletterSignupModal_Inner_Disclaimer a:hover,.NewsletterSignupModal_Inner_Disclaimer a:visited,.NewsletterSignupModal_Inner_Disclaimer a:focus{text-decoration:underline;color:#1f1a17}@media (min-width: 1000px){.NewsletterSignupModal{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);max-width:800px;max-height:376px;min-height:auto;width:800px;height:376px;z-index:2}.NewsletterSignupModal_Inner_Preheading,.NewsletterSignupModal_Inner_Heading,.NewsletterSignupModal_Inner_Disclaimer{text-align:left}.NewsletterSignupModal img{max-height:550px;width:unset;height:112%;position:absolute;bottom:0}.NewsletterSignupModal_Inner{padding:0 70px 0 0;position:absolute;left:376px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center}.NewsletterSignupModal_Inner_Disclaimer{text-align:left}}@media (min-width: 1280px){.NewsletterSignupModal{max-width:1040px;max-height:490px;width:1040px;height:490px}.NewsletterSignupModal_Inner{left:490px}.NewsletterSignupModal_Inner_Heading{line-height:3.5rem;font-size:2.75rem}}.NewsletterSignupModalWrapper.active{display:block}.NewsletterSignupModalWrapper.show .NewsletterSignupModalWrapper_Backdrop,.NewsletterSignupModalWrapper.show .NewsletterSignupModal{opacity:1}.pageHeaderMenuOverlay.pageHeaderMenuOverlays--newsletter.open{display:none !important}.NewsletterSignupModal_Component{position:relative;font-family:"Lato", sans-serif;-webkit-font-smoothing:antialiased;max-width:100% !important}.NewsletterSignupModal_Component .klaviyo_helptext{font-family:"PT Serif", serif;padding-top:10px}.NewsletterSignupModal_Component .klaviyo_gdpr_text{font-family:"PT Serif", serif;font-size:14px;line-height:1.3}.NewsletterSignupModal_Component label{color:#fff}.NewsletterSignupModal_Component .klaviyo_field_group{display:flex;transform-style:preserve-3d;backface-visibility:hidden;transition:transform .4s ease, background-color .4s ease;height:42px;border-radius:4px;margin:0;background-color:#fff;border:1px solid #FFF;padding:3px;box-shadow:0 15px 15px -10px rgba(0,0,0,0.3)}.NewsletterSignupModal_Component .klaviyo_field_group .klaviyo_form_actions{text-align:left}.NewsletterSignupModal_Component input[type=checkbox]+label{display:inline;font-weight:normal;padding-left:5px}.NewsletterSignupModal_Component input[type=text],.NewsletterSignupModal_Component input[type=email]{font-family:Lato, sans-serif;font-size:12px;font-weight:700;border-radius:0px;border:none;outline:none;transition:background .1s ease}.NewsletterSignupModal_Component input[type=email]::placeholder{color:#b0b0b0;letter-spacing:0.5px}.NewsletterSignupModal_Component input[type=email]:focus+.klaviyo_form_actions .klaviyo_submit_button,.NewsletterSignupModal_Component input[type=email]:valid+.klaviyo_form_actions .klaviyo_submit_button{background:#1f1a17}.NewsletterSignupModal_Component .klaviyo_submit_button{font-family:"Lato", sans-serif;font-size:12px;font-weight:700;background:#d7d7d7;text-align:center;padding:0 5px;min-width:64px;outline:none;border:0;border-radius:4px;color:#fff;text-transform:uppercase;letter-spacing:1.5px;cursor:pointer}.NewsletterSignupModal_Component .klaviyo_messages{margin-top:5px;font-family:"Lato", sans-serif;font-size:12px;font-weight:normal}.NewsletterSignupModal_Component .klaviyo_messages .error_message{display:flex;font-family:"Lato", sans-serif;font-size:12px;font-weight:700;color:#c43e22;letter-spacing:.5px;text-align:left;margin-top:10px}.NewsletterSignupModal_Component .klaviyo_messages .error_message:before{display:inline-block;content:"\\2191";font-size:10px;padding:0 5px}.NewsletterSignupModal_Component .klaviyo_messages .success_message{color:#1f1a17;background-color:#fff;padding:9px;border-radius:3px;font-family:"Lato", sans-serif;font-size:12px;font-weight:700;text-align:center;box-shadow:0 15px 15px -10px rgba(0,0,0,0.3)}.NewsletterSignupModalWrapper.NewsletterSignupIPhoneSE .NewsletterSignupModal{background-image:url("https://bellroy-cms-images.imgix.net/4429/newsletter-sign-up-image-mobile.jpg?auto=format&fit=max")}@media (min-width: 1000px){.NewsletterSignupModalWrapper.NewsletterSignupIPhoneSE .NewsletterSignupModal{background-image:url("https://bellroy-cms-images.imgix.net/4430/iphone-sign-up-image-desktop.jpg?auto=format&fit=max")}}\n'
                }}
            />
            <style
                type="text/css"
                dangerouslySetInnerHTML={{
                    __html:
                        ".NewsletterSignupFooter{display:block;background:#fff;padding:20px 15px}.NewsletterSignupFooter_Component{margin:20px auto;min-height:42px;max-width:454px}.NewsletterSignupFooter_Disclaimer{max-width:454px;margin:0 auto}.NewsletterSignupFooter_Disclaimer a,.NewsletterSignupFooter_Disclaimer a:hover,.NewsletterSignupFooter_Disclaimer a:visited,.NewsletterSignupFooter_Disclaimer a:active{color:#1f1a17}@media (min-width: 1280px){.NewsletterSignupFooter_Heading{line-height:2.5rem;font-size:1.75rem}}\n"
                }}
            />
            <div className="NewsletterSignupFooter">
                <h2 className="NewsletterSignupFooter_Heading br_text-2xl br_text-center mytitle4">
                    Get exclusive access to new products, deals &amp; surprise treats.
                </h2>
                <div className="NewsletterSignupFooter_Component">
                    <style
                        type="text/css"
                        dangerouslySetInnerHTML={{
                            __html:
                                '\n      .NewsletterSignupFooter_Component {\n        position: relative;\n           -webkit-font-smoothing: antialiased;\n     text-align: center;      }\n\n      .NewsletterSignupFooter_Component .klaviyo_helptext {\n        font-family: "PT Serif", serif;\n        padding-top: 10px;\n      }\n\n      .NewsletterSignupFooter_Component .klaviyo_gdpr_text {\n        font-family: "PT Serif", serif;\n        font-size: 14px;\n        line-height: 1.3;\n      }\n\n      .NewsletterSignupFooter_Component label {\n        color:#fff;\n      }\n\n      .NewsletterSignupFooter_Component .klaviyo_field_group {\n        display: inline-flex;\n        transform-style: preserve-3d;\n        backface-visibility: hidden;\n        transition: transform .4s ease, background-color .4s ease;\n        height: 42px;\n        border-radius: 4px;\n        margin: 0;\n        background-color: #fff;\n        border: 1px solid #FFF;\n        padding: 3px;\n        box-shadow: 0 17px 9px -15px rgb(0 0 0 / 50%);\n      }\n\n      .NewsletterSignupFooter_Component .klaviyo_field_group .klaviyo_form_actions {\n        text-align:left;\n       }\n\n      .NewsletterSignupFooter_Component input[type=checkbox] + label {\n        display: inline;\n        font-weight:normal;\n        padding-left:5px;\n      }\n\n      .NewsletterSignupFooter_Component input[type=text], .NewsletterSignupFooter_Component input[type=email] {\n        font-family: Lato, sans-serif;\n        font-size: 12px;\n        font-weight: 700;\n        border-radius: 0px;\n        border: none;\n        outline: none;\n        transition: background .1s ease;\n width: 250px;      }\n\n      .NewsletterSignupFooter_Component input[type=email]::placeholder {\n        color: #b0b0b0;\n        letter-spacing: 0.5px;\n      }\n\n      .NewsletterSignupFooter_Component input[type=email]:focus + .klaviyo_form_actions .klaviyo_submit_button,\n      .NewsletterSignupFooter_Component input[type=email]:valid + .klaviyo_form_actions .klaviyo_submit_button {\n        background: #1f1a17;\n      }\n\n      .NewsletterSignupFooter_Component .klaviyo_submit_button {\n        font-family: "Lato", sans-serif;\n        font-size: 12px;\n        font-weight: 700;\n        background: #d7d7d7;\n        text-align: center;\n        padding: 0 5px;\n        min-width: 64px;\n        outline: none;\n        border: 0;\n        border-radius: 4px;\n        color: #fff;\n        text-transform: uppercase;\n        letter-spacing: 1.5px;\n        cursor: pointer;\n      }\n\n      .NewsletterSignupFooter_Component .klaviyo_messages {\n        margin-top: 5px;\n        font-family: "Lato", sans-serif;\n        font-size: 12px;\n        font-weight: normal;\n      }\n\n      .NewsletterSignupFooter_Component .klaviyo_messages .error_message {\n        display: flex;\n        font-family: "Lato", sans-serif;\n        font-size: 12px;\n        font-weight: 700;\n        color: #c43e22;\n        letter-spacing: .5px;\n        text-align: left;\n      }\n\n      .NewsletterSignupFooter_Component .klaviyo_messages .error_message:before {\n        display: inline-block;\n        content: "\\2191";\n        font-size: 10px;\n        padding: 0 5px;\n      }\n\n      .NewsletterSignupFooter_Component .klaviyo_messages .success_message {\n        color: #1f1a17;\n        background-color: #fff;\n        padding: 9px;\n        border-radius: 3px;\n        font-family: "Lato", sans-serif;\n        font-size: 12px;\n        font-weight: 700;\n        text-align: center;\n      }\n    '
                        }}
                    />
                    <form action={async formData => { await sendEmail(formData); }}
                    >

                        <div className="klaviyo_field_group">
                            <input
                                className="email-input"
                                type="email"
                                name="email"
                                id="k_id_email"
                                placeholder="Enter your email to register"
                                required
                            />
                            <div className="klaviyo_form_actions">
                                <button type="submit" className="klaviyo_submit_button" style={{ padding: "0.5em" }}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <p className="NewsletterSignupFooter_Disclaimer br_text-xs-sans-spaced br_text-grey-400 br_text-center">
                    You are signing up to receive product updates and newsletters. By
                    signing up, you are consenting to our{" "}
                    <a
                        href="/privacy"
                        data-auto-id="true"
                        id="page-footer-customer-care-privacy-policy-1"
                        className='text-white'
                    >
                        privacy policy
                    </a>{" "}
                    but you can opt out at any time.
                </p>
            </div>
            <section className="SiteFooter__wrapper" id="footer">
                <nav className="SiteFooterSitemap">
                    <div
                        data-roybell=""
                        data-location="footerSocial"
                        className="SiteFooterSitemap__social column"
                    >
                        <ul>
                            {/* <li>
                                <a
                                    target="_blank"
                                    href="https://www.tiktok.com/@petyshop.lb"
                                    data-auto-id="true"
                                    id="page-footer-http-www-instagram-com-bellroy-1"
                                >



                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 2500 2500"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        xmlSpace="preserve"
                                        height="20px"
                                    >
                                        <title>TikTok</title>
                                        <path d="M2202.4 0H297.6C133.5 0 0 133.5 0 297.6v1904.8C0 2366.5 133.5 2500 297.6 2500h1904.8c164.1 0 297.6-133.5 297.6-297.6V297.6C2500 133.5 2366.5 0 2202.4 0m-237.8 1090.7c-13.7 1.3-27.4 2-41.1 2.1-150.4 0-290.7-75.8-373.2-201.7v686.7c0 280.3-227.2 507.6-507.6 507.6s-507.6-227.2-507.6-507.6 227.2-507.6 507.6-507.6c10.6 0 21 1 31.4 1.6V1322c-10.4-1.2-20.7-3.2-31.4-3.2-143.1 0-259 116-259 259s116 259 259 259c143.1 0 269.5-112.7 269.5-255.8l2.5-1166.3H1554c22.6 214.6 195.6 382.2 410.8 397.9v278" />
                                    </svg>



                                </a>
                            </li> */}
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.instagram.com/scentodiitalia/"
                                    data-auto-id="true"
                                    id="page-footer-http-www-instagram-com-bellroy-1"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 44 44"
                                        height="20px"
                                    >
                                        <title>Instagram</title>
                                        <path
                                            className="st0"
                                            d="M21.3,14.4c-3.8,0-6.9,3.1-6.9,6.9c0,3.8,3.1,6.9,6.9,6.9c3.8,0,6.9-3.1,6.9-6.9c0,0,0,0,0,0 C28.3,17.5,25.2,14.4,21.3,14.4C21.3,14.4,21.3,14.4,21.3,14.4z"
                                        />
                                        <path
                                            className="st0"
                                            d="M43.9,12.9c0-1.8-0.4-3.6-1-5.3c-0.6-1.5-1.4-2.8-2.5-3.9c-1.1-1.1-2.4-2-3.9-2.5c-1.7-0.6-3.5-1-5.3-1
              C28.7,0,28,0,22,0s-6.7,0-9.1,0.1c-1.8,0-3.6,0.4-5.3,1C6.1,1.7,4.8,2.6,3.7,3.7c-1.1,1.1-2,2.4-2.5,3.9c-0.6,1.7-1,3.5-1,5.3
              C0,15.3,0,16,0,22s0,6.7,0.1,9.1c0,1.8,0.4,3.6,1,5.3c0.6,1.5,1.4,2.8,2.5,3.9c1.1,1.1,2.4,2,3.9,2.5c1.7,0.6,3.5,1,5.3,1
              C15.3,44,16,44,22,44s6.7,0,9.1-0.1c1.8,0,3.6-0.4,5.3-1c1.5-0.6,2.8-1.4,3.9-2.5c1.1-1.1,2-2.4,2.5-3.9c0.6-1.7,1-3.5,1-5.3
              C44,28.7,44,28,44,22S44,15.3,43.9,12.9z M21.3,32c-5.9,0-10.7-4.8-10.7-10.7s4.8-10.7,10.7-10.7S32,15.4,32,21.3S27.2,32,21.3,32
              L21.3,32z M35.3,13.3c-1.8,0-3.3-1.5-3.3-3.3s1.5-3.3,3.3-3.3c1.8,0,3.3,1.5,3.3,3.3C38.7,11.8,37.2,13.3,35.3,13.3
              C35.3,13.3,35.3,13.3,35.3,13.3z"
                                        />
                                    </svg>
                                </a>
                            </li>
                            {/* <li>
                                <a
                                    target="_blank"
                                    href="https://www.facebook.com/profile.php?id=61577786737631"
                                    data-auto-id="true"
                                    id="page-footer-https-www-facebook-com-bellroy-official-1"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 44 44"
                                        height="20px"
                                        style={{ marginRight: "-10px" }}
                                    >
                                        <title>Facebook</title>
                                        <path
                                            className="st0"
                                            d="M14.3,44V23.9h6.5l1-7.8h-7.5v-5c0-2.3,0.6-3.8,3.7-3.8h4v-7C20.1,0.1,18.1,0,16.2,0c-5.8,0-9.7,3.7-9.7,10.3 v5.8H0v7.8h6.5V44H14.3z"
                                        />
                                    </svg>
                                </a>
                            </li> */}
                            <li>
                                <a
                                    target="_blank"
                                    href="https://wa.me/96176334886"
                                    data-auto-id="true"
                                    id="page-footer-https-www-youtube-com-channel-ucy6vodc_wyzj4rlslixgp1q-1"
                                >
                                    <svg
                                        id="Layer_1"
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 176 124"
                                        height="22px"
                                    >
                                        <title>WhatsApp</title>
                                        <svg fill="#000000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier"><path d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.13 5.13 0 0 1-1.49-.92 5.25 5.25 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.39 1.39 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.59 3.59 0 0 0 5 8.2 8.32 8.32 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.53 2.53 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21z"></path>
                                                <path d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72zM8 14.12a6.12 6.12 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12z"></path></g></svg>

                                    </svg>

                                </a>
                            </li>

                        </ul>
                    </div>
                    <div className="column collapsable-section" id='footId1' onClick={handleFoot}>
                        <h4 className='mytitle4'>
                            HELP
                            <svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 11 6"
                                xmlSpace="preserve"
                            >
                                <path
                                    className="st0"
                                    d="M5.4,4.4l4.5-4.2c0.2-0.3,0.7-0.3,0.9,0c0,0,0,0,0,0c0.3,0.3,0.3,0.7,0,1c0,0,0,0,0,0L5.9,5.8 C5.6,6.1,5.2,6.1,5,5.8L0.2,1.1c-0.3-0.3-0.3-0.7,0-0.9C0.4,0,0.8,0,1.1,0.2c0,0,0,0,0,0L5.4,4.4z"
                                />
                            </svg>
                        </h4>
                        <ul  >
                            <li>
                                <a
                                    href="/contact"
                                    data-auto-id="true"
                                    id="page-footer-customer-care-contact-us-1"
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/term"
                                    data-auto-id="true"
                                    id="page-footer-customer-care-terms-conditions-1"
                                >
                                    Terms &amp; Conditions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/privacy"
                                    data-auto-id="true"
                                    id="page-footer-customer-care-privacy-policy-2"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="column collapsable-section" id='footId2' onClick={handleFoot2}>
                        <h4 className='mytitle4'>
                            Shop Collections
                            <svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 11 6"
                                xmlSpace="preserve"
                            >
                                <path
                                    className="st0"
                                    d="M5.4,4.4l4.5-4.2c0.2-0.3,0.7-0.3,0.9,0c0,0,0,0,0,0c0.3,0.3,0.3,0.7,0,1c0,0,0,0,0,0L5.9,5.8 C5.6,6.1,5.2,6.1,5,5.8L0.2,1.1c-0.3-0.3-0.3-0.7,0-0.9C0.4,0,0.8,0,1.1,0.2c0,0,0,0,0,0L5.4,4.4z"
                                />
                            </svg>
                        </h4>










                        <ul>
                            {allTemp && allTemp?.length > 0 ? (
                                allTemp.map((category , index) => (
                                    <li key={index}>
                                        <a
                                            href={`/search?cat=${category.name}`}
                                            data-auto-id="true"
                                            id={`page-footer-category-${index}`}
                                        >
                                            {category.name}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <div className='home___error-container'>
                                    <h2 className='text-black text-xl dont-bold'>...</h2>

                                </div>
                            )

                            }

                        </ul>












                    </div>

                    <div className="column ">  </div>
                </nav>
                <section className="SiteFooter__footNote">
                    <div className="SiteFooter__footNote__inner">
                        <div className="logo">

                            <a
                                href="https://greatplacetowork.com.au/gptwcertified/bellroy/"
                                data-auto-id="true"
                                id="page-footer-https-greatplacetowork-com-au-gptwcertified-bellroy-1"
                            >

                            </a>
                        </div>
                        <div className="text">
                            <div className="column mb-5"  >
                              
                            </div>
                            <div className="column">
                                <span className="copyright myGray">
                                    All rights reserved © {(new Date().getFullYear())} SCENTO D’ITALIA
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </footer>
    )
}

export default Footer