import axios from "axios";

const AdminManagement = async () => {
    try {
        const response = await axios.get("http://157.173.222.203:9000/tenants");
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to be handled in Admin.jsx
    }
};

export default AdminManagement;
