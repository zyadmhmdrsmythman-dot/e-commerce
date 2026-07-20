import React, { useContext } from 'react'
import { CartContext } from '../../components/context/CartContext';
import PageTransition from '../../components/PageTransition';
import Product from '../../components/sliderProduct/Product';






function Favorites() {

const { Favorites } = useContext(CartContext);

  return (
    <PageTransition >
        <div className="category_products FavoritesPage">
            <div className="container">
                <div className="top_slide">
                    <h2>Your Favorites : {Favorites.length}</h2>
                </div>

                {Favorites.length === 0 ? (
                    <p>No Favorites Products yet.</p>
                ) : (
                    <div className="products">
                        {Favorites.map(item => (
                            <Product item={item} key={item.id} />
                        ))}
                    </div>
                )}
            </div>
        </div>

    </PageTransition>
  )
}

export default Favorites
