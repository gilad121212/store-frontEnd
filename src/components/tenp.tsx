import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type product = {
            "_id": string
            "id": number,
            "title": string
            "price": number,
            "description": string
            "images": [
                string, string, string
            ],
            "creationAt": string,
            "updatedAt": string,
            "category": {
                "id": number,
                "name": string,
                "image": string
                "creationAt": string
                "updatedAt":string
            },
            "Stock": number,
            "Views": number
  };


export default function Products() {
  const { name } = useParams();
  const [products, setProducts] = useState<Record<"data", product[]> | null>(null);

  useEffect(() => {
    console.log(name);
    
    fetch(`http://127.0.0.1:3000/products/products/${name}`)
      .then((response) => response.json())
      .then((result) => setProducts(result))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="page">
        {products?.data.map((product) => (
        <div key={product.id.toString()}>{product.title}</div>
      ))}
    </div>
  );
}
