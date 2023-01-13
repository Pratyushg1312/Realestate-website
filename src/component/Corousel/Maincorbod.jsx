import React from 'react'
import { Corousel, Carousel } from './Corousel'
import "./maincorbody.css"
export const Maincorbod = () => {
    return (
        <div className="maincorbod">
            <Carousel>
                <Corousel><img src="https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" /></Corousel>
                <Corousel><img src="https://images.unsplash.com/photo-1542889601-399c4f3a8402?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" /></Corousel>
                <Corousel><img src="https://images.unsplash.com/photo-1601428636042-300cdded615d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="" /></Corousel>
            </Carousel>
        </div>

    )
}
