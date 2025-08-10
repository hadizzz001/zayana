"use server";
import { Resend } from "resend";
import { redirect } from 'next/navigation';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");


    if (firstname != null) {
        resend.emails.send({
            from: "info@anazon.hadizproductions.com",
            to: "batoul@test0.hadizproductions.com",
            subject: "New message from your website customer",
            text: "Name: " + firstname + " " + lastname + "\nEmail:" + email + "\nPhone:" + phone + "\n" + message,
        })
        redirect('/thank');
    } else {
        resend.emails.send({
            from: "info@anazon.hadizproductions.com",
            to: email+"",
            subject: "Offer code from SCENTO D’ITALIA",
            text: "Thanks you for subscribing with SCENTO D’ITALIA your code is: Abcd12345",
        })
    }
    

}

