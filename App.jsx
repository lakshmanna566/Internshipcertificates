import React, { useState } from "react";
import Scene from "./Scene";
import { verifyFromSheet } from "./verify";

export default function App() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);

  async function handleVerify(e) {
    e && e.preventDefault();
    setError(null);
    setRecord(null);
    if (!id || id.trim() === "") {
      setError("Please enter a Certificate ID.");
      return;
    }
    setLoading(true);
    try {
      const res = await verifyFromSheet(id.trim());
      if (res) setRecord(res);
      else setError("Certificate not found.");
    } catch (err) {
      setError("Unable to fetch records. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-root">
      <header className="topbar container">
        <div className="brand">
          <img src="/logo.png" alt="ALFOX.AI" className="brand-logo" />
          <div className="brand-text">
            <div className="title">ALFOX<span className="accent">.AI</span></div>
            <div className="subtitle">3D Showcase & Certificate Verification</div>
          </div>
        </div>
        <nav className="nav">
          <a href="#verify">Verify</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-left">
            <h1>ALFOX.AI — 3D Showcase</h1>
            <p className="lead">Explore our services in 3D and verify internship certificates instantly.</p>
            <a href="#verify" className="btn">Verify now</a>
          </div>
          <div className="hero-right">
            <div className="scene-wrapper">
              <Scene />
            </div>
          </div>
        </section>

        <section id="verify" className="verify container">
          <h2>Verify a Certificate</h2>
          <form onSubmit={handleVerify} className="verify-form">
            <input
              aria-label="Certificate ID"
              placeholder="e.g. ALFOX-INT-001"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button className="btn primary" disabled={loading}>
              {loading ? "Checking..." : "Verify"}
            </button>
          </form>

          <div className="result">
            {error && <div className="result-error">{error}</div>}
            {record && (
              <div className="result-card">
                <div className="rc-row"><strong>ID:</strong> <code>{record.CertificateID || record.certificateid || ""}</code></div>
                <div className="rc-row"><strong>Name:</strong> {record.Name || record.name || record.InternName || ""}</div>
                <div className="rc-row"><strong>Internship:</strong> {record.Internship || record.internship || record.Course || ""}</div>
                <div className="rc-row"><strong>Period:</strong> {(record.StartingDate || record.startingdate || record.StartDate || "")} → {(record.EndingDate || record.endingdate || record.EndDate || "")}</div>
                <div className="rc-row"><strong>Status:</strong> <span className="status">{(record.Status || record.status || "Verified")}</span></div>
              </div>
            )}
          </div>
        </section>

        <section id="about" className="about container">
          <h3>About ALFOX.AI</h3>
          <p>ALFOX.AI provides AI and automation solutions. This page showcases services and provides certificate verification.</p>
        </section>

      </main>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} ALFOX.AI — Empowering Digital Intelligence</div>
      </footer>
    </div>
  );
}
