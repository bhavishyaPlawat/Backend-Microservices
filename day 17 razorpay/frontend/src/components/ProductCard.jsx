import PaymentButton from "./PaymentButton";

function ProductCard({ product, onBuy }) {
  const currency = product.price?.currency || product.price?.curreny || "INR";
  const amount = product.price?.amount ?? 0;

  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">
      {product.image ? (
        <img
          className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
          src={product.image}
          alt={product.title}
        />
      ) : (
        <div className="flex h-44 items-center justify-center bg-gradient-to-br from-slate-100 to-teal-50 text-sm font-medium text-slate-400">
          No image
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-6 text-slate-950">
            {product.title}
          </h3>
          <p className="shrink-0 rounded-md bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-700">
            {currency} {amount}
          </p>
        </div>

        {product.category && (
          <p className="mt-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800">
            {product.category}
          </p>
        )}

        {product.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
            {product.description}
          </p>
        )}

        <PaymentButton productId={amount} />
      </div>
    </article>
  );
}

export default ProductCard;
