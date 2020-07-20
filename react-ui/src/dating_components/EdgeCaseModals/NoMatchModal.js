import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { InfoContext } from '../../App';
const NoMatchModal = ()=> {
const { nomatchmodal,setNoMatchModal } = React.useContext(InfoContext);

 
    return (
      <Modal
        // trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
        open={nomatchmodal}
        onClose={()=>setNoMatchModal(false)}
        basic
        size='small'
      >
        <Header icon='browser' content='No messages.' />
        <Modal.Content>
          <h3>You don't have any matches yet.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={()=>setNoMatchModal(false)} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  
}

export default NoMatchModal;