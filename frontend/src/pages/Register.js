import React from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import qs from 'qs';
import user from 'd:/Work/webskyeternal/src/public/redux/reducers/user';

class Login extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    message: '',
    showMessage: false
  }

  componentDidMount() {
    if(localStorage.token) {
      this.props.history.push('/')
    }
  }

  handleInput = (text, type) => {
    let datas = text.target.value
    this.setState({[type]: datas})
  }

  handleSubmitRegister(event) {
    event.preventDefault();
    const {name, username, password} = this.state
    const data = {name, username, password}
    console.log(data)
    if (name === '' && username === '' && password === '') {
      this.setState({
        message: "All must be filled",
        showMessage: true
      })
    } else {
      axios.post(`http://127.0.0.1:3003/auth/register`, qs.stringify(data))
      .then(res => {
        if(res.status === 200) {
          this.props.history.push('/login')
        }
      })
      .catch(err => {
        this.setState({
          message: "Failed to register account",
          showMessage: true
        })
      })
    }
  }

  handleToLogin(event) {
    this.props.history.push('/login')
  }
  
  render(){
    const {showMessage, message} = this.state
    return(
      <Container style={styles.container}>
        <Row>
        <Col>
        <Alert show={showMessage} style={styles.alert} variant="warning">{message}</Alert>
          <Card style={styles.card}>
          <Card.Body>
            <Form>
            <Form.Group>
              <Form.Control
                placeholder="Name"
                onChange={text => this.handleInput(text, 'name')}
                />
            </Form.Group>

            <Form.Group>
              <Form.Control
                placeholder="Username"
                onChange={text => this.handleInput(text, 'username')}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={text => this.handleInput(text, 'password')}
                />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={styles.button}
              onClick={(event) => this.handleSubmitRegister(event)}
              >
              Register
            </Button>
            <Button
              variant="secondary"
              type="submit"
              style={styles.button}
              onClick={(event) => this.handleToLogin(event)}
              >
              Login
            </Button>
          </Form>
          </Card.Body>
        </Card>
        </Col>
        </Row>
      </Container>
    )
  }
}

const styles = {
  container: {
    height:'100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: '18rem'
  },
  button: {
    width: '100%',
    marginBottom: 10
  },
  alert: {
    marginTop: 20,
    maxWidth: '18rem',
    fontSize: '12'
  }
}

export default Login