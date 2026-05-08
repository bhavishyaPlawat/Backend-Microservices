import FormField from "./FormField";

function ProductForm({ form, saving, message, onChange, onSubmit }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="rounded-lg bg-gradient-to-br from-teal-600 to-emerald-500 p-4 text-white">
        <p className="text-sm font-medium text-teal-50">New item</p>
        <h2 className="mt-1 text-2xl font-bold">Upload Product</h2>
      </div>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <FormField
          label="Image URL"
          name="image"
          value={form.image}
          onChange={onChange}
          placeholder="https://example.com/product.jpg"
        />

        <FormField
          label="Product Title"
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Wireless headphones"
          required
        />

        <div className="grid grid-cols-[1fr_110px] gap-3">
          <FormField
            label="Price"
            name="amount"
            type="number"
            min="0"
            value={form.amount}
            onChange={onChange}
            placeholder="1299"
            required
          />

          <FormField label="Currency">
            <select
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
              name="currency"
              value={form.currency}
              onChange={onChange}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </FormField>
        </div>

        <FormField
          label="Category"
          name="category"
          value={form.category}
          onChange={onChange}
          placeholder="Electronics"
        />

        <FormField label="Description">
          <textarea
            className="mt-2 min-h-28 w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Add a short product description"
          />
        </FormField>

        <button
          className="w-full rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          type="submit"
          disabled={saving}
        >
          {saving ? "Uploading..." : "Upload Product"}
        </button>
      </form>

      {message && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">
          {message}
        </p>
      )}
    </section>
  );
}

export default ProductForm;
