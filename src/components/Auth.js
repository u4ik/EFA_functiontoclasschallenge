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
        const emailInput = document.getElementById('email')

        this.setState({
           email: e.target.value,
           eValid: emailInput.checkValidity()
        })
    }

    handlePassword = (e) => {
        const passwordInput = document.getElementById('password')

        this.setState({
           password: e.target.value,
           pValid : passwordInput.checkValidity()
        })
    }

    componentDidMount(){
        this.props.setIsClass(Boolean(Auth?.prototype?.render))
    }

    validSymbol = {
        fontSize:' .5em',
        margin: '0',
        position:'absolute',
        right:0,
        background: 'rgba(255,255,255,.3)',
        borderRadius: '50%',
        padding: '.09em',
        maxWidth: '5em',
        maxHeight:'5em',
        filter: 'drop-shadow(1px 1px 1px black)'
    }

render(){
    return (
        <>
            <p style={{ margin: 0, fontSize: '.5em' }}>{this.state.errorText}</p>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => this.handleSubmit(e)}>

                <div style={{ display: 'flex', position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor='email'>Email</label>
                        <input style={{ position: 'relative' }} required pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$' type=''  name='email' id='email' title='Please input a valid email address' onChange={(e) => { this.handleEmail(e) }} />
                    </div>
                    <p style={this.validSymbol}> {this.state.eValid ? "✔️" : "❌"}</p>
                </div>

                <div style={{ display: 'flex', position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor='password'>Password</label>
                        <input required pattern='^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$' title='Password must be at least 5 characters, and contain at least 1 uppercase character, a lowercase character, a number, and a special character.' type='' id='password' minLength={5} maxLength={10} onChange={(e) => { this.handlePassword(e) }} />
                    </div>
                    <p style={this.validSymbol}> {this.state.pValid ? "✔️" : "❌"}</p>
                </div>

                <button type='button' style={{ margin: '1em' }} onClick={() => this.setState({signup: !this.state.signup})}>{this.state.signup ? 'Need to Login?' : 'Need to Signup?'}</button>

                <button type='submit' style={{ margin: '1em' }}>{this.state.signup ? 'Signup' : 'Login'} </button>

            </form>
        </>
    )
}
}

export default Auth;