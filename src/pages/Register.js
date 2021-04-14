import React, { useState } from 'react';
import { Button, Container, Form, Header, Input, Message } from 'semantic-ui-react'
import {gql, useMutation} from "@apollo/client";

const REGISTER = gql`

mutation($username:String!,$email:String!,$password:String!){
    register(username:$username email:$email password:$password){
        ok
        errors{
            path
            message
        }
    }
}
`;

function Register(props){
    let initState = {
        username : '',
        email:'',
        password:''
    };

    let initError = {
        usernameError : [],
        passwordError : [],
        emailError : [],
        loading : null  
    }
    const [addUser ] = useMutation(REGISTER);
    const [userDetails , setUserDetails ] = useState(initState);
    const [fieldErrors , setErrors] = useState(initError);

    async function onSubmit(e){
        e.preventDefault();
        console.log(userDetails);
        
        setErrors({...fieldErrors , loading : true});
        const result= await addUser({variables: {...userDetails}});
        const{ok , errors} = result.data.register;
        console.log(result);

        if(ok){
            props.history.push('/');
        }
        else{
            const err = {}
            errors.forEach(e => {
                if(!err[`${e.path}Error`])  err[`${e.path}Error`] = [];
                err[`${e.path}Error`].push(e.message);
            });
            setErrors(err);
        }
    }
    
    function onChangeUserDetails(e){
        setUserDetails({
            ...userDetails , 
            [e.target.name] : e.target.value
        });
    }

    return (
        <Container text>
            <Header as='h2'> Register</Header>
        <Form error  loading={fieldErrors.loading}>
                       
        <Form.Field
                placeholder='Email'
                label='email'
                name='email'
                control={Input}
                type='email'
                onChange={onChangeUserDetails}
            />
            {  
              fieldErrors.emailError && fieldErrors.emailError.length >0 &&
            <Message
                    error
                    header='Incorrect Email'
                    list={fieldErrors.emailError}
                />
            }

            <Form.Field
                placeholder='Username'
                label='username'
                name='username'
                control={Input}
                onChange={onChangeUserDetails}
            />
          {  
           fieldErrors.usernameError && fieldErrors.usernameError.length >0 &&
            <Message
                    error
                    header='Incorrect Username'
                    list={fieldErrors.usernameError}
                />
            }

            <Form.Field
                placeholder='Password'
                label='password'
                name='password'
                control={Input}
                type='password'
                onChange={onChangeUserDetails}
            />
               {  
                 fieldErrors.passwordError && fieldErrors.passwordError.length >0 &&
                    <Message
                            error
                            header='Incorrect Password'
                            list={fieldErrors.passwordError}
                        />
            }

            <Button type='submit' onClick={onSubmit}>Submit</Button>
      </Form>
      </Container>
    )
}

export default Register;