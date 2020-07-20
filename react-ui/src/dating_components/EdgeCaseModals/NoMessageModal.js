import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { InfoContext } from '../../App';
const NoMessagesModal = ()=> {
const { nomessagemodal,setNoMessagesModal } = React.useContext(InfoContext);

    return (
      <Modal
        // trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
        open={nomessagemodal}
        onClose={()=>setNoMessagesModal(false)}
        basic
        size='small'
      >
        <Header icon='browser' content='No messages.' />
        <Modal.Content>
          <h3>You don't have any messages yet.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={()=>setNoMessagesModal(false)} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  
}

export default NoMessagesModal;