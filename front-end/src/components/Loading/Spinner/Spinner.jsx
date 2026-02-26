import "./Spinner.css";

export default function Spinner() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div className="loader" />
    </div>
  );
}