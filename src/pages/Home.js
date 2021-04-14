import React from 'react';
import {useQuery , gql} from '@apollo/client'

const ALL_USERS_QUERY = gql`
{
    allUsers{
        email
        id
    }
}

`;

 function Home(){
    const result = useQuery(ALL_USERS_QUERY);
    const users = (result.data) ? result.data.allUsers:[];
    
    return (
        <div style={{textTransform:'capitalize'}}>
                home page
            {
               
                users.map(user=>{
                    return <h1 key={user.id} > user email: {user.email}  </h1>
                })

            }
        </div>
    );
}

export default Home;