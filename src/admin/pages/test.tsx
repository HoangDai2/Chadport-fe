import React, { useState } from "react";

function AddNewProduct() {
  const [thumbnails, setThumbnails] = useState([]);

  // Function to handle the main upload button
  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnails([...thumbnails, url]);
    }
  };

  const [activeSize, setActiveSize] = useState(null);

  const handleSizeClick = (size) => {
    setActiveSize(size);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* General Information */}
        <div className="p-6 bg-white rounded-lg  text-left">
          <h2 className="text-lg font-semibold mb-5 text-gray-800">
            General Information
          </h2>

          {/* Name Product */}
          <div className="mb-5">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Name Product
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
              placeholder="Puffer Jacket With Pocket Detail"
            />
          </div>

          {/* Description Product */}
          <div className="mb-5">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Description Product
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
              rows={4}
              placeholder="Cropped puffer jacket made of technical fabric. High neck and long sleeves. Flap pocket at the chest and in-seam side pockets at the hip. Inside pocket detail. Hem with elastic interior. Zip-up front."
            ></textarea>
          </div>

          {/* Size  */}
          <div className="flex items-start justify-between space-x-6">
            {/* Size Section */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Size
              </label>
              <p className="text-gray-400 text-xs mb-2">Pick Available Size</p>
              <div className="flex space-x-2">
                {["XS", "S", "M", "XL", "XXL"].map((size, index) => (
                  <button
                    key={index}
                    onClick={() => handleSizeClick(size)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium cursor-pointer ${
                      activeSize === size
                        ? "bg-black text-white border-green-500"
                        : "bg-gray-100 text-gray-600 border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upload Image */}
        <div className="p-6 bg-white rounded-lg  text-left">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Upload Img
          </h2>

          {/* Main Image Display */}
          <div className="mb-4">
            <div className="w-full  bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src={thumbnails[0] || "https://via.placeholder.com/300"}
                alt="product"
                className="object-cover h-full rounded-lg"
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2">
            {thumbnails.slice(1).map((src, index) => (
              <div
                key={index}
                className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden"
              >
                <img
                  src={src}
                  alt={`thumbnail-${index}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}

            {/* Add Image Button */}
            {thumbnails.length < 4 && (
              <label className="w-16 h-16 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-400 cursor-pointer">
                +
                <input
                  type="file"
                  className="absolute  opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleAddImage}
                />
              </label>
            )}
          </div>
        </div>

        {/* Pricing And Stock */}
        <div className="p-6 bg-white rounded-lg  text-left">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Pricing And Stock
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Base Pricing
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                placeholder="$47.55"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Stock
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                placeholder="77"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Discount
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                placeholder="10%"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Discount Type
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                placeholder="Chinese New Year Discount"
              />
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="p-6 bg-white rounded-lg  text-left">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Category</h2>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Product Category
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
              placeholder="Jacket"
            />
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded-lg text-sm font-medium">
            Add Category
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-4 right-4 space-x-4 flex">
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
          Save Draft
        </button>
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium">
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddNewProduct;
