import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // External style file

/**
 * Component for managing mortgage entries by admin.
 */
function AdminPanel() {
    const [bankName, setBankName] = useState(""); // State for bank name input
    const [apartmentCost, setApartmentCost] = useState(""); // State for apartment cost input

    /**
     * Function to handle form submission for adding a new mortgage entry.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/mortgages/fetch", {
                bank_name: bankName,
                apartment_cost: apartmentCost,
            });
            // Clear input fields after successful submission
            setBankName("");
            setApartmentCost("");
        } catch (error) {
            console.error("Error adding mortgage:", error);
        }
    };

    /**
     * JSX rendering the AdminPanel component.
     */
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
                <button type="submit">Add Mortgage</button>
            </form>
        </div>
    );
}

export default AdminPanel;
