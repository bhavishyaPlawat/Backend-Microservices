import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LoginSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : prev + 1));
    }, 450);

    return () => window.clearInterval(interval);
  }, []);

  const dots = useMemo(() => ".".repeat(dotCount), [dotCount]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <svg viewBox="0 0 64 64" width="48" height="48" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="#10b981" opacity="0.2" />
            <path
              d="M20 34l8 8 16-20"
              fill="none"
              stroke="#10b981"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 style={styles.title}>Login Successful</h1>
        <p style={styles.subtitle}>
          Great! You are being redirected to your dashboard now{dots}
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
    color: "#f8fafc",
    fontFamily: "Inter, Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "440px",
    textAlign: "center",
    borderRadius: "24px",
    padding: "40px 32px",
    background: "rgba(255, 255, 255, 0.08)",
    boxShadow: "0 24px 80px rgba(15, 23, 42, 0.35)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.15)",
  },
  iconWrapper: {
    marginBottom: "24px",
    display: "inline-flex",
    borderRadius: "50%",
    padding: "16px",
    background: "rgba(16, 185, 129, 0.12)",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    letterSpacing: "-0.03em",
  },
  subtitle: {
    marginTop: "18px",
    color: "#cbd5e1",
    fontSize: "1rem",
    lineHeight: 1.75,
  },
};

export default LoginSuccess;
