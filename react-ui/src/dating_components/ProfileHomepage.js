import React from 'react'
import {Grid} from 'semantic-ui-react'
import "./ProfileHomepage.css"

class ProfileHomepage extends React.Component {
    render() {
        return (
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <h1>Editable Fields</h1>
                        {/* Something similar to the sign up here */}
                        {/* Options to add favorite songs/albums here */}
                    </Grid.Column>
                    <Grid.Column>
                        <h1>This is how other people see you</h1>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                {/* Name and other details here */}
                            </Grid.Column>
                            <Grid.Column>
                                {/* Profile picture here */}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            {/* Grid of cards with questions here */}
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default ProfileHomepage;