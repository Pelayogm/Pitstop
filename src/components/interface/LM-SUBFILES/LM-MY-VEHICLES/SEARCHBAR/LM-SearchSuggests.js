import '../../../interface_CSS/LM-CSS/LM-SUBFILES-CSS/LM-SEARCHBAR/LM-SearchSuggests.css'

export default function LMSearchSuggestions({ items, visible, getLabel, onSelect }) {
    return (
        <div className={`root-lm-search-suggestions${visible ? ' visible' : ''}`}>
            <div className="lm-search-container-header">
                <p>Resultados de la búsqueda</p>
            </div>
            <div className="lm-search-container-content">
                <ul className="list-group">
                    {items.map((item, index) => (
                        <li
                            key={item.id}
                            className="list-group-item list-group-item-action"
                            style={{ '--i': index }}
                            onClick={() => onSelect(item)}
                        >
                            {getLabel(item)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}