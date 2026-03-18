import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import LoadingSpinner from "./LoadingSpinner";
// 1. นำเข้า Hook มาใช้งาน
import { useFavorites } from "../context/FavoritesContext"; 

function PostList() {
  // 2. ดึงค่าจาก Context แทนการรับ Props
  const { favorites, toggleFavorite } = useFavorites();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");

  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const data = await res.json();
      setPosts(data.slice(0, 20));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "Newest") return b.id - a.id;
    return a.id - b.id;
  });

  if (loading) return <LoadingSpinner />;

  if (error) return <div style={{ color: "red", padding: "1rem" }}>เกิดข้อผิดพลาด: {error}</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "#ffffff", borderBottom: "2px solid #1e40af", paddingBottom: "0.5rem" }}>
          โพสต์ล่าสุด
        </h2>
        <button onClick={fetchPosts} style={{ background: "#1e40af", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer" }}>
          🔄 โหลดใหม่
        </button>
      </div>

      <PostCount count={filtered.length} />

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e0", borderRadius: "6px", fontSize: "1rem", marginBottom: "1rem", boxSizing: "border-box" }}
      />

      <div style={{ marginBottom: "1rem", textAlign: "right" }}>
        <button onClick={() => setSortOrder(sortOrder === "Newest" ? "Oldest" : "Newest")} style={{ background: "#1e40af", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer" }}>
          เรียงลำดับ: {sortOrder === "Newest" ? "ใหม่สุด" : "เก่าสุด"}
        </button>
      </div>

      {filtered.length === 0 && <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>ไม่พบโพสต์ที่ค้นหา</p>}

      {sorted.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          // 3. ป้องกัน favorites เป็น undefined ด้วย ?. และส่งค่าจาก Context
          isFavorite={favorites?.includes(post.id) || false}
          onToggleFavorite={() => toggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;