"use client"



import { useState, useEffect } from "react";
import { useCart } from '../context/CartContext';
import WhatsAppButton from "../../components/WhatsAppButton";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';



const page = () => {

  const { cart, removeFromCart, quantities, subtotal, addToCart } = useCart();
  const [localQuantities, setLocalQuantities] = useState(quantities);
  const [phone, setPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false); 
  const [promoCode, setPromoCode] = useState("");
  const [promoCodes, setPromoCodes] = useState([]); // Store promo codes from API
  const [usedAbcd1234, setUsedAbcd1234] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(subtotal > 50 ? 0 : 5);
  const [total, setTotal] = useState((subtotal + deliveryFee).toFixed(2));
  const [showLink, setShowLink] = useState(false);
  const [country, setCountry] = useState('');
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    phone: "",
    country: '',
    city: '',
    apt: '',
    address: '',
    email: '',
  });

  const [cities, setCities] = useState([]);
  const [countryData, setCountryData] = useState({
    code: '',
    flag: '',
    dial: '',
  }); 




  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

 



  useEffect(() => {
    // Fetch promo codes from API
    fetch("/api/offer")
      .then((response) => response.json())
      .then((data) => setPromoCodes(data)) // Expecting [{ code: "ABC123", per: 10 }, { code: "XYZ789", per: 20 }]
      .catch((error) => console.error("Error fetching promo codes:", error));

    // Ensure localStorage is available (client-side)
    if (typeof window !== "undefined") {
      // Initialize usedAbcd1234 from localStorage
      const storedUsedAbcd1234 = localStorage.getItem("usedAbcd1234");
      if (storedUsedAbcd1234 === "true") {
        setUsedAbcd1234(true);
      }
    }

    // Update delivery fee when subtotal changes
    // setDeliveryFee(subtotal > 50 ? 0 : 4);
  }, [subtotal]);

  useEffect(() => {
    // Update total whenever subtotal or delivery fee changes
    setTotal((subtotal + deliveryFee).toFixed(2));
  }, [subtotal, deliveryFee]);

  useEffect(() => {
  const fetchCountry = async () => {
    try {
      const response = await axios.get('https://ipwho.is/');
      const countryName = response.data.country; // ipwho.is uses "country" key
      setCountry(countryName);
    } catch (error) {
      console.error('Failed to detect country:', error);
    }
  };

  fetchCountry();
}, []);

  // 2. Fetch cities based on detected country
  useEffect(() => {
    const fetchCities = async () => {
      if (!country) return;

      try {
        const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
          country,
        });

        if (response.data?.data) {
          setCities(response.data.data);
        } else {
          setCities([]);
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error);
        setCities([]);
      }
    };

    fetchCities();

    setInputs((prevValues) => ({
      ...prevValues,
      country: country,
    }));
  }, [country]);

 

const handleTextboxChange = (textboxName) => (e) => {
  let value = e.target.value;

  if (textboxName === "phone") {
    // Allow leading '+', then remove all non-digit characters except for that leading '+'
    if (value.startsWith('+')) {
      value = '+' + value.slice(1).replace(/[^0-9]/g, '');
    } else {
      value = value.replace(/[^0-9]/g, '');
    }

    const numericValue = value.replace(/[^0-9]/g, '');
    const isValidPhone = numericValue.length >= 2;

    let formattedPhone = value;

    if (
      isValidPhone &&
      countryData?.dial &&
      !numericValue.startsWith(countryData.dial.replace('+', ''))
    ) {
      const dial = countryData.dial;
      formattedPhone = dial + numericValue;
    }

    setPhone(formattedPhone);
    setInputs((prevValues) => ({
      ...prevValues,
      phone: formattedPhone,
    }));

    return;
  }

  setInputs((prevValues) => ({
    ...prevValues,
    [textboxName]: value,
  }));
};



useEffect(() => {
  // Auto-detect country and dial code using ipwho.is
  fetch('https://ipwho.is/')
    .then((res) => res.json())
    .then((data) => {
      setCountryData({
        code: data.country_code, // e.g., "LB"
        flag: `https://flagcdn.com/24x18/${data.country_code.toLowerCase()}.png`,
        dial: `+${data.calling_code}`, // ✅ use calling_code from ipwho.is
      });
    })
    .catch((error) => console.error('Failed to get country info:', error));
}, []);




