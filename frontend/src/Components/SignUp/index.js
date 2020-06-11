import React , { Component } from 'react'
import {  withRouter} from 'react-router-dom'
import { signup } from '../../Auth'


const SignUpPage = () => (
    <div className="container-fluid">
        <div className="row ">
             <div className="col-md-8 offset-md-2 text-center text-break">
                 <h1 className="mb-4  py-2 ">SignUp Form</h1>
                  <SignUpForm />
             </div>
        </div>
    </div>
)


const INITIAL_STATE = {
    name: '',
    email: '',
    password :'',
    error: null,
    loading : false
}



class SignUpFormBase  extends Component {

    state = {...INITIAL_STATE};
  
   handleChange = event => {
       const change = { [event.target.name] : event.target.value }
       this.setState( p => ({...p , ...change }))
   }
    
   handleSubmit = e => {
       e.preventDefault();
       this.setState(p => ({...p , loading : true}))
       const { name , email , password } = this.state;
       signup({name ,email , password}).then(res => {
           console.log(res)
           if(res.error)
            {
                this.setState({ ...INITIAL_STATE , error : res.error });
                return ;
            }
            else {
                this.setState({...INITIAL_STATE},() => { this.props.history.push('/signin') ;});
            }
       })
       .catch(error => {
            this.setState({ ...INITIAL_STATE , error  })
       })
   }
  
    render() {
        
       
        const {name , email , password , error  , loading } = this.state
       
        return  (
            <React.Fragment>
            { loading && <p className="text-dark p-2 my-2 bg-light text-center">Loading........</p>}
            { error &&  <p className="alert alert-danger">{JSON.stringify(error)}</p> }
            <form onSubmit={this.handleSubmit}>
              <div className="form-group text-left">
                  <label>Name</label>
                  <input  type="text" className="form-control" onChange={(e) => { this.handleChange(e)}} 
                  name="name" value={name} disabled={loading} />
              </div>
              <div className="form-group text-left">
                  <label>Email Address</label>
                  <input  type="email" className="form-control"  onChange={(e) => { this.handleChange(e)}} 
                  name="email" value={email} disabled={loading}/>
              </div>
              <div className="form-group text-left">
                  <label>Password</label>
                  <input  type="password" className="form-control"  onChange={(e) => { this.handleChange(e)}} 
                  name="password" value={password}  disabled={loading}/>
              </div>
              <button className="btn btn-dark btn-block" type="submit" disabled={loading}>Sign Up</button>
            </form>
            </React.Fragment>
        )
    }
}



const SignUpForm = withRouter(SignUpFormBase);


export default SignUpPage ;



