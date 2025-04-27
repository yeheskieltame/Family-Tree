import React, { useState, useEffect } from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import FamilyTree from './FamilyTree';
import FamilyMemberDetail from './FamilyMemberDetail';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',
  },
  treeContainer: {
    flex: 1,
    position: 'relative',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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

  const handleNodeClick = (node) => {
    setSelectedMember(node);
    setIsDetailOpen(true);
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Silsilah Keluarga
      </Typography>

      <div className={classes.treeContainer}>
        <FamilyTree data={members} onNodeClick={handleNodeClick} />
      </div>

      <FamilyMemberDetail
        member={selectedMember}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </Container>
  );
};

export default Home; 