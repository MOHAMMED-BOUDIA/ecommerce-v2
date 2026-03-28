import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import CollectionTemplate from "../components/ui/CollectionTemplate";
import { useLocation } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";

  useSEO({
    title: searchQuery ? `Search Results: ${searchQuery} - VANGUARD Shop` : 'VANGUARD Shop - Tactical Gear Archive',
    description: searchQuery ? `Search results for "${searchQuery}" in VANGUARD premium tactical gear collection.` : 'Browse VANGUARD complete archive of premium tactical gear, professional equipment, and innovative products.',
    keywords: searchQuery ? `${searchQuery}, tactical gear, equipment` : 'tactical gear, shop, archive, professional equipment, premium products',
    ogTitle: searchQuery ? `VANGUARD - ${searchQuery} Search Results` : 'VANGUARD - Complete Shop Archive',
    ogDescription: searchQuery ? `Search results for ${searchQuery}` : 'Premium tactical gear and professional equipment collection',
    canonical: `https://vanguard.store/shop${searchQuery ? '?q=' + searchQuery : ''}`,
  });

  useEffect(() => {
    fetchProducts().then(data => {
      let filtered = data;
      if (searchQuery) {
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setProducts(filtered);
      setLoading(false);
    });
  }, [searchQuery]);

  const config = {
    title: searchQuery ? "Search" : "The",
    highlight: searchQuery ? "Results." : "Archive.",
    subtitle: searchQuery ? `Query: ${searchQuery}` : "Inventory System"
  };

  return (
    <CollectionTemplate 
      config={config} 
      products={products} 
      loading={loading} 
      emptyMessage={searchQuery ? "No results found for your search query." : "Archive protocol empty. No intel available."}
    />
  );
};

export default Shop;
