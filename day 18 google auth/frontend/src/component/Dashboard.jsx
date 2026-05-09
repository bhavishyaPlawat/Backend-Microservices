const Dashboard = () => {
  const userToken = window.localStorage.getItem("token");

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to your dashboard</h1>
        <p style={styles.subtitle}>
          You are successfully logged in . Use the dashboard to access your
          protected content.
        </p>
        <div style={styles.tokenBox}>
          <strong>Stored token:</strong>
          <p style={styles.tokenText}>{userToken || "No token found"}</p>
        </div>
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
    maxWidth: "520px",
    textAlign: "center",
    borderRadius: "24px",
    padding: "40px 32px",
    background: "rgba(255, 255, 255, 0.08)",
    boxShadow: "0 24px 80px rgba(15, 23, 42, 0.35)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.15)",
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
  tokenBox: {
    marginTop: "28px",
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(15, 23, 42, 0.7)",
    color: "#e2e8f0",
    textAlign: "left",
    wordBreak: "break-word",
  },
  tokenText: {
    marginTop: "8px",
    fontSize: "0.95rem",
    lineHeight: 1.5,
    color: "#f8fafc",
  },
};

export default Dashboard;
