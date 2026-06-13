import { useContext, useState, useEffect } from 'react'
import '../../../interface_CSS/LM-CSS/LM-SUBFILES-CSS/LM-Searchbar.css'
import { loginContext } from '../../../LOGIN-FILES/LOGIN-LoginContext';
import LMSearchSuggestions from './LM-SearchSuggests';

export default function LMSearchBar() {

    const { userToken } = useContext(loginContext)

    const [userQuery, setUserQuery] = useState("");
    const [brandList, setBrandList] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [modelList, setModelList] = useState([]);
    const [brandSelected, setBrandSelected] = useState(null);

    useEffect(() => {
        handleBrands();
    }, []);

    const handleBrands = async () => {
        try {
            const response = await fetch(`http://localhost:8080/pitstop/cars/brand/all`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${userToken}` }
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const res = await response.json();
            setBrandList(res);
        } catch (error) {
            console.error("Error cargando marcas:", error);
        }
    }

    const handleBrandSelected = async (name) => {
        try {
            const response = await fetch(
                `http://localhost:8080/pitstop/cars/brand/byName?name=${encodeURIComponent(name)}`,
                { method: "GET", headers: { "Authorization": `Bearer ${userToken}` } }
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const res = await response.json();
            setBrandSelected(res);
            return res;
        } catch (error) {
            console.error("Error obteniendo marca:", error);
            return null;
        }
    }

    const handleModels = async (brandId) => {
        debugger
        try {
            const response = await fetch(
                `http://localhost:8080/pitstop/cars/models/byBrandId?id=${brandId}`,
                { method: "GET", headers: { "Authorization": `Bearer ${userToken}` } }
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const res = await response.json();
            setModelList(res);
            console.log(modelList)
        } catch (error) {
            console.error("Error cargando modelos:", error);
        }
    }

    const handleWritting = (e) => {
        const text = e.target.value;
        setUserQuery(text);

        const trimmed = text.trim();
        if (trimmed === "") {
            setSuggestions([]);
            setBrandSelected(null);
            setModelList([]);
            return;
        }

        if (brandSelected) {
            const prefix = brandSelected.name.toLowerCase();
            if (!text.toLowerCase().startsWith(prefix)) {
                setBrandSelected(null);
                setModelList([]);
                const q = trimmed.toLowerCase();
                setSuggestions(brandList.filter((b) => b.name.toLowerCase().startsWith(q)));
                return;
            }
            const modelQuery = text.slice(brandSelected.name.length).trim();
            setSuggestions(modelQuery === "" ? modelList : modelList.filter((m) => matchesQuery(m, modelQuery)));
            return;
        }

        const q = trimmed.toLowerCase();
        setSuggestions(brandList.filter((b) => b.name.toLowerCase().startsWith(q)));
    };

    const confirmBrand = async (input) => {
        const target = input.trim().toUpperCase();
        const exists = brandList.find((current) => current.name.toUpperCase() === target);

        if (!exists) return false;

        setUserQuery(exists.name)
        setSuggestions([]);

        const brand = await handleBrandSelected(exists.name);
        if (brand) await handleModels(brand.id);
        return true;
    }

    const handleKeyDown = (e) => {
        if (e.key !== " ") return;

        if (brandSelected) return;

        const target = userQuery.trim().toUpperCase();
        const exists = brandList.find((c) => c.name.toUpperCase() === target);

        if (!exists) return;

        e.preventDefault();
        confirmBrand(exists.name);
    };

    const matchesQuery = (obj, query) => {
        if (!query) return false;
        const q = query.toLowerCase();
        return Object.entries(obj).filter(([k]) => k !== "id" && k !== "brandId").some(([, v]) => v != null && String(v).toLowerCase().includes(q));
    };

    const handleModelSelected = (model) => {
        setUserQuery(`${brandSelected.name} ${model.model ?? model.name ?? ""}`.trim());
        setSuggestions([]);
    };

    return (
        <div className="lm-search-box position-relative">
            <input
                className="form-control me-2"
                type="search"
                value={userQuery}
                onChange={handleWritting}
                onKeyDown={handleKeyDown}
                placeholder="Busca por Marca - Modelo"
                aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">Buscar</button>

            {suggestions.length > 0 && (
                <LMSearchSuggestions
                    items={suggestions}
                    visible={suggestions.length > 0}
                    getLabel={(item) =>
                        brandSelected
                            ? `${item.model ?? item.name ?? ""} ${item.year ?? ""}`.trim()
                            : item.name
                    }
                    onSelect={(item) =>
                        brandSelected ? handleModelSelected(item) : confirmBrand(item.name)
                    }
                />
            )}
        </div>
    );
}