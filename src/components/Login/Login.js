import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

import { login } from '../../Api/auth';

const Login = props => {

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const submitProductHandler = async event => {
    event.preventDefault();
    try {
      const response = await login(user, password)
      localStorage.setItem('acces_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      props.onCompleteLogin();
      console.log(response, ' reponse from login api');
    } catch (error) {
      console.log(error)      
    }
  };

  const userChangeHandler = event => {
    setUser(event.target.value);
  };

  const passwordChangeHandler = event => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <section id="new-product">
      <h2>Add a New Product</h2>
      <form onSubmit={submitProductHandler}>
        <Input
          type="text"
          label="User"
          id="user"
          value={user}
          onChange={userChangeHandler}
        />
        <Input
          type="password"
          label="Password"
          step={0.01}
          id="password"
          value={password}
          onChange={passwordChangeHandler}
        />
        <Button type="submit">Login</Button>
      </form>
    </section>
    </div>
  );
};

export default Login;
