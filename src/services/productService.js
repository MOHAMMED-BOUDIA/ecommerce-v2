const electronicsProducts = [
  { name: "Premium Wireless Noise-Cancelling Headphones Pro", img: "headphones", variant: "Pro", color: "Black" },
  { name: "4K Ultra HD 32-Inch Curved Gaming Monitor", img: "monitor", variant: "Ultra", color: "Black" },
  { name: "Mechanical RGB Gaming Keyboard Cherry MX", img: "keyboard", variant: "Pro", color: "Black" },
  { name: "Ergonomic Vertical Wireless Mouse", img: "mouse", variant: "Pro", color: "Gray" },
  { name: "Smart Home AI Control Hub", img: "speaker", variant: "Ultra", color: "White" },
  { name: "Ultra High-Capacity 65W Power Bank", img: "tablet", variant: "Max", color: "Black" },
  { name: "Premium Bluetooth Studio Reference Monitor", img: "speaker", variant: "Studio", color: "Gray" },
  { name: "Full Frame Mirrorless Digital Camera", img: "camera", variant: "Pro", color: "Black" },
  { name: "Professional 3-Axis Smartphone Video Gimbal", img: "camera", variant: "Pro", color: "White" },
  { name: "Dual USB-C 10-in-1 Docking Hub", img: "laptop", variant: "Pro", color: "Gray" },
  { name: "Portable SSD 2TB USB-C Drive", img: "laptop", variant: "Max", color: "Black" },
  { name: "Gaming Laptop Cooling Pad RGB", img: "laptop", variant: "Elite", color: "Black" },
  { name: "Wireless Charging Station 15W Fast", img: "phone", variant: "Plus", color: "White" },
  { name: "Premium HDMI 2.1 Fiber Optic Cable 10ft", img: "monitor", variant: "Pro", color: "Black" },
  { name: "Portable WiFi 6 Router Mesh System", img: "speaker", variant: "Elite", color: "White" },
  { name: "Webcam 4K Pro Auto-Focus Studio", img: "camera", variant: "Pro", color: "Black" }
];

const jeweleryProducts = [
  { name: "24K Gold Plated Statement Ring", img: "ring", variant: "Statement", color: "Gold" },
  { name: "Sterling Silver 925 Chain Necklace", img: "chain", variant: "Classic", color: "Silver" },
  { name: "Diamond Accent White Gold Pendant", img: "pendant", variant: "Modern", color: "White" },
  { name: "Rose Gold Minimalist Stackable Bracelet", img: "bracelet", variant: "Delicate", color: "Rose Gold" },
  { name: "Freshwater Pearl Drop Stud Earrings", img: "earrings", variant: "Classic", color: "White" },
  { name: "14K Gold Layered Choker Necklace", img: "chain", variant: "Statement", color: "Gold" },
  { name: "Vintage Oval Sapphire Gemstone Ring", img: "ring", variant: "Vintage", color: "Blue" },
  { name: "Blue Sapphire Diamond Tennis Bracelet", img: "bracelet", variant: "Statement", color: "Silver" },
  { name: "Cuban Link Gold Chain Necklace XL", img: "chain", variant: "Statement", color: "Gold" },
  { name: "Engraved Silver Signet Ring Band", img: "ring", variant: "Classic", color: "Silver" },
  { name: "White Gold Engagement Ring Solitaire", img: "ring", variant: "Modern", color: "White" },
  { name: "Moonstone Crystal Healing Necklace", img: "pendant", variant: "Vintage", color: "Silver" },
  { name: "Gold Filled Hoops Hypoallergenic", img: "earrings", variant: "Classic", color: "Gold" },
  { name: "Silver Charm Bracelet with Beads", img: "bracelet", variant: "Delicate", color: "Silver" },
  { name: "Titanium Wedding Band Ring Eternal", img: "ring", variant: "Modern", color: "Gray" },
  { name: "Rainbow Tourmaline Statement Brooch", img: "brooch", variant: "Bold", color: "Rainbow" }
];

const mensClothingProducts = [
  { name: "Premium Organic Cotton Crewneck Sweater", img: "sweater", variant: "Premium", color: "Navy" },
  { name: "Slim Fit Navy Chino Casual Pants", img: "pants", variant: "Slim Fit", color: "Navy" },
  { name: "Classic Raw Denim Jacket Indigo", img: "jacket", variant: "Classic", color: "Indigo" },
  { name: "Tailored Charcoal Wool Blend Blazer", img: "blazer", variant: "Premium", color: "Charcoal" },
  { name: "Casual Oxford Button-Down Shirt White", img: "shirt", variant: "Classic", color: "White" },
  { name: "Heavyweight Fleece Graphic Hoodie", img: "hoodie", variant: "Premium", color: "Black" },
  { name: "Black Performance Athletic Joggers", img: "pants", variant: "Performance", color: "Black" },
  { name: "Waterproof Premium Trench Coat Beige", img: "coat", variant: "Premium", color: "Beige" },
  { name: "Lightweight Linen Short Button-Down", img: "shirt", variant: "Urban", color: "Cream" },
  { name: "Vintage Dark Wash Straight Leg Jeans", img: "jeans", variant: "Vintage", color: "Indigo" },
  { name: "Premium Merino Wool V-Neck Sweater", img: "sweater", variant: "Elite", color: "Gray" },
  { name: "Slim Fit Teal Dress Shirt Long Sleeve", img: "shirt", variant: "Slim Fit", color: "Teal" },
  { name: "Plaid Flannel Oversized Button-Up", img: "shirt", variant: "Oversized", color: "Red" },
  { name: "Black Leather Motorcycle Jacket", img: "jacket", variant: "Bold", color: "Black" },
  { name: "Khaki Work Pants Industrial Grade", img: "pants", variant: "Performance", color: "Khaki" },
  { name: "Striped Rugby Polo Collar Shirt", img: "shirt", variant: "Classic", color: "Green" }
];

