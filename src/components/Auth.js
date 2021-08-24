import { useState } from 'react'

const Auth = (props) => {

    const [signup, setSignup] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const apiURL = `https://useracess.herokuapp.com/user/${signup ? 'create' : 'login'}`;


    const handleSubmit = async (e) => {
        e.preventDefault();

        const reqBody = {
            email: email,
            password: password,
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
                throw new Error(json.errors[0].message)
            } else {
                console.log(json.Message);
                props.setLoggedIn(true)
            }

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => handleSubmit(e)}>

                <label htmlFor='email'>Email</label>
                <input required type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor='password'>Password</label>
                <input  required type='password'  id='password' onChange={(e) => setPassword(e.target.value)} />


                <button type='button' style={{ margin: '1em' }} onClick={() => setSignup(!signup)}>{signup ? 'Need to Login?' : 'Need to Signup?'}</button>

                <button type='submit' style={{ margin: '1em' }} >{signup ? 'Signup' : 'Login'}></button>

            </form>
        </>
    )
}

export default Auth;