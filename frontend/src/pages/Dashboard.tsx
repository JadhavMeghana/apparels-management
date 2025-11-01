import { useEffect, useState } from 'react';
import { Package, FolderTree, Warehouse, AlertTriangle } from 'lucide-react';
import { productApi, categoryApi, inventoryApi } from '../services/api';
import type { Product, Category, Inventory } from '../types';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalInventory: 0,
    lowStockItems: 0,
  });
  const [lowStockItems, setLowStockItems] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, inventoryRes, lowStockRes] = await Promise.all([
          productApi.getAll(),
          categoryApi.getAll(),
          inventoryApi.getAll(),
          inventoryApi.getLowStock(),
        ]);

        setStats({
          totalProducts: productsRes.data.length,
          totalCategories: categoriesRes.data.length,
          totalInventory: inventoryRes.data.reduce((sum, inv) => sum + inv.stockLevel, 0),
          lowStockItems: lowStockRes.data.length,
        });

        setLowStockItems(lowStockRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-blue-500' },
    { label: 'Categories', value: stats.totalCategories, icon: FolderTree, color: 'bg-green-500' },
    { label: 'Total Stock', value: stats.totalInventory, icon: Warehouse, color: 'bg-purple-500' },
    { label: 'Low Stock Items', value: stats.lowStockItems, icon: AlertTriangle, color: 'bg-red-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="card mb-8 border-l-4 border-red-500">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Low Stock Alert</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-2">Product</th>
                  <th className="pb-2">SKU</th>
                  <th className="pb-2">Current Stock</th>
                  <th className="pb-2">Reorder Level</th>
                  <th className="pb-2">Location</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{item.product.name}</td>
                    <td className="py-3 text-gray-600">{item.product.sku}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
                        {item.stockLevel}
                      </span>
                    </td>
                    <td className="py-3 text-gray-600">{item.reorderLevel}</td>
                    <td className="py-3 text-gray-600">{item.location || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
