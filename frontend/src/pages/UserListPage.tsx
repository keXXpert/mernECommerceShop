import React, {useEffect} from 'react'
import {Button, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'
import {Loader} from '../components/Loader'
import {Message} from '../components/Message'
import {deleteUser, getUsersList} from '../redux/actions/userActions'
import {RootState} from '../redux/store'
import {IUserInfo} from '../types/common'

export const UserListPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {loading, error, usersList, userInfo, deleteError, deleteLoading, deleteSuccess} = useSelector((state: RootState) => state.user)

    useEffect(() => {
        if (userInfo?.isAdmin) {
            dispatch(getUsersList())
        } else history.push('/login')
        //eslint-disable-next-line
    }, [userInfo, deleteSuccess])

    const handleUserDelete = (user: IUserInfo) => {
        if (window.confirm('Are you sure you want to delete a user?')) dispatch(deleteUser(user._id))
    }

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error || deleteError ? <Message variant='danger'>{error || deleteError}</Message>
                : <>
                    <Table striped hover bordered responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList && usersList.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto:${user.email}`} >{user.email}</a></td>
                                    <td>{user.isAdmin
                                        ? <i className='fas fa-check' style={{color: 'green'}} />
                                        : <i className='fas fa-times' style={{color: 'red'}} />}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='light' size='sm'>
                                                <i className='fas fa-edit' />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            size='sm'
                                            disabled={deleteLoading}
                                            onClick={() => handleUserDelete(user)}
                                        >
                                            <i className='fas fa-trash' />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>}
        </>
    )
}