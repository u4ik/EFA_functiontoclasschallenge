import { useState, useEffect } from 'react'

const Auth = (props) => {

    const [signup, setSignup] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    
    const handleSubmit = async (e) => {
        const apiURL = `https://useracess.herokuapp.com/user/${signup ? 'create' : 'login'}`;
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
                let errMsg = json.errors[0].message
                setErrorText(errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.')
                throw new Error(json.errors[0].message)
            } else {
                console.log(json.Message);
                props.setLoggedIn(true)
            }

        } catch (e) {
            console.log(e);
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        props.setIsClass(Boolean(Auth?.prototype?.render))
    },[])


    return (
        <>
        <p style={{ margin: 0, fontSize: '.5em' }}>{errorText}</p>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => handleSubmit(e)}>

                <div style={{ display: 'flex', position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor='email'>Email</label>
                        <input style={{ position: 'relative' }} required type='email' name='email' id='email' onChange={(e) => { handleEmail(e) }} />
                    </div>
                </div>

                <div style={{ display: 'flex', position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor='password'>Password</label>
                        <input required type='password' id='password' onChange={(e) => { handlePassword(e) }} />
                    </div>
                </div>

                <button type='button' style={{ margin: '1em' }} onClick={() => setSignup(!signup)}>{signup ? 'Need to Login?' : 'Need to Signup?'}</button>

                <button type='submit' style={{ margin: '1em' }}>{signup ? 'Signup' : 'Login'} </button>

            </form>
        </>
    )
}

export default Auth;