import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function AdminPanel() {
    const [bankName, setBankName] = useState("");
    const [apartmentCost, setApartmentCost] = useState("");
    const [monthlyPayment, setMonthlyPayment] = useState("");
    const [mortgages, setMortgages] = useState([]);

    useEffect(() => {
        fetchMortgages();
    }, []);

    const fetchMortgages = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/mortgages/fetch");
            setMortgages(response.data);
        } catch (error) {
            console.error("Error fetching mortgages:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/mortgages", {
                bank_name: bankName,
                apartment_cost: apartmentCost,
                monthly_payment: monthlyPayment,
            });
            setBankName("");
            setApartmentCost("");
            setMonthlyPayment("");
            fetchMortgages();
        } catch (error) {
            console.error("Error adding mortgage:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/mortgages/${id}`);
            fetchMortgages();
        } catch (error) {
            console.error("Error deleting mortgage:", error);
        }
    };

    const handleEdit = async (id, data) => {
        try {
            await axios.put(`http://127.0.0.1:8000/mortgages/${id}`, data);
            fetchMortgages();
        } catch (error) {
            console.error("Error editing mortgage:", error);
        }
    };

    return (
        <div className="container">
            <h2>Admin Panel</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="bankName">Bank Name:</label>
                    <input
                        type="text"
                        id="bankName"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="apartmentCost">Apartment Cost:</label>
                    <input
                        type="number"
                        id="apartmentCost"
                        value={apartmentCost}
                        onChange={(e) => setApartmentCost(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="monthlyPayment">Monthly Payment:</label>
                    <input
                        type="number"
                        id="monthlyPayment"
                        value={monthlyPayment}
                        onChange={(e) => setMonthlyPayment(e.target.value)}
                    />
                </div>
                <button type="submit">Add Mortgage</button>
            </form>

            <h3>Existing Mortgages:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Bank Name</th>
                        <th>Apartment Cost</th>
                        <th>Monthly Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mortgages.map((mortgage) => (
                        <tr key={mortgage.id}>
                            <td>{mortgage.bank_name}</td>
                            <td>{mortgage.amount}</td>
                            <td>{mortgage.term}</td>
                            <td>
                                <button onClick={() => handleEdit(mortgage.id, { bank_name: 'Updated Bank Name' })}>Edit</button>
                                <button onClick={() => handleDelete(mortgage.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPanel;