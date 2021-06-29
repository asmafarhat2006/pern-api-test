import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function ProductCard(props) {

  const { data } = props;

  return (

    <div className="col mb-5">
        <div className="card h-100">
            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
            <div className="card-body p-4">
                <div className="text-center">
                    <h5 className="fw-bolder">{data.name}</h5>
                    ${data.price}
                </div>
            </div>
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div className="text-center">
                        <Button
                            variant="outlined"
                            className = "btn btn-outline-dark mt-auto"
                            color="primary"
                            component={Link}
                            to={`/products/${data.id}`}
                            >View</Button>
                </div>
            </div>
         </div>
    </div>
   
  );
}

export default ProductCard;