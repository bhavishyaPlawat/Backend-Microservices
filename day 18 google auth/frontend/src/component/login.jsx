const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.hero}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>
            Sign in with Google to continue to your project dashboard.
          </p>
        </div>

        <button onClick={handleLogin} style={styles.button}>
          <span style={styles.iconWrapper}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M21.35 11.1h-9.2v2.8h5.3c-0.25 1.35-1.05 2.5-2.25 3.25v2.7h3.65c2.15-2 3.4-4.95 3.4-8.75 0-0.65-0.05-1.3-0.15-1.9z"
              />
              <path
                fill="#34A853"
                d="M12.15 21.7c2.95 0 5.45-0.95 7.25-2.6l-3.65-2.7c-1 0.65-2.25 1.05-3.6 1.05-2.75 0-5.1-1.85-5.95-4.35h-3.7v2.75c1.8 3.55 5.65 6.05 9.65 6.05z"
              />
              <path
                fill="#FBBC05"
                d="M6.2 13.1c-0.2-0.65-0.3-1.35-0.3-2.1s0.1-1.45 0.3-2.1v-2.75h-3.7c-0.75 1.5-1.15 3.2-1.15 4.85s0.4 3.35 1.15 4.85l3.7-2.75z"
              />
              <path
                fill="#EA4335"
                d="M12.15 6.35c1.6 0 3.05 0.55 4.2 1.6l3.15-3.1c-1.95-1.8-4.55-2.9-7.35-2.9-4 0-7.85 2.5-9.65 6.05l3.7 2.75c0.85-2.5 3.2-4.35 5.95-4.35z"
              />
            </svg>
          </span>
          Continue with Google
        </button>
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
    background: "linear-gradient(135deg, #0f172a 0%, #0b3b75 100%)",
    color: "#f8fafc",
    fontFamily: "Inter, Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    borderRadius: "24px",
    padding: "36px 32px",
    background: "rgba(255, 255, 255, 0.08)",
    boxShadow: "0 24px 80px rgba(15, 23, 42, 0.35)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.15)",
  },
  hero: {
    marginBottom: "28px",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
  },
  subtitle: {
    marginTop: "12px",
    color: "#e2e8f0",
    fontSize: "1rem",
    lineHeight: 1.7,
  },
  button: {
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "14px 18px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#0f172a",
    background: "#ffffff",
    transition:
      "transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease",
  },
  iconWrapper: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
  },
};

export default Login;
