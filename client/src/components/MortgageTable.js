import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

/**
 * Component displaying a table of mortgages with search and filtering capabilities.
 */
function MortgageTable() {
    const [mortgages, setMortgages] = useState([]); // State for storing fetched mortgages
    const [search, setSearch] = useState(""); // State for search input value
    const [filters, setFilters] = useState({ cost: null, payment: null }); // State for filter values
    const [page, setPage] = useState(1); // State for pagination

    /**
     * Effect hook to fetch mortgages from the server based on search, filters, and pagination.
     */
    useEffect(() => {
        fetchMortgages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, filters, page]);

    /**
     * Function to fetch mortgages from the server.
     */
    const fetchMortgages = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/mortgages/fetch", {
                params: {
                    search,
                    cost: filters.cost,
                    payment: filters.payment,
                    page,
                },
            });
            setMortgages((prevMortgages) => [...prevMortgages, ...response.data]);
        } catch (error) {
            console.error("Error fetching mortgages:", error);
        }
    };

    /**
     * Event handler for scrolling to load more mortgages on reaching the bottom of the page.
     */
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPage((prevPage) => prevPage + 1);
    };

    /**
     * Effect hook to add scroll event listener for infinite scroll pagination.
     */
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /**
     * JSX rendering the MortgageTable component.
     */
    return (
        <div className="container">
            <h1>Mortgage Table</h1>
            <input
                type="text"
                className="search-input"
                placeholder="Search by bank name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="filters">
                <input
                    type="number"
                    className="filter-input"
                    placeholder="Filter by cost"
                    onChange={(e) => setFilters({ ...filters, cost: e.target.value })}
                />
                <input
                    type="number"
                    className="filter-input"
                    placeholder="Filter by payment"
                    onChange={(e) => setFilters({ ...filters, payment: e.target.value })}
                />
            </div>
            <table className="mortgage-table">
                <thead>
                    <tr>
                        <th>Bank Name</th>
                        <th>Apartment Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {mortgages.map((mortgage) => (
                        <tr key={mortgage.id}>
                            <td>{mortgage.bank_name}</td>
                            <td>{mortgage.apartment_cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MortgageTable;
