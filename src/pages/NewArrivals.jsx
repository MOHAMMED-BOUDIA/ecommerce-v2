import React, { useState, useEffect } from "react";
import { productDataService } from "../services/productDataService";
import CollectionTemplate from "../components/ui/CollectionTemplate";
import { useSEO } from "../hooks/useSEO";

const NewArrivals = () => {
  useSEO({
    title: 'New Arrivals - VANGUARD Premium Tactical Gear',
    description: 'Discover the latest arrivals in premium tactical gear and equipment at VANGUARD. Browse our newest collection of professional-grade tools and innovative products.',
    keywords: 'new arrivals, tactical gear, latest equipment, new products',
    ogTitle: 'VANGUARD - New Arrivals',
    ogDescription: 'Explore the latest premium tactical gear and equipment additions to our collection.',
    canonical: 'https://vanguard.store/new-arrivals',
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const allProducts = productDataService.getAll();
    const newProducts = allProducts.filter(p => p.isNew).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setProducts(newProducts);
    setLoading(false);
  }, []);

  const config = {
    title: "New",
    highlight: "Arrivals.",
    subtitle: "Latest Deployments"
  };

  return <CollectionTemplate config={config} products={products} loading={loading} />;
};

export default NewArrivals;
