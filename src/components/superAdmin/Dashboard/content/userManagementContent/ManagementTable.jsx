/* eslint-disable react/prop-types */
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const paginationModel = { page: 0, pageSize: 5 };

export default function ManagementTable({ columns, rows, loading, error }) {

    if (error) {
        return <div>{error}</div>
    }

    return (
        <Paper sx={{ height: 400, width: '100%' }}>

            {rows.length === 0 && !loading ? (
                <div>No records found</div>
            ) : (
                <>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        loading={loading}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{ border: 0 }}
                    />
                </>
            )}

        </Paper>
    );
}
