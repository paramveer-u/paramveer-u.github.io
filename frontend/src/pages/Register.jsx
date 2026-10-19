import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      nav("/login");
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
        <h1>Create account</h1>
        <p className="alt" style={{ textAlign: "left", marginBottom: 4 }}>Join Kartly and start shopping</p>
        {error && <p className="error">{error}</p>}
        <label>
          Your name
          <input required placeholder="John Doe" value={form.name} onChange={set("name")} />
        </label>
        <label>
          Email
          <input type="email" required placeholder="you@example.com" value={form.email} onChange={set("email")} />
        </label>
        <label>
          Password (6+ characters)
          <input type="password" minLength={6} required placeholder="••••••••" value={form.password} onChange={set("password")} />
        </label>
        <button className="btn" disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </button>
        <p className="alt">
          Already a customer? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
