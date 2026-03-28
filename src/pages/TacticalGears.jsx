import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import CollectionTemplate from "../components/ui/CollectionTemplate";
import { useSEO } from "../hooks/useSEO";

const TacticalGears = () => {
  useSEO({
    title: 'Tactical Gears - VANGUARD Professional Equipment',
    description: 'Browse VANGUARD tactical gears collection featuring performance-oriented tactical equipment and professional-grade tools for operations and field use.',
    keywords: 'tactical gears, tactical equipment, professional gear, field equipment',
    ogTitle: 'VANGUARD - Tactical Gears',
    ogDescription: 'Explore professional tactical equipment and performance gear.',
    canonical: 'https://vanguard.store/tactical-gears',
  });
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
