import axios from "axios";

const API_BASE_URL = "http://157.173.222.203:9000/users";

//get user
export const fetchUser = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
};

//Edit user
export const editUser = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.log("Error Editing Users", error);
        throw error;
    }
};

//create user
export const createUser = async (newUserData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}`, newUserData);
        return response.data;
    } catch (error) {
        console.log("Error Creating User:", error);
        throw error
    }
};

//delete user
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error Deleting Tenant:", error)
        throw error;
    }
};