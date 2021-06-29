import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadProducts } from '../../store/products/Products.actions';

import ProductCard from '../../components/ProductCard/ProductCard';


function Home() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
 /* const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
 const userid  = (useSelector(state => state.auth.userid));
  if(isLoggedIn){
     console.log(userid);
  }
    console.log(isLoggedIn);*/
  useEffect(() => {
    async function load() {
      await dispatch(loadProducts());
    }
    load();
  }, [dispatch]);

  return (
    <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        
            { products && Object.keys(products).length > 0 &&
                Object.keys(products).map((key) => {
                const product = products[key];
                return <ProductCard data={product} key={product.id} />
                })
            } 
            </div>
        </div>
    </section>
  );
}

export default Home;
