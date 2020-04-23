import React from 'react';
import { Container, Nav, Table, Button, Navbar, Form, Modal } from 'react-bootstrap';
import axios from 'axios';


class Dashboard extends React.Component {
  state = {
    dataUsers: [],
    setRole: ''
  }
  componentDidMount() {
    if(!localStorage.token) {
      this.props.history.push('/')
    }
    if(localStorage.role !== 'admin') {
      this.props.history.push('/')
    }
    this.getUsers()
  }

  handleToLogout(event) {
    event.preventDefault();
    const token = ''
    localStorage.setItem('token', token);
    this.props.history.push('/login')
  }

  getUsers = () => {
    axios.get('http://127.0.0.1:3003/auth/users',
    { headers: { 'Authorization': localStorage.token} })
    .then(res => {
      const datas = res.data.data
      console.log(datas) 
      this.setState({dataUsers: datas})
    })
    .catch(err => {
        console.log(err);
    })
  }

  handleRoleChange = (e, item) => {
    const role = {role: e.target.value}
    const id = item.id
    this.setState({setRole: role})
    console.log(item)
    console.log(role)

    axios.put(`http://127.0.0.1:3003/auth/${id}`, role,
    { headers: { 'Authorization': localStorage.token} })
    .then(res => {
      if(res.status === 200) {
        this.getUsers()
      }
    })
    .catch(err => {
        console.log(err);
    })
   
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
    const {dataUsers} = this.state
    return( 
      <Container >
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
        <Table>
          <thead>
             <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Permission</th>
                <th>Action</th>
            </tr>
          </thead>
        {dataUsers.map((item, index) => {
          const id = item.id
            return(
              <tbody>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>
                  <Form>
                    <Form.Group controlId={item.id}>
                      <Form.Control as="select"
                      onChange={(e) => this.handleRoleChange(e, item)}
                      defaultValue={item.role}
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
                  </td>
                </tr>
              </tbody>
        )})}
        </Table>
      </Container>
    )
  }
}

export default Dashboard