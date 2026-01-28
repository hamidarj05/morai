import React, { useEffect, useState } from "react";
import { deleteComment, deletePost, getComments, getPosts } from "../../api/jsonApi";

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  function loadData() {
    setLoading(true);

    Promise.all([getPosts(), getComments()])
      .then(([pRes, cRes]) => {
        setPosts(pRes.data || []);
        setComments(cRes.data || []);
      })
      .catch(() => {
        setPosts([]);
        setComments([]);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadData();
  }, []);

  async function removePost(postId) {
    const ok = window.confirm("Delete this post?");
    if (!ok) return;

    try {
      // supprimer tous les commentatire liier a ce post
      for(let i=0 ; i<comments.length ; i++){
        if(comments[i].postId===postId){
          await deleteComment(comments[i].id);
        }
      }
      await deletePost(postId);

      // Refrecher  les donnees
      loadData();
    } catch (e) {
      alert("Delete failed. Check json-server.");
    }
  }

  // filtre les posts par titre ou texte
  const filtered = posts.filter((p) => {
    const t = (p.title || "").toLowerCase();
    const txt = (p.text || "").toLowerCase();
    const s = search.toLowerCase();
    return t.includes(s) || txt.includes(s);
  });

  return (
    <div>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="text-xl font-extrabold">Manage Posts</div>
          <div className="text-sm text-white/60">
            Admin moderation: delete bad content
          </div>
        </div>

        <div className="flex gap-2">
          <input
            className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm"
            placeholder="Search title or text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={loadData}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-white/70">
          Loading...
        </div>
      ) : null}

      <div className="mt-4 overflow-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-white/80">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">CityId</th>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Likes</th>
              <th className="text-left p-3">Created</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-3 text-white/70">{p.id}</td>
                <td className="p-3 text-white/80">{p.type || "-"}</td>
                <td className="p-3 text-white/80">{p.cityId}</td>
                <td className="p-3">
                  <div className="font-bold">{p.title}</div>
                  <div className="text-white/60 line-clamp-2">{p.text}</div>
                </td>
                <td className="p-3 text-white/80">{p.likes.nbLikes || 0}</td>
                <td className="p-3 text-white/70">
                  {p.createdAt ? new Date(p.createdAt).toLocaleString() : "-"}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => removePost(p.id)}
                    className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm hover:bg-red-500/15"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!loading && filtered.length === 0 ? (
              <tr>
                <td className="p-4 text-white/60" colSpan="7">
                  No posts found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

    </div>
  );
}
