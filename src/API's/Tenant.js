import axios from "axios";

const API_BASE_URL = "http://157.173.222.203:9000/tenants";

// Function to fetch data from the '/tenants' endpoint
export const fetchTenant = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const editTenant = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error Editing Tenant:", error);
        throw error;
    }
};

export const createTenant = async (newTenantData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}`, newTenantData);
        return response.data;

    } catch (error) {
        console.error("Error creating tenant data:", error);
        throw error;
    }
};

export const deleteTenant = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error Deleting Tenant:", error)
        throw error;
    }
};
