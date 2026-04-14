import { useState, useEffect } from "react";

const SUPABASE_URL = "https://wujglofjbtxvvateanen.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1amdsb2ZqYnR4dnZhdGVhbmVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxODE3NDYsImV4cCI6MjA5MTc1Nzc0Nn0.OcA-U2epmRrB2znRgNJ4LLHgjyDXLh8wqxclr2TzcO4";
const IMG_SRC = "data:image/jpeg;base64,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";

// Password per l'admin - cambiala come vuoi!
const ADMIN_PASSWORD = "mamitblog2024";

async function db(method, path, body) {
  const res = await fetch(SUPABASE_URL + "/rest/v1/" + path, {
    method,
    headers: {
      "apikey": SUPABASE_ANON,
      "Authorization": "Bearer " + SUPABASE_ANON,
      "Content-Type": "application/json",
      "Prefer": method === "POST" ? "return=representation" : "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  return method === "DELETE" ? null : res.json();
}

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital@0;1&family=DM+Sans:ital,wght@0,400;0,600;1,400&display=swap');`;

const css = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080808; color: #f0eee8; font-family: 'DM Sans', sans-serif; }
  .root { min-height: 100vh; }
  .hdr { position: relative; overflow: hidden; padding: 3.5rem 2rem 2.5rem; border-bottom: 2px solid #ff2d78; }
  .hdr-bg { position: absolute; inset: 0; background-size: cover; background-position: center 40%; }
  .hdr-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 55%, rgba(0,229,199,0.2) 100%); }
  .hdr-content { position: relative; z-index: 1; text-align: center; }
  .blog-name { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem,8vw,4rem); letter-spacing: 0.12em; color: #fff; line-height: 1; text-shadow: 0 0 40px rgba(255,45,120,0.5); cursor: pointer; }
  .blog-tag { font-family: 'DM Mono', monospace; font-style: italic; font-size: 0.75rem; color: #00e5c7; letter-spacing: 0.2em; margin-top: 0.4rem; }
  .nav { display: flex; justify-content: center; gap: 1.5rem; margin-top: 1.4rem; align-items: center; flex-wrap: wrap; }
  .nav-btn { background: none; border: none; cursor: pointer; font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.45); padding: 0.3rem 0; border-bottom: 1px solid transparent; transition: all 0.2s; }
  .nav-btn:hover, .nav-btn.active { color: #ff2d78; border-bottom-color: #ff2d78; }
  .nav-new { background: #ff2d78; border: none; cursor: pointer; font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: #fff; padding: 0.35rem 1rem; border-radius: 2px; transition: background 0.2s; }
  .nav-new:hover { background: #cc0050; }
  .main { max-width: 680px; margin: 0 auto; padding: 3rem 1.5rem; }
  .card { border-bottom: 1px solid rgba(255,255,255,0.06); padding: 2rem 0; cursor: pointer; transition: opacity 0.2s; }
  .card:hover { opacity: 0.65; }
  .card-date { font-family: 'DM Mono', monospace; font-size: 0.68rem; color: #00e5c7; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .card-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.9rem; letter-spacing: 0.08em; color: #fff; margin-bottom: 0.4rem; line-height: 1.1; }
  .card-exc { font-size: 0.88rem; color: rgba(240,238,232,0.5); line-height: 1.7; }
  .read-more { display: inline-block; margin-top: 0.6rem; font-family: 'DM Mono', monospace; font-size: 0.66rem; color: #ff2d78; letter-spacing: 0.15em; text-transform: uppercase; }
  .empty { text-align: center; padding: 5rem 2rem; }
  .empty-icon { font-size: 2.5rem; opacity: 0.2; margin-bottom: 1rem; }
  .empty-t { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); }
  .empty-d { font-size: 0.82rem; color: rgba(255,255,255,0.15); margin-top: 0.3rem; }
  .fadein { animation: fi 0.3s ease; }
  @keyframes fi { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
  .back { background: none; border: none; cursor: pointer; font-family: 'DM Mono', monospace; font-size: 0.68rem; color: #00e5c7; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 2rem; padding: 0; display: flex; align-items: center; gap: 0.4rem; }
  .back:hover { color: #fff; }
  .full-date { font-family: 'DM Mono', monospace; font-size: 0.68rem; color: #00e5c7; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.6rem; }
  .full-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem,6vw,2.8rem); letter-spacing: 0.08em; color: #fff; margin-bottom: 1.8rem; line-height: 1.05; }
  .divider { border: none; border-top: 1px solid rgba(255,45,120,0.35); margin-bottom: 2rem; }
  .full-body { font-size: 1rem; line-height: 1.9; color: rgba(240,238,232,0.78); white-space: pre-wrap; }
  .actions { display: flex; gap: 0.8rem; margin-top: 2.5rem; flex-wrap: wrap; }
  .a-btn { background: none; border: 1px solid rgba(255,255,255,0.12); cursor: pointer; font-family: 'DM Mono', monospace; font-size: 0.68rem; color: rgba(255,255,255,0.4); padding: 0.4rem 0.9rem; letter-spacing: 0.1em; border-radius: 2px; transition: all 0.2s; }
  .a-btn:hover { border-color: rgba(255,255,255,0.4); color: #fff; }
  .a-btn.del { border-color: rgba(255,45,120,0.25); color: rgba(255,45,120,0.5); }
  .a-btn.del:hover { border-color: #ff2d78; color: #ff2d78; }
  .flabel { display: block; font-family: 'DM Mono', monospace; font-size: 0.66rem; color: #00e5c7; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.45rem; }
  .fg { margin-bottom: 1.4rem; }
  .fi, .ft { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: #f0eee8; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; padding: 0.7rem 0.9rem; border-radius: 2px; outline: none; transition: border-color 0.2s; }
  .fi:focus, .ft:focus { border-color: #ff2d78; }
  .fi::placeholder, .ft::placeholder { color: rgba(255,255,255,0.18); }
  .ft { min-height: 300px; resize: vertical; line-height: 1.7; }
  .f-actions { display: flex; gap: 1rem; margin-top: 1.8rem; flex-wrap: wrap; }
  .btn-pub { background: #ff2d78; border: none; cursor: pointer; font-family: 'DM Mono', monospace; font-size: 0.7rem; color: #fff; padding: 0.65rem 1.8rem; letter-spacing: 0.15em; text-transform: uppercase; border-radius: 2px; transition: background 0.2s; }
  .btn-pub:hover { background: #cc0050; }
  .btn-can { background: none; border: 1px solid rgba(255,255,255,0.12); cursor: pointer; font-family: 'DM Mono', monospace; font-size: 0.7rem; color: rgba(255,255,255,0.4); padding: 0.65rem 1.4rem; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 2px; transition: all 0.2s; }
  .btn-can:hover { border-color: rgba(255,255,255,0.35); color: rgba(255,255,255,0.7); }
  .fheading { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: 0.1em; color: #fff; margin-bottom: 2rem; }
  .login-box { max-width: 340px; margin: 6rem auto; text-align: center; }
  .login-title { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.1em; color: #fff; margin-bottom: 0.5rem; }
  .login-sub { font-family: 'DM Mono', monospace; font-size: 0.7rem; color: rgba(255,255,255,0.3); letter-spacing: 0.15em; margin-bottom: 2rem; }
  .login-err { font-family: 'DM Mono', monospace; font-size: 0.68rem; color: #ff2d78; margin-top: 0.8rem; letter-spacing: 0.1em; }
  .spinner { display: inline-block; width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.15); border-top-color: #ff2d78; border-radius: 50%; animation: spin 0.7s linear infinite; margin: 3rem auto; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-wrap { text-align: center; padding: 4rem; }
  .admin-badge { font-family: 'DM Mono', monospace; font-size: 0.6rem; color: #00e5c7; letter-spacing: 0.15em; border: 1px solid rgba(0,229,199,0.3); padding: 0.2rem 0.6rem; border-radius: 2px; cursor: pointer; transition: all 0.2s; }
  .admin-badge:hover { border-color: #00e5c7; }
  .logout-btn { background: none; border: none; cursor: pointer; font-family: 'DM Mono', monospace; font-size: 0.6rem; color: rgba(255,255,255,0.25); letter-spacing: 0.1em; text-transform: uppercase; padding: 0; margin-left: 0.5rem; }
  .logout-btn:hover { color: rgba(255,255,255,0.6); }
  .err-msg { font-family: 'DM Mono', monospace; font-size: 0.7rem; color: #ff2d78; text-align: center; padding: 2rem; letter-spacing: 0.1em; }
`;

function fmt(iso) {
  return new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
}
function exc(t) {
  const c = (t || "").replace(/\n+/g, " ").trim();
  return c.length > 155 ? c.slice(0, 155) + "\u2026" : c;
}

export default function App() {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("home");
  const [sel, setSel] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const [form, setForm] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem("blog_admin") === "yes");
  const [showLogin, setShowLogin] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    setLoading(true); setError(null);
    try {
      const data = await db("GET", "posts?select=*&order=created_at.desc");
      setPosts(data);
    } catch(e) {
      setError("Errore nel caricamento dei post. Assicurati di aver creato la tabella su Supabase.");
    }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const login = () => {
    if (pwInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem("blog_admin", "yes");
      setShowLogin(false); setPwInput(""); setPwError("");
    } else {
      setPwError("Password errata");
    }
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("blog_admin");
  };

  const submit = async () => {
    if (!form.title.trim() || !form.body.trim()) return;
    setSaving(true);
    try {
      if (editPost) {
        await db("PATCH", `posts?id=eq.${editPost.id}`, { title: form.title, body: form.body, updated_at: new Date().toISOString() });
      } else {
        await db("POST", "posts", { title: form.title, body: form.body });
      }
      await fetchPosts();
      setForm({ title: "", body: "" }); setEditPost(null); setView("home");
    } catch(e) { alert("Errore nel salvataggio"); }
    setSaving(false);
  };

  const del = async (id) => {
    if (!confirm("Eliminare questo post?")) return;
    await db("DELETE", `posts?id=eq.${id}`);
    await fetchPosts();
    setSel(null); setView("home");
  };

  const edit = (p) => { setEditPost(p); setForm({ title: p.title, body: p.body }); setView("write"); };
  const startNew = () => { setEditPost(null); setForm({ title: "", body: "" }); setView("write"); };
  const open = (p) => { setSel(p); setView("read"); };
  const home = () => setView("home");
  const cancel = () => { home(); setEditPost(null); setForm({ title: "", body: "" }); };

  return (
    <>
      <style>{css}</style>
      <div className="root">
        <header className="hdr">
          <div className="hdr-bg" style={{ backgroundImage: `url(${IMG_SRC})` }} />
          <div className="hdr-overlay" />
          <div className="hdr-content">
            <div className="blog-name" onClick={home}>MASSIMA URBE</div>
            <div className="blog-tag">pensieri &middot; storie &middot; riflessioni</div>
            <nav className="nav">
              <button className={`nav-btn${view === "home" ? " active" : ""}`} onClick={home}>Scritti</button>
              {isAdmin && <button className="nav-new" onClick={startNew}>+ Nuovo</button>}
              {isAdmin
                ? <span style={{display:"flex",alignItems:"center",gap:"0.4rem"}}>
                    <span className="admin-badge">&#128274; admin</span>
                    <button className="logout-btn" onClick={logout}>esci</button>
                  </span>
                : <button className="admin-badge" onClick={() => setShowLogin(true)}>accedi</button>
              }
            </nav>
          </div>
        </header>

        {showLogin && (
          <div className="main fadein">
            <div className="login-box">
              <div className="login-title">Area admin</div>
              <div className="login-sub">inserisci la password per scrivere</div>
              <input
                className="fi"
                type="password"
                placeholder="Password..."
                value={pwInput}
                onChange={e => setPwInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && login()}
                autoFocus
              />
              {pwError && <div className="login-err">{pwError}</div>}
              <div className="f-actions" style={{justifyContent:"center",marginTop:"1rem"}}>
                <button className="btn-pub" onClick={login}>Accedi</button>
                <button className="btn-can" onClick={() => { setShowLogin(false); setPwInput(""); setPwError(""); }}>Annulla</button>
              </div>
            </div>
          </div>
        )}

        {!showLogin && (
          <main className="main">
            {loading && <div className="loading-wrap"><div className="spinner" /></div>}
            {error && <div className="err-msg">{error}</div>}

            {!loading && !error && view === "home" && (
              posts.length === 0
                ? <div className="empty">
                    <div className="empty-icon">&#9998;</div>
                    <div className="empty-t">Nessuno scritto ancora</div>
                    <div className="empty-d">{isAdmin ? "Clicca + Nuovo per cominciare" : "Torna presto!"}</div>
                  </div>
                : posts.map(p => (
                  <article className="card" key={p.id} onClick={() => open(p)}>
                    <div className="card-date">{fmt(p.updated_at || p.created_at)}</div>
                    <h2 className="card-title">{p.title}</h2>
                    <p className="card-exc">{exc(p.body)}</p>
                    <span className="read-more">Leggi &#8594;</span>
                  </article>
                ))
            )}

            {!loading && !error && view === "read" && sel && (
              <div className="fadein">
                <button className="back" onClick={home}>&#8592; Tutti gli scritti</button>
                <div className="full-date">{fmt(sel.updated_at || sel.created_at)}</div>
                <h1 className="full-title">{sel.title}</h1>
                <hr className="divider" />
                <div className="full-body">{sel.body}</div>
                {isAdmin && (
                  <div className="actions">
                    <button className="a-btn" onClick={() => edit(sel)}>Modifica</button>
                    <button className="a-btn del" onClick={() => del(sel.id)}>Elimina</button>
                  </div>
                )}
              </div>
            )}

            {!loading && view === "write" && isAdmin && (
              <div className="fadein">
                <button className="back" onClick={cancel}>&#8592; Torna indietro</button>
                <div className="fheading">{editPost ? "Modifica scritto" : "Nuovo scritto"}</div>
                <div className="fg">
                  <label className="flabel">Titolo</label>
                  <input className="fi" placeholder="Il titolo..." value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
                </div>
                <div className="fg">
                  <label className="flabel">Testo</label>
                  <textarea className="ft" placeholder="Scrivi qui..." value={form.body} onChange={e => setForm(f => ({...f, body: e.target.value}))} />
                </div>
                <div className="f-actions">
                  <button className="btn-pub" onClick={submit} disabled={saving}>{saving ? "Salvataggio..." : editPost ? "Salva" : "Pubblica"}</button>
                  <button className="btn-can" onClick={cancel}>Annulla</button>
                </div>
              </div>
            )}
          </main>
        )}
      </div>
    </>
  );
}
