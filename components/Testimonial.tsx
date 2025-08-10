import React from 'react'
import { useDrawerContext } from '../app/context/store';
import useLocalStorage from '../hooks/useLocalStorage'
import { useState, useEffect } from 'react';

const Testimonial = () => {
  const { open, setOpen } = useDrawerContext()
  const [value, setValue] = useLocalStorage("lang", "")
  const [lang, setLang] = useState(value)

  return (

    <section className="text-gray-600 body-font">
      {(lang === 'en') ? (
        open.map((item: any, index: any) => (
          <div key={index}>

            {item.en?.map((c: any, i: any) => (
              <div key={i}>
                {c.tes?.map((a: any, j: any) => (
                  <div key={j}>
<div className="container px-5 py-24 mx-auto">
                      <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                          <div className="h-full text-center">
                            <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="paint.gif" />
                            <p className="leading-relaxed">{a.t1}</p>
                            <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4"></span>
                            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">{a.s1}</h2>
                          </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                          <div className="h-full text-center">
                            <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="hash.gif" />
                            <p className="leading-relaxed">{a.t2}</p>
                            <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4"></span>
                            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">{a.s2}</h2>
                          </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                          <div className="h-full text-center">
                            <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="post.gif" />
                            <p className="leading-relaxed">{a.t3}</p>
                            <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4"></span>
                            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">{a.s3}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

          </div>
        ))
      ) : (
        open.map((item: any, index: any) => (
          <div key={index}>
            {item.ar?.map((c: any, i: any) => (
              <div key={i}>
                {c.tes?.map((a: any, j: any) => (
                  <div key={j}>
                    <div className="container px-5 py-24 mx-auto">
                      <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                          <div className="h-full text-center">
                            <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="paint.gif" />
                            <p className="leading-relaxed">{a.t1}</p>
                            <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4"></span>
                            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">{a.s1}</h2>
                          </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                          <div className="h-full text-center">
                            <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="hash.gif" />
                            <p className="leading-relaxed">{a.t2}</p>
                            <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4"></span>
                            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">{a.s2}</h2>
                          </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                          <div className="h-full text-center">
                            <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="post.gif" />
                            <p className="leading-relaxed">{a.t3}</p>
                            <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4"></span>
                            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">{a.s3}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

          </div>
        ))
      )}

    </section>
  )
}

export default Testimonial