import { Container, Header, Form, Button, Input } from 'semantic-ui-react';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client'

const CREATE_TEAM = gql`

mutation ($name:String!){
    createTeam(name:$name){
      ok
      errors{
        path
        message
      }
    }
  }


`;
function CreateTeams(props) {

    const initTeamDetails = {
        name: '',
        loading: null,
    };

    const [teamDetails, setTeamDetails] = useState(initTeamDetails);
    const [addTeam] = useMutation(CREATE_TEAM);
    async function onSubmitTeamName() {

        setTeamDetails({
            ...teamDetails,
            loading:true
        });
        let result=null;
        try {
         result = await addTeam({variables : { name : teamDetails.name}});
        }
        catch{
            props.history.push('/login');
            return;
        }

        console.log(result);
        setTeamDetails(initTeamDetails);
    }

    function onChangeTeamDetails(e) {
        setTeamDetails({
            ...teamDetails,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Container text >
            <Header as="h2"> Create a Team</Header>
            <Form error loading={teamDetails.loading}>
                <Form.Field
                    placeholder='Team Name'
                    label='Enter Team Name'
                    name='name'
                    control={Input}
                    type='text'
                    onChange={onChangeTeamDetails}
                    value={teamDetails.name}
                />

                <Button type='submit'
                    onClick={onSubmitTeamName}
                >Submit</Button>
            </Form>
        </Container>
    );
};

export default CreateTeams;