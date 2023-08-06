import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Input, InputAdornment, IconButton, Button, Alert } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Fields } from '../core/types';

const Auth = () => {

  const [showAlert, setShowAlert] = useState<Boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<Boolean>(false);
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const navigate = useNavigate();

  const {register, handleSubmit, formState: {errors}, reset} = useForm<Fields>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<Fields> = (data) => {
    console.log(data)
    if (data.login && data.password === 'admin') {
      localStorage.setItem('auth', 'true');
      setTimeout(() => {
        navigate('/');
        reset();
      }, 2000)
      setShowAlert(true);
    } else {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    };
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{ m: 30, mx: 'auto', width: '25ch' }}
    >
      {showAlert &&
      <Alert variant="outlined" severity="success">
      authorization was successful!
      </Alert>}
      {showErrorAlert &&
      <Alert variant="outlined" severity="error">
      wrong login or password!
      </Alert>}
      <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Login</InputLabel>
        <Input
          {...(register('login', {
            required: 'is require field!',
            minLength: {
              value: 4,
              message: 'minimum 4 characters!'
            },
            maxLength: {
              value: 15,
              message: 'maximum 15 characters!'
            },
            pattern: {
              value: /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i,
              message: 'Please enter valid login'
            }
          }))}
          id="standard-adornment-login"
          type='text'
        />
        {errors?.login && (<div style={{color: 'red'}}>{errors.login.message}</div>)}
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          {...(register('password', {
            required: 'is require field!',
            minLength: {
              value: 4,
              message: 'minimum 4 characters!'
            },
            maxLength: {
              value: 15,
              message: 'maximum 15 characters!'
            },
            pattern: {
              value: /[A-Za-z0-9]/,
              message: 'Please enter valid password'
            }
          }))}
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors?.password && (<div style={{color: 'red'}}>{errors.password.message}</div>)}
      </FormControl>
      <Button type='submit' variant="contained">Sign in</Button>
    </Box>
  );
};

export default Auth;