import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import CollectionTemplate from "../components/ui/CollectionTemplate";
import { useSEO } from "../hooks/useSEO";

const TheLab = () => {
  useSEO({
    title: 'The Lab - VANGUARD Experimental & Premium Collection',
    description: 'Experience The Lab at VANGUARD - our experimental and premium exclusive collection featuring cutting-edge products and innovative solutions.',
    keywords: 'lab, experimental, premium exclusive, innovation, cutting-edge',
    ogTitle: 'VANGUARD - The Lab',
    ogDescription: 'Discover experimental and premium exclusive products at VANGUARD.',
    canonical: 'https://vanguard.store/the-lab',
  });
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
