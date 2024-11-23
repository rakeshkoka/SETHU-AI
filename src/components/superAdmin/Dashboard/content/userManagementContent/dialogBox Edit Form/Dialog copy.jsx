/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";

function EditDialog({ handleClose, selectedRow, handleFormSubmit, handleInputChange, open, isEditing }) {

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>{isEditing ? "Edit Details" : "Create New Tenant"}</DialogTitle>
            <DialogContent>
                <>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        value={selectedRow?.name || ""}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email_id"
                        value={selectedRow?.email_id || ""}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Mobile"
                        name="phone"
                        value={selectedRow?.phone || ""}
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
                            <MenuItem value="Permanant Suspended">Permanant Suspended</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Validity Start"
                        name="validity_start"
                        value={selectedRow?.validity_start || ""}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Validity End"
                        name="validity_end"
                        value={selectedRow?.validity_end || ""}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    {/* Conditional Fields for Create Mode */}
                    {
                        !isEditing && (
                            <>
                                <TextField
                                    margin="dense"
                                    label="Password"
                                    name="password"
                                    value={selectedRow?.password || ""}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    label="Credits"
                                    name="credits"
                                    value={selectedRow?.credits || ""}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    label="Address"
                                    name="address"
                                    value={selectedRow?.address || ""}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    label="Description"
                                    name="description"
                                    value={selectedRow?.description || ""}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Nature</InputLabel>
                                    <Select
                                        label="Nature"
                                        name="nature"
                                        value={selectedRow?.nature || ''}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Nature 1">Nature 1</MenuItem>
                                        <MenuItem value="Nature 2">Nature 2</MenuItem>
                                        <MenuItem value="Nature 3">Nature 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </>
                        )
                    }

                </>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleFormSubmit} color="primary">
                    {!isEditing ? "Create" : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditDialog