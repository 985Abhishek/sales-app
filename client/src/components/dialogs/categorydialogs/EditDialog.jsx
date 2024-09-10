import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const EditDialog = ({open, handleClose, handleSave, handleChange}) => {
    const formData = useSelector((state)=> state.category)
  return (
    <Dialog open = {open} onClose = {handleClose}>
      <DialogTitle> Edit Categories</DialogTitle>
      <DialogContent>
        <TextField margin = 'dense'
        label = 'Name'
        field = 'name'
        fullWidth value = {formData.name}
        onChange ={(e)=>handleChange('name', e.target.value)} 
        />  
        <TextField margin = 'dense'
        label = 'Description'
        field = 'description'
        fullWidth value = {formData.description}
        onChange ={(e)=>handleChange('description', e.target.value)} 
        />  
      </DialogContent>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSave}>Add</Button>
    </Dialog >
  )
}

export default EditDialog
