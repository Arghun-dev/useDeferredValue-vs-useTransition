import { useMemo, useState } from "react";

import { generateProducts } from "./data";
import { ProductList } from "./ProductList";

const dummyProducts = generateProducts();

function filterProducts(filterTerm) {
  if (!filterTerm) {
    return dummyProducts;
  }
  return dummyProducts.filter((product) => product.includes(filterTerm));
}

export function Bad() {
  const [filterTerm, setFilterTerm] = useState("");

  const filteredProducts = useMemo(
    () => filterProducts(filterTerm),
    [filterTerm]
  );

  return (
    <div>
      <input
        value={filterTerm}
        onChange={(event) => setFilterTerm(event.target.value)}
      />
      <ProductList list={filteredProducts} />
    </div>
  );
}
