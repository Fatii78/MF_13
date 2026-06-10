import { useState } from "react";
import axios from "axios";
import logo from "./assets/logo.jpeg";

export default function WeddingForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showThanks, setShowThanks] = useState(false);

  const submit = async () => {
    if (!name || !message) {
      return alert("يرجى تعبئة جميع الحقول");
    }

    try {
      await axios.post("/api/messages", {
        name,
        message,
      });

      setName("");
      setMessage("");

      setShowThanks(true);

      setTimeout(() => {
        setShowThanks(false);
      }, 4000);

    } catch (err) {
      console.log(err);
      alert("فشل الإرسال");
    }
  };

  return (
    <>
      <div className="container">

        <img src={logo} alt="logo" className="logo" />

        <div className="form-group">
          <label>الاسم *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>شاركنا فرحتنا واترك لنا رسالة *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button onClick={submit}>
          ← إرسال
        </button>

      </div>

      {showThanks && (
        <div className="overlay">
          <div className="thanks-box">
            <div className="heart">❤️</div>
            <h2>شكراً لمشاركتكم فرحتنا</h2>
          </div>
        </div>
      )}
    </>
  );
}
