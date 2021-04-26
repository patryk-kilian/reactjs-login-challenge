import { useEffect } from 'react';
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Spinner,
} from 'reactstrap';
import './LoginForm.css';
import { useAuth } from '../context/auth-context';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { DASHBOARD } from '../constants/routes';

type FormData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const { login, isLoading, errorMessage, token } = useAuth()!;
  const history = useHistory();

  useEffect(() => {
    if (token) history.push(DASHBOARD);
  }, [token, history]);

  const handleLogin = (data: FormData) => {
    login({
      password: data.password,
      username: data.username,
    });
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .min(2, 'Username too short!')
          .required('Username is required'),
        password: Yup.string()
          .min(2, 'Password too short!')
          .required('Password is required'),
      })}
      onSubmit={handleLogin}
    >
      {({ errors }) => (
        <Form className='form'>
          <h2 className='form-title'>Sign In</h2>
          <FormGroup>
            <Label for='username'>Username</Label>
            <Input
              type='text'
              name='username'
              id='username'
              placeholder='Enter username'
              tag={Field}
              invalid={errors.username ? true : false}
            />
            <FormFeedback>{errors.username}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password</Label>
            <Input
              type='password'
              name='password'
              id='password'
              placeholder='Enter password'
              tag={Field}
              invalid={errors.password ? true : false}
            />
            <FormFeedback>{errors.password}</FormFeedback>
          </FormGroup>
          {errorMessage && <p className='form-error'>{errorMessage}</p>}
          <Button block color='primary' type='submit'>
            {isLoading ? <Spinner size='sm' /> : 'Sign in'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
