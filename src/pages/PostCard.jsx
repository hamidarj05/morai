import { useEffect, useState } from "react";
import { addComment, getCommentsByPost, updatePost } from "../api/jsonApi";
import { getCurrentUser } from "../auth/authService";

export default function PostCard({ post, cityName, user }) {

  const userId = getCurrentUser().id  ;
  const [likes, setLikes] = useState(post.likes);

  const [liked, setLiked] = useState(() =>
    userId ? post.likes.userId.includes(userId) : false
  );
  
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);


  useEffect(() => {
    setLikes(post.likes);
    setLiked(userId ? post.likes.userId.includes(userId) : false);
  }, [post.id, post.likes, userId]);

  // Une toogle pour changer le like

  async function toggleLike() {
    if (!userId) {
      alert("Please login to like posts.");
      return;
    }
    let likes = post.likes;
    const alreadyLiked = post.likes.userId.includes(userId);
    if (alreadyLiked) {
      likes.nbLikes--;
      likes.userId = likes.userId.filter((id) => id !== userId);
      updatePost(post.id, { likes });
    } else {
      likes.nbLikes++;
      likes.userId.push(userId);
      updatePost(post.id, { likes });
    }
    post.likes = likes;
    setLikes(likes);
    setLiked(!alreadyLiked);
  }

  // pour pop up des commentaires
  async function toggleComments() {
    const open = !showComments;
    setShowComments(open);

    if (open) {
      try {
        const res = await getCommentsByPost(post.id);
        setComments(res.data || []);
      } catch {
        setComments([]);
      }
    }
  }

  // pour envoyer un commentaire
  async function submitComment() {
    const t = commentText.trim();
    if (!t || !userId) return;

    setLoadingComment(true);

    const newComment = {
      postId: post.id,
      userId: userId,
      text: t,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await addComment(newComment);
      setComments((old) => [...old, res.data]);
      setCommentText("");
    } catch {
      // ignorer si l'erreur
    }

    setLoadingComment(false);
  }


  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      {post.type === "alert" ? (
        <div className="bg-red-500/20 border-b border-red-400/20 px-4 py-2 text-sm">
          🚨 Safety Alert {/* Si il est une post qui donner des alertes */}
        </div>
      ) : null}

      {post.image ? (
        <img
          src={post.image}
          alt={post.title}
          className="h-44 w-full object-cover"
        />
      ) : (
        <div className="h-44 w-full bg-slate-800 flex items-center justify-center text-white/60">
          No image
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-white/70">
          <div>📍 {cityName} • {post.type || "post"}</div>
          <div>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleString()
              : ""}
          </div>
        </div>

        <div className="mt-2 text-lg font-extrabold">{post.title}</div>
        <div className="mt-2 text-sm text-white/80 whitespace-pre-wrap">Author: {user.name}</div>
        <div className="mt-2 text-sm text-white/80 whitespace-pre-wrap">
          {post.text}
        </div>
 
        {Array.isArray(post.tags) && post.tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t, idx) => (
              <span
                key={idx}
                className="text-xs rounded-full border border-white/10 bg-slate-950/40 px-2 py-1 text-white/70"
              >
                #{t}
              </span>
            ))}
          </div>
        ) : null}
 
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={toggleLike}
            className={[
              "rounded-xl border px-3 py-2 text-sm transition",
              liked
                ? "border-emerald-400 bg-emerald-400/20 text-emerald-300"
                : "border-white/10 bg-white/5 hover:bg-white/10",
            ].join(" ")}
          >
            {liked ? "💔 Unlike" : "❤️ Like"} ({likes.nbLikes})
          </button>

          <button
            onClick={toggleComments}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            💬 Comments
          </button>
        </div>
 
        {showComments ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setShowComments(false)}
            />

            <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-slate-950">
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div className="font-extrabold">Comments</div>
                <button
                  onClick={() => setShowComments(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                >
                  ✖
                </button>
              </div>

              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {comments.length === 0 ? (
                  <div className="text-sm text-white/60">
                    No comments yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {comments.map((c) => (
                      <div
                        key={c.id}
                        className="rounded-xl border border-white/10 bg-white/5 p-2"
                      >
                        <div className="text-xs text-white/60">
                          {c.createdAt
                            ? new Date(c.createdAt).toLocaleString()
                            : ""}
                        </div>
                        <div className="text-sm text-white/85 whitespace-pre-wrap">
                          {c.text}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 p-4 flex gap-2">
                <input
                  className="flex-1 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button
                  onClick={submitComment}
                  disabled={loadingComment}
                  className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-bold text-slate-950"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
