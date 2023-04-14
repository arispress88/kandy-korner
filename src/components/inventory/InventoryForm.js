import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const InventoryForm = () => {

    const [inventory, update] = useState({
        name: "",
        type:"",
        pricePerUnit: 0
    })

    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("SAVING!")

        //Object to be saved to the API

       /* {
            "userId": 1,
            "name": "Skittles",
            "type": 1,
            "pricePerUnit": 1.50
        }*/
    
        const infoToSendToAPI = {
            userId: kandyUserObject.id,
            name: inventory.name,
            type: inventory.type,
            pricePerUnit: inventory.pricePerUnit
        }
    

    return fetch(`http://localhost:8088/inventory`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(infoToSendToAPI)
    })
    .then(r => r.json())
    .then(() => {
        navigate("/inventory")
    })
}

return (
    <form className="inventoryForm">
        <h2 className="inventoryForm__title">Add New Item</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                    required autoFocus
                    text="text"
                    className="form-control"
                    placeholder="Name of product"
                    value={inventory.name}
                    onChange={
                        (evt) => {
                            const copy = {...inventory}
                            copy.name = evt.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="type">Type of Candy</label>
                <input type="text"
                value={inventory.type}
                onChange={
                    (evt) => {
                        const copy = {...inventory}
                        copy.type = evt.target.value
                        update(copy)
                    }
                } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="pricePerUnit">Price of the Product</label>
                <input type="text"
                value={inventory.pricePerUnit}
                onChange={
                    (evt) => {
                        const copy = {...inventory}
                        copy.pricePerUnit = evt.target.value
                        update(copy)
                    }
                } />
            </div>
        </fieldset>
        <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
            Submit Item
        </button>
    </form>
)
}