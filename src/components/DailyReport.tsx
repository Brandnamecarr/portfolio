import "./DailyReport.css";

export default function DailyReport() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="daily-report">
      <div className="daily-report__header">
        <h2>Daily report</h2>
        <span className="daily-report__date">{today}</span>
      </div>

      <div className="daily-report__body">
        <p className="daily-report__empty">Nothing here yet.</p>
      </div>
    </div>
  );
}
