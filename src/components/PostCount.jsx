function PostCount({ count }) {
  return (
    <div
      style={{
        color: "#2d3748",
        borderBottom: "2px solid #1e40af",
        paddingBottom: "0.5rem",
      }}
    >
      <h2>โพสต์ทั้งหมด: {count} รายการ</h2>
    </div>
  );
}
export default PostCount;
