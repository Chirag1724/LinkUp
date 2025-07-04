import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { newPassword });
      alert("Password updated!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Reset failed");
    }
  };

  return (
    <form onSubmit={handleReset}>
      <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" />
      <button type="submit">Reset Password</button>
    </form>
  );
}
