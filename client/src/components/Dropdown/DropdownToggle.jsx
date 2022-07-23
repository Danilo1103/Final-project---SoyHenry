import React, { useState} from 'react'
import { useNavigate, Link, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../../redux/actions/"


export default function DropdownComponent(props) {

    const categories = useSelector((state) => state.categories)
    const [dropdown, setDropdown] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const openDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <div>
            <Dropdown isOpen={dropdown} toggle={openDropdown} size="lr" >
                <DropdownToggle caret>
                    Categorias
                </DropdownToggle>
                <DropdownMenu >
                    {
                        props.products && categories?.filter((j) => props.products.includes(j)).map((e) => <DropdownItem value={e} onClick={(e) => {props.setCategoryFilter(e.target.value); props.setBrandFilter("")}}
                        > {e}
                        </DropdownItem>)
                    }
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}