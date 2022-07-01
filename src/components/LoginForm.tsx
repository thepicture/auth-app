import React from 'react';
import { TextField, Button, Typography } from "@mui/material";

export function LoginForm() {
    return (
        <>
            <Typography variant="h3" component="h1" align='center'>Sign in to continue</Typography>
            <TextField label="Login" variant="standard" margin='normal' />
            <TextField label="Password" variant="standard" margin='normal' />
            <Button variant="contained" style={{ margin: '2em 0 0 0' }}>Sign in</Button>
        </>
    );
}