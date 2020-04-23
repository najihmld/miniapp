import React from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import qs from 'qs';

class Login extends React.Component {
  state = {
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

  handleSubmitLogin(event) {
    event.preventDefault();
    const {username, password} = this.state
    const data = {username, password}
    console.log(data)
    if (username === '' || password === '') {
      this.setState({
        message: "Username and password can't be empty",
        showMessage: true
      })
    } else {
      axios.post(`http://127.0.0.1:3003/auth/login`, qs.stringify(data))
      .then(res => {
        if(res.status === 200) {
          const token = res.data.data.token
          const role = res.data.data.role
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          this.props.history.push('/')
        }
      })
      .catch(err => {
        this.setState({
          message: "Invalid username or password",
          showMessage: true
        })
      })
    }
  }

  handleToRegister(event) {
    this.props.history.push('/register')
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
            <Form.Group controlId="formBasicEmail">
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
              onClick={(event) => this.handleSubmitLogin(event)}
              >
              Login
            </Button>
            <Button
              variant="secondary"
              type="submit"
              style={styles.button}
              onClick={(event) => this.handleToRegister(event)}
              >
              Register
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