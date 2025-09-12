import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSideBar from '../AdminSideBar/AdminSideBar';

const LayoutAdmin = () => {
    return (
        <div style={{ display: 'flex' }}>
            <AdminSideBar />
            <div style={{ marginLeft: '5px', padding: '20px', flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
};

export default LayoutAdmin;
