import React, { useState } from "react";
import { addRoom } from "../utils/API";

function AddRoom() {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value.parseInt(value);
      } else {
        value = "";
      }
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice
      );
      if (success !== undefined) {
        setSuccessMessage("Room added successfully");
        // Reset the form and error messages
        setNewRoom({
          photo: null,
          roomType: "",
          roomPrice: "",
        });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Unable to add room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <section className="container, mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Add a New Room</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="roomType">
                  Room Type
                </label>
                <div></div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="roomPrice">
                  Room Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  required
                  id="roomPrice"
                  name="roomPrice"
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="photo">
                  Room Photo
                </label>
                <input
                  type="file"
                  className="form-control"
                  required
                  id="photo"
                  name="photo"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview Room Photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  />
                )}
              </div>
              <div className="d-grid d-md-flex mt-2">
                <button className="btn btn-outline-primary ml-5">
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddRoom;
