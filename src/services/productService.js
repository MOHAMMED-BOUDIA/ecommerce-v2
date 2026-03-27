const realisticNames = {
  "electronics": [
    "Wireless Noise-Cancelling Headphones", "4K Ultra HD Curved Monitor", "Mechanical Gaming Keyboard",
    "Ergonomic Wireless Mouse", "Smart Home Control Hub", "High-Capacity Power Bank",
    "Bluetooth Studio Speaker", "Mirrorless Digital Camera", "Professional Smartphone Gimbal", "Dual USB-C Hub Adapter"
  ],
  "jewelery": [
    "18k Gold Plated Ring", "Sterling Silver Chain", "Diamond Accent Pendant",
    "Rose Gold Minimalist Bracelet", "Pearl Drop Earrings", "Minimalist Choker",
    "Vintage Gemstone Ring", "Sapphire Studs", "Cuban Link Chain", "Engraved Signet Ring"
  ],
  "men's clothing": [
    "Essential Cotton Crewneck", "Slim Fit Chino Pants", "Classic Denim Jacket",
    "Tailored Wool Blend Blazer", "Casual Oxford Shirt", "Heavyweight Fleece Hoodie",
    "Performance Joggers", "Water-Resistant Trench Coat", "Linen Summer Button-Down", "Vintage Wash Jeans"
  ],
  "women's clothing": [
    "Ribbed Knit Midi Dress", "High-Waisted Wide Leg Pants", "Oversized Cashmere Sweater",
    "Classic Silk Blouse", "Floral Wrap Skirt", "Tailored Linen Blazer",
    "Seamless Activewear Set", "Pleated Midi Skirt", "Vegan Leather Moto Jacket", "V-Neck Satin Slip Dress"
  ]
};

const imgCategories = {
  "electronics": "electronics,gadget",
  "jewelery": "jewelry,ring",
  "men's clothing": "menswear,clothing",
  "women's clothing": "womenswear,clothing"
};

const colors = ["Obsidian", "Ivory", "Midnight", "Slate", "Crimson", "Olive", "Silver", "Champagne"];

export const fetchProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    let allProducts = [...data];
    
    // Scale FakeStore prices to MAD (Moroccan Dirham) globally so the rest of the app doesn't need to recalculate
    allProducts = allProducts.map(p => ({
      ...p,
      price: (parseFloat(p.price) * 10).toFixed(2)
    }));

    const productCategories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
    
    // Ensure every category has at least 50 items for a robust catalog
    productCategories.forEach(cat => {
      const catProducts = allProducts.filter(p => p.category === cat);
      if (catProducts.length < 50) {
        const needed = 50 - catProducts.length;
        for (let i = 0; i < needed; i++) {
          const baseName = realisticNames[cat][i % realisticNames[cat].length];
          const colorName = colors[i % colors.length];
          
          allProducts.push({
            id: `mock-${cat}-${i}-${Date.now()}`,
            title: `${colorName} ${baseName}`,
            shortDescription: `Premium ${cat} item engineered for high performance.`,
            // Realistic MAD pricing
            price: (Math.random() * 800 + 150).toFixed(2),
            description: `Authentic ${cat} collection piece. Features high durability, reliable materials, and an aesthetic standard perfect for any premium lifestyle collection.`,
            category: cat,
            // Using loremflickr for highly accurate category-matched imagery
            image: `https://loremflickr.com/800/800/${imgCategories[cat]}/all?lock=${i + 100}`,
            rating: { rate: (Math.random() * 1.5 + 3.5).toFixed(1), count: Math.floor(Math.random() * 300) + 10 }
          });
        }
      }
    });

    // Tagging Engine: Injects scalable ecommerce filtering attributes
    allProducts = allProducts.map((p, index) => {
      const isNewArrival = index % 5 === 0;
      const isTactical = index % 3 === 0 || p.category === "men's clothing";
      const isLab = index % 12 === 0;
      const isFeatured = index % 8 === 0;
      
      let tags = [];
      if (isNewArrival) tags.push("new");
      if (isTactical) tags.push("tactical", "utility", "gear");
      if (isLab) tags.push("premium", "exclusive", "experimental");
      if (isFeatured) tags.push("featured");

      let badge = null;
      if (isLab) badge = "Lab Edition";
      else if (isNewArrival) badge = "New";
      else if (p.rating?.rate > 4.6) badge = "Hot";

      return {
        ...p,
        newArrival: isNewArrival,
        collection: isLab ? "The Lab" : isTactical ? "Tactical Gears" : "Archive",
        featured: isFeatured,
        tags,
        badge,
        subcategory: p.category
      };
    });

    return allProducts;
  } catch (error) {
    console.error("Product service error:", error);
    return [];
  }
};
