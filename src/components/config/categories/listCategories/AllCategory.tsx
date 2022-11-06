//ADMIN ---> Available Categories with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../../../common/navbar";
import Buttons from "../../../common/button/Button";
import TableData from "../../../common/table";
import { store } from "../../../../store/store";
import { deleteCategory, getAllCategory } from "../../../../action/action";
import { RowProps } from "../../../../shared/types/type";

const AllCategory: React.FC = () => {
    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const categories = useSelector((state: any) => state.userData.categories[0]);
    const [success, setSuccess] = useState(false);

    // console.log("All Categories data : ", categories);          //prints -> all category data in db.json
    
    const columnsCategory: { title: string; key: string}[] = [
        {"title": "Id", "key": "id"},
        {"title": "Category Name", "key": "category name"},
        {"title": "Action", "key": "action"},
        { "title": "Action", "key": "action" }
    ]; 

    useEffect(() => {
        dispatchStore(getAllCategory());
    }, [success]);

    const rowCategory: RowProps[] = [] as RowProps[];

    const handleEdit = (id: number) => {
        console.log("Handle edit");
        
    }

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this Category?')) {
            dispatchStore(deleteCategory(id));
            setSuccess(true);
        }
    }

    useEffect(() => {
        if (success) {
            alert("Category deleted successfully!")
        }
    }, [success])

    categories?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            categoryName: value.categoryName,
            actionButtons: [{
                children: "Update",
                onClick: () => handleEdit(value.id)
            },
            {
                children: "Delete",
                onClick: () => handleDelete(value.id)
            }]
        }
        rowCategory.push(object)
    })

    return (
        <>
            {/* <NavBar /> */}
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
            <TableData columns = {columnsCategory}  rows = {rowCategory} />

        </>
    )
}

export default AllCategory;