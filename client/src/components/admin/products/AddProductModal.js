import React, { Fragment, useContext, useState, useEffect } from "react";
import { ProductContext } from "./index";
import { createProduct, getAllProduct } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";

const AddProductDetail = ({ categories }) => {
  const { data, dispatch } = useContext(ProductContext);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fData, setFdata] = useState({
    pName: "",
    pDescription: "",
    pStatus: "Active",
    pImage: null,
    pCategory: "",
    pPrice: "",
    pOffer: 0,
    pQuantity: "",
    success: false,
    error: false,
  });

  const fetchData = async () => {
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
      }
    }, 1000);
  };

  const validateFields = () => {
    const { pName, pDescription, pImage, pCategory, pPrice, pQuantity } = fData;

    if (!pName.trim()) return "Time Window can't be empty";
    if (!/^\d+(\.\d+)?$/.test(pName)) return "Time Window must be a valid number (in hours)";
    if (!pPrice.trim()) return "PIN Code can't be empty";
    if (!pDescription.trim()) return "Organ Description can't be empty";
    if (!pCategory.trim()) return "Organ Category can't be empty";
    if (!pQuantity.trim()) return "Units Available can't be empty";
    if (!pImage || pImage.length < 2) return "Please upload at least 2 images";

    return null;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const errorMsg = validateFields();
    if (errorMsg) {
      setFdata({ ...fData, error: errorMsg });
      setTimeout(() => {
        setFdata((prev) => ({ ...prev, error: false }));
      }, 2000);
      return;
    }

    setIsSubmitting(true);
    try {
      let responseData = await createProduct(fData);
      if (responseData.success) {
        fetchData();
        setFdata({
          pName: "",
          pDescription: "",
          pImage: null,
          pStatus: "Active",
          pCategory: "",
          pPrice: "",
          pQuantity: "",
          pOffer: 0,
          success: responseData.success,
          error: false,
        });
        setTimeout(() => {
          setFdata((prev) => ({
            ...prev,
            success: false,
            error: false,
          }));
        }, 2000);
      } else {
        setFdata({ ...fData, success: false, error: responseData.error });
        setTimeout(() => {
          setFdata((prev) => ({ ...prev, error: false, success: false }));
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      <div
        onClick={() => dispatch({ type: "addProductModal", payload: false })}
        className={`${
          data.addProductModal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      <div
        className={`${
          data.addProductModal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Organ
            </span>
            <span
              style={{ background: "#303031" }}
              onClick={() =>
                dispatch({ type: "addProductModal", payload: false })
              }
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {fData.error ? alert(fData.error, "red") : ""}
          {fData.success ? alert("Organ added successfully!", "green") : ""}
          <form className="w-full" onSubmit={submitForm}>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="name">Availability Duration (in hours) </label>
                <input
                  value={fData.pName}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pName: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                  placeholder="e.g. 5, 3.5"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="category">Organ Type </label>
                <select
                  value={fData.pCategory}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pCategory: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories.length > 0 &&
                    categories.map((elem) => (
                      <option value={elem._id} key={elem._id}>
                        {elem.cName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="quantity">Number of Units</label>
                <input
                  value={fData.pQuantity}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pQuantity: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="price">ZIP Code</label>
                <input
                  value={fData.pPrice}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pPrice: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="description">Detailed Organ Info</label>
              <textarea
                value={fData.pDescription}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pDescription: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                rows={2}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="image">	Upload Organ Photos</label>
              <span className="text-gray-600 text-xs">Must upload at least 2 images</span>
              <input
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pImage: [...e.target.files],
                  })
                }
                type="file"
                accept=".jpg, .jpeg, .png"
                className="px-4 py-2 border focus:outline-none"
                multiple
              />
            </div>
            <div className="flex flex-col py-4">
              <label htmlFor="status">Availability Status</label>
              <select
                value={fData.pStatus}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pStatus: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                disabled={isSubmitting}
                style={{ background: "#303031" }}
                type="submit"
                className={`rounded-full text-gray-100 text-lg font-medium py-2 ${
                  isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-gray-800"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Add Organ"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const AddProductModal = () => {
  const [allCat, setAllCat] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      let responseData = await getAllCategory();
      if (responseData.Categories) {
        setAllCat(responseData.Categories);
      }
    };
    fetchCategoryData();
  }, []);

  return (
    <Fragment>
      <AddProductDetail categories={allCat} />
    </Fragment>
  );
};

export default AddProductModal;
