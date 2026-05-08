import ProductCard from "./ProductCard";

function ProductList({ products, loading, onRefresh, onBuy }) {
  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Catalog
          </p>
          <h2 className="text-2xl font-bold text-slate-950">Old Products</h2>
        </div>

        <button
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-800 shadow-sm transition hover:border-teal-300 hover:bg-teal-50 disabled:cursor-not-allowed disabled:text-slate-400"
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch Products"}
        </button>
      </div>

      {products.length === 0 && !loading ? (
        <div className="rounded-lg border border-dashed border-teal-300 bg-white/80 p-10 text-center">
          <p className="text-lg font-bold text-slate-900">No products found</p>
          <p className="mt-1 text-sm text-slate-500">
            Upload your first product from the form.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product._id}
              onBuy={onBuy}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
