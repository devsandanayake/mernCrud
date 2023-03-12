import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
export default class EditPost extends Component {
   
 
  constructor(props){
    super(props);
    this.state={
      Name:"",
      Address:"",
      Job:"" 
    }
  }

  handleInputChange=(e)=>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })

  }

  onSubmit=(e)=>{
    e.preventDefault();
   
    const id = this.props.match.params.id;
   
    const {Name,Address,Job} = this.state;

    const data ={
      Name:Name,
      Address:Address,
      Job:Job
    }


    axios.put(`http://localhost:8000/post/update/${id}`,data).then((res)=>{
      if(res.data.success){
       
        alert("Update");
        this.setState({
          
          Name:"",
          Address:"",
          Job:"" 
      })
      }
    })

  }
  componentDidMount(){
    
    const id = this.props.match.params.id;


    axios.get(`http://localhost:8000/post/${id}`).then((res)=>{
      if(res.data.success){
         this.setState({
          Name:res.data.post.Name,
          Address:res.data.post.Address,
          Job:res.data.post.Job
        });
          console.log(this.state.post);
      }
    });
  }

  render() {
    return (
      <Form>
      
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="TextInput">Name</Form.Label>
        <Form.Control  placeholder="Enter Name" name='Name' value={this.state.Name} onChange={this.handleInputChange} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor="TextInput">Address</Form.Label>
        <Form.Control  placeholder="Enter Name" name='Address'  value={this.state.Address} onChange={this.handleInputChange} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor="TextInput">Job</Form.Label>
        <Form.Control  placeholder="Enter Name" name='Job' value={this.state.Job} onChange={this.handleInputChange} />
      </Form.Group>
      
      
      <Button type="submit"  onClick={this.onSubmit}>Save</Button>
    
  </Form>
    )
  }
}
