import './Pagination.css'


export default function Pagination({ page, totalPages, onChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const canPrev = page > 1;
    const canNext = page < totalPages;

    const go = (p) => onChange(Math.max(1, Math.min(totalPages, p)));

    return (
        <nav className="pagination" aria-label="Pagination">
            <button 
            type="button"
            className="pagination__btn"
            onClick={() => go(page - 1)}
            disabled={!canPrev}
            >
            ◀  
            </button>

            <span className="pagination__info">
                {page} / {totalPages}
            </span>

            <button 
            type="button"
            className="pagination__btn"
            onClick={() => go(page + 1)}
            disabled={!canNext}
            >
            ▶   
            </button>
        </nav>
    );
}