useEffect(() => {
  if (subtotal > 50) {
    setDeliveryFee(0);
    return;
  }

  const normalizedCity = inputs.city?.trim().toLowerCase();
  if (normalizedCity === 'beirut') {
    setDeliveryFee(3);
  } else {
    setDeliveryFee(5);
  }
}, [subtotal, inputs.city]);











  const applyPromo = (event) => {
    event.preventDefault(); // Prevent page reload

    // If the promo code is "abcd1234", apply a 10% discount
    if (promoCode.toLowerCase() === "abcd1234") {
      if (usedAbcd1234) {
        alert("You have already used this promo code.");
        return;
      }
      // Apply 10% discount and mark the promo code as used
      const discountedTotal = ((subtotal + deliveryFee) * 0.9).toFixed(2);
      setTotal(discountedTotal);
      setUsedAbcd1234(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("usedAbcd1234", "true"); // Store that the promo code was used
      }
      setDiscountApplied(true); // Mark discount as applied
      return; // Prevent further code checks if the promo is applied
    }

    // Check for free delivery promo code or subtotal >= 100
    if (promoCode.toLowerCase() === "freedelivery1" || subtotal > 50) {
      setDeliveryFee(0); // ✅ Delivery fee updates, triggering useEffect to update total
    }

    // Find the promo code from the API response
    const promo = promoCodes.find((p) => p.code.toLowerCase() === promoCode.toLowerCase());
    if (promo) {
      const discount = promo.per / 100;
      setTotal(((subtotal + deliveryFee) * (1 - discount)).toFixed(2)); // ✅ Uses latest state
      setDiscountApplied(true);
    } else {
      alert("Invalid promo code!");
    }
  };


  const handleCheckboxChange = (e) => {
    setShowLink(e.target.checked);
  };







  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Product List PDF', 10, 10);

    const imagePromises = cart.map(async (item) => {
      const imageUrl = item.img[0];
      const imageData = await toDataURL(imageUrl);
      return {
        ...item,
        imageData,
      };
    });

    const itemsWithImages = await Promise.all(imagePromises);

    const tableData = itemsWithImages.map((item) => [
      { content: '', image: item.imageData },
      item.title,
      item.category,
      `$${item.discount}`,
      item.quantity,
      item.selectedColor,
    ]);

    // Utility to chunk array into groups of 8
    const chunkArray = (arr, size) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
      );

    const chunkedData = chunkArray(tableData, 8);
    let startY = 20;

    chunkedData.forEach((chunk, index) => {
      if (index > 0) {
        doc.addPage();
        startY = 10;
        doc.setFontSize(18);
        doc.text('Product List PDF (continued)', 10, startY);
        startY += 10;
      }

      autoTable(doc, {
        startY,
        head: [['Image', 'Title', 'Category', 'Price', 'Quantity', 'Color']],
        body: chunk,
        didDrawCell: (data) => {
          if (data.column.index === 0 && data.cell.raw.image) {
            doc.addImage(
              data.cell.raw.image,
              'JPEG',
              data.cell.x + 2,
              data.cell.y + 2,
              25,
              25
            );
          }
        },
        columnStyles: {
          0: { cellWidth: 30 },
        },
        headStyles: {
          minCellHeight: 10,
          valign: 'middle',
          halign: 'center',
        },
        bodyStyles: {
          minCellHeight: 30,
          valign: 'middle',
          halign: 'center',
        },
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
      });
    });

    doc.save('cart-items.pdf');
  };

  const toDataURL = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };













  return (
    <>


      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n\t.input-text{\n\t\tborder-style: solid;\n    border-width: 1px 1px 1px 1px;\n    border-color: #DFDBD4 !important;\n    border-radius: 4px 4px 4px 4px;\n\t}\n\t"
        }}
      />

      <link
        rel="stylesheet"
        id="sublime-theme-style-css"
        href="css/style.css?ver=1.0.0"
        type="text/css"
        media="all"
      />

      <link
        rel="stylesheet"
        id="elementor-frontend-css"
        href="css/frontend-lite.min.css?ver=3.20.3"
        type="text/css"
        media="all"
      />

      <link
        rel="stylesheet"
        id="elementor-post-20120-css"
        href="css/post-20120.css?ver=1712762276"
        type="text/css"
        media="all"
      />

      <link
        rel="stylesheet"
        id="wfacp-elementor-style-css"
        href="css/wfacp_combined.min.css?ver=3.14.0"
        type="text/css"
        media="all"
      />
      <link
        rel="stylesheet"
        id="wfacp-intl-css-css"
        href="css/intlTelInput.css?ver=3.14.0"
        type="text/css"
        media="all"
      />
      <link
        rel="stylesheet"
        id="elementor-style-css"
        href="css/wfacp-form.min.css?ver=3.14.0"
        type="text/css"
        media=""
      />

      {cart && cart.length > 0 ? (
        <div className="wfacp-template-container  ">


          <div className="wfacp-section wfacp-hg-by-box step_2 form_section_single_step_2_elementor-hific mt-[10em] md:hidden" data-field-count={2}>
            <div className="wfacp_internal_form_wrap wfacp-comm-title flex justify-between items-center px-3">
              <p className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <span className="flex items-center myBB">
                  Order summary
                  {isOpen ? (
                    <svg
                      viewBox="0 0 11 6"
                      width="14"
                      height="14"
                      className="ml-2 mr-2 myBB"
                      fill="#1f1a17"
                    >
                      <path
                        className="st0 myBB"
                        d="M5.4,4.4l4.5-4.2c0.2-0.3,0.7-0.3,0.9,0c0,0,0,0,0,0c0.3,0.3,0.3,0.7,0,1c0,0,0,0,0,0L5.9,5.8 C5.6,6.1,5.2,6.1,5,5.8L0.2,1.1c-0.3-0.3-0.3-0.7,0-0.9C0.4,0,0.8,0,1.1,0.2c0,0,0,0,0,0L5.4,4.4z"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 11 6"
                      width="14"
                      height="14"
                      className="ml-2 mr-2 myBB rotate-180"
                      fill="#1f1a17"
                    >
                      <path
                        className="st0 myBB"
                        d="M5.4,4.4l4.5-4.2c0.2-0.3,0.7-0.3,0.9,0c0,0,0,0,0,0c0.3,0.3,0.3,0.7,0,1c0,0,0,0,0,0L5.9,5.8 C5.6,6.1,5.2,6.1,5,5.8L0.2,1.1c-0.3-0.3-0.3-0.7,0-0.9C0.4,0,0.8,0,1.1,0.2c0,0,0,0,0,0L5.4,4.4z"
                      />
                    </svg>
                  )}
                </span>
              </p>
              <span className="myBB font-bold" style={{ fontSize: "20px" }}>${total}</span>
            </div>


            {isOpen && (
              <div className="wfacp-comm-form-detail clearfix">
                <div className="wfacp-row">
                  <div className="wfacp_woocommerce_form_coupon wfacp-form-control-wrapper" id="order_coupon_field"></div>
                  <div className="wfacp_order_summary wfacp_wrapper_start wfacp_order_sec" id="order_summary_field">

                    <div className="wfacp_anim wfacp_order_summary_container">
                      <table className="shop_table woocommerce-checkout-review-order-table elementor-hific">
                        <tbody>
                          {cart?.map((obj, index) => (
                            <tr key={obj._id} className="cart_item">
                              <td className="product-name-area" style={{ display: "flex", alignItems: "center" }}>
                                {/* Product Image */}
                                <div className="product-image">
                                  <div className="wfacp-pro-thumb">
                                    <div className="wfacp-qty-ball" style={{ top: "-5px" }}>
                                      <div className="wfacp-qty-count">
                                        <span className="wfacp-pro-count">{localQuantities[obj._id]}</span>
                                      </div>
                                    </div>
                                    <img src={obj.img[0]} width={50} height={50} alt={obj.title} />
                                  </div>
                                </div>

                                {/* Product Name */}
                                <div className="product-name wfacp_summary_img_true" style={{ marginLeft: "10px", color: "#82838e" }}>
                                  <span className="wfacp_order_summary_item_name" style={{ color: "#82838e" }}>
                                    {obj.title}
                                  </span>
                                </div>
                              </td>

                              {/* Price and Remove Button */}
                              <td className="product-total" style={{ color: "#82838e" }}>
                                <div className="wfacp_order_summary_item_total">
                                  <span className="woocommerce-Price-amount amount" style={{ color: "#82838e" }}>
                                    <bdi>
                                      <span className="woocommerce-Price-currencySymbol" style={{ color: "#82838e" }}>$</span>
                                      {(obj.discount * localQuantities[obj._id] || obj.discount).toFixed(2)}
                                    </bdi>
                                  </span>
                                </div>

                                <button
                                  className="Checkout_Cart_LineItems_LineItem_Remove"
                                  onClick={() => handleRemoveFromCart(obj._id)}
                                  style={{ position: "relative" }}
                                >
                                  <span className="Checkout_Cart_LineItems_LineItem_Remove_Cross">
                                    <span />
                                    <span />
                                  </span>
                                  <span className="Checkout_Cart_LineItems_LineItem_Remove_Spinner">
                                    <span />
                                  </span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>



                        {/* Promo Code Input */}
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "5px",
                          borderRadius: "5px",
                          margin: "5px",
                          border: "1px solid #222"
                        }}>
                          <input
                            type="text"
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            style={{
                              flex: 1,
                              padding: "8px",
                              border: "1px solid #222",
                              borderRadius: "4px"
                            }}
                          />
                          <button
                            onClick={applyPromo}
                            style={{
                              padding: "5px 12px",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: discountApplied ? "not-allowed" : "pointer",
                              background: discountApplied ? "green" : "#222",
                            }}
                            disabled={discountApplied} // Disable button when discount is applied
                          >
                            {discountApplied ? "Done!" : "Apply"} {/* Show "Done!" when discount is applied */}
                          </button>
                        </div>

                        <tfoot>
                          <tr className="cart-subtotal">
                            <th><span>Subtotal</span></th>
                            <td>
                              <span className="woocommerce-Price-amount amount">
                                <bdi>
                                  <span className="woocommerce-Price-currencySymbol">$</span>
                                  {subtotal.toFixed(2)}
                                </bdi>
                              </span>
                            </td>
                          </tr>
                          <tr className="shipping_total_fee">
                            <td colSpan={1}><span style={{ color: "#82838e" }}>Delivery</span></td>
                            <td colSpan={1} style={{ textAlign: "right" }}>
                              <span className="woocommerce-Price-amount amount" style={{ color: "#82838e" }}>
                                <bdi>
                                  <span className="woocommerce-Price-currencySymbol" style={{ color: "#82838e" }}>$</span>
                                  {deliveryFee.toFixed(2)}
                                </bdi>
                              </span>
                            </td>
                          </tr>
                          <tr className="order-total">
                            <th><span>Total</span></th>
                            <td>
                              <strong>
                                <span className="woocommerce-Price-amount amount">
                                  <bdi>
                                    <span className="woocommerce-Price-currencySymbol">$</span>
                                    {total}
                                  </bdi>
                                </span>
                              </strong>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>











          <div
            data-elementor-type="wp-post"
            data-elementor-id={20120}
            className="elementor elementor-20120 md:mt-[150px]"
            data-elementor-post-type="wfacp_checkout"
          >

            <section
              className="elementor-section elementor-top-section elementor-element elementor-element-b92d2c elementor-section-boxed elementor-section-height-default elementor-section-height-default"
              data-id="b92d2c"
              data-element_type="section"
              data-settings='{"background_background":"gradient"}'
              style={{ backgroundImage: "transparent" }}
            >
              <div className="elementor-container elementor-column-gap-default">
                <div
                  className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-f1c046e"
                  data-id="f1c046e"
                  data-element_type="column"
                  data-settings='{"background_background":"classic"}'
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-451a47ba elementor-widget elementor-widget-wfacp_form"
                      data-id="451a47ba"
                      data-element_type="widget"
                      data-widget_type="wfacp_form.default"
                    >
                      <div className="elementor-widget-container">
                        <div id="wfacp-e-form">
                          <div id="wfacp-sec-wrapper">

                            <div className="wfacp-form wfacp-modern-label">
                              {" "}
                              <div className="wfacp_main_form woocommerce wfacp_single_step_form wfacp_three_step wfacp_global_checkout_wrap">
                                <div className="woocommerce-notices-wrapper" />
                                <style
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      "    body.wfacpef_page #wfacp-e-form .wfacp_main_form.woocommerce .wfacp-section.wfacp_order_coupon_box,\n    body.wfacpef_page #wfacp-e-form .wfacp_main_form.woocommerce .wfacp-section.wfacp_order_summary_box {\n    margin-bottom: 0;\n    }\n\thtml {\noverflow: auto !important;\n}\n.wfacp_firefox_android .pac-container .pac-item:first-child {\nmargin-top: 20px;\n}\nspan.wfacp_input_error_msg {\ncolor: red;\nfont-size: 13px;\n}\n\n.wfacp_custom_field_multiselect select {\nvisibility: hidden;}\n\n    .wfacp_page.single_step {\n    display: block;\n    }\n\n\t\n.wfacp_payment {\ndisplay: block;\n}\n\n.wfacp_payment.wfacp_hide_payment_part {\nvisibility: hidden;\nposition: fixed;\nz-index: -600;\nleft: -200%;\n}\n\n.wfacp_payment.wfacp_show_payment_part {\nvisibility: visible;\n}\n\n.wfacp_page.single_step .wfacp_payment {\ndisplay: block;\n}\n\n.wfacp_page.single_step .wfacp_next_page_button {\ndisplay: none;\n}\n\np#shipping_same_as_billing_field .optional {\ndisplay: none;\n}\n\np#billing_same_as_shipping_field .optional {\ndisplay: none;\n}\n\n.wfacp_shipping_fields.wfacp_shipping_field_hide {\ndisplay: none !important;\n}\n\n.wfacp_billing_fields.wfacp_billing_field_hide {\ndisplay: none !important;\n}\n\n\nspan.wfacp_required_field_message {\ndisplay: none;\n}\n\n.woocommerce-invalid-required-field span.wfacp_required_field_message {\ndisplay: inline;\n}\n\n.wfacp_country_field_hide {\ndisplay: none !important;\n}\n\n.wfacp_main_form .wfacp_shipping_table tr.shipping.wfacp_single_methods td.wfacp_shipping_package_name > p {\npadding: 0 0 10px;\n}\n\n.wfacp_main_form .wfacp_shipping_table tr.shipping.wfacp_single_methods td.wfacp_shipping_package_name {\npadding: 0 0 15px;\n}\nbody.wfacp_do_not_show_block .blockUI.blockOverlay{\n    display: none !important;\n}\n#wfacp_checkout_form.checkout.processing .blockUI.blockOverlay{\n    display: block !important;\n}\n#wfacp-e-form .wfacp_mb_mini_cart_sec_accordion_content {\nborder-top: none;\n}\n\n"
                                  }}
                                />
                                <style
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      "body #wfacp-e-form #payment ul.payment_methods li .card-brand-icons img{position: absolute;}.wfacp_smart_button_container #wc-stripe-payment-request-button-separator{display:none !important}.wfacp_smart_button_container #wc-stripe-payment-request-wrapper{margin-top:0 !important}"
                                  }}
                                />
                                <style
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      "body #wfacp-e-form #wfacp_checkout_form .ppcp-dcc-order-button{float: none;}.wfacp_main_wrapper.right #ppcp-hosted-fields .button {float: right;}.wfacp_main_wrapper.right #ppcp-hosted-fields:after,.wfacp_main_wrapper.right #ppcp-hosted-fields:before {display: block;content: '';}.wfacp_main_wrapper.right #ppcp-hosted-fields:after {clear: both;}"
                                  }}
                                />
                                <style
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      "body #wfacp-e-form .wfacp_woo_cart_abandonment_recovery:not(.wfacp-anim-wrap) label{bottom: auto;top: 18px;margin-top:0;}body #wfacp-e-form .wfacp_woo_cart_abandonment_recovery:not(.wfacp-anim-wrap) input.wfacp-form-control{padding-top: 10px;padding-bottom: 10px;}"
                                  }}
                                />
                                <style
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      '@keyframes shimmer{0%{background-position:-1000px 0}to{background-position:1000px 0}}.wfacp_anim_active .wfacp-qty-ball,.wfacp_anim_active .wfacp_anim tbody tr.cart_item>td .product-image .wfacp-pro-thumb .wfacp-qty-ball{display:none}.wfacp_anim_active .wfacp_anim.wfacp_pro_switch .product-image .wfacp-qty-ball{display:block}.wfacp_mb_mini_cart_sec_accordion_content .wfacp_quantity_selector,.wfacp_mini_cart_start_h .wfacp_quantity_selector{height:25px}.wfacp_anim_active .wfacp_mini_cart_start_h .wfacp_order_sum .product-image{border:none}.wfacp_anim_active .wfacp_order_summary_container table:not(.wfacp_mini_cart_items) tr.cart-discount td span:after{display:none}.wfacp_anim_active #wfacp-e-form .wfacp_main_form .wfacp_shipping_table ul li .wfacp_shipping_price{width:auto!important}.wfacp_anim_active .wfacp_single_shipping .wfacp_shipping_price{display:inline-block}body.wfacp_anim_active .product-name span,body.wfacp_anim_active .wfacp_shipping_table ul#shipping_method label{display:inline-block!important}.wfacp_anim_active .shipping-method-description{display:inline-block}.wfacp_anim_active #payment .payment_method_stripe label[for=payment_method_stripe]{width:auto!important}.wfacp_anim_active #wfacp_checkout_form:not(.processing) .blockUI,.wfacp_anim_active .cart-discount th span svg,.wfacp_anim_active .wfacp_coupon_field_msg span:after,.wfacp_anim_active .wfacp_mini_cart_start_h .blockUI,.wfacp_anim_active .woocommerce-remove-coupon,.wfacp_collapsible_order_summary_wrap .blockUI,.wfacp_min_cart_widget .blockUI,.wfacp_mini_cart_start_h .blockUI,body #payment .blockUI{display:none!important}.wfacp_anim_active .wfacp_pro_switch .product-name .wfacp_product_switcher_item{display:inline-block!important}.wfacp_anim_active #shipping_method{background-image:none!important}#shipping_method li.wfacp_no_shipping span,.wfacp_anim_active #order_coupon_field .wfacp-coupon-page,.wfacp_anim_active #wfacp-e-form .wfacp_coupon_row,.wfacp_anim_active .amount,.wfacp_anim_active .first-payment-date,.wfacp_anim_active .includes_tax,.wfacp_anim_active .product-name strong.product-quantity,.wfacp_anim_active .shipping th:first-child span+small,.wfacp_anim_active .shipping-method-description,.wfacp_anim_active .shipping_total_fee span,.wfacp_anim_active .shipping_total_fee td:first-child span,.wfacp_anim_active .shipping_total_fee td:first-child span+small,.wfacp_anim_active .subscription-price span,.wfacp_anim_active .tax-total span,.wfacp_anim_active .tax_label,.wfacp_anim_active .wfacp-coupon-page .wfacp_coupon_field_box,.wfacp_anim_active .wfacp_best_value,.wfacp_anim_active .wfacp_coupon_msg .woocommerce-error,.wfacp_anim_active .wfacp_main_showcoupon,.wfacp_anim_active .wfacp_mb_mini_cart_sec_accordion_content .cart_item .wfacp_order_summary_item_name .wfacp_cart_title_sec,.wfacp_anim_active .wfacp_mini_cart_item_title,.wfacp_anim_active .wfacp_mini_cart_reviews tr td:first-child span,.wfacp_anim_active .wfacp_mini_cart_reviews tr th span,.wfacp_anim_active .wfacp_mini_cart_start_h .wfacp_coupon_row,.wfacp_anim_active .wfacp_no_add_here li label,.wfacp_anim_active .wfacp_no_add_here li span,.wfacp_anim_active .wfacp_order_subtotal td:first-child span,.wfacp_anim_active .wfacp_order_subtotal td>span,.wfacp_anim_active .wfacp_order_summary_container .shop_table tr th span,.wfacp_anim_active .wfacp_order_summary_container table:not(.wfacp_mini_cart_items) tr:not(.cart_item) td:first-child span,.wfacp_anim_active .wfacp_order_summary_container table:not(.wfacp_mini_cart_items) tr:not(.cart_item) td:last-child span.woocommerce-Price-amount.amount,.wfacp_anim_active .wfacp_order_summary_container table:not(.wfacp_mini_cart_items) tr:not(.cart_item) th:first-child span,.wfacp_anim_active .wfacp_order_summary_container table:not(.wfacp_mini_cart_items) tr:not(.cart_item).cart-discount td:last-child,.wfacp_anim_active .wfacp_order_summary_container table:not(.wfacp_mini_cart_items) tr:not(.cart_item).shipping_total_fee td:last-child span,.wfacp_anim_active .wfacp_order_summary_container ul li .wfacp_shipping_radio,.wfacp_anim_active .wfacp_order_total_wrap tr td span,.wfacp_anim_active .wfacp_pro_switch .product-name .wfacp_product_name_inner>span,.wfacp_anim_active .wfacp_pro_switch .product-name .wfacp_product_select_options a,.wfacp_anim_active .wfacp_pro_switch .product-name .wfacp_product_switcher_item,.wfacp_anim_active .wfacp_pro_switch .wfacp-pro-thumb,.wfacp_anim_active .wfacp_pro_switch .wfacp_pro_attr_single,.wfacp_anim_active .wfacp_pro_switch .wfacp_pro_attr_single span,.wfacp_anim_active .wfacp_pro_switch .wfacp_product_choosen,.wfacp_anim_active .wfacp_pro_switch .wfacp_product_price_container .wfacp_product_price_sec span,.wfacp_anim_active .wfacp_pro_switch .wfacp_product_price_container del span,.wfacp_anim_active .wfacp_pro_switch .wfacp_product_price_container ins span,.wfacp_anim_active .wfacp_pro_switch .wfacp_product_row_quantity,.wfacp_anim_active .wfacp_pro_switch .wfacp_product_subs_details span,.wfacp_anim_active .wfacp_pro_switch .wfacp_product_switch,.wfacp_anim_active .wfacp_pro_switch .wfacp_quantity .wfacp_qty_wrap,.wfacp_anim_active .wfacp_pro_switch .wfacp_qv-button,.wfacp_anim_active .wfacp_pro_switch .wfacp_selected_attributes,.wfacp_anim_active .wfacp_pro_switch .wfacp_you_save_text,.wfacp_anim_active .wfacp_product_row .wfacp_delete_item,.wfacp_anim_active .wfacp_qv-button,.wfacp_anim_active .wfacp_shipping_table .wfacp_shipping_price,.wfacp_anim_active .wfacp_shipping_table .wfacp_shipping_price span,.wfacp_anim_active .wfacp_shipping_table li label,.wfacp_anim_active .wfacp_showcoupon,.wfacp_anim_active .wfacp_single_coupon_msg,.wfacp_anim_active .wfacp_single_shipping .wfacp_shipping_price,.wfacp_anim_active .wfacp_step_preview .single_preview_change a,.wfacp_anim_active .wfacp_step_preview .single_preview_inner span,.wfacp_anim_active .wfacp_whats_included .wfacp_product_switcher_description,.wfacp_anim_active .wfacp_whats_included>h3,.wfacp_anim_active .wfacp_you_save_text,.wfacp_anim_active table tr td:first-child span,.wfacp_anim_active tbody tr.cart_item .wfacp_delete_item_wrap a,.wfacp_anim_active tbody tr.cart_item td.product-total .woocommerce-Price-amount.amount,.wfacp_anim_active tbody tr.cart_item>td .product-image,.wfacp_anim_active tbody tr.cart_item>td .product-name span,.wfacp_anim_active tbody tr.cart_item>td .wfacp_product_subs_details span,.wfacp_anim_active tbody tr.cart_item>td .wfacp_quantity_selector{position:relative}#shipping_method li.wfacp_no_shipping label,#wfacp-e-form .wfacp_main_form .wfacp_shipping_options li.wfacp_no_shipping label{margin:0!important;display:inline-block!important}.wfacp_anim_active .amount:after,.wfacp_anim_active .first-payment-date:after,.wfacp_anim_active .includes_tax:after,.wfacp_anim_active .product-name strong.product-quantity:after,.wfacp_anim_active .shipping th:first-child span+small:after,.wfacp_anim_active .shipping-method-description:after,.wfacp_anim_active .shipping_total_fee span:after,.wfacp_anim_active .shipping_total_fee td:first-child span:after,.wfacp_anim_active .shipping_total_fee th:first-child span+small:after,.wfacp_anim_active .subscription-price span:after,.wfacp_anim_active .tax-total span:after,.wfacp_anim_active .tax_label:after,.wfacp_anim_active .wfacp_coupon_msg .woocommerce-error:after,.wfacp_anim_active .wfacp_mb_mini_cart_sec_accordion_content .cart_item .wfacp_order_summary_item_name .wfacp_cart_title_sec:after,.wfacp_anim_active .wfacp_mini_cart_item_title:after,.wfacp_anim_active .wfacp_mini_cart_reviews tr td:first-child span:after,.wfacp_anim_active .wfacp_mini_cart_reviews tr th span:after,.wfacp_anim_active .wfacp_no_add_here li label:after,.wfacp_anim_active .wfacp_no_add_here li span:after,.wfacp_anim_active .wfacp_order_subtotal td:first-child span:after,.wfacp_anim_active .wfacp_order_subtotal td>span:after,.wfacp_anim_active .wfacp_order_summary_container .shop_table tr th span:after,.wfacp_anim_active .wfacp_order_summary_container table:not(.wfacp_mini_cart_items) tr:not(.cart_item) td:first-child span:after,.wfacp_anim_active .wfacp_order_summary_container table:not(.wfacp_mini_cart_items) tr:not(.cart_item) td:last-child span.woocommerce-Price-amount.amount:after,.wfacp_anim_active .wfacp_order_summary_container table:not(.wfacp_mini_cart_items) tr:not(.cart_item) th:first-child span:after,.wfacp_anim_active .wfacp_order_summary_container table:not(.wfacp_mini_cart_items) tr:not(.cart_item).cart-discount td:last-child span:after,.wfacp_anim_active .wfacp_order_summary_container table:not(.wfacp_mini_cart_items) tr:not(.cart_item).shipping_total_fee td:last-child span:after,.wfacp_anim_active .wfacp_order_summary_container ul li .wfacp_shipping_radio:after,.wfacp_anim_active .wfacp_order_total_wrap tr td span:after,.wfacp_anim_active .wfacp_shipping_table .wfacp_shipping_price span:after,.wfacp_anim_active .wfacp_shipping_table li label:after,.wfacp_anim_active .wfacp_single_coupon_msg:after,.wfacp_anim_active .wfacp_single_shipping .wfacp_shipping_price:after,.wfacp_anim_active table tr td:first-child span:after,.wfacp_anim_active tbody tr.cart_item .wfacp_delete_item_wrap a:after,.wfacp_anim_active tbody tr.cart_item td.product-total .woocommerce-Price-amount.amount:after,.wfacp_anim_active tbody tr.cart_item>td .product-image:after,.wfacp_anim_active tbody tr.cart_item>td .product-name span:after,.wfacp_anim_active tbody tr.cart_item>td .wfacp_product_subs_details span:after,.wfacp_anim_active tbody tr.cart_item>td .wfacp_quantity_selector:after{animation:shimmer 2s linear infinite;background:linear-gradient(to right,#eff1f3 4%,#e2e2e2 25%,#eff1f3 36%);background-size:1000px 100%;content:" ";display:block;margin:0;position:absolute;right:0;top:0;bottom:0;left:0;z-index:10000}.wfacp_anim_active .wfacp_error:after,.wfacp_anim_active .wfacp_single_coupon_msg:after{left:-2px!important}.wfacp-row.wfacp_coupon_row{position:relative}.wfacp-row.wfacp_coupon_row .clear{clear:both}.wfacp_anim_active .wfacp_error,.wfacp_anim_active .wfacp_order_summary_container ul li .wfacp_shipping_radio,.wfacp_anim_active .wfacp_single_coupon_msg,.wfacp_anim_active span.subscription-details{display:inline-block}body #wfacp-e-form .wfacp-coupon-page .wfacp_coupon_remove_msg,body #wfacp-e-form .wfacp_coupon_field_msg{border-color:transparent!important;background:0 0}.wfacp_anim_active span.subscription-details{display:inline-block}.wfacp_anim_active tr.order-total strong+div{display:none}.wfacp_anim_active .wfacp_main_showcoupon,.wfacp_anim_active a.wfacp_showcoupon{display:inline-block}.wfacp_anim_active .wfacp_delete_item_wrap a,.wfacp_anim_active a.wfacp_remove_item_from_order_summary{border-color:transparent!important}.wfacp_anim_active tr.cart-discount td{font-size:0!important}.wfacp_anim_active #wfacp_checkout_form table.wfacp_shipping_table ul li .wfacp_shipping_radio{width:auto!important}.wfacp_anim_active #wfob_wrap .wfob_bump span:after{display:none}'
                                  }}
                                />
                                <style
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      "body{overflow-x: visible;}section {margin-bottom: 0;}.woocommerce-checkout h3 {border: none;line-height: 1.5;padding: 0;margin: 0 0 10px;}#customer_login h2::after, #payment .place-order button[type=submit], #reviews #comments>h2::after, #reviews:not(.electro-advanced-reviews) #comments>h2::after, .address header.title h3::after, .addresses header.title h3::after, .cart-collaterals h2:not(.woocommerce-loop-product__title)::after, .comment-reply-title::after, .comments-title::after, .contact-page-title::after, .cpf-type-range .tm-range-picker .noUi-origin .noUi-handle, .customer-login-form h2::after, .departments-menu .departments-menu-dropdown, .departments-menu .menu-item-has-children>.dropdown-menu, .ec-tabs>li.active a::after, .edit-account legend::after, .footer-widgets .widget-title:after, .header-v1 .navbar-search .input-group .btn, .header-v1 .navbar-search .input-group .form-control, .header-v1 .navbar-search .input-group .input-group-addon, .header-v3 .navbar-search .input-group .btn, .header-v3 .navbar-search .input-group .form-control, .header-v3 .navbar-search .input-group .input-group-addon, .navbar-primary .navbar-mini-cart .dropdown-menu-mini-cart, .pings-title::after, .products-2-1-2 .nav-link.active::after, .products-6-1 header ul.nav .active .nav-link, .products-carousel-tabs .nav-link.active::after, .sidebar .widget-title::after, .sidebar-blog .widget-title::after, .single-product .electro-tabs+section.products>h2::after, .single-product .electro-tabs~div.products>h2::after, .single-product .woocommerce-tabs+section.products>h2::after, .single-product .woocommerce-tabs~div.products>h2::after, .track-order h2::after, .wc-tabs>li.active a::after, .widget.widget_tag_cloud .tagcloud a:focus, .widget.widget_tag_cloud .tagcloud a:hover, .widget_electro_products_carousel_widget .section-products-carousel .owl-nav .owl-next:hover, .widget_electro_products_carousel_widget .section-products-carousel .owl-nav .owl-prev:hover, .widget_price_filter .ui-slider .ui-slider-handle:last-child, .woocommerce-account h2::after, .woocommerce-checkout h3::after, .woocommerce-edit-address form h3::after, .woocommerce-order-received h2::after, .wpb-accordion .vc_tta.vc_general .vc_tta-panel.vc_active .vc_tta-panel-heading .vc_tta-panel-title>a i, section header .h1::after, section header h1::after, section.section-onsale-product, section.section-onsale-product-carousel .onsale-product-carousel, section.section-product-cards-carousel header ul.nav .active .nav-link{\n\tdisplay:none;\n}body #wfacp-e-form .woocommerce-checkout #payment ul.payment_methods li {padding: 11px !important;}body #wfacp-e-form #shipping_method li label > span {position: relative;right: auto;left: auto;top: auto;}body #wfacp-e-form .wfacp_order_summary tr.shipping > td{display: table-cell;flex: auto;}body #wfacp-e-form .wfacp_order_summary tr.shipping > th {display: table-cell;flex: auto;}body #wfacp-e-form .woocommerce-checkout-review-order-table tbody > tr{display: table-row;width: 100%;justify-content: initial;}body #wfacp-e-form .woocommerce-checkout-review-order-table tfoot > tr{display: table-row;width: 100%;justify-content: initial;}body #wfacp-e-form .woocommerce-checkout-review-order-table thead > tr{display: table-row;width: 100%;justify-content: initial;}body #wfacp-e-form .wfacp_shipping_options .border:last-child table {margin-bottom: 0;}body #wfacp-e-form .wfacp_main_form .wfacp_shipping_table.wfacp_shipping_recurring tr.shipping:last-child td {padding-bottom: 0;margin-bottom: 0;}"
                                  }}
                                />
                                <style
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      "body .wfacp-section.wfacp_payment.wfacp_hide_payment_part {visibility: visible;position: relative;z-index: 0;left: 0}\nbody span#ppcp-credit-card-gateway-card-number {height: 40px !important;}\nbody span#ppcp-credit-card-gateway-card-expiry {height: 40px !important;}\nbody span#ppcp-credit-card-gateway-card-cvc {height: 40px !important;}"
                                  }}
                                />
                                <style
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      "body #wfacp-e-form  #payment li.wc_payment_method input.input-radio:checked::before{background-color:#fff;}body #wfacp-e-form  #payment.wc_payment_method input[type=radio]:checked:before{background-color:#fff;}body #wfacp-e-form  button[type=submit]:not(.white):not(.black){background-color:#fff;}body #wfacp-e-form  button[type=button]:not(.white):not(.black){background-color:#fff;}body #wfacp-e-form .wfacp-coupon-section .wfacp-coupon-page .wfacp-coupon-field-btn{background-color:#fff;}body #wfacp-e-form input[type=checkbox]:checked{background-color:#fff;}body #wfacp-e-form #payment input[type=checkbox]:checked{background-color:#fff;}body #wfacp-e-form .wfacp_main_form.woocommerce .woocommerce-input-wrapper .wfacp-form-control:checked{background-color:#fff;}body #wfacp-e-form .wfacp_main_form.woocommerce input[type=checkbox]:checked{background-color:#fff;}body #wfacp-e-form .wfacp_main_form .button.button#place_order{background-color:#fff;}body #wfacp-e-form .wfacp_main_form .button.wfacp_next_page_button{background-color:#fff;}body #wfacp-e-form .wfacp_main_form  .wfacp_payment #ppcp-hosted-fields .button{background-color:#fff;}body #wfacp-e-form .form-row:not(.woocommerce-invalid-required-field) .wfacp-form-control:not(.input-checkbox):focus{border-color:#fff ;}body #wfacp-e-form  p.form-row:not(.woocommerce-invalid-required-field) .wfacp-form-control:not(.input-checkbox):focus{box-shadow:0 0 0 1px #fff ;}body #wfacp-e-form .wfacp_main_form .form-row:not(.woocommerce-invalid-required-field) .woocommerce-input-wrapper .select2-container .select2-selection--single .select2-selection__rendered:focus{border-color:#fff ;}body #wfacp-e-form .wfacp_main_form.woocommerce .form-row:not(.woocommerce-invalid-required-field) .woocommerce-input-wrapper .select2-container .select2-selection--single .select2-selection__rendered:focus{box-shadow:0 0 0 1px #fff;}body #wfacp-e-form .wfacp_main_form .form-row:not(.woocommerce-invalid-required-field) .woocommerce-input-wrapper .select2-container .select2-selection--single:focus>span.select2-selection__rendered{box-shadow:0 0 0 1px #fff ;}body #wfacp-e-form .wfacp_main_form.woocommerce #payment li.wc_payment_method input.input-radio:checked{border-color:#fff;}body #wfacp-e-form .wfacp_main_form.woocommerce #payment.wc_payment_method input[type=radio]:checked{border-color:#fff;}body #wfacp-e-form .wfacp_main_form.woocommerce input[type=radio]:checked{border-color:#fff;}body #wfacp-e-form input[type=radio]:checked{border-color:#fff;}body #wfacp-e-form .wfacp_main_form.woocommerce #add_payment_method #payment ul.payment_methods li input[type=radio]:checked{border-color:#fff;}body #wfacp-e-form #payment ul.payment_methods li input[type=radio]:checked{border-color:#fff;}body #wfacp-e-form .wfacp_main_form.woocommerce .woocommerce-cart #payment ul.payment_methods li input[type=radio]:checked{border-color:#fff;}body #wfacp-e-form .wfacp_main_form.woocommerce .woocommerce-checkout #payment ul.payment_methods li input[type=radio]:checked{border-color:#fff;}body #wfacp-e-form .wfacp_main_form.woocommerce #wfacp_checkout_form input[type=radio]:checked{border-color:#fff;}body #wfacp-e-form .wfacp-form input[type=checkbox]:checked{border-color:#fff;}body #wfacp-e-form .wfacp_main_form #payment input[type=checkbox]:checked{border-color:#fff;}body #wfacp-e-form .wfacp_main_form .woocommerce-input-wrapper .wfacp-form-control:checked{border-color:#fff;}body #wfacp-e-form .wfacp_main_form input[type=checkbox]:checked{border-width: 8px;}body #wfacp-e-form .wfacp_main_form.woocommerce .form-row:not(.woocommerce-invalid-required-field) .woocommerce-input-wrapper .select2-container .select2-selection--single:focus>span.select2-selection__rendered{border-color:#fff;}body #wfacp-e-form .wfacp_main_form #payment li.wc_payment_method input.input-radio:checked{border-width:5px;}body #wfacp-e-form .wfacp_main_form #payment.wc_payment_method input[type=radio]:checked{border-width:5px;}body #wfacp-e-form .wfacp_main_form input[type=radio]:checked{border-width:5px;}body #wfacp-e-form .wfacp_main_form #add_payment_method #payment ul.payment_methods li input[type=radio]:checked{border-width:5px;}body #wfacp-e-form .wfacp_main_form input[type=checkbox]:after{display: block;}body #wfacp-e-form .wfacp_main_form input[type=checkbox]:before{display: none;}body #wfacp-e-form #payment li.wc_payment_method input.input-radio:checked::before{display:none;}body #wfacp-e-form #payment.wc_payment_method input[type=radio]:checked:before{display:none;}body #wfacp-e-form input[type=radio]:checked:before{display:none;}body #wfacp-e-form .wfacp_main_form.woocommerce input[type=radio]:checked:before{display:none;}"
                                  }}
                                />
                                <style
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      "body #wfacp-sec-wrapper  p.form-row.wfacp_collapsible_enable.wfacp_hidden_class {display: none;}body #wfacp-sec-wrapper  p.form-row.wfacp_collapsible_field_wrap.wfacp_hidden_class {display: none;}"
                                  }}
                                />
                                <style
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      "body #wfacp-e-form #wfacp-sec-wrapper .wfacp-top label.wfacp-form-control-label {position: relative;left: 0;right: 0;bottom: 0;top: 0;margin-top: 0;line-height:1.5;background: transparent;display: block;margin-bottom: 4px;opacity:1;}body #wfacp-e-form .wfacp-top .wfacp_main_form.woocommerce #wfacp_checkout_form p.wfacp-form-control-wrapper:not(.wfacp_checkbox_field):not(.checkbox):not(.wfacp_textarea_fields):not(.wfacp_collapsible_field_wrap) {min-height:78px;}body #wfacp-e-form .none{display: block ; }body #wfacp-e-form .wfacp-top .wfacp_main_form.woocommerce input[type=email]{padding: 12px 12px ;}body #wfacp-e-form .wfacp-top .wfacp_main_form.woocommerce input[type=number]{padding: 12px 12px ;}body #wfacp-e-form .wfacp-top .wfacp_main_form.woocommerce input[type=password]{padding: 12px 12px ;}body #wfacp-e-form .wfacp-top .wfacp_main_form.woocommerce input[type=tel]{padding: 12px 12px ;}body #wfacp-e-form .wfacp-top .wfacp_main_form.woocommerce input[type=text]{padding: 12px 12px ;}body #wfacp-e-form .wfacp_collapsible_order_summary_wrap.wfacp-top input[type=text]{padding: 12px 12px ;}body #wfacp-e-form .wfacp-top .wfacp_main_form.woocommerce input[type=date]{padding: 12px 12px ;}body #wfacp-e-form .wfacp-top .wfacp_main_form.woocommerce .wfacp_allowed_countries strong{padding: 12px 12px ;}body #wfacp-e-form .wfacp-top .wfacp_main_form.woocommerce select,.wfacp-form.wfacp-top .wfacp_main_form.woocommerce textarea{padding: 12px 12px ; }body #wfacp-e-form .wfacp-top .wfacp_main_form.woocommerce .select2-container .select2-selection--single .select2-selection__rendered{padding: 12px 12px ;}"
                                  }}
                                />
                                <style
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      '\n    .loader {\n        color: #fff;\n        position: fixed;\n        box-sizing: border-box;\n        left: -9999px;\n        top: -9999px;\n        width: 0;\n        height: 0;\n        overflow: hidden;\n        z-index: 999999;\n\n    }\n\n    .loader:after,\n    .loader:before {\n        box-sizing: border-box;\n\n    }\n\n    .loader.is-active {\n        background-color: rgba(0, 0, 0, 0.85);\n        width: 100%;\n        height: 100%;\n        left: 0;\n        top: 0;\n    }\n\n    .loader.is-active:after,\n    .loader.is-active:before {\n        display: block;\n    }\n\n    .blockUI:before {\n\n        display: none;\n    }\n\n\n    @keyframes rotation {\n        0% {\n            transform: rotate(0);\n        }\n        to {\n            transform: rotate(359deg);\n        }\n    }\n\n\n    .loader[data-text]:before {\n        position: fixed;\n        left: 0;\n        top: 50%;\n        color: currentColor;\n\n        text-align: center;\n        width: 100%;\n        font-size: 14px;\n    }\n\n    .loader[data-text=""]:before {\n        content: "Loading";\n    }\n\n    .loader[data-text]:not([data-text=""]):before {\n        content: attr(data-text);\n    }\n\n\n    .loader-default[data-text]:before {\n        top: calc(50% - 63px);\n    }\n\n    .loader-default:after {\n        content: "";\n        position: fixed;\n        width: 48px;\n        height: 48px;\n        border: 8px solid #fff;\n        border-left-color: transparent;\n        border-radius: 50%;\n        top: calc(50% - 24px);\n        left: calc(50% - 24px);\n        animation: rotation 1s linear infinite;\n\n    }\n\n\n    .wfacp_firefox_android .pac-container .pac-item:first-child {\n        margin-top: 20px;\n    }\n\n    span.wfacp_input_error_msg {\n        color: red;\n        font-size: 13px;\n    }\n\n'
                                  }}
                                />
                                <div className="woocommerce-notices-wrapper" />
                                <div className="wt_coupon_wrapper">
                                  <style
                                    type="text/css"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        ".wt_sc_single_coupon{ display:inline-block; width:300px; max-width:100%; height:auto; padding:5px; text-align:center; background:#2890a8; color:#ffffff; position:relative; }\n        .wt_sc_single_coupon .wt_sc_hidden{ display:none; }\n        .wt_sc_single_coupon.active-coupon{ cursor:pointer; }\n        .wt_sc_coupon_amount{ font-size:30px; margin-right:5px; line-height:22px; font-weight:500; }\n        .wt_sc_coupon_type{ font-size:20px;  font-weight:500; line-height:22px; }\n        .wt_sc_coupon_code{ float:left; width:100%; font-size:19px; line-height:22px; }\n        .wt_sc_coupon_code code{ background:none; font-size:15px; opacity:0.7; display:inline-block; line-height:22px; max-width:100%; word-wrap:break-word; }\n        .wt_sc_coupon_content{ padding:10px 0px; float:left; width:100%; }   \n        .wt_sc_coupon_desc_wrapper:hover .wt_sc_coupon_desc{ display:block}\n        .wt_sc_coupon_desc{position:absolute; top:-18px; background:#333; color:#fff; text-shadow:none; text-align:left; font-size:12px; width:200px; right:-220px; padding:10px 20px; z-index:100; border-radius:8px; display:none; }\n        .wt_sc_coupon_desc ul{margin:0!important;text-align:left;list-style-type:disc}\n        .wt_sc_coupon_desc ul li{padding:0;margin:0;width:100%;height:auto;min-height:auto;list-style-type:disc!important}\n        .wt_sc_coupon_desc_wrapper i.info{position:absolute; top:6px; right:10px; font-size:13px; font-weight:700; border-radius:100%; width:20px; height:20px; background:#fff; text-shadow:none; color:#2890a8; font-style:normal; cursor:pointer; line-height:20px; box-shadow:1px 1px 4px #333; }\n\n        .wt_sc_credit_history_url{font-size:13px;font-weight:700;border-radius:100%;width:20px;height:20px;text-shadow:none;font-style:normal;cursor:pointer;position:absolute;right:12px;bottom:10px;text-align:center;line-height:20px;text-decoration:none!important;background:#fff}\n        .wt_sc_credit_history_url span{font:bold 14px/1 dashicons}\n        a.wt_sc_credit_history_url span:before{ line-height:20px; color:#2890a8; }\n\n        @media only screen and (max-width: 700px)  {\n          .wt_sc_coupon_content{z-index: 5; }\n          .wt_sc_single_coupon .wt_sc_coupon_desc{ z-index: 100; right:auto; top:30px; left:0px; }\n        }"
                                    }}
                                  />
                                </div>{" "}


                                <form
                                  name="checkout"
                                  // method="post"
                                  className="checkout woocommerce-checkout"
                                  encType="multipart/form-data"
                                  id="wfacp_checkout_form"
                                >

                                  <div
                                    className="wfacp-left-panel wfacp_page elementor single_step wfacp_last_page"
                                    data-step="single_step"
                                  >
                                    <style
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          '\n\n    @media (min-width: 768px) {\n        #wfacp_smart_buttons .wfacp_smart_button_outer_buttons[count="1"] .wfacp_smart_button_container {\n            width: 100%;\n            float: none;\n        }\n\n        #wfacp_smart_buttons .wfacp_smart_button_outer_buttons[count="2"] .wfacp_smart_button_container {\n            width: 50%;\n        }\n\n\n        #wfacp_smart_buttons .wfacp_smart_button_outer_buttons[count="3"] .wfacp_smart_button_container {\n            width: 33.33%;\n\n        }\n\n        #wfacp_smart_buttons .wfacp_smart_button_outer_buttons[count="4"] .wfacp_smart_button_container {\n            width: 25%;\n\n        }\n\n        #wfacp_smart_buttons .wfacp_smart_button_outer_buttons[count="1"] #pay_with_amazon {\n            background-size: 20%;\n        }\n        #wfacp_smart_buttons .wfacp_smart_button_outer_buttons[count="2"] #pay_with_amazon {\n            background-size: 30%;\n        }\n        #wfacp_smart_buttons .wfacp_smart_button_outer_buttons[count="3"] #pay_with_amazon {\n            background-size: 45%;\n        }\n        #wfacp_smart_buttons .wfacp_smart_button_outer_buttons[count="4"] #pay_with_amazon {\n            background-size: 50%;\n        }\n\n        #wfacp_smart_buttons .wfacp_smart_button_wrap_st {\n            margin: 0 -10px !important;\n        }\n\n        #wfacp_smart_buttons.wfacp_smart_buttons .wc-amazon-checkout-message.wc-amazon-payments-advanced-populated {\n            display: block;\n        }\n\n        #wfacp_smart_buttons.wfacp_smart_buttons div#pay_with_amazon,\n        #wfacp_smart_buttons #wfacp_smart_button_stripe_gpay_apay div#wc-stripe-payment-request-wrapper,\n        #wfacp_smart_buttons #wfacp_smart_button_stripe_gpay_apay div#wc-stripe-payment-request-wrapper,\n        #wfacp_smart_buttons .wfacp_smart_button_wrap_st div#paypal_box_button > div {\n            width: 100%;\n        }\n\n        .wfacp_smart_button_wrap_st div#paypal_box_button > div {\n            max-width: 100%;\n        }\n\n        #wfacp_smart_buttons.wfacp_smart_buttons .wfacp_smart_button_container {\n            display: block;\n            margin: 0 !important;\n            padding: 0 10px;\n            float: left;\n        }\n\n        #wfacp_smart_buttons.wfacp_smart_buttons .wfacp_smart_button_container iframe {\n            max-height: 42px !important;\n            height: 100% !important;\n        }\n\n        #wfacp_smart_buttons.wfacp_smart_buttons .wfacp_smart_button_container:after,\n        #wfacp_smart_buttons.wfacp_smart_buttons .wfacp_smart_button_container:before {\n            content: \'\';\n            display: block;\n        }\n\n        #wfacp_smart_buttons.wfacp_smart_buttons .wfacp_smart_button_container:after {\n            clear: both;\n        }\n\n        #wfacp_smart_buttons .wfacp_smart_button_wrap_st div#paypal_box_button .paypal-buttons {\n            min-width: 1px;\n            height: 42px !important;\n            display: block !important;\n        }\n    }\n\n'
                                      }}
                                    />

                                    <div
                                      className="wfacp-section wfacp-hg-by-box step_0 form_section_single_step_0_elementor-hific "
                                      data-field-count={19}
                                    >
                                      <div className="wfacp_internal_form_wrap wfacp-comm-title ">
                                        <h2 className="wfacp_section_heading wfacp_section_title ">
                                          Shipping Information
                                        </h2>
                                      </div>
                                      <div className="wfacp-comm-form-detail clearfix">
                                        <div className="wfacp-row">

                                          <p className="br_text-base-sans-stretched md:br_text-lg-sans-stretched myGray">Contact</p>

                                          <p
                                            className="form-row form-row-wide wfacp-form-control-wrapper wfacp-col-full  wfacp_field_required validate-required validate-email validate-email"
                                            id="billing_email_field"
                                            data-priority={110}
                                          >
                                            <label
                                              htmlFor="billing_email"
                                              className="wfacp-form-control-label"
                                            >
                                              Email&nbsp;
                                              <abbr
                                                className="required"
                                                title="required"
                                              >
                                                *
                                              </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                type="email"
                                                className="input-text wfacp-form-control"
                                                name="billing_email"
                                                id="billing_email"
                                                placeholder="Email *"
                                                defaultValue=""
                                                autoComplete="email"
                                                value={inputs.email}
                                                onChange={handleTextboxChange('email')}
                                                required
                                              />
                                            </span>{" "}
                                            <span
                                              className="wfacp_inline_error"
                                              data-key="billing_email_field"
                                            />
                                          </p>

                                           <p className="br_text-base-sans-stretched md:br_text-lg-sans-stretched myGray">Delivery</p>
                                          <p
                                            className="form-row form-row-first wfacp-form-control-wrapper wfacp-col-left-half  wfacp_field_required validate-required"
                                            id="billing_first_name_field"
                                            data-priority={10}
                                          >
                                            <label
                                              htmlFor="billing_first_name"
                                              className="wfacp-form-control-label"
                                            >
                                              First name&nbsp;
                                              <abbr
                                                className="required"
                                                title="required"
                                              >
                                                *
                                              </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                type="text"
                                                className="input-text wfacp-form-control"
                                                name="billing_first_name"
                                                id="billing_first_name"
                                                placeholder="First name *"
                                                defaultValue=""
                                                autoComplete="given-name"
                                                value={inputs.fname}
                                                onChange={handleTextboxChange('fname')}
                                                required
                                              />
                                            </span>{" "}
                                            <span
                                              className="wfacp_inline_error"
                                              data-key="billing_first_name_field"
                                            />
                                          </p>
                                          <p
                                            className="form-row form-row-last wfacp-form-control-wrapper wfacp-col-left-half  wfacp_field_required validate-required"
                                            id="billing_last_name_field"
                                            data-priority={20}
                                          >
                                            <label
                                              htmlFor="billing_last_name"
                                              className="wfacp-form-control-label"
                                            >
                                              Last name&nbsp;
                                              <abbr
                                                className="required"
                                                title="required"
                                              >
                                                *
                                              </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                type="text"
                                                className="input-text wfacp-form-control"
                                                name="billing_last_name"
                                                id="billing_last_name"
                                                placeholder="Last name *"
                                                defaultValue=""
                                                autoComplete="family-name"
                                                value={inputs.lname}
                                                onChange={handleTextboxChange('lname')}
                                                required
                                              />
                                            </span>{" "}
                                            <span
                                              className="wfacp_inline_error"
                                              data-key="billing_last_name_field"
                                            />
                                          </p>




                                          <p
                                            className="form-row form-row-wide wfacp-form-control-wrapper wfacp-col-full  wfacp_field_required validate-required validate-email validate-email"
                                            id="billing_country_field"
                                            data-priority={110}
                                          >
                                            <label
                                              htmlFor="billing_country"
                                              className="wfacp-form-control-label"
                                            >
                                              Country&nbsp;
                                              <abbr
                                                className="required"
                                                title="required"
                                              >
                                                *
                                              </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                type="text"
                                                value={inputs.country}
                                                className="input-text wfacp-form-control"
                                                name="billing_country"
                                                id="billing_country"
                                                placeholder="Country *"
                                                defaultValue=""
                                                autoComplete="country"
                                                readOnly
                                              />
                                            </span>
                                          </p>










                                          <p
                                            className="form-row form-row-wide wfacp-form-control-wrapper wfacp-col-full  wfacp_field_required validate-required validate-email validate-email"
                                            id="billing_city_field"
                                            data-priority={110}
                                          >
                                            <label
                                              htmlFor="billing_city"
                                              className="wfacp-form-control-label"
                                            >
                                              City&nbsp;
                                              <abbr
                                                className="required"
                                                title="required"
                                              >
                                                *
                                              </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">


                                              <select
                                                value={inputs.city}
                                                onChange={(e) => setCity(e.target.value)}
                                                onChange={handleTextboxChange('city')}
                                                className="input-text wfacp-form-control"
                                                name="billing_city"
                                                id="billing_city"
                                                placeholder="City *"
                                                required
                                              >
                                                <option value="">Select City*</option>
                                                {cities.map((cityName, index) => (
                                                  <option key={index} value={cityName}>{cityName}</option>
                                                ))}
                                              </select>
                                            </span>{" "}
                                            <span
                                              className="wfacp_inline_error"
                                              data-key="billing_city_field"
                                            />
                                          </p>



                                        <p
                                            className="form-row form-row-wide wfacp-form-control-wrapper wfacp-col-full  wfacp_field_required validate-required validate-email validate-email"
                                            id="billing_address_field"
                                            data-priority={110}
                                          >
                                            <label
                                              htmlFor="billing_address"
                                              className="wfacp-form-control-label"
                                            >
                                              Address&nbsp;
                                              <abbr
                                                className="required"
                                                title="required"
                                              >
                                                *
                                              </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                type="text"
                                                className="input-text wfacp-form-control"
                                                name="billing_address"
                                                id="billing_address"
                                                placeholder="Address *"
                                                defaultValue=""
                                                autoComplete="address"
                                                value={inputs.address}
                                                onChange={handleTextboxChange('address')}
                                                required
                                              />
                                            </span>{" "}
                                            <span
                                              className="wfacp_inline_error"
                                              data-key="billing_email_field"
                                            />
                                          </p>





                                          <p
                                            className="form-row form-row-wide wfacp-form-control-wrapper wfacp-col-full  wfacp_field_required validate-required validate-email validate-email"
                                            id="billing_apt_field"
                                            data-priority={110}
                                          >
                                            <label
                                              htmlFor="billing_apt"
                                              className="wfacp-form-control-label"
                                            >
                                              Apt - Floor 
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                              <input
                                                value={inputs.apt}
                                                onChange={handleTextboxChange('apt')}
                                                type="text"
                                                className="input-text wfacp-form-control"
                                                name="billing_apt"
                                                id="billing_apt"
                                                placeholder="Aptartment - Floor (optional)"
                                                defaultValue=""
                                                required
                                              />
                                            </span>{" "}
                                            <span
                                              className="wfacp_inline_error"
                                              data-key="billing_apt_field"
                                            />
                                          </p>
 

                                          <p
                                            className="form-row form-row-wide wfacp-form-control-wrapper wfacp-col-full wfacp_field_required"
                                            id="billing_phone_field"
                                            data-priority={110}
                                          >
                                            <label htmlFor="billing_phone" className="wfacp-form-control-label">
                                              Phone&nbsp;
                                              <abbr className="required" title="required">
                                                *
                                              </abbr>
                                            </label>

                                            <div className="flex items-center gap-7">
                                              {countryData.flag && (
                                                <span className="flex items-center gap-1 text-sm">
                                                  <img
                                                    src={countryData.flag}
                                                    alt={countryData.code}
                                                    width={24}
                                                    height={18}
                                                    style={{ borderRadius: '2px' }}
                                                  />
                                                  <span className="myGray">{countryData.dial}</span>
                                                </span>
                                              )}
                                              <input
                                                type="text"
                                                className="input-text wfacp-form-control"
                                                name="billing_phone"
                                                id="billing_phone"
                                                placeholder="Phone *"
                                                autoComplete="tel"
                                                value={phone}
                                                onChange={handleTextboxChange('phone')}
                                                required
                                              />
                                            </div>

                                            <span className="wfacp_inline_error" data-key="billing_phone_field" />
                                          </p>










                                          {" "}
                                          <span
                                            className="wfacp_inline_error"
                                            data-key="billing_phone_field"
                                          />
                                          <p />{" "}
                                        </div>
                                      </div>
                                    </div>



                                    <div
                                      className="wfacp-section wfacp-hg-by-box step_2 form_section_single_step_2_elementor-hific "
                                      data-field-count={2}
                                    >
                                      <div className="wfacp_internal_form_wrap wfacp-comm-title ">
                                        <h2 className="wfacp_section_heading wfacp_section_title myGray">
                                          Order Summary
                                        </h2>
                                      </div>
                                      <div className="wfacp-comm-form-detail clearfix">
                                        <div className="wfacp-row">
                                          <div
                                            className="wfacp_woocommerce_form_coupon wfacp-form-control-wrapper "
                                            id="order_coupon_field"
                                          >

                                          </div>
                                          <div
                                            className="wfacp_order_summary wfacp_wrapper_start wfacp_order_sec  "
                                            id="order_summary_field"
                                            data-time={1712942806}
                                          >
                                            <label className="wfacp-order-summary-label myGray"  >Order Summary</label>
                                            <div className="wfacp_anim wfacp_order_summary_container">
                                              <table className="shop_table woocommerce-checkout-review-order-table elementor-hific">
                                                <thead>
                                                  <tr>
                                                    <th className="product-name-area">
                                                      <div className="product-img"> </div>{" "}
                                                      <div className="product-name wfacp_summary_img_true">
                                                        Product{" "}
                                                      </div>
                                                    </th>
                                                    <th className="product-total">Total</th>
                                                  </tr>
                                                </thead>
                                                <tbody>

                                                  {cart?.map((obj, index) => (
                                                    <>
                                                      <tr
                                                        className="cart_item"
                                                        cart_key="aa4f9d456a8504a879ce2fe54e9a68bd"
                                                      >
                                                        <td className="product-name-area">
                                                          <div className="product-image">
                                                            <div className="wfacp-pro-thumb">
                                                              <div className="wfacp-qty-ball" style={{ top: "-5px" }}>
                                                                <div className="wfacp-qty-count">
                                                                  <span className="wfacp-pro-count">{localQuantities[obj._id]}</span>
                                                                </div>
                                                              </div>
                                                              <img src={"" + obj.img[0]}
                                                                width={100}
                                                                height={100}
                                                              />{" "}
                                                            </div>
                                                          </div>
                                                          <div className="product-name  wfacp_summary_img_true ">
                                                            <span className="wfacp_order_summary_item_name">
                                                              {obj.title}
                                                            </span>
                                                          </div>
                                                        </td>
                                                        <td className="product-total">
                                                          <div className="wfacp_order_summary_item_total">
                                                            <span className="woocommerce-Price-amount amount">
                                                              <bdi>
                                                                <span className="woocommerce-Price-currencySymbol">
                                                                  $
                                                                </span>
                                                                {obj.type === 'collection' && obj.selectedSize ? obj.color.find(c => c.color === obj.selectedColor)?.sizes.find(s => s.size === obj.selectedSize)?.price * (localQuantities[obj._id]) : obj.discount * (localQuantities[obj._id] || 1)}
 
                                                              </bdi>
                                                            </span>{" "}
                                                          </div>

                                                          <button className="Checkout_Cart_LineItems_LineItem_Remove" onClick={() => handleRemoveFromCart(obj._id)} style={{ position: "relative" }}>
                                                            <span className="Checkout_Cart_LineItems_LineItem_Remove_Cross">
                                                              <span />
                                                              <span />
                                                            </span>
                                                            <span className="Checkout_Cart_LineItems_LineItem_Remove_Spinner">
                                                              <span />
                                                            </span>
                                                          </button>
                                                        </td>
                                                      </tr>
                                                      <tr style={{ height: '1px', backgroundColor: '#DFDEE5', position: "absolute" }}>




                                                      </tr>
                                                    </>
                                                  ))
                                                  }
                                                </tbody>




                                                {/* Promo Code Input */}
                                                <div style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  gap: "5px",
                                                  padding: "5px",
                                                  borderRadius: "5px",
                                                  margin: "5px",
                                                  border: "1px solid #222"
                                                }}>
                                                  <input
                                                    type="text"
                                                    placeholder="Enter promo code"
                                                    value={promoCode}
                                                    onChange={(e) => setPromoCode(e.target.value)}
                                                    style={{
                                                      flex: 1,
                                                      padding: "8px",
                                                      border: "1px solid #222",
                                                      borderRadius: "4px"
                                                    }}
                                                  />
                                                  <button
                                                    onClick={applyPromo}
                                                    style={{
                                                      padding: "5px 12px",
                                                      color: "#fff",
                                                      border: "none",
                                                      borderRadius: "4px",
                                                      cursor: discountApplied ? "not-allowed" : "pointer",
                                                      background: discountApplied ? "green" : "#222",
                                                    }}
                                                    disabled={discountApplied} // Disable button when discount is applied
                                                  >
                                                    {discountApplied ? "Done!" : "Apply"} {/* Show "Done!" when discount is applied */}
                                                  </button>
                                                </div>

                                                <div>
                                                  <label className="custom-checkbox-container myGray clickText  ">
                                                    <span className="ml-[25px]"></span>I am business or would like a b2b offer
                                                    <input type="checkbox" onChange={handleCheckboxChange} />
                                                    <span className="custom-checkmark"></span>
                                                  </label>

                                                  {showLink && (
                                                    <a
                                                      href="#"
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        generatePDF();
                                                      }}
                                                      style={{ display: 'block', marginTop: '1em', color: 'blue' }}
                                                      className="clickText1"
                                                    >
                                                      Generate Product PDF
                                                    </a>
                                                  )}
                                                </div>





                                                <tfoot>
                                                  <tr className="cart-subtotal">
                                                    <th>
                                                      <span>Subtotal</span>
                                                    </th>
                                                    <td>
                                                      <span className="woocommerce-Price-amount amount">
                                                        <bdi>
                                                          <span className="woocommerce-Price-currencySymbol">
                                                            $
                                                          </span>
                                                          {subtotal.toFixed(2)}
                                                        </bdi>
                                                      </span>
                                                    </td>
                                                  </tr>

                                                  <tr className="shipping_total_fee">
                                                    <td colSpan={1}><span style={{ color: "#82838e" }}>Delivery</span></td>
                                                    <td colSpan={1} style={{ textAlign: "right" }}>
                                                      <span className="woocommerce-Price-amount amount" style={{ color: "#82838e" }}>
                                                        <bdi>
                                                          <span className="woocommerce-Price-currencySymbol" style={{ color: "#82838e" }}>$</span>
                                                          {deliveryFee.toFixed(2)}
                                                        </bdi>
                                                      </span>
                                                    </td>
                                                  </tr>

                                                  <style
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        "\n    .pwgc-checkout-subtitle {\n        line-height: 1.4;\n        font-size: 80%;\n        font-weight: 300;\n    }\n"
                                                    }}
                                                  />
                                                  <tr className="order-total">
                                                    <th>
                                                      <span>Total</span>
                                                    </th>
                                                    <td>
                                                      <strong>
                                                        <span className="woocommerce-Price-amount amount">
                                                          <bdi>
                                                            <span className="woocommerce-Price-currencySymbol">
                                                              $
                                                            </span>
                                                            {total}
                                                          </bdi>
                                                        </span>
                                                      </strong>{" "}
                                                    </td>
                                                  </tr>
                                                </tfoot>
                                              </table>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </form>


                              </div>
                            </div>
                          </div>
                        </div>{" "}
                      </div>
                    </div>


                    {total !== null && (
                      <WhatsAppButton inputs={inputs} items={cart} total={total} delivery={deliveryFee} code={promoCode} />
                    )}



                  </div>
                </div>

              </div>
            </section>

          </div>
          <div className="mt-10"></div>
        </div>


      ) : (
        <div
          data-render-if="cart-is-initialised,cart-is-empty"
          className="Checkout_Empty"
          style={{ marginTop: "2em" }}
        >
          <div className="Checkout_Empty_IconWrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 27">
              <circle cx={13} cy={24} r={2} />
              <circle cx={24} cy={24} r={2} />
              <path d="M1.5 2h3s1.5 0 2 2l4 13s.4 1 1 1h13s3.6-.3 4-4l1-5s0-1-2-1h-19" />
            </svg>
          </div>
          <p className="EmptyCartBlurb">You have no items in your shopping bag.</p>
          <a
            href="/shop"
            className="Common_Button"
            data-auto-id="true"
            id="protected/checkout/checkout-page-with-layout-conditionals-continueshoppingpath-2"
          >
            Continue shopping
          </a>
        </div>

      )}
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n\n  select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"] {\n    font-family: initial;\n    font-size: initial;\n    line-height: initial;\n    font-weight: initial;\n    padding: initial;\n    border-radius: initial;\n    border-style: initial;\n    border-width: initial;\n    border-color: initial;\n    background-color: transparent;\n    margin-bottom: initial;\n    text-shadow: initial;\n    box-shadow: initial;\n    box-sizing: initial;\n    transition: initial;\n    color: initial;\n}\n'
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n\n.NewsletterSignupFooter_Component .klaviyo_submit_button {\n  line-height: inherit;\n}\n"
        }}
      />
      <style
        dangerouslySetInnerHTML={{ __html: "\n\nbody {\n      color: initial;\n}\n" }}
      />


      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n  .Common_Button:focus, .Common_Button:hover {\n    color:#fff !important;\n}\n"
        }}
      />




      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n  .HtmlProductAddToCart{\n        line-height: normal !important;\n  }\n"
        }}
      />



    </>

  )
}

export default page