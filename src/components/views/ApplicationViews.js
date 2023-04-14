import { Outlet, Route, RouterProvider, Routes } from "react-router-dom"
import { LocationList } from "../locations/Locations"
import { InventoryList } from "../inventory/Inventory"
import { InventoryForm } from "../inventory/InventoryForm"


export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <div>Delicious treats are right around the Korner!</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <LocationList /> } />
                <Route path="inventory" element={ <InventoryList /> } />
                <Route path="newItems" element={ <InventoryForm /> } />

				
            </Route>
        </Routes>
    )
}