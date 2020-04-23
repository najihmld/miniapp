import React from 'react';
import { Container, Form, Card, Alert, Nav, Button, Navbar } from 'react-bootstrap';
import axios from 'axios';


class Main extends React.Component {
  state = {
    title: '',
    description: '',
    showMessage: false
  }

  componentDidMount() {
    if(!localStorage.token) {
      this.props.history.push('/login')
    }
    if(localStorage.role !== 'admin') {
      this.props.history.push('/')
    }
  }

  handleInput = (text, type) => {
    let datas = text.target.value
    this.setState({[type]: datas})
  }

  handleSubmitPost(event) {
    event.preventDefault();
    const {title, description} = this.state
    const data =  {title, description}
    if (title === '' || description === '') {
      this.setState({
        message: "Title and Description can't be empty",
        showMessage: true
      })
    } else {
      axios.post(`http://127.0.0.1:3003/post`, data,
      { headers: { 'Authorization': localStorage.token} })
      .then(res => {
        if(res.status === 200) {
          this.setState({
            title: '',
            description: '',
            showMessage: false
          })
        }
      })
      .catch(err => {
        this.setState({
          message: "Error",
          showMessage: true
        })
      })
    }
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
    const {showMessage, message, title, description} = this.state
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
            <Alert show={showMessage} style={styles.alert} variant="warning">{message}</Alert>
            <Card style={styles.card}>
          <Card.Body>
            <Form>
            <Form.Group>
              <Form.Control
                value={title}
                placeholder="Title"
                onChange={text => this.handleInput(text, 'title')}
                />
            </Form.Group>

            <Form.Group>
              <Form.Control
              value={description}
                as="textarea" rows="3"
                placeholder="Description"
                onChange={text => this.handleInput(text, 'description')}
                />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={styles.button}
              onClick={(event) => this.handleSubmitPost(event)}
              >
              Post
            </Button>
          </Form>
          </Card.Body>
        </Card>
          </Container>
    )
  }
}

const styles = {
  card: {
    width: '100%',
    marginTop: 20
  },
  button: {
    width: '100%',
    marginBottom: 10
  },
  alert: {
    marginTop: 20,
    maxWidth: '100%',
    fontSize: '12'
  }
}

export default Main