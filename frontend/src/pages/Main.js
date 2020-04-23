import React from 'react';
import { Container, FormControl, NavDropdown, Card, Nav, Form, Button, Navbar } from 'react-bootstrap';
import axios from 'axios';


class Main extends React.Component {
  state = {
    dataPosts: []
  }
  componentDidMount() {
    if(!localStorage.token) {
      this.props.history.push('/login')
    }
    this.getPosts()
  }

  getPosts = () => {
    axios.get('http://127.0.0.1:3003/post',
    { headers: { 'Authorization': localStorage.token} })
    .then(res => {
      const datas = res.data.data
      this.setState({dataPosts: datas})
    })
    .catch(err => {
        console.log(err);
    })
  }

  handleToLogout(event) {
    event.preventDefault();
    const token = ''
    localStorage.setItem('token', token);
    this.props.history.push('/login')
  }

  handleToHome(event) {
    event.preventDefault();
    this.props.history.push('/')
  }

  handleToPost(event) {
    event.preventDefault();
    this.props.history.push('/post')
  }

  handleToDashboard(event) {
    event.preventDefault();
    this.props.history.push('/dashboard')
  }

  render() {
    const {dataPosts} = this.state
    console.log(dataPosts)
    return( 
          <Container>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand>Okanemo</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link onClick={(event) => this.handleToHome(event)}>Home</Nav.Link>
                  {localStorage.role === 'admin' ?  <Nav.Link onClick={(event) => this.handleToPost(event)}>Post</Nav.Link> : null}
                </Nav>
                <Nav>
                 {localStorage.role === 'admin' ?  <Nav.Link onClick={(event) => this.handleToDashboard(event)}>Dashboard</Nav.Link> : null}
                  <Nav.Link  onClick={(event) => this.handleToLogout(event)}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            {dataPosts.map((item, index) => {
            return(
              <Card style={{ width: '100%', marginTop: 20 }}>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
            </Card>
        )})}
          </Container>
    )
  }
}

export default Main