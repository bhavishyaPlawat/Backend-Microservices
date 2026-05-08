function AppHeader({ productCount }) {
  return (
    <header className="mb-8 flex flex-col gap-5 rounded-lg border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Product Studio
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950">
          Manage your products
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Add a new product and instantly refresh the catalog from your Express
          API.
        </p>
      </div>

      <div className="grid w-full grid-cols-2 gap-3 sm:w-auto">
        <div className="rounded-lg bg-teal-600 px-4 py-3 text-white shadow-sm">
          <p className="text-2xl font-bold">{productCount}</p>
          <p className="text-xs font-medium text-teal-50">Products</p>
        </div>
        <div className="rounded-lg bg-amber-400 px-4 py-3 text-slate-950 shadow-sm">
          <p className="text-2xl font-bold">API</p>
          <p className="text-xs font-semibold">Connected</p>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
