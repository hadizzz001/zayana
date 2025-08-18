'use client';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaLinkedinIn, FaTiktok } from "react-icons/fa";


const Footer = () => {
    const [showPolicies, setShowPolicies] = useState(false);
    const [showCustomerCare, setShowCustomerCare] = useState(false);
    const [showServices, setShowServices] = useState(false);

    return (
        <footer className="bg-[#f8f8f8] text-[#222] py-10 px-4">

            {/* PC FOOTER */}
            <div className="hidden md:block">
                {/* Top Row */}
                <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm border-b border-[#c5c5c5] pb-8 items-center mt-20">
                    {/* Policies */}
                    <div className="flex flex-col items-center">
                        <div className="text-left">
                            <p className="mb-3 myfp">Policies</p>
                            <ul className="space-y-2">
                                <li><a href="/privacy" className="colorp">Privacy Policy</a></li>
                                <li><a href="/term" className="colorp">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Customer Care */}
                    <div className="flex flex-col items-center">
                        <div className="text-left">
                            <p className="myfp mb-3">Customer Care</p>
                            <ul className="space-y-2">
                                <li><a href="/contact" className="colorp">Contact us</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="flex flex-col items-center">
                        <div className="text-left">
                            <p className="myfp mb-3">Services</p>
                            <ul className="space-y-2">
                                <li><a href="/services" className="colorp">Our Services</a></li> 
                            </ul>
                        </div>
                    </div>
                </div>


 {/* <div className="flex justify-center gap-6 mt-4">
      <a
        href="https://www.instagram.com/rafidaham_hairdressing"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#666] hover:text-black text-2xl"
      >
        <FaInstagram />
      </a>
      <a
        href="https://www.facebook.com/1raffidahamhairdressing/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#666] hover:text-black text-2xl"
      >
        <FaFacebookF />
      </a>
      <a
        href="https://wa.me/96178808100"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#666] hover:text-black text-2xl"
      >
        <FaWhatsapp />
      </a>
      <a
        href="https://lb.linkedin.com/in/rafi-daham-aa74a492"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#666] hover:text-black text-2xl"
      >
        <FaLinkedinIn />
      </a>
      <a
        href="https://www.tiktok.com/@rafidaham_hairdressing"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#666] hover:text-black text-2xl"
      >
        <FaTiktok />
      </a>
    </div> */}

                {/* Bottom Row */}
                <div className="text-center mt-20 mb-20">
                    <p className="myRights">
                        © Zayana {new Date().getFullYear()} ALL RIGHTS RESERVED
                    </p>
                </div>
            </div>
















            {/* MOBILE FOOTER */}
            <div id='mymobfoot' className="block md:hidden text-sm space-y-6 mt-20 mb-20">
                {/* Reusable toggle section */}
                {[
                    {
                        label: 'Policies',
                        isOpen: showPolicies,
                        setOpen: setShowPolicies,
                        items: [
                            { href: '/privacy', text: 'Privacy Policy' },
                            { href: '/term', text: 'Terms of Service' },
                        ],
                    },
                    {
                        label: 'Customer Care',
                        isOpen: showCustomerCare,
                        setOpen: setShowCustomerCare,
                        items: [
                            { href: '/contact', text: 'Contact Us' },
                        ],
                    },
                    {
                        label: 'Services',
                        isOpen: showServices,
                        setOpen: setShowServices,
                        items: [
                            { href: '/services', text: 'Our Services' }, 
                        ],
                    },
                ].map(({ label, isOpen, setOpen, items }, index) => (
                    <div key={index}>
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setOpen(!isOpen)}
                        >
                            <p className="myfp">{label}</p>
                            <div
                                className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                                    }`}
                            >
                                <FaChevronDown />
                            </div>
                        </div>
                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <ul className="mt-2 space-y-2 ">
                                {items.map((item, i) => (
                                    <li key={i}>
                                        <a href={item.href} className="colorp">
                                            {item.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <hr id='myhrbar1' className="my-4" />
                    </div>
                ))}

 {/* <div className="flex justify-center gap-6 mt-4">
      <a
        href="https://www.instagram.com/rafidaham_hairdressing"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#666] hover:text-black text-2xl"
      >
        <FaInstagram />
      </a>
      <a
        href="https://www.facebook.com/1raffidahamhairdressing/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#666] hover:text-black text-2xl"
      >
        <FaFacebookF />
      </a>
      <a
        href="https://wa.me/96178808100"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#666] hover:text-black text-2xl"
      >
        <FaWhatsapp />
      </a>
      <a
        href="https://lb.linkedin.com/in/rafi-daham-aa74a492"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#666] hover:text-black text-2xl"
      >
        <FaLinkedinIn />
      </a>
      <a
        href="https://www.tiktok.com/@rafidaham_hairdressing"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#666] hover:text-black text-2xl"
      >
        <FaTiktok />
      </a>
    </div> */}

              

                <div className="text-center mt-20 mb-20">
                    <p className="text-sm uppercase">
                        Zayana {new Date().getFullYear()} ALL RIGHTS RESERVED
                    </p>
                </div>

            </div>
















        </footer>
    );
};

export default Footer;
