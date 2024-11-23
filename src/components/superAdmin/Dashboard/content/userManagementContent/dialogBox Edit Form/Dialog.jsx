/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";

function EditDialog({ handleClose, selectedRow, handleFormSubmit, handleInputChange, open, isEditing, entityType, fields }) {

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>{isEditing ? `Edit ${entityType}` : `Create New ${entityType}`}</DialogTitle>
            <DialogContent>
                {fields.map((field) => {
                    // Skip create-only fields when editing
                    if (field.createOnly && isEditing) return null;

                    // Render Select and TextField based on type
                    if (field.type === 'select') {
                        return (
                            <FormControl key={field.name} fullWidth margin="normal">
                                <InputLabel>{field.label}</InputLabel>
                                <Select
                                    name={field.name}
                                    value={selectedRow?.[field.name] || ''}
                                    onChange={handleInputChange}
                                    label={field.label}
                                >
                                    {field.options.map(option => (
                                        <MenuItem key={option} value={option.toLowerCase()}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        );
                    } else {
                        return (
                            <TextField
                                key={field.name}
                                margin="dense"
                                label={field.label}
                                name={field.name}
                                type={field.type}
                                value={selectedRow?.[field.name] || ""}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        );
                    }
                })}
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