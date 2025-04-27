import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const FamilyMemberForm = ({ open, onClose, onSubmit, initialData }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthDate: '',
    deathDate: '',
    biography: '',
    contactInfo: {
      email: '',
      phone: '',
      address: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        birthDate: initialData.birthDate ? new Date(initialData.birthDate).toISOString().split('T')[0] : '',
        deathDate: initialData.deathDate ? new Date(initialData.deathDate).toISOString().split('T')[0] : '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {initialData ? 'Edit Anggota Keluarga' : 'Tambah Anggota Keluarga'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit} className={classes.form}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Nama Lengkap"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel>Jenis Kelamin</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="male">Laki-laki</MenuItem>
                  <MenuItem value="female">Perempuan</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="birthDate"
                label="Tanggal Lahir"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="deathDate"
                label="Tanggal Meninggal"
                type="date"
                value={formData.deathDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="biography"
                label="Biografi"
                value={formData.biography}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="contactInfo.email"
                label="Email"
                value={formData.contactInfo.email}
                onChange={handleChange}
                fullWidth
                type="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="contactInfo.phone"
                label="Nomor Telepon"
                value={formData.contactInfo.phone}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="contactInfo.address"
                label="Alamat"
                value={formData.contactInfo.address}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" color="primary" variant="contained">
            {initialData ? 'Simpan Perubahan' : 'Tambah'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FamilyMemberForm; 