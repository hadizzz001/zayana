"use client"
import { createContext, useContext, useState } from "react";

const def = [
    {
        en: [
            {
                home:[{
                    title: 'Layout Catalog',
                    par: 'Explore the layouts you might like',
                    other: 'Nothing found'
                }],
                about:[{
                    title: 'Layout Catalog',
                    par: 'Layout Catalog',
                    other: 'Nothing found'
                }],
                footer:[{ 
                    par: 'All rights reserved ©️',
                    privacy: 'Privacy Policy',
                    term: 'Terms of Use'
                }],
                hero:[{ 
                    title:'Find, book or order a layout package - quickly and easily',
                    par: 'Streamline your social media experience with our effortless layout templates.',
                    button: 'Explore Templates',
                }],
                hero1:[{ 
                    title:'Modern Social Media Products',
                    par: 'Awesome banners and designs for all your social media posts.',
                    button:'Contact Us'
                }],
                hero2:[{ 
                    title:'Our History',
                    par: 'To help our customers build their brands and grow their businesses on social media.',
                }],
                hero3:[{ 
                    title:'Contact Us Now',
                    par: 'Get in touch with us now to unlock your success.',
                    button:'Send WhatsApp'
                }],
                nav:[{ 
                    t1:'HOME',
                    t2: 'ABOUT',
                    t3: 'CONTACT',
                    t4: 'DASHBOARD',
                }],
                tes:[{
                    t1: 'Social media post creation including design and captions relevant to your brand and objectives.',
                    t2: 'Using professional tools we will research hashtags that will help you in more reach of your account.',
                    t3: 'We will schedule the posts on all the platforms at the best time of the day.',
                    s1:'Content Creation',
                    s2:'Hashtag Research',
                    s3:'Post Scheduling',
                }],
                product:[{
                    t1: 'Triple Win Solution',
                    t2: '2 Reviews',
                    t3: 'Layout Colors',
                    t4: 'Page(s)',
                    t5:'Get this template package',
                    t6:'Get it now', 
                }],
                contact:[{
                    t1: 'Contact Us',
                    t2: 'For business and layouts inquiries, please use the form below. ',
                    t3: 'Name',
                    t4: 'Email',
                    t5:'Message',
                    t6:'Send', 
                    t7:'Street St. City location, Country', 
                }],

            }
        ]
    },

    {
        ar:
            [

                {
                    home:[{
                        title: 'كتالوج النموذج',
                        par: 'استكشف النموذج التي قد يعجبك',
                        other: 'لم يتم العثور على شيء'
                    }],
                    about:[{
                        Title: 'Layout Catalog',
                        par: 'Layout Catalog',
                        other: 'Nothing found'
                    }],
                    footer:[{ 
                        par: 'كل الحقوق محفوظة ©️',
                        privacy: 'سياسة الخصوصية',
                        term: 'شروط الاستخدام'
                    }],
                    hero:[{ 
                        title:'ابحث عن حزمة تخطيط أو احجزها أو اطلبها - بسرعة وسهولة',
                        par: 'قم بتبسيط تجربة الوسائط الاجتماعية الخاصة بك من خلال قوالب التخطيط السهلة الخاصة بنا.',
                        button: 'استكشف القوالب',
                    }],
                    hero1:[{ 
                        title:'منتجات الوسائط الاجتماعية الحديثة',
                        par: 'لافتات وتصميمات رائعة لجميع منشوراتك على مواقع التواصل الاجتماعي.',
                        button:'اتصل بنا'
                    }],
                    hero2:[{ 
                        title:'تاريخنا',
                        par: 'لمساعدة عملائنا على بناء علاماتهم التجارية وتنمية أعمالهم على وسائل التواصل الاجتماعي.',
                    }],
                    hero3:[{ 
                        title:'اتصل بنا الآن',
                        par: 'تواصل معنا الآن لإطلاق العنان لنجاحك.',
                        button:'أرسل واتس اب'
                    }],
                    nav:[{ 
                        t1:'الرئيسية',
                        t2: 'معلومات عنا',
                        t3: 'القوالب',
                        t4: 'اتصال',
                    }],
                    tes:[{
                        t1: 'إنشاء منشورات على وسائل التواصل الاجتماعي بما في ذلك التصميم والتعليقات التوضيحية ذات الصلة بعلامتك التجارية وأهدافك.',
                        t2: 'باستخدام الأدوات الاحترافية ، سنبحث في علامات التصنيف التي ستساعدك في الوصول إلى حسابك بشكل أكبر.',
                        t3: 'سنقوم بجدولة المنشورات على جميع المنصات في أفضل وقت في اليوم.',
                        s1:'انشاء محتوى',
                        s2:'هاشتاغ',
                        s3:'جدولة النشر',
                    }],
                    product:[{
                        t1: 'Triple Win Solution',
                        t2: '2 التعليقات',
                        t3: 'ألوان التخطيط',
                        t4: 'الصفحة (الصفحات)',
                        t5:'احصل على حزمة القالب هذه',
                        t6:'احصل عليها الآن', 
                    }],
                    contact:[{
                        t1: 'اتصل بنا',
                        t2: 'للاستفسارات المتعلقة بالأعمال والتخطيطات ، يرجى استخدام النموذج أدناه',
                        t3: 'اسم',
                        t4: 'بريد إلكتروني',
                        t5:'رسالة',
                        t6:'ارسلها', 
                        t7:'موقع شارع سانت سيتي ، البلد', 
                    }],
    
                } 
            ]
    }
]
export const DrawerContext = createContext<any>(def);



const ContextWrapper = ({ children }: {
    children: React.ReactNode;
}
) => {

    const [open, setOpen] = useState(def);
    return (
        <DrawerContext.Provider value={{ open, setOpen }}>

            {children}

        </DrawerContext.Provider>
    )
}

export default ContextWrapper

export const useDrawerContext = () => useContext(DrawerContext);

