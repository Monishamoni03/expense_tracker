//ADMIN ---> Available Categories with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../../../common/navbar";
import Buttons from "../../../common/button/Button";
import TableData from "../../../common/table/Table";
import { store } from "../../../../store/store";
import { getAllCategory } from "../../../../action/action";

const AllCategory: React.FC = () => {
    // const [values, setValues] = useState([]);
    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const categories = useSelector((state: any) => state.userData.categories[0]);

    console.log("All Categories data : ", categories);          //prints -> all category data in db.json
    
    const columnsCategory: { title: string; key: string}[] = [
        {"title": "Category Name", "key": "category name"},
        {"title": "Id", "key": "id"},
        {"title": "Action", "key": "action"}
    ]; 

    useEffect(() => {
        dispatchStore(getAllCategory());
    }, []);

    return (
        <>
            <NavBar />
            <div className="admin-page">
                <h1 style={{ textAlign: "center" }}>Available Categories</h1>
                <Buttons 
                    move = "left"
                    onClick={() => navigate('/admin')} 
                    text = "Go Back" 
                />
                <Buttons 
                    move = "right"
                    onClick={() => navigate('/addcategory')}
                    text = "Add Category"
                />
            </div>

            <br /><br />
            <TableData columns = {columnsCategory}  
            rows = {categories
                // {actionButtons}
             }             />

        </>
    )
}

export default AllCategory;