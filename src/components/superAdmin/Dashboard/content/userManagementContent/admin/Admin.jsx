import { IconButton } from "@mui/material";
import ManagementTable from "../ManagementTable";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import EditDialog from "../dialogBox Edit Form/Dialog";
import { fetchTenant } from "../../../../../../API's/Tenant_API's";
import { editTenant } from "../../../../../../API's/Tenant_API's";
import { createTenant } from "../../../../../../API's/Tenant_API's";
import { deleteTenant } from "../../../../../../API's/Tenant_API's";
import { Toaster, toast } from "react-hot-toast"

function Admin() {

    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [rows, setRows] = useState([]); // Store the table rows
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [isEditing, setIsEditing] = useState(false);

    var notify = (text) => toast.success(text);

    // Fetch data from the API
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await fetchTenant();
            setRows(data); // Set the rows state with the fetched data
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email_id', headerName: 'Email', flex: 1.5 },
        {
            field: 'phone',
            headerName: 'Mobile',
            flex: 1,
            type: 'number',
            headerAlign: 'left',
            align: 'left'
        },
        { field: 'status', headerName: 'Status', flex: 1 },
        { field: 'validity_end', headerName: 'Validity_End', flex: 1.5 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton
                        color="primary"
                        onClick={() => handleEdit(params.row)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        color="error"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }

    ];

    const handleEdit = (row) => {
        setSelectedRow(row);
        setIsEditing(true);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        console.log(id);
        try {
            // Confirm deletion with the user (optional, but recommended)
            const confirmDelete = window.confirm("Are you sure you want to delete this tenant?");
            if (!confirmDelete) return; // Stop if the user cancels the action

            // Send delete request
            // await axios.delete(`http://157.173.222.203:9000/tenants/${id}`);
            const deletedTenant = await deleteTenant(id);
            console.log(deletedTenant.message);

            // Optional: Notify the user about successful deletion
            notify("Tenant deleted");

            // Refresh the data to reflect changes in the UI
            fetchData();  // Ensure fetchData() is defined in your component
        } catch (error) {
            // Handle specific error responses
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error("Server Error:", error.response.data);
                alert(`Error: ${error.response.data.message || "Failed to delete tenant"}`);
            } else if (error.request) {
                // No response from the server
                console.error("Network Error:", error.request);
                alert("Network error. Please try again later.");
            } else {
                // General error during request setup
                console.error("Error:", error.message);
            }
        }
    };


    //function to close editDialog form
    const handleClose = () => {
        setOpen(false);
        setSelectedRow(null);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedRow((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        fetchData(); // Fetch data on initial load
    }, []);

    const handleFormSubmit = async () => {
        console.log(selectedRow);

        const formattedData = {
            ...selectedRow,
            credits: parseInt(selectedRow.credits, 10) || 0, // Convert to number
            id: parseInt(selectedRow.id, 10) || 0, // Convert to number
        };

        console.log(formattedData);
        try {
            if (isEditing) {
                // Update existing user
                const updatedTenant = await editTenant(selectedRow.id, selectedRow);
                console.log(updatedTenant);
                notify('Updated Succesfully');

            } else {
                // Create new user
                const createdTenant = await createTenant(formattedData);
                console.log(createdTenant);
                notify('Tenant Created');
            }
            fetchData(); // Refresh data to update the UI
            handleClose(); // Close the dialog
        } catch (error) {
            console.error("Error Saving Data:", error.response?.data || error.message);
        }
    };

    //function to create admin
    const createAdmin = () => {
        setSelectedRow({
            name: "",
            email_id: "",
            address: "",
            phone: "",
            status: "",
            password: "",
            validity_end: "",
            validity_start: "",
            credits: "",
            description: "",
            nature: "",
            worksheets: []
        });
        setIsEditing(false);
        setOpen(true);
    };

    return (
        <>
            <Toaster />
            <AddIcon sx={{ fontSize: 30 }} onClick={createAdmin} />
            <ManagementTable
                columns={columns}
                rows={rows}
                loading={loading}
                error={error}
            />

            <EditDialog
                open={open}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleInputChange={handleInputChange}
                handleFormSubmit={handleFormSubmit}
                isEditing={isEditing}
            />
        </>
    )
}

export default Admin