import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from './Page';
import Budget from './Budget';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';
import Card1 from './Card1';
import Card2 from './Card2';
import Card3 from './Card3';
import Card4 from './Card4';
import {TareasPendientes} from './TareasPendientes';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DashboardStudent = () => {
  const classes = useStyles();

  return (
    <Page 
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={true}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit />
          </Grid>

          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Card1 />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Card2 />
          </Grid>

          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Card3 />
          </Grid>

          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Card4 />
          </Grid>

          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            
            <TareasPendientes />
          </Grid>

          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>
         
          
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardStudent;
