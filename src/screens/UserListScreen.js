import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { listUsers } from '../actions/userActions'

function UserListScreen({history}) {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    useEffect(() => {
        if(userInfo && userInfo.is_staff){
            dispatch(listUsers())
        }
        else
        {
            history.push('/login')
        }


        
    }, [dispatch])


    const deleteHandler = (id) => {
        console.log('Deleted', id)
    }

    return (
        <div>
            <h1>Users</h1>
            {loading
                ? (<loading />)
                : error 
                ? (<Message variant='danger'>{error}</Message>)
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Edit User</th>
                        </thead>

                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.is_staff ? (
                                        <i className = 'fas fa-check' style={{color: 'green'}}> Admin</i>
                                    ): (
                                        <i className = 'fas fa-check' style={{color: 'red'}}> User</i>
                                    )}</td>

                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}`}>
                                            <Button variant='primary' className='btn-sm'> 
                                                Edit
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}> 
                                                Delete
                                            </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                   
                )
            }



        </div>
    )
}

export default UserListScreen
