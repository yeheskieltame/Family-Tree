import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  makeStyles
} from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import axios from 'axios';
import FamilyMemberForm from './FamilyMemberForm';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

const AdminPanel = () => {
  const classes = useStyles();
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('/api/family');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setIsFormOpen(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setIsFormOpen(true);
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus anggota keluarga ini?')) {
      try {
        await axios.delete(`/api/family/${id}`);
        fetchMembers();
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedMember) {
        await axios.put(`/api/family/${selectedMember._id}`, formData);
      } else {
        await axios.post('/api/family', formData);
      }
      setIsFormOpen(false);
      fetchMembers();
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Panel Admin - Kelola Anggota Keluarga
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddMember}
        className={classes.addButton}
      >
        Tambah Anggota Keluarga
      </Button>

      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell>Jenis Kelamin</TableCell>
              <TableCell>Tanggal Lahir</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telepon</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member._id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>
                  {member.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                </TableCell>
                <TableCell>
                  {member.birthDate
                    ? new Date(member.birthDate).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell>{member.contactInfo?.email || '-'}</TableCell>
                <TableCell>{member.contactInfo?.phone || '-'}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditMember(member)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteMember(member._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FamilyMemberForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedMember}
      />
    </Container>
  );
};

export default AdminPanel; 