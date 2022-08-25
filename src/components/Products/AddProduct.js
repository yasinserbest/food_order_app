import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import "./AddProduct.scss";
import useInput from "../../hooks/useInput";

const isNotEmpty = (value) => value.trim() !== "";
const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);
  const {
    value: descValue,
    isValid: descIsValid,
    hasError: descHasError,
    valueChangeHandler: descChangeHandler,
    inputBlurHandler: descBlurHandler,
    reset: resetDesc,
  } = useInput(isNotEmpty);
  const {
    value: optionalIngredientsValue,
    valueChangeHandler: optionalIngredientsChangeHandler,
    reset: resetOptionalIngredients,
  } = useInput(isNotEmpty);
  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput(isNotEmpty);
  const {
    value: categoryValue,
    isValid: categoryIsValid,
    hasError: categoryHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetCategory,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (nameIsValid && descIsValid && priceIsValid && categoryIsValid) {
    formIsValid = true;
  }

  async function addProduct(product, category) {
    const response = await fetch(
      `https://troy-restaurant-default-rtdb.firebaseio.com/products/${category}.json`,
      {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const product = {
      name: nameValue,
      desc: descValue,
      id: Date.now(),
      optionalIngredients: optionalIngredientsValue,
      price: Number(priceValue),
      img: image.name,
    };

    addProduct(product, categoryValue);

    resetName();
    resetDesc();
    resetOptionalIngredients();
    resetPrice();
    resetCategory();
    setImage(null);
    setPreview(null);
  };

  const nameClasses = nameHasError
    ? "addProduct__form--item invalid"
    : "addProduct__form--item";
  const descClasses = descHasError
    ? "addProduct__form--item invalid"
    : "addProduct__form--item";
  const priceClasses = priceHasError ? "invalid" : "";
  const categoryClasses = categoryHasError ? "invalid" : "";

  return (
    <section className="addProduct">
      <div className="addProduct__title heading--secondary">
        Add New Product
      </div>
      <form className="addProduct__form" onSubmit={submitHandler}>
        <div className={nameClasses}>
          <label htmlFor="name" className="addProduct__form--item-label">
            Products Name
          </label>
          <input
            type="text"
            id="name"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            className="addProduct__form--item-input"
            placeholder="Chicken Wrap"
            multiline="true"
          />
          {nameHasError && (
            <p className="error__text--input">Please enter a first name</p>
          )}
        </div>
        <div className={descClasses}>
          <label htmlFor="desc" className="addProduct__form--item-label">
            Product Description
          </label>
          <input
            type="text"
            id="desc"
            value={descValue}
            onChange={descChangeHandler}
            onBlur={descBlurHandler}
            className="addProduct__form--item-input"
            placeholder="Permasan pasta with chikcken inside"
            multiline="true"
          />
          {descHasError && (
            <p className="error__text--input">Please enter description.</p>
          )}
        </div>
        <div className="addProduct__form--item ">
          <label htmlFor="desc" className="addProduct__form--item-label">
            Product's choosable ingredients
          </label>
          <input
            type="text"
            id="desc"
            value={optionalIngredientsValue}
            onChange={optionalIngredientsChangeHandler}
            className="addProduct__form--item-input"
            placeholder="mushroom olive extra-hot"
            multiline="true"
          />
        </div>
        <div className="addProduct__form--items">
          <div className={priceClasses}>
            <label htmlFor="desc" className="addProduct__form--item-labelGroup">
              Price
            </label>
            <input
              type="number"
              id="desc"
              value={priceValue}
              onChange={priceChangeHandler}
              onBlur={priceBlurHandler}
              className="addProduct__form--item-input"
              placeholder="$$"
              multiline="true"
            />
            {priceHasError && (
              <p className="error__text--input">Please enter price.</p>
            )}
          </div>
          <div className={categoryClasses}>
            <label
              htmlFor="category"
              className="addProduct__form--item-labelGroup"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              value={categoryValue}
              onChange={categoryChangeHandler}
              onBlur={categoryBlurHandler}
              className="addProduct__form--item-input"
              placeholder="Chicken"
              multiline="true"
            />
            {categoryHasError && (
              <p className="error__text--input">Please enter category.</p>
            )}
          </div>
          <div>
            <label htmlFor="desc" className="addProduct__form--item-labelGroup">
              Brand
            </label>
            <input className="addProduct__form--item-input"></input>
          </div>
        </div>

        <div className="addProduct__form--image">
          {preview ? (
            <div className="addProduct__form--image-filledImageContainer">
              <img
                className="addProduct__form--image-filledImageContainer-img"
                src={preview}
              />
              <button
                className="addProduct__form--image-filledImageContainer-btn"
                onClick={() => {
                  setImage(null);
                }}
              >
                <MdDelete />
              </button>
            </div>
          ) : (
            <div
              className="addProduct__form--image-emptyImageContainer"
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            >
              <MdCloudUpload />
              <div>Click here to upload</div>
            </div>
          )}
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files[0];
              if (file && file.type.substr(0, 5) === "image") {
                setImage(file);
                console.log(file);
              }
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!formIsValid}
          className="addProduct__btn click"
        >
          SAVE
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
