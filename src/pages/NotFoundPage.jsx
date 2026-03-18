// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "100px 20px",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "72px", marginBottom: "0" }}>404</h1>
      <p style={{ fontSize: "20px", color: "#cbd5e0" }}>
        ไม่พบหน้าที่คุณต้องการ
      </p>

      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          background: "#1e40af",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
        }}
      >
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}

export default NotFoundPage;
