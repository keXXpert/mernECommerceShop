import React, {useEffect, useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory, useParams} from 'react-router-dom'
import {FormContainer} from '../components/FormContainer'
import {Loader} from '../components/Loader'
import {Message} from '../components/Message'
import {USER_DETAILS_UPDATE_RESET} from '../constants/userConstants'
import {getUserDetails, updateUserDetails} from '../redux/actions/userActions'
import {RootState} from '../redux/store'


export const UserEditPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const {loading, error, userDetails, success} = useSelector((state: RootState) => state.user)
    const {userId}: {userId: string} = useParams()

    useEffect(() => {
        if (success) {
            dispatch({type: USER_DETAILS_UPDATE_RESET})
            history.push('/admin/users')
        } else {
            if (!userDetails || userDetails._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(userDetails.name)
                setEmail(userDetails.email)
                setIsAdmin(userDetails.isAdmin)
            }
        }
        //eslint-disable-next-line
    }, [userDetails, success])

    const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        dispatch(updateUserDetails({
            id: userId,
            name,
            email,
            isAdmin
        }))

    }

    return (
        <>
            <Link to='/admin/users' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading ? <Loader />
                    : <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Your First and Last Name'
                                value={name}
                                onChange={(evt) => setName(evt.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(evt) => setEmail(evt.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='isadmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                placeholder='Enter password'
                                value='isadmin'
                                checked={isAdmin}
                                onChange={(evt) => setIsAdmin(evt.target.checked)}
                            />
                        </Form.Group>

                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>}
            </FormContainer>
        </>
    )
}