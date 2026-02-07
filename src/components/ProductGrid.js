export default function ProductGrid({ results }) {
  return (
    <div className="products-grid">
      {results.map((p,i)=>(
        <div key={i} className="product-card">
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>Part #: {p.partNumber}</p>
          <p>{p.description}</p>
          <p>Price: {p.price}</p>
          <p>Category: {p.categoryName}</p>
        </div>
      ))}
    </div>
  );
}