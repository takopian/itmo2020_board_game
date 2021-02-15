import React from 'react'


export function Login ({onChangeForm, createUser }) {

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Create User</h2>
                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">Login</label>
                            <input type="text" onChange={(e) => onChangeForm(e.target.value)}  className="form-control" name="login" id="login" aria-describedby="emailHelp" placeholder="login" />
                        </div>
                    </div>
                    <button type="button" onClick= {async (e) => await createUser()} className="btn btn-danger">Login</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Login