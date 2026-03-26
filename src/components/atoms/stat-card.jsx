export function StatCard({ label, value, detail }) {
    return (
        <article className="stat-card">
            <p className="stat-card-label">{label}</p>
            <h3 className="stat-card-value">{value}</h3>
            <p className="stat-card-detail">{detail}</p>
        </article>
    );
}
