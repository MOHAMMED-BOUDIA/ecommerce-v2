import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import CollectionTemplate from "../components/ui/CollectionTemplate";

const TheLab = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data.filter(p => p.collection === "The Lab"));
      setLoading(false);
    });
  }, []);

  const config = {
    title: "The",
    highlight: "Lab.",
    subtitle: "Experimental & Premium Exclusive"
  };

  return <CollectionTemplate config={config} products={products} loading={loading} />;
};

export default TheLab;
