import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { askGemini } from "../api/geminiApi";
import { getCities, getScamsByCity, getSpotsByCity } from "../api/jsonApi"; 


export default function ChatPage() {
  const navigate = useNavigate();
  const { cityId } = useParams();

  const [cities, setCities] = useState([]);
  const [spots, setSpots] = useState([]);
  const [scams, setScams] = useState([]);

  const [messages, setMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // pour stocker les messages
  const storageKey = "CHAT_CITY_" + cityId;
  // pour charger les messages quand le composant charge
  useEffect(() => {
    setLoaded(false);
    const saved = localStorage.getItem(storageKey);
    setMessages(saved ? JSON.parse(saved) : []);
    setLoaded(true);
  }, [storageKey]);

 
  // pour faire défiler la page
  const bottomRef = useRef(null);

  // pour sauvegarder les messages
  useEffect(() => {
  if (!loaded) return;
  localStorage.setItem(storageKey, JSON.stringify(messages));
}, [messages, storageKey, loaded]);


  // pour faire défiler la page (scroll)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // pour charger les villes + contexte de la ville
  useEffect(() => {
    setError("");

    getCities()
      .then((res) => setCities(res.data))
      .catch(() => setCities([]));

    getSpotsByCity(cityId)
      .then((res) => setSpots(res.data))
      .catch(() => setSpots([]));

    getScamsByCity(cityId)
      .then((res) => setScams(res.data))
      .catch(() => setScams([]));
  }, [cityId]);

  // nom de ville
  let cityName = "Morocco";
  for (let i = 0; i < cities.length; i++) {
    if (String(cities[i].id) === String(cityId)) {
      cityName = cities[i].name;
      break;
    }
  }

  function addMessage(role, text) {
    setMessages((old) => [
      ...old,
      { id: Date.now() + Math.random(), role, text },
    ]);
  }

  // detecter c'estt l'criture en arabic
  function isArabic(text) {
    return /[\u0600-\u06FF]/.test(text);
  }

  function buildPrompt(userText) {
    const topSpots = spots.slice(0, 10).map((s) => ({
      name: s.name,
      area: s.area,
      type: s.type,
      tip: s.tip,
    }));

    const topScams = scams.slice(0, 6).map((s) => ({
      title: s.title,
      avoid: s.avoid,
    }));

    const allowedCities = cities.map((c) => c.name);
    const lang = isArabic(userText) ? "Arabic" : "English";

    // Prompt
    const prompt =
  `You are a friendly Moroccan local guide chatting on WhatsApp.\n` +
  `Your tone is natural, helpful, and concise.\n` + 
  `Language: ${lang}\n\n` +

  `STRICT RULES:\n` +
  `- Talk ONLY about the city: ${cityName}\n` +
  `- Cities allowed in this app: ${allowedCities.join(", ")}\n` +
  `- If the user asks about another city, reply exactly: "This city is not available in the app yet."\n` +
  `- NEVER invent place names.\n` +
  `- Use ONLY the places from SPOTS when mentioning locations.\n` +
  `- You MAY talk about food, plans, tips, or activities, but ONLY if they are clearly related to ${cityName}.\n\n` +

  `ANSWER STYLE (VERY IMPORTANT):\n` +
  `- Maximum 8 short lines (not more).\n` +
  `- Use Emogies if Needed.\n` +
  `- Prefer bullet points (•) when listing.\n` +
  `- No long paragraphs.\n` +
  `- Clear, simple sentences.\n` +
  `- Do NOT use markdown, stars (**), or special formatting.\n\n` +

  `CONTENT STRUCTURE (when relevant):\n` +
  `- 3–5 main suggestions\n` +
  `- 1 local tip\n` +
  `- 1 safety/scam tip if relevant\n\n` +

  `SPOTS (official places you can use):\n` +
  `${JSON.stringify(topSpots, null, 2)}\n\n` +

  `SCAMS (mention only if relevant):\n` +
  `${JSON.stringify(topScams, null, 2)}\n\n` +

  `USER MESSAGE:\n${userText}\n\n` +

  `FINAL RULE:\n` +
  `If the answer risks becoming long, STOP immediately at 8 lines.`;


    return prompt;
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setError("");
    addMessage("user", text);
    setInput("");
    setLoading(true);

    try {
      const prompt = buildPrompt(text);
      const reply = await askGemini(prompt);
      addMessage("assistant", reply);
    } catch (e) {
      setError(String(e.message || e));
      addMessage(
        "assistant",
        "Sorry 😅 I can’t reply now. Check API key / internet."
      );
    }

    setLoading(false);
  }

  function keyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function startChat() {
    addMessage(
      "assistant",
      `Salam 😄 I’m your guide for ${cityName}.\n• Best things to do\n• 1-day plan\n• Food to try\n• Safety tip`
    );
  }

  function clearChat() {
    setMessages([]);
    localStorage.removeItem(storageKey);
  }
  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <div className="text-xl font-extrabold flex items-center gap-2 flex-wrap">
            <span>Chat • {cityName}</span>

            {/* Changer la vile*/}
            <select
              className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm"
              value={String(cityId)}
              onChange={(e) => navigate(`/chat/${e.target.value}`)}
            >
              {cities.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-white/60">
            Spots: {spots.length} • Scams: {scams.length}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={startChat}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            Start
          </button>
          <button
            onClick={clearChat}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            Clear
          </button>
        </div>
      </div>

      {error ? (
        <div className="mb-3 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm">
          <b>Error:</b> {error}
        </div>
      ) : null}

      {/* messages */}
      <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-3">
        {messages.length === 0 ? (
          <div className="text-white/70">
            No messages yet. Click <b>Start</b>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={[
                    "max-w-[85%] rounded-2xl border px-3 py-2 text-sm",
                    "whitespace-pre-wrap break-words",
                    m.role === "user"
                      ? "bg-emerald-600/30 border-emerald-400/20"
                      : "bg-slate-950/40 border-white/10",
                  ].join(" ")}
                >
                  {m.text}
                </div>
              </div>
            ))}


            {loading ? (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white/70">
                  Typing...
                </div>
              </div>
            ) : null}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/*L'input pour envoyer le message comme en clickc sur send ou en tapps entrer*/}
      <div className="mt-3 flex gap-2">
        <textarea
          className="flex-1 min-h-[44px] max-h-[120px] resize-y rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={keyDown}
          placeholder={`Ask about ${cityName}...`}
        />
        <button
          onClick={send}
          disabled={loading}
          className={[
            "rounded-2xl px-4 py-3 text-sm font-extrabold",
            loading
              ? "bg-emerald-500/40 text-white/70 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-400 text-slate-950",
          ].join(" ")}
        >
          Send
        </button>
      </div>
    </div>
  );
}
