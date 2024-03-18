import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home(props) {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate("/users");
    }
    return (
        <div className="home-container">
            <h1 className="mt-5">Welcome to Zeno's App!</h1>
            <button className="btn btn-primary mt-3" onClick={handleOnClick}>
                <span className="me-2">Click me</span>
                <i className="fa fa-arrow-right-long"></i>
            </button>
            <div className="mt-3">
                <p><b>Function</b></p>
                <ul>
                    <li>Displays a list of users</li>
                    <li>Add new user</li>
                    <li>Edit user infomation</li>
                    <li>Delete user</li>
                    <li>Sort by id and name</li>
                    <li>Search by email</li>
                    <li>Improt infomation from csv file</li>
                    <li>Export infomation to csv file</li>
                    <li>Login</li>
                    <li>Logout</li>
                </ul>
            </div>
            <div className="mt-3">
                <p><b>Technology</b></p>
                <ul>
                    <li>API: https://reqres.in</li>
                    <li>ReactJS</li>
                    <li>ReactBootstrap</li>
                </ul>
            </div>
            <h4>Thanks for watching!</h4>
        </div>
    );
}

export default Home;