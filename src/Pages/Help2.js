import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import './style.css'

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
      width : '75%'
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="help-page">
    <Box display="flex" flexDirection="column"  justifyContent="center" alignItems="center" width="75%" p={1}>
      <Accordion defaultExpanded expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="help-accordion">
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Orders</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            After placement of order by buyer, the seller will contact the buyer and confirm details of the order
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="help-accordion">
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Payments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            All payment terms are discussed between buyers & sellers. Badat is not responsible for any payment loss or fraud. Still, Badat recommends cash on delivery          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="help-accordion">
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Logistics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
              All logistics terms will be discussed between the buyer and seller. In future, we will provide logistics services at a cheaper rate from verified partners
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="help-accordion">
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Quality</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
              Promised quality should be delivered by the seller else he should offer either  to replace the bad quality items or refund the money 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className="help-accordion">
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Defective</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
              All defective items should be replaced or offer refund the money of same value by the seller
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} className="help-accordion">
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>Return</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
              All the return terms should be discussed between both parties in case required
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')} className="help-accordion">
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>Frauds</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
              Report fraud to us on 8750317898 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')} className="help-accordion">
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography>So why use Badat</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
              To get free of Commission & free of Charge Orders. For any other things message Badat or call 8750317898.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Box>
    </div>
  );
}
