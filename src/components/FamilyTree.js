import React, { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
}));

const FamilyTree = ({ data, onNodeClick }) => {
  const classes = useStyles();
  const graphRef = useRef();

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force('charge').strength(-100);
      graphRef.current.d3Force('link').distance(100);
    }
  }, []);

  const transformData = (members) => {
    const nodes = members.map(member => ({
      id: member._id,
      name: member.name,
      gender: member.gender,
      photo: member.photo,
      ...member
    }));

    const links = members.reduce((acc, member) => {
      member.relationships.forEach(rel => {
        acc.push({
          source: member._id,
          target: rel.memberId._id,
          type: rel.type
        });
      });
      return acc;
    }, []);

    return { nodes, links };
  };

  const graphData = transformData(data);

  return (
    <div className={classes.container}>
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        nodeLabel="name"
        nodeColor={node => node.gender === 'male' ? '#2196f3' : '#f50057'}
        nodeRelSize={6}
        linkColor={link => {
          switch(link.type) {
            case 'spouse': return '#4caf50';
            case 'parent': return '#ff9800';
            case 'child': return '#9c27b0';
            case 'sibling': return '#795548';
            default: return '#999';
          }
        }}
        onNodeClick={onNodeClick}
        cooldownTicks={100}
        onEngineStop={() => graphRef.current.zoomToFit(400)}
      />
    </div>
  );
};

export default FamilyTree; 