/* eslint-disable react/prop-types */
import { Dialog, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions, Button, DialogTitle, DialogContent } from '@mui/material';

function CreateDialogBox({ open, handleClose, selectedRow, handleInputChange, handleFormSubmit }) {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Edit Details</DialogTitle>
            <DialogContent>
                {selectedRow && (
                    <>
                        <TextField
                            margin="dense"
                            label="Name"
                            name="name"
                            value={selectedRow.name || ""}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            name="email_id"
                            value={selectedRow.email_id || ""}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label="Mobile"
                            name="phone"
                            value={selectedRow.phone || ""}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Status</InputLabel>
                            <Select
                                label="Status"
                                name="status"
                                value={selectedRow?.status || ''}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                                <MenuItem value="suspended">Suspended</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="dense"
                            label="Validity End"
                            name="validity_end"
                            value={selectedRow.validity_end || ""}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleFormSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateDialogBox