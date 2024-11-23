import { useState, useEffect } from "react";
import { Button, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ManagementTable from "../ManagementTable"; // Reusable ManagementTable component
import { fetchUser } from "../../../../../../API's/Users";
import { editUser } from "../../../../../../API's/Users";
import EditDialog from "../dialogBox Edit Form/Dialog";
import { Toaster, toast } from "react-hot-toast";
import { createUser } from "../../../../../../API's/Users";
import { deleteUser } from "../../../../../../API's/Users";

function Student() {
    const [rows, setRows] = useState([]); // Table rows state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const notify = (message) => toast.success(message);

    // Fetch student data
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await fetchUser();
            setRows(data); // Set the data to the rows state
        } catch (error) {
            console.error("Error fetching student data:", error);
            setError("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false); // Set loading to false when data is fetched or error occurs
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData(); // Fetch data on initial load
    }, []);

    const studentFields = [
        { name: "tenant_id", label: 'Tenant ID', type: 'number', createOnly: true },
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email_id', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password', createOnly: true },
        { name: 'phone', label: 'Mobile', type: 'text' },
        { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Suspended', 'Permanent Suspended'] },
        { name: 'validity_start', label: 'Validity Start', type: 'text', createOnly: true },
        { name: 'validity_end', label: 'Validity End', type: 'text' },
        // Fields specific to create mode
        { name: 'credits', label: 'Credits', type: 'number', createOnly: true },
        { name: 'address', label: 'Address', type: 'text', createOnly: true },
        { name: 'description', label: 'Description', type: 'text', createOnly: true },
    ];

    // Define columns for the table
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email_id", headerName: "Email", flex: 1.5 },
        {
            field: "phone",
            headerName: "Mobile",
            flex: 1,
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        { field: "status", headerName: "Status", flex: 0.5, },
        { field: 'tenant_id', headerName: "Tenant ID", flex: 0.6, align: 'center' },
        { field: "validity_end", headerName: "Validity_End", flex: 1.5 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    {/* Edit icon (you can implement the edit logic if needed) */}
                    <IconButton
                        color="primary"
                        onClick={() => handleEdit(params.row)}
                    >
                        <EditIcon />
                    </IconButton>

                    {/* Delete icon (you can implement the delete logic if needed) */}
                    <IconButton
                        color="error"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            ),
        },
    ];

    //function for edit user
    const handleEdit = (row) => {
        setOpen(true);
        setIsEditing(true);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setOpen(false);
        setIsEditing(false);
        setSelectedRow(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedRow((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const handleFormSubmit = async () => {

        const formattedData = {
            ...selectedRow,
            credits: parseInt(selectedRow.credits, 10) || 0,
        }

        try {
            if (isEditing) {
                const updatedUser = await editUser(selectedRow.id, selectedRow);
                console.log(updatedUser);
                notify('Updated Succesfully');
            } else {
                const createdUser = await createUser(formattedData);
                console.log(createdUser);
                notify('User Created')
            }
            fetchData();
            handleClose();
        } catch (error) {
            console.error("Error Saving Data:", error.response?.data || error.message);
        }


    };

    const createNewUser = () => {
        setSelectedRow({
            name: "",
            email_id: "",
            address: "",
            phone: "",
            status: "",
            password: "",
            tenant_id: '',
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

    const handleDelete = async (id) => {
        console.log(id);
        try {
            // Confirm deletion with the user (optional, but recommended)
            const confirmDelete = window.confirm("Are you sure you want to delete this User?");
            if (!confirmDelete) return; // Stop if the user cancels the action

            // Send delete request
            const deletedTenant = await deleteUser(id);
            console.log(deletedTenant.message);

            // Optional: Notify the user about successful deletion
            notify("User deleted");

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

    return (
        <>
            <h3>Student Management</h3>
            <Toaster />

            {/* Add button (you can implement the logic to open a modal or form for adding data) */}

            {/* old button */}
            {/* <AddIcon sx={{ fontSize: 30 }} onClick={createNewUser} /> */}

            {/* new button */}
            <Button
                variant="contained" // or "outlined" for a different look
                startIcon={<AddIcon />}
                onClick={createNewUser}
                sx={{ marginBottom: 2 }}
            >
                Add
            </Button>

            {/* Pass data, loading, and error state to ManagementTable */}
            <ManagementTable
                columns={columns}
                rows={rows} // Pass rows as prop
                loading={loading} // Pass loading state as prop
                error={error} // Pass error state as prop
            />

            <EditDialog
                open={open}
                isEditing={isEditing}
                selectedRow={selectedRow}
                fields={studentFields}
                handleClose={handleClose}
                handleInputChange={handleInputChange}
                entityType={"User"}
                handleFormSubmit={handleFormSubmit}
            />
        </>
    );
}

export default Student;
