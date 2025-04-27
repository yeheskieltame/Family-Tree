import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Avatar,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2)
  },
  infoSection: {
    marginBottom: theme.spacing(2)
  },
  relationshipList: {
    marginTop: theme.spacing(2)
  }
}));

const FamilyMemberDetail = ({ member, open, onClose }) => {
  const classes = useStyles();

  if (!member) return null;

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const getRelationshipLabel = (type) => {
    switch(type) {
      case 'spouse': return 'Pasangan';
      case 'parent': return 'Orang Tua';
      case 'child': return 'Anak';
      case 'sibling': return 'Saudara';
      default: return type;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              src={member.photo}
              alt={member.name}
              className={classes.avatar}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5">{member.name}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {member.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      
      <DialogContent>
        <div className={classes.infoSection}>
          <Typography variant="h6">Informasi Pribadi</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Tanggal Lahir
              </Typography>
              <Typography variant="body1">
                {formatDate(member.birthDate)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Tanggal Meninggal
              </Typography>
              <Typography variant="body1">
                {formatDate(member.deathDate)}
              </Typography>
            </Grid>
          </Grid>
        </div>

        {member.biography && (
          <div className={classes.infoSection}>
            <Typography variant="h6">Biografi</Typography>
            <Typography variant="body1">{member.biography}</Typography>
          </div>
        )}

        {member.contactInfo && (
          <div className={classes.infoSection}>
            <Typography variant="h6">Informasi Kontak</Typography>
            <Grid container spacing={2}>
              {member.contactInfo.email && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {member.contactInfo.email}
                  </Typography>
                </Grid>
              )}
              {member.contactInfo.phone && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    Telepon
                  </Typography>
                  <Typography variant="body1">
                    {member.contactInfo.phone}
                  </Typography>
                </Grid>
              )}
              {member.contactInfo.address && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    Alamat
                  </Typography>
                  <Typography variant="body1">
                    {member.contactInfo.address}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </div>
        )}

        {member.relationships && member.relationships.length > 0 && (
          <div className={classes.relationshipList}>
            <Typography variant="h6">Hubungan Keluarga</Typography>
            <Grid container spacing={2}>
              {member.relationships.map((rel, index) => (
                <Grid item xs={12} key={index}>
                  <Typography variant="body2" color="textSecondary">
                    {getRelationshipLabel(rel.type)}
                  </Typography>
                  <Typography variant="body1">
                    {rel.memberId.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Tutup
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FamilyMemberDetail; 