import { useEffect, useState } from 'react';
import { Plus, Edit, AlertTriangle, PackagePlus, PackageMinus, X } from 'lucide-react';
import { inventoryApi, productApi } from '../services/api';
import type { Inventory, Product } from '../types';

const Inventory = () => {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingInventory, setEditingInventory] = useState<Inventory | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | ''>('');
  const [formData, setFormData] = useState({
    stockLevel: '',
    location: '',
    reorderLevel: '',
  });

  useEffect(() => {
    fetchInventory();
    fetchProducts();
  }, []);

  const fetchInventory = async () => {
    try {
      setError(null);
      const response = await inventoryApi.getAll();
      setInventory(response.data);
    } catch (error: any) {
      console.error('Error fetching inventory:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to fetch inventory. Please check if the backend is running and VITE_API_URL is configured.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setError(null);
      const response = await productApi.getAll();
      setProducts(response.data);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to fetch products. Please check if the backend is running and VITE_API_URL is configured.';
      setError(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const inventoryData: Partial<Inventory> = {
        stockLevel: Number(formData.stockLevel),
        location: formData.location || undefined,
        reorderLevel: Number(formData.reorderLevel) || 10,
      };

      if (editingInventory?.id) {
        await inventoryApi.update(editingInventory.id, inventoryData);
      } else {
        if (!selectedProductId) {
          alert('Please select a product');
          return;
        }
        await inventoryApi.create(Number(selectedProductId), inventoryData);
      }

      setShowModal(false);
      resetForm();
      fetchInventory();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data || 'Error saving inventory';
      alert(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    }
  };

  const handleEdit = (item: Inventory) => {
    setEditingInventory(item);
    setFormData({
      stockLevel: item.stockLevel.toString(),
      location: item.location || '',
      reorderLevel: item.reorderLevel.toString(),
    });
    setSelectedProductId(item.product.id || '');
    setShowModal(true);
  };

  const handleAddStock = async (id: number, quantity: number) => {
    if (quantity <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }
    try {
      await inventoryApi.addStock(id, quantity);
      fetchInventory();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data || 'Error updating stock';
      alert(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    }
  };

  const handleRemoveStock = async (id: number, quantity: number) => {
    if (quantity <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }
    try {
      await inventoryApi.removeStock(id, quantity);
      fetchInventory();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data || 'Error updating stock';
      alert(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    }
  };

  const resetForm = () => {
    setFormData({
      stockLevel: '',
      location: '',
      reorderLevel: '10',
    });
    setSelectedProductId('');
    setEditingInventory(null);
  };

  const isLowStock = (item: Inventory) => item.stockLevel <= item.reorderLevel;
  const productsWithoutInventory = products.filter(
    (product) => !inventory.some((inv) => inv.product.id === product.id)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">Error: {error}</p>
          <p className="text-sm text-red-600 mt-1">
            Make sure VITE_API_URL is set in Vercel environment variables pointing to your backend URL.
          </p>
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Inventory
        </button>
      </div>

      {/* Inventory Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3">Product</th>
              <th className="pb-3">SKU</th>
              <th className="pb-3">Stock Level</th>
              <th className="pb-3">Reorder Level</th>
              <th className="pb-3">Location</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No inventory items found
                </td>
              </tr>
            ) : (
              inventory.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b hover:bg-gray-50 ${
                    isLowStock(item) ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="py-3 font-medium">{item.product.name}</td>
                  <td className="py-3 text-gray-600">{item.product.sku}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        isLowStock(item)
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {item.stockLevel}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600">{item.reorderLevel}</td>
                  <td className="py-3 text-gray-600">{item.location || 'N/A'}</td>
                  <td className="py-3">
                    {isLowStock(item) ? (
                      <span className="flex items-center text-red-600 text-sm">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Low Stock
                      </span>
                    ) : (
                      <span className="text-green-600 text-sm">In Stock</span>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const quantity = prompt('Enter quantity to add:');
                          if (quantity && item.id) {
                            handleAddStock(item.id, Number(quantity));
                          }
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                        title="Add Stock"
                      >
                        <PackagePlus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const quantity = prompt('Enter quantity to remove:');
                          if (quantity && item.id) {
                            handleRemoveStock(item.id, Number(quantity));
                          }
                        }}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded"
                        title="Remove Stock"
                      >
                        <PackageMinus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Products without inventory */}
      {productsWithoutInventory.length > 0 && (
        <div className="card mt-6">
          <h2 className="text-xl font-semibold mb-4">Products Without Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productsWithoutInventory.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
              >
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
                <button
                  onClick={() => {
                    setSelectedProductId(product.id || '');
                    setFormData({
                      stockLevel: '0',
                      location: '',
                      reorderLevel: '10',
                    });
                    setShowModal(true);
                  }}
                  className="btn btn-primary text-sm py-1"
                >
                  Add Inventory
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingInventory ? 'Edit Inventory' : 'Add Inventory'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!editingInventory && (
                <div>
                  <label className="label">Product *</label>
                  <select
                    required
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(Number(e.target.value))}
                    className="input"
                  >
                    <option value="">Select a product</option>
                    {productsWithoutInventory.length > 0 ? (
                      productsWithoutInventory.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} ({product.sku})
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No products available (all have inventory)</option>
                    )}
                  </select>
                  {productsWithoutInventory.length === 0 && (
                    <p className="text-sm text-gray-500 mt-1">All products already have inventory records.</p>
                  )}
                </div>
              )}

              <div>
                <label className="label">Stock Level *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stockLevel}
                  onChange={(e) => setFormData({ ...formData, stockLevel: e.target.value })}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Reorder Level *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.reorderLevel}
                  onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingInventory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
