import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);

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
            <button
                onClick={() => store.login(email, password)}
            >Login</button>
            <button
                onClick={() => store.registration(email, password)}
            >Password</button>
        </div>
    );
};

export default observer(LoginForm);
