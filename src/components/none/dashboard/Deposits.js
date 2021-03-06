import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total de ingresos</Title>
      <Typography component="p" variant="h4">
        $28.647,00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        corte al 31/12/2020
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Revisar todas las operaciones
        </Link>
      </div>
    </React.Fragment>
  );
}
