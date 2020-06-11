import React , { Component } from 'react'
import { signin , authenticate } from '../../Auth'

const SignInPage = (props) => (
    <div className="container-fluid">
        <div className="row ">
             <div className="col-md-8 offset-md-2 text-center text-break">
                 <h1 className="mb-4  py-2 ">SignIn Form</h1>
                  <SignInForm  history={props.history}/>
             </div>
        </div>
    </div>
)


const INITIAL_STATE = {
    password: '',
    email: '',
    error: null,
    loading : false 
}



class SignInForm  extends Component {

   state = {...INITIAL_STATE };

   handleChange = event => {
       const change = { [event.target.name] : event.target.value }
       this.setState( p => ({...p , ...change }))
   }

   handleSubmit = e => {
       e.preventDefault();
       this.setState(p => ({...p,loading : true}));
       const { password, email} =  this.state
       signin({email,password}).then( res => {
           if(res.error)
            {
                this.setState({  ...INITIAL_STATE , error : res.error  });
                return 
            }
            else {
                authenticate(res, 
                () => {  this.setState({...INITIAL_STATE},() => { this.props.history.push('/account'); }) })
            }
       }).catch(error => {
           this.setState({ ...INITIAL_STATE ,  error })
       })
   }
    
  
    render() {
        
        
        const {password , email  , error, loading } = this.state

        return (
            <React.Fragment>
             { loading && <p className="text-dark p-2 my-2 bg-light text-center">Loading........</p>}
             { error &&  <p className="alert alert-danger">{JSON.stringify(error)}</p> }
            <form onSubmit={this.handleSubmit}>
              
              <div className="form-group text-left">
                  <label>Email Address</label>
                  <input  type="email" className="form-control"  onChange={this.handleChange}
                  name="email" value={email}  title="Enter a valid email" disabled={loading}/>
              </div>
              <div className="form-group text-left">
                  <label>Password</label>
                  <input  type="password" className="form-control"  onChange={this.handleChange} 
                  name="password" value={password} disabled={loading} />
              </div>
              <button className="btn btn-dark btn-block" type="submit" disabled={loading} >Sign In</button>
             
            </form>
            </React.Fragment>
        )
    }
}


export default SignInPage ;

