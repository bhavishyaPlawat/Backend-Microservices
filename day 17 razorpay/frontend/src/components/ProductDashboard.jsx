import { useEffect, useState } from "react";
import { createProduct, getProducts, deleteProduct } from "../api/products";
import AppHeader from "./AppHeader";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const emptyForm = {
  image: "",
  title: "",
  amount: "",
  currency: "INR",
  description: "",
  category: "",
};

function ProductDashboard() {
  const [form, setForm] = useState(emptyForm);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function fetchProducts() {
    setLoading(true);
    setMessage("");

    try {
      const productList = await getProducts();
      setProducts(productList);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await createProduct({
        image: form.image,
        title: form.title,
        price: {
          amount: Number(form.amount),
          currency: form.currency,
        },
        description: form.description,
        category: form.category,
      });

      setForm(emptyForm);
      setMessage("Product uploaded successfully");
      await fetchProducts();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleBuy(product) {
    const currency = product.price?.currency || product.price?.curreny || "INR";
    const amount = product.price?.amount ?? 0;
    setMessage(`Selected ${product.title} for ${currency} ${amount}`);
  }

  async function handleDelete(productId) {
    try {
      await deleteProduct(productId);
      setMessage("Product deleted successfully");
      await fetchProducts();
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <AppHeader productCount={products.length} />

      <div className="grid gap-8 lg:grid-cols-[390px_1fr]">
        <ProductForm
          form={form}
          saving={saving}
          message={message}
          onChange={updateField}
          onSubmit={handleSubmit}
        />

        <ProductList
          products={products}
          loading={loading}
          onRefresh={fetchProducts}
          onBuy={handleBuy}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default ProductDashboard;
