import React from 'react'
import {Jumbotron, Container} from 'reactstrap'


const Header = () => (
  <Jumbotron>
    <Container>
      <h1 className="display-3">Hello, Advertiser!</h1>
      <p>
        You can user this area to view and manage your campaigns, including view
        status of each campaign, have fun!
      </p>
    </Container>
  </Jumbotron>
)

export default Header
