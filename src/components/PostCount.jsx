function PostCount({ count }) {
  return (
    <div
      style={{
        color: "#2d3748",
        borderBottom: "2px solid #1e40af",
        paddingBottom: "0.5rem",
      }}
    >
      โพสต์ทั้งหมด: {count} รายการ
    </div>
  );
}
export default PostCount;
