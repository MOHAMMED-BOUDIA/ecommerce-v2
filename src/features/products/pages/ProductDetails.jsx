import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-3xl font-bold">Product Details: {id}</h1>
    </div>
  );
};

export default ProductDetails;
