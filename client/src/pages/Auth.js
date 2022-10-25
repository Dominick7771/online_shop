import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {

    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div>
            <Container className='d-flex justify-content-center align-items-center'
                       style={{height: window.innerHeight - 54}}>
                <Card style={{width: 600}} className='p-5'>
                    <h2 className='m-auto'>{isLogin ? 'Authorization' : 'Registration'}</h2>
                    <Form className='d-flex flex-column'>
                        <Form.Control className='mt-2' placeholder={'Enter your e-mail'} value={email}
                                      onChange={e => setEmail(e.target.value)}/>
                        <Form.Control className='mt-2' placeholder={'Enter your password'} value={password}
                                      onChange={e => setPassword(e.target.value)} type='password'/>
                    </Form>
                    <div className='d-flex justify-content-between mt-2'>
                        {isLogin ?
                            <NavLink to={REGISTRATION_ROUTE} variant="outline-success"
                                     className='align-self-start text-decoration-none'>Don't have account?</NavLink>
                            :
                            <NavLink to={LOGIN_ROUTE} variant="outline-success"
                                     className='align-self-start text-decoration-none'>You have account?</NavLink>}
                        <Button variant='outline-success' className='align-self-end'
                                onClick={click}>{isLogin ? 'Sign' : 'Register'}</Button>
                    </div>
                </Card>
            </Container>
        </div>
    );
});

export default Auth;