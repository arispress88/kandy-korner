import { useEffect, useState } from "react"
import "./Locations.css"
import { useNavigate } from "react-router-dom"

export const LocationList = () => {
    const [locations, setLocations] = useState ([])
    const navigate = useNavigate()

    useEffect (
        () => {
            fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((locationArray) => {
                setLocations(locationArray)
            })
            console.log("Success!")
        },
        []
    )

    return <>
    <h2>List of Locations</h2>
    
    <article className="locations">
        {
            locations.map(
                (location => {
                    return <section className="location" key={`location--${location.id}`}>
                        <header>{location.address}</header>
                        <footer>{location.sqFt} square feet</footer>
                    </section>
                })
            )
        }
        </article></>
}