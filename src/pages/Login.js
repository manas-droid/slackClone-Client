import React, { useState } from 'react';
import { Container, Header ,Form , Button, Input , Message} from "semantic-ui-react";
import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
mutation login($email:String! $password:String!){
    login(email:$email password:$password){
      token
      refreshToken
      errors{
        path
        message
      }
      ok
    }
  }
`;


function Login(props){
    const initLoginDetails = {
        email : '',
        password : '',
        loading:null,
        emailError : [],
        passwordError:[]
    };
    const [loginDetails , setLoginDetails] = useState(initLoginDetails);
    const [loginUser] = useMutation(LOGIN);

    function onChangeLoginDetails(e){
            setLoginDetails({
                ...loginDetails,
                emailError:[],
                passwordError:[],
                [e.target.name] : e.target.value
            });
    }

    async function onSubmitLogin(){
       setLoginDetails({
           ...loginDetails,
           loading : true  
       });
       
       const result = await loginUser({variables : {email:loginDetails.email , password : loginDetails.password }});    
       const err = {};
       const {ok , token , refreshToken , errors} = result.data.login;
       if(ok){
            localStorage.setItem('token' , token);
            localStorage.setItem('refreshToken' , refreshToken);
            props.history.push("/");
       }

       else{
        errors.forEach(e => {
            if(!err[`${e.path}Error`])  err[`${e.path}Error`] = [];
            err[`${e.path}Error`].push(e.message);
        });
       }
       setLoginDetails({
        ...initLoginDetails,
        loading : false ,
        ...err
         });
    
    }
    return (
    <Container text >
            <Header as="h2"> Login</Header>
            <Form error loading={loginDetails.loading}>
                       
        <Form.Field
                placeholder='Email'
                label='email'
                name='email'
                control={Input}
                type='email'
                value={loginDetails.email}
                onChange={onChangeLoginDetails}
            />

            {
                loginDetails.emailError && loginDetails.emailError.length>0 
                &&
                <Message
                error
                header='Incorrect Email'
                list={loginDetails.emailError}
            />

            }
            <Form.Field
                placeholder='Password'
                label='password'
                name='password'
                control={Input}
                type='password'
                onChange={onChangeLoginDetails}
                value={loginDetails.password}
            />
             {
                loginDetails.passwordError && loginDetails.passwordError.length>0 
                &&
                <Message
                error
                header='Incorrect Password'
                list={loginDetails.passwordError}
            />

            }
            <Button type='submit' 
            onClick={onSubmitLogin}
            >Submit</Button>
      </Form>
    </Container>

    );
}

export default Login;