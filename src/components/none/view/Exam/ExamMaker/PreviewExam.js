/* eslint-disable import/no-anonymous-default-export */
import { Modal, Button } from "antd";
import React, { useState, Fragment } from "react";
import { Quiz } from "react-quizzes";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

export default function(props) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <Fragment>
      <Button onClick={() => setModalVisibility(true)} color={"primary"}>Guardar examen</Button>
      <br/><br/>
      <Modal
        title="Su examen tendrá estas preguntas"
        style={{ top: 70 }}
        visible={modalVisibility}
        onCancel={() => setModalVisibility(false)}
        destroyOnClose
      >
        <Quiz
          data={props.data}
          onSubmit={values => console.log("form submit values", values)}
        />
      </Modal>
    </Fragment>
    </div>
  );
}
