export function ProductList({ list }) {
  return list.map((product) => (
    <div
      key={product}
      style={{ borderBottom: "1px solid #ccc", marginBottom: 8 }}
    >
      {product}
    </div>
  ));
}
