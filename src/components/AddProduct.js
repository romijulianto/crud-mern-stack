import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
/* initiate useState here */
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  /* create function to catch file for preview */
  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image)); // set preview wit url object from react
  };

  const saveProduct = async (e) => {
    e.preventDefault(); // function to prevent reload page after saveProduct
      const formData = new FormData();
    // formData to compare with backend ("key", value)
    formData.append("file", file);
    formData.append("title", title);
    try {
      await axios.post("http://localhost:4000/products", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/"); // if complete redirect to home using funtion navigate from react
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={saveProduct}>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Name"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    /* create function to catch file for preview */
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview ? ( // setPreview using ternary operator
            <figure className="image is-128x128">
              <img src={preview} alt="Preview" />
            </figure>
          ) : ( // if image null, not rendered
            ""
          )}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;