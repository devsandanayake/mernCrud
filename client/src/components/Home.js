import React,{Component} from "react";
import axios from 'axios';
 
import Button from 'react-bootstrap/Button';
 
import Form from 'react-bootstrap/Form';

 

export default class Home extends Component{
  constructor(props){
    super(props);

    this.state={
      posts:[]
    };

  }

  componentDidMount(){
    this.viewPosts();
  }
//retrivew funtion
  viewPosts(){
    axios.get("http://localhost:8000/posts").then(res =>{
      if(res.data.success){
        this.setState({
          posts:res.data.existingPosts
        });
        //show array list console.log(this.state.posts)        
      }
    });
  }
 //delete function
  onDelete=(id)=>{
    axios.delete(`http://localhost:8000/post/delete/${id}`).then((res)=>{
      alert("Deleted");
      this.viewPosts();
    })
  }


//seraching part  
  filterData(posts,searchKey){
  

    const result = posts.filter((post)=>
        post.Name.toLowerCase().includes(searchKey)||
        post.Address.toLowerCase().includes(searchKey)||
        post.Job.toLowerCase().includes(searchKey)
    )
    this.setState({posts:result})
}


handleSearchArea =(e)=>{

//console.log(e.currentTarget.value);

const searchKey = e.currentTarget.value;

axios.get("http://localhost:8000/posts").then(res =>{
  if(res.data.success){
    
    this.filterData(res.data.existingPosts,searchKey)
           
  }
});

}


  render(){
    return(
     


      <div className="container">
        <p>All Details</p>
        <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-3"
                    aria-label="Search"
                    name="searchQuary"
                    onChange={this.handleSearchArea}
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
          <table className="table" >
            
              <thead>
                <tr>
                <th scope="col">Index</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Job</th>
                <th scope="col">Action</th>
                </tr>
              </thead>
            
            <tbody>
               {this.state.posts.map((posts,index)=>(
                    <tr key={index}>
                       <th scope="row">{index+1}</th>
                       <td>
                       
                        <a href={`/post/${posts._id}`} style={{textDecoration:'none'}}>
                        {posts.Name}
                        </a>
                       
                        </td>
                       <td>{posts.Address}</td>
                       <td>{posts.Job}</td>
                       <td>
                          <a className="btn btn-warning" href={`/edit/${posts.id}`}>
                            <i className="fas fa-edit"></i>&nbsp;Edit
                          </a>
                          &nbsp; &nbsp; 
                          <a className="btn btn-danger" href="#" onClick={()=>this.onDelete(posts._id)}>
                            <i className="fas fa-tash-altt"></i>&nbsp;Delete
                          </a>
                      </td>
                    </tr>

               ))}
            </tbody>
          </table>
          <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}>Create New Post</a></button>

      </div>
    )
  }
}