const womensClothingProducts = [
  { name: "Ribbed Cotton Midi Bodycon Dress", img: "dress", variant: "M", color: "Black" },
  { name: "High-Waisted Wide Leg Linen Pants", img: "pants", variant: "L", color: "Beige" },
  { name: "Oversized Cashmere Blend Crewneck Sweater", img: "sweater", variant: "L", color: "Cream" },
  { name: "Silk Charmeuse Blouse Champagne", img: "blouse", variant: "M", color: "Champagne" },
  { name: "Floral Wrap Midi Skirt Boho", img: "skirt", variant: "M", color: "Floral" },
  { name: "Tailored Linen Structured Blazer", img: "jacket", variant: "M", color: "Navy" },
  { name: "Seamless High-Waist Activewear Set", img: "leggings", variant: "M", color: "Black" },
  { name: "Pleated Chiffon Midi A-Line Skirt", img: "skirt", variant: "S", color: "White" },
  { name: "Vegan Leather Moto Jacket Black", img: "jacket", variant: "M", color: "Black" },
  { name: "V-Neck Satin Slip Dress Emerald", img: "dress", variant: "S", color: "Emerald" },
  { name: "Fitted Turtleneck Sweater Dress", img: "dress", variant: "M", color: "Black" },
  { name: "Lightweight Linen Long Sleeve Shirt", img: "blouse", variant: "L", color: "White" },
  { name: "Flared Bell Bottom Jeans Vintage", img: "pants", variant: "S", color: "Indigo" },
  { name: "Cropped Cardigan Sweater Knit", img: "jacket", variant: "M", color: "Gray" },
  { name: "Long Sleeve Bodysuit Sheer Mesh", img: "blouse", variant: "M", color: "Black" },
  { name: "Off-Shoulder Ruffle Blouse Romantic", img: "blouse", variant: "L", color: "Pink" }
];

const descriptions = {
  "electronics": [
    "Advanced engineering with premium materials",
    "Industry-leading performance and reliability",
    "Award-winning design and functionality",
    "Professional-grade quality assurance",
    "Cutting-edge technology integration",
    "Studio-quality performance"
  ],
  "jewelery": [
    "Authentic luxury craftsmanship",
    "Timeless elegance and sophistication",
    "Ethically sourced materials",
    "Heirloom quality construction",
    "Stunning hand-polished finish",
    "Investment-grade quality"
  ],
  "men's clothing": [
    "Premium tailored construction",
    "Comfortable everyday wear",
    "Professional versatile styling",
    "Durable quality materials",
    "Modern contemporary design",
    "Perfect casual-to-formal piece"
  ],
  "women's clothing": [
    "Flattering contemporary silhouette",
    "Premium comfort and style",
    "Versatile styling options",
    "Designer-inspired quality",
    "Effortless sophisticated look",
    "Chic and timeless design"
  ]
};

const categoryMap = {
  "electronics": electronicsProducts,
  "jewelery": jeweleryProducts,
  "men's clothing": mensClothingProducts,
  "women's clothing": womensClothingProducts
};

export const fetchProducts = async () => {
  const createProductSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const productsByCategory = {};
  let globalIndex = 0;

  for (const [cat, productList] of Object.entries(categoryMap)) {
    const categoryProducts = [];
    const descList = descriptions[cat];

    for (let i = 0; i < productList.length; i++) {
      const product = productList[i];
      const slug = createProductSlug(product.name);
      let priceRange = 150 + (Math.random() * 800);

      if (cat === "jewelery") {
        priceRange = 300 + (Math.random() * 2500);
      } else if (cat === "electronics") {
        priceRange = 400 + (Math.random() * 3500);
      } else if (cat === "women's clothing" || cat === "men's clothing") {
        priceRange = 200 + (Math.random() * 1200);
      }

      const shortDesc = `${product.variant} ${descList[i % descList.length]}. Premium quality at exceptional value.`;
      const fullDesc = `${product.name}. Engineered for ${product.color.toLowerCase()} finish. Features premium craftsmanship, durable materials, and exceptional design suitable for discerning customers.`;

      const mockProduct = {
        id: `${slug}-${i + 1}`,
        slug: slug,
        title: product.name,
        name: product.name,
        shortDescription: shortDesc,
        price: priceRange.toFixed(2),
        description: fullDesc,
        category: cat,
        image: `https://loremflickr.com/800/800/${product.img}/all?lock=${i * 23 + cat.charCodeAt(0) * 100}`,
        rating: {
          rate: (Math.random() * 1.8 + 3.4).toFixed(1),
          count: Math.floor(Math.random() * 500) + 30
        },
        stock: Math.floor(Math.random() * 60) + 8,
        newArrival: i % 5 === 0,
        tags: i % 3 === 0 ? ["premium", "featured"] : i % 2 === 0 ? ["bestseller"] : ["popular"],
        badge: i % 7 === 0 ? "New" : i % 13 === 0 ? "Lab Edition" : null
      };

      categoryProducts.push(mockProduct);
      globalIndex++;
    }

    productsByCategory[cat] = categoryProducts;
  }

  const allProducts = [
    ...productsByCategory.electronics,
    ...productsByCategory.jewelery,
    ...productsByCategory["men's clothing"],
    ...productsByCategory["women's clothing"]
  ];

  // Apply collection assignments
  return allProducts.map((p, idx) => {
    const isLab = idx % 15 === 0;
    const isTactical = idx % 4 === 0;

    return {
      ...p,
      collection: isLab ? "The Lab" : isTactical ? "Tactical Gears" : "Archive",
      subcategory: p.category
    };
  });
};
