import React, { Component } from 'react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/es';
import { Avatar, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LockOutlinedIcon from '@material-ui/icons/Create';
import { useFormik } from 'formik';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Swal from 'sweetalert2';

class Editor extends Component {
    editor = null;



    render() {

        const useStyles = makeStyles((theme) => ({
            paper: {
              marginTop: theme.spacing(8),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
            avatar: {
              margin: theme.spacing(1),
              backgroundColor: theme.palette.secondary.main,
            },
            form: {
              width: '100%', // Fix IE 11 issue.
              marginTop: theme.spacing(3),
            },
            submit: {
              margin: theme.spacing(3, 0, 2),
            },
          }));
         
          function submitForm() {
            //var values = document.getElementById('miform').elements['editor'].data;
            //alert(JSON.stringify(values, null, 2));
            Swal.fire('Correcto', 'Tarea guardada correctamente', 'success');
            return false;
          }   

        return (
            
            <div className="App" Style="margin-right: 50px;margin-left: 50px;">
              <form onsubmit={submitForm()} id="miform">
               <br/>
                <div className="form">
                    <Grid container direction="row" alignItems="center" justify="center">
                    <Avatar id="avatar" className="avatar">
                      <LockOutlinedIcon />
                    </Avatar> 
                    <Typography component="h1" variant="h5">
                      &nbsp;Desarrolle su tarea
                    </Typography>
                    </Grid>
                    <br/>

                </div>    
      
                <CKEditor id="editor"
                    onReady={ editor => {
                        console.log( 'Editor is ready to use!', editor );

                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );

                        this.editor = editor;
                    } }
                    onError={ ( { willEditorRestart } ) => {
                        // If the editor is restarted, the toolbar element will be created once again.
                        // The `onReady` callback will be called again and the new toolbar will be added.
                        // This is why you need to remove the older toolbar.
                        if ( willEditorRestart ) {
                            this.editor.ui.view.toolbar.element.remove();
                        }
                    } }
                    onChange={ ( event, editor ) => console.log( { event, editor } ) }
                    editor={ DecoupledEditor }
                    data="<p>¡Empiece a desarrollar su tarea aquí!</p>"
                    config={ {
                      // Use the German language for this editor.
                      language: 'es',
              
                      // ...
                  } }
                    
                />
<br/>
<Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                        startIcon={<SaveIcon />}
                    >
                        Guardar datos
                    </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                        <Button variant="outlined" Style="width:100%" color="primary" className="submit"startIcon={<BackspaceIcon />}>
                            Limpiar Datos
                    </Button>
            </Grid>
          </Grid>
          </form>
                </div>
        );
    }
}

export default Editor;