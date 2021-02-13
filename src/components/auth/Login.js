import React from 'react';

export const Login = () => {
    return (
<<<<<<< Updated upstream
        <div>
            <h1>Página de Login</h1>
        </div>
    )
}
=======
        <Grid container component="main" className={ classes.root }>
            <CssBaseline />
            <Grid item xs={ false } sm={ 4 } md={ 7 } className={ classes.image }> 
                {/* <Grid containerd direction="row" justify="center" alignItems="center">
                    <img  src={ mentoredLogo } className={ classes.logoCenter } />
                </Grid> */}
            </Grid>
            <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
                <div className={ classes.paper }>
                    <img src={ mentoredLogo } alt="Mentored logo" width="300px" />
                    <Avatar className={ classes.avatar }>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar sesión
                    </Typography>
                    <form className={ classes.form } noValidate>
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="Correo electrónico"
                            autoComplete="email"
                            autoFocus
                            value={ formik.values.email }
                            onChange={ formik.handleChange }
                            onBlur={ formik.handleBlur }
                        />
                        {
                            formik.errors.email && formik.touched.email
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.email }</Alert>
                                </div>
                             )
                            : null
                        }
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="pass"
                            label="Contraseña"
                            type="password"
                            id="pass"
                            autoComplete="current-password"
                            value={ formik.values.pass }
                            onChange={ formik.handleChange }
                            onBlur={ formik.handleBlur }
                        />
                        {
                            formik.errors.pass && formik.touched.pass
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.pass }</Alert>
                                </div>
                             )
                            : null
                        }
                        <FormControlLabel 
                            control={ <CheckBox  value="remember"  color="primary"/> }
                            label="Recordar mi usuario"
                        />
                        <Button 
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={ classes.submit }
                        >
                            Iniciar sesión
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    { '¿Aún no tienes cuenta? Regístrate' }
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={ 5 }>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
>>>>>>> Stashed changes
