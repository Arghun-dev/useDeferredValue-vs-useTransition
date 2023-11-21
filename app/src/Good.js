import { useMemo, useState, useTransition } from "react";

import { generateProducts } from "./data";
import { ProductList } from "./ProductList";

const dummyProducts = generateProducts();

function filterProducts(filterTerm) {
  if (!filterTerm) {
    return dummyProducts;
  }
  return dummyProducts.filter((product) => product.includes(filterTerm));
}

export function Good() {
  const [isPending, startTransition] = useTransition();
  const [filterTerm, setFilterTerm] = useState("");

  const filteredProducts = useMemo(
    () => filterProducts(filterTerm),
    [filterTerm]
  );

  const handleInputChange = (event) => {
    startTransition(() => {
      setFilterTerm(event.target.value);
    });
  };

  return (
    <div>
      <input value={filterTerm} onChange={handleInputChange} />
      <ProductList list={filteredProducts} />
    </div>
  );
}
