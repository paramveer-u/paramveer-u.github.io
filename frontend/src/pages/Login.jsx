import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      localStorage.setItem("user", JSON.stringify(data));
      nav("/");
    } catch {
      setError("Can't reach the server. Is the Java backend running on port 8080?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stage">
      <div className="brand">kartly</div>
      <form className="glass" onSubmit={submit}>
        <h1>Welcome back</h1>
        <p className="alt" style={{ textAlign: "left", marginBottom: 4 }}>Sign in to access your account</p>
        {error && <p className="error">{error}</p>}
        <label>
          Email
          <input type="email" required placeholder="you@example.com" value={form.email} onChange={set("email")} />
        </label>
        <label>
          Password
          <input type="password" required placeholder="••••••••" value={form.password} onChange={set("password")} />
        </label>
        <button className="btn" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <p className="alt">
          New to Kartly? <Link to="/register">Create your account</Link>
        </p>
      </form>
    </div>
  );
}
