import axios from "axios"

const StudentManagement = async () => {
    try {
        const response = await axios.get("http://157.173.222.203:9000/users");
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to be handled in Admin.jsx
    }
}


export default StudentManagement