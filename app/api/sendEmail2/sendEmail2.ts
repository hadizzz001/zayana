"use server";
import { Resend } from "resend";
import { redirect } from 'next/navigation';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail2 = async (formData: FormData) => {
  const email = formData.get("email");
  const fname = formData.get("fname");
  const lname = formData.get("lname");
  const phone = formData.get("phone");
  const address = formData.get("address");
  const country = formData.get("country");
  const city = formData.get("city");
  const apt = formData.get("apt");
  const itemsJSON = formData.get("items"); // should be a JSON stringified array
  const subtotal = formData.get("subtotal");
  const delivery = formData.get("delivery");
  const total = formData.get("total");

  let items = [];

  try {
    items = JSON.parse(itemsJSON); // must be a valid array from the client
  } catch (error) {
    console.error("Invalid JSON for items:", error);
  }

  const message = `
*Customer Information:*
Email: ${email}
Name: ${fname} ${lname} 
Phone: ${phone}
Country: ${country}
City: ${city}
Apt-Floor: ${apt}
Address: ${address}

*Order Details:*
${items.map((item: any, index: number) => `
  Item ${index + 1}:
  - Name: ${item.title} 
  - Quantity: ${item.quantity}
  - Price: $${(() => {
      const colorObj = item.color?.find(c => c.color === item.selectedColor);
      const sizeObj = colorObj?.sizes?.find(s => s.size === item.selectedSize);
      return sizeObj?.price ?? item.discount;
    })()}
  - Color: ${item.selectedColor}
  - Size: ${item.selectedSize}
  - Image: ${item.img[0]}
`).join('\n')}

Subtotal: $${Number(subtotal).toFixed(2)}
Delivery fee: $${delivery}
*Total Amount:* $${total}
  `;

  await resend.emails.send({
    from: "info@anazon.hadizproductions.com",
    // to: "alihadimedlej001@gmail.com",
    to: "batoul@test0.hadizproductions.com",
    subject: "New Order from Website",
    text: message,
  });

};
