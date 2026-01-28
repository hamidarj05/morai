import { useEffect, useState } from "react";
import { getCities, getPosts } from "../api/jsonApi";
import { useNavigate } from "react-router-dom";
import MyPostCard from "./MyPostCard";

export default function MyPostsPage() {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser")); 
  useEffect(() => {
    getCities()
      .then((res) => setCities(res.data || []))
      .catch(() => setCities([]));
  }, []);

  function loadPosts() {
    setLoading(true);
    getPosts()
      .then((res) => {
        const all = res.data || [];
        // Juste les posts de l'utilisateur connecté 
        const userPost = all.filter((p) => String(p.userId) === String(user?.id)); 
        setPosts(userPost);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function cityNameById(id) {
    const c = cities.find((x) => String(x.id) === String(id));
    return c ? c.name : "Unknown";
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="text-xl font-extrabold">My Posts</div>
          <div className="text-sm text-white/60">Update or delete your posts</div>
        </div>

        <button
          onClick={loadPosts}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/70">
          Loading...
        </div>
      ) : null}

      {!loading && posts.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/70">
          No posts yet. Create one from <b><button onClick={() => navigate("/create")}>Create Post</button></b>.
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {posts
          .slice()
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
          .map((p) => (
            <MyPostCard
              key={p.id}
              post={p}
              cityName={cityNameById(p.cityId)}
              onChanged={loadPosts}  
            />
          ))}
      </div>
    </div>
  );
}
