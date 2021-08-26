import React, { Component } from 'react';

class Auth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            signup: true,
            errorText: '',
            eValid: false,
            pValid: false
        }

    }



    handleSubmit = async (e) => {
        e.preventDefault();
        const apiURL = `https://useracess.herokuapp.com/user/${this.state.signup ? 'create' : 'login'}`;

        const reqBody = {
            email: this.state.email,
            password: this.state.password,
        }

        try {
            const res = await fetch(apiURL, {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const json = await res.json();

            if (json.errors) {
                let errMsg = json.errors[0].message
                this.setState({
                    errorText: errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.'
                })
                throw new Error(json.errors[0].message)
            } else {
                console.log(json.Message);
                this.props.setLoggedIn(true)
            }

        } catch (e) {
            console.log(e);
        }
    }

    handleEmail = (e) => {
        this.setState({
           email: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
           password: e.target.value
        })
    }

    componentDidMount(){
        this.props.setIsClass(Boolean(Auth?.prototype?.render))
    }

render(){
    return (
        <>
            <p style={{ margin: 0, fontSize: '.5em' }}>{this.state.errorText}</p>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => this.handleSubmit(e)}>

                <div style={{ display: 'flex', position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor='email'>Email</label>
                        <input style={{ position: 'relative' }} required type='email' name='email' id='email' onChange={(e) => { this.handleEmail(e) }} />
                    </div>
                </div>

                <div style={{ display: 'flex', position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor='password'>Password</label>
                        <input required type='password' id='password' onChange={(e) => { this.handlePassword(e) }} />
                    </div>
                </div>

                <button type='button' style={{ margin: '1em' }} onClick={() => this.setState({signup: !this.state.signup})}>{this.state.signup ? 'Need to Login?' : 'Need to Signup?'}</button>

                <button type='submit' style={{ margin: '1em' }}>{this.state.signup ? 'Signup' : 'Login'} </button>

            </form>
        </>
    )
}
}

export default Auth;