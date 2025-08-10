import { useEffect, useState } from "react";
import { sendEmail } from '../app/api/sendEmail/sendEmail';

export default function OfferPopup() {
  const [offer, setOffer] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false); // 🔥 Copy state

  useEffect(() => {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "petyshop.netlify.app" ||
      window.location.hostname === "petyshop.me"
    ) {
      const hasSeenPopup = localStorage.getItem("hasSeenOfferPopup");
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }

    fetch("/api/offer")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setOffer(data[0].name);
      })
      .catch((err) => console.error("Error fetching offer:", err));
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenOfferPopup", "true");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendEmail(new FormData(e.target));
    setIsSubmitted(true);
    setEmail("");
    localStorage.setItem("hasSeenOfferPopup", "true");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("Abcd12345");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2s
  };

  return isOpen ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          color: "#222",
          padding: "50px",
          borderRadius: "12px",
          width: "600px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
          >
            <rect width={44} height={44} />
            <path
              d="M7 17L16.8995 7.10051"
              stroke="#222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 7.00001L16.8995 16.8995"
              stroke="#222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Header */}
        <h2 className="myGray">GET 10% OFF YOUR FIRST ORDER NOW!</h2>

        {!isSubmitted ? (
          <>
            <h6 className="mt-10 myGray">Tell us where to send your exclusive code.</h6>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email:"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "25px", 
                  border: "1px solid #222",
                  color: "#222",
                }}
              />
              <button
                type="submit"
                style={{
                  marginTop: "25px",
                  backgroundColor: "#1f1a17",
                  color: "white",
                  padding: "12px", 
                  border: "none",
                  cursor: "pointer",
                  width: "50%",
                  fontWeight: "bold",
                  fontSize: "26px",
                }}
              >
                CLAIM MY CODE
              </button>
              <p className="mt-10 font-bold cursor-pointer myGray2" onClick={handleClose}>
                No thanks, I will pay full price.
              </p>
            </form>
          </>
        ) : (
          <>
            <h3 className="myGray" style={{ marginTop: "30px", color: "#c5e1a5" }}>🎉 Thank you!</h3>
            <p className="myGray" style={{ fontSize: "18px", marginTop: "15px" }}>
              Here is your exclusive discount code:
            </p>
            <div
              style={{
                marginTop: "20px",
                background: "#fff",
                color: "#222",
                fontSize: "20px",
                fontWeight: "bold",
                padding: "10px",
                borderRadius: "8px",
                display: "inline-block",
                position: "relative",
              }}
              className="myBB"
            >
              { "Abcd12345"}
              {/* 🔥 Copy Button */}
              <button
                onClick={handleCopy}
                style={{
                  marginLeft: "10px",
                  padding: "6px 10px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#1f1a17",
                  color: "#fff",
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="myGray2" style={{ marginTop: "20px", fontSize: "16px" }}>
              Use it at checkout to save 10% on your first order!
            </p>
          </>
        )}
      </div>
    </div>
  ) : null;
}
