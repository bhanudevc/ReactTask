import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

const divStyle = {
    backgroundColor:'#a1d5f5',
    padding: '15px',
    color:'#fff'
};

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div style={divStyle}>
        <center>
            <h1>Recent nearby notable observations</h1>
    </center>
    </div>
);
}

export default Header;