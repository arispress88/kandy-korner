import { useEffect, useState } from "react";
import "./Inventory.css"
import { useNavigate } from "react-router-dom";
export const InventoryList = () => {
    const [inventory, setInventory] = useState([])
    const [filteredInventory, setFiltered] = useState([])
    const [highPrice, setHighPrice] = useState(false)


    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    

    useEffect (
        () => {
            fetch(`http://localhost:8088/inventory`)
            .then(r => r.json())
            .then((inventoryArray) => {
                setInventory(inventoryArray)
            })
        },
        []
    )
   
   
    useEffect(
        () => {
            if(highPrice) {
                const PriceArray = inventory.filter(inventory => inventory.pricePerUnit > 2)
                setFiltered(PriceArray)
            }
            else{
                setFiltered(inventory)
            }
        },
        [highPrice, inventory]
    )

    
    return <> 
        
    <button onClick={ () => setHighPrice(true) } >Top Priced Items</button>
    <button onClick={ () => setHighPrice(false) }>Show all</button>
    <button onClick={() => navigate("/newItems")}>Add New Item</button>
   
    <h2>List of Inventory</h2>
    <article className="items">
        {
            filteredInventory.map(
                (inventory => {
                    return <section className="inventory" key={`inventory--${inventory.id}`}>
                        <header>{inventory.name}</header>
                        <footer>{inventory.pricePerUnit}</footer>
                    </section>
                })
         
           )
    }
        </article></>
}

