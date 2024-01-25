import { useState } from "react";
import { addRoom } from "../utils/API";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function AddRoom() {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    let { name, value } = e.target;
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
        newRoom.roomPrice,
        newRoom.description
      );
      if (success !== undefined) {
        setSuccessMessage("Room added successfully");
        // Reset the form and error messages
        setNewRoom({
          photo: null,
          roomType: "",
          roomPrice: "",
          description: "",
        });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Unable to add room");
      }
    } catch (error) {
      setErrorMessage("Unable to add room");
    }

    // Clear the feedback messages after 5 seconds
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 5000);
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="mt-5 mb-2">Add a New Room</h2>
          {successMessage && (
            <div className="alert alert-success fade show">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="alert alert-danger fade show">{errorMessage}</div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="roomType">Room Type</Form.Label>
              <div>
                <RoomTypeSelector
                  handleRoomInputChange={handleRoomInputChange}
                  newRoom={newRoom}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="roomPrice">Room Price</Form.Label>
              <Form.Control
                type="number"
                required
                id="roomPrice"
                name="roomPrice"
                value={newRoom.roomPrice}
                onChange={handleRoomInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">Room Description</Form.Label>
              <Form.Control
                as="textarea"
                required
                id="description"
                name="description"
                value={newRoom.description}
                onChange={handleRoomInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="photo">Room Photo</Form.Label>
              <Form.Control
                type="file"
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
            </Form.Group>
            <div className="d-grid d-md-flex mt-2 gap-2">
              <Link to="/existing-rooms" className="btn btn-info">
                Back
              </Link>
              <Button type="submit" className="btn btn-primary ml-5">
                Save Room
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddRoom;
