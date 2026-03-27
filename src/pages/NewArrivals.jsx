import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import CollectionTemplate from "../components/ui/CollectionTemplate";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data.filter(p => p.newArrival));
      setLoading(false);
    });
  }, []);

  const config = {
    title: "New",
    highlight: "Arrivals.",
    subtitle: "Latest Deployments"
  };

  return <CollectionTemplate config={config} products={products} loading={loading} />;
};

export default NewArrivals;
