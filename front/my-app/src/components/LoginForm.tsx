import React, {FC, useState} from 'react';


const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return(
        <div>
            <input
                type='text'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Email'
            />
            <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
            />
            <button>Login</button>
            <button>Password</button>
        </div>
    );
};

export default LoginForm;
