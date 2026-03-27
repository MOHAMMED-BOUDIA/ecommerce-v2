import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import CollectionTemplate from "../components/ui/CollectionTemplate";

const TacticalGears = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data.filter(p => p.tags.includes("tactical")));
      setLoading(false);
    });
  }, []);

  const config = {
    title: "Tactical",
    highlight: "Gears.",
    subtitle: "Performance Collection"
  };

  return <CollectionTemplate config={config} products={products} loading={loading} />;
};

export default TacticalGears;
