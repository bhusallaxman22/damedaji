export function ResearchPill({ label, onClick }) {
    return (
        <button type="button" className="research-pill" onClick={onClick}>
            {label}
        </button>
    );
}
