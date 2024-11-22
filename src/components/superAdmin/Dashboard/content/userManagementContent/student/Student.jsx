import { useState, useEffect } from "react";
import { IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ManagementTable from "../ManagementTable"; // Reusable ManagementTable component
import StudentManagement from "../services/StudentManagement"; // Student API for fetching data

function Student() {
    const [rows, setRows] = useState([]); // Table rows state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch student data
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await StudentManagement(); // Call the function to fetch student data
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
        { field: "status", headerName: "Status", flex: 1 },
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
                    <IconButton color="error">
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            ),
        },
    ];

    return (
        <>
            {/* Add button (you can implement the logic to open a modal or form for adding data) */}
            <AddIcon sx={{ fontSize: 30 }} />

            {/* Pass data, loading, and error state to ManagementTable */}
            <ManagementTable
                columns={columns}
                rows={rows} // Pass rows as prop
                loading={loading} // Pass loading state as prop
                error={error} // Pass error state as prop
            />
        </>
    );
}

export default Student;
