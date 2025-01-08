import { useState } from "react";
import { auth, setupRecaptcha } from "../utils/firebaseConfig";
import { signInWithPhoneNumber } from "firebase/auth";

const PhoneAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const sendOtp = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      console.log(auth)
      console.log(phone)
      console.log(appVerifier)

      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      console.log(confirmation)
      setConfirmationResult(confirmation);
      alert("OTP sent!");
    } catch (error) {
      console.log(error)
      console.error(error);
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      alert("Phone verified!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      {!confirmationResult ? (
        <div>
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default PhoneAuth;
