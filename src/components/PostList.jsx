import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");

  // 1. เพิ่ม State สำหรับเก็บสถานะการเรียงลำดับ ('Newest' = ใหม่สุด, 'Oldest' = เก่าสุด)
  const [sortOrder, setSortOrder] = useState("Newest");

  // กรองโพสต์ตาม search
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // เรียงลำดับโพสต์ตามสถานะ
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "Newest") {
      return b.id - a.id; // ใหม่สุดก่อน
    }
    return a.id - b.id; // เก่าสุดก่อน
  });

  return (
    <div>
      <h2
        style={{
          color: "#ffffff",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      <PostCount count={posts.length} />

      {/* Search Input */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />
      {/* Sort button */}
      <div style={{ marginBottom: "1rem", textAlign: "right" }}>
        <button
          onClick={() => setSortOrder(sortOrder === "Newest" ? "Oldest" : "Newest")}
          style={{
            background: "#1e40af",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          เรียงลำดับ: {sortOrder === "Newest" ? "ใหม่สุด" : "เก่าสุด"}
        </button>
      </div>

      {/* ถ้าไม่พบโพสต์ */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* แสดงรายการโพสต์ */}
      {sorted.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
