import React, { useMemo } from 'react';
import { Star } from 'lucide-react';

interface ProductTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  product: {
    description: string;
    rating: number;
  };
  specifications: Record<string, Record<string, string>>;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  activeTab,
  onTabChange,
  product,
  specifications,
}) => {
  return (
    <div className="border-t">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap gap-4 border-b">
          {["description", "specifications", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`pb-2 sm:pb-4 text-sm font-medium capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4 sm:mt-6">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="space-y-6">
              {Object.entries(specifications).map(([category, specs]) => (
                <div key={category}>
                  <h4 className="font-medium text-gray-900 mb-4">{category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(specs).map(([key, value]) => (
                      <div key={key} className="flex py-2 border-b">
                        <span className="w-1/2 text-gray-600">{key}</span>
                        <span className="w-1/2 text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-gray-900">
                    {product.rating}
                  </div>
                  <div className="text-sm text-gray-500">out of 5</div>
                </div>
                <div className="flex-1 w-full">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const ratingWidth = useMemo(() => `${Math.random() * 100}%`, []);
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{star}</span>
                        <Star className="w-4 h-4 text-yellow-400" />
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: ratingWidth }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
