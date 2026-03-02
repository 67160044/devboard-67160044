function UserCard({ name, email }) {
  // ดึงตัวอักษรแรกมาทำ avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  // ใช้ switch case เพื่อกำหนดสีของ avatar ตาม index ที่คำนวณได้จากชื่อผู้ใช้
  // คำนวณหา index ของสี (จะได้ค่า 0, 1 หรือ 2)

  //1.เปลี่ยนตัวอักษรแรกของชื่อเป็นตัวเลขโดยใช้ charCodeAt(0)
  //2.นำตัวเลขที่ได้มาหารด้วย 3 แล้วเอาเศษ (modulo) เพื่อให้ได้ค่า index ที่อยู่ในช่วง 0-2
  //3.ใช้ switch case เพื่อตั้งค่าสีของ avatar ตามค่า index ที่ได้
  //ใช้ switch case หรือ if else ก็ได้

  //ขอปรับมาใช้ name.length % 3 แทนเพื่อให้สีต่างกันเนื่องจาก"ส" และ "ว" มีค่า charCode % 3 เป็น 2 เหมือนกันทั้งหมดจึงได้แต่สีม่วง
  const colorIndex = name.length % 3;

  let AvatarColor;
  switch (colorIndex) {
    case 0:
      AvatarColor = "#1e40af"; // น้ำเงิน
      break;
    case 1:
      AvatarColor = "#16a34a"; // เขียว
      break;
    case 2:
      AvatarColor = "#9333ea"; // ม่วง
      break;
    default:
      AvatarColor = "#1e40af";
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        marginBottom: "0.75rem",
        background: "white",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          background: AvatarColor,
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "0.9rem",
        }}
      >
        {initials}
      </div>
      <div>
        <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>
        <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
      </div>
    </div>
  );
}

export default UserCard;
