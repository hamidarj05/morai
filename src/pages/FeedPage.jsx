import { useEffect, useState } from "react";
import { getCities, getPosts, getPostsByCity, getUsers } from "../api/jsonApi";
import PostCard from "./PostCard"; 

export default function FeedPage() {
  const [cities, setCities] = useState([]);
  const [posts, setPosts] = useState([]);
 
  const [selectedCityId, setSelectedCityId] = useState("all");
  const [loading, setLoading] = useState(false);

  // recuperer les donner d'utilisateur
  const [users, setUsers] = useState([]);

  // recharger les donner d'utilisateur une seul fois 
  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);


  // recharger les donner des villes une seul fois 
  useEffect(() => {
    getCities()
      .then((res) => setCities(res.data))
      .catch(() => setCities([]));
  }, []);

  // recharger les donner des posts une seul fois 
  useEffect(() => {
    setLoading(true);

    if (selectedCityId === "all") {
      getPosts()
        .then((res) => setPosts(res.data))
        .catch(() => setPosts([]))
        .finally(() => setLoading(false));
    } else {
      getPostsByCity(selectedCityId)
        .then((res) => setPosts(res.data))
        .catch(() => setPosts([]))
        .finally(() => setLoading(false));
    }
  }, [selectedCityId]);

  // retourner le nom de ville par l'id
  function cityNameById(id) {
    for (let i = 0; i < cities.length; i++) {
      if (String(cities[i].id) === String(id)) return cities[i].name;
    }
    return "Unknown";
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="text-xl font-extrabold">Community Feed</div>
          <div className="text-sm text-white/60">
            Posts shared by travelers
          </div>
        </div>

        <select
          className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm outline-none"
          value={selectedCityId}
          onChange={(e) => setSelectedCityId(e.target.value)}
        >
          <option value="all">All cities</option>
          {cities.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
 
      {loading ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/70">
          Loading posts...
        </div>
      ) : null}

      {!loading && posts.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/70">
          No posts yet. Go to <b>Create Post</b> and add the first one
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {posts
          .slice()
          .sort((a, b) => {
            const ta = new Date(a.createdAt || 0).getTime();
            const tb = new Date(b.createdAt || 0).getTime();
            return tb - ta;
          })
          .map((p) => (
            <PostCard key={p.id} post={p} cityName={cityNameById(p.cityId)} user={users.find((u) => u.id === p.userId)} />
          ))}
      </div>

    </div>
  );
}
