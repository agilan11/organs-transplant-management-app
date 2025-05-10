import React, { Fragment, useContext, useRef } from "react";
import ProductCategoryDropdown from "./ProductCategoryDropdown";
import { HomeContext } from "./index";
import coverPic from './cover_pic_1.jpg';
import { FiChevronDown } from "react-icons/fi";

const ProductCategory = () => {
  const { data, dispatch } = useContext(HomeContext);
  const categoryRef = useRef(null);

  const handleExploreClick = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Fragment>
      {/* Landing Section */}
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${coverPic})` }}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white/10 border border-white/30 rounded-xl p-10 max-w-xl text-white text-center shadow-lg backdrop-blur-lg">
  <h1 className="text-4xl font-bold mb-4">Welcome to OrgaNova</h1>
  <p className="text-lg mb-6">Empowering organ transplant management.</p>
  
  <button
    onClick={handleExploreClick}
    className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-lg text-black hover:bg-gray-100 transition"
  >
    Explore
  </button>
</div>

        </div>
      </div>

      {/* Categories Section */}
      <div ref={categoryRef} className="my-4 px-4 md:px-8">
  <div className="flex items-center space-x-2 mb-4">
    <span className="w-10 h-1 bg-blue-500 rounded-full"></span> {/* Decorative line */}
    <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
  </div>
  <ProductCategoryDropdown />
</div>

    </Fragment>
  );
};

export default ProductCategory;
