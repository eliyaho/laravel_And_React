import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function MortgageTable() {
    const [mortgages, setMortgages] = useState([]);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({ cost: null, payment: null });
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchMortgages();
    }, [search, filters, page]);

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
            setMortgages((prevMortgages) => [...prevMortgages, ...response.data.data]);
        } catch (error) {
            console.error("Error fetching mortgages:", error);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="container">
            <h1>Mortgage Table</h1>
   
            <table className="mortgage-table">
                <thead>
                    <tr>
                        <th>Bank Name</th>
                        <th>Apartment Cost</th>
                        <th>Monthly Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {mortgages.map((mortgage) => (
                        <tr key={mortgage.id}>
                            <td>{mortgage.bank_name}</td>
                            <td>{mortgage.amount}</td>
                            <td>{mortgage.term}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MortgageTable;
