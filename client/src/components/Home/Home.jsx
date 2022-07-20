import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProducts, sortPrice, sortRating, filterProducts, filterProductsByViews, filterProductsByDate } from "../../redux/actions"
import ProductCard from '../ProductCard/ProductCard'
import Style from "./Home.module.css"
import AddCartButton from '../AddCartButton/AddCartButton'


function Home() {

  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const carousel = useSelector((state) => state.carousel)
  const mostViewed = useSelector((state) => state.mostViewed)
  const recentlyAdded = useSelector((state) => state.recentlyAdded)


  useEffect(() => {
    dispatch(getProducts());
    dispatch(filterProducts())
    dispatch(filterProductsByViews())
    dispatch(filterProductsByDate())
  }, [dispatch])


  return (
    <div>
      <div className={Style.imagePositioning}>
        <img className={Style.controllerLeft} src="https://www.solofondos.com/wp-content/uploads/2021/03/2ea2156ee2ce4989ea602d820db10fae.png"/>
        <img className={Style.axolot} src="https://puntociego.com.ar/download/multimedia.normal.91084a739de17b1c.67616d696e67207365747570206465736b5f6e6f726d616c2e6a7067.jpg" />
        <img className={Style.controllerRight} src="https://www.solofondos.com/wp-content/uploads/2021/03/2ea2156ee2ce4989ea602d820db10fae.png"/>
      </div>
      <div className={Style.title}>Hecha un vistazo!</div>
      <div className={Style.carouselBackground}>
        <div className={Style.carousel}>
          {
            carousel?.map((e) => {

              return (
                <div key={e._id} >
                  <Link to={"/product/" + e._id}>
                    <ProductCard
                      name={e.name}
                      image={e.image?.url}
                      price={e.price}
                      key={e._id} />
                  </Link>
                  <AddCartButton id={e._id} />
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={Style.title}>Los más visitados</div>
      <div className={Style.carouselBackground}>
        <div className={Style.carousel}>
          {
            mostViewed?.map((e) => {

              return (
                <div key={e._id} >
                  <Link to={"/product/" + e._id}>
                    <ProductCard
                      name={e.name}
                      image={e.image?.url}
                      price={e.price}
                      key={e._id} />
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={Style.title}>Novedades!</div>
      <div className={Style.carouselBackground}>
        <div className={Style.carousel}>
        {
            recentlyAdded?.map((e) => {

              return (
                <div key={e._id} >
                  <Link to={"/product/" + e._id}>
                    <ProductCard
                      name={e.name}
                      image={e.image?.url}
                      price={e.price}
                      key={e._id} />
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home;