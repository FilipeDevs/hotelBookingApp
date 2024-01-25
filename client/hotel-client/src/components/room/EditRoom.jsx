import { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/API";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function EditRoom() {
  const { roomId } = useParams();
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleRoomInputChange = (e) => {
    let { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        // The image preview is a base64 encoded string on response from the server
        // so we need to prepend the correct header to render it
        setImagePreview(`data:image/jpeg;base64,${roomData.photo}`);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateRoom(roomId, room);
      if (response.status === 200) {
        setSuccessMessage("Room updated successfully!");
        const updatedRoomData = await getRoomById(roomId);
        setRoom(updatedRoomData);
        // The image preview is a base64 encoded string on response from the server
        // so we need to prepend the correct header to render it
        setImagePreview(`data:image/jpeg;base64,${updatedRoomData.photo}`);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <h3 className="text-center mb-5 mt-5">Edit Room</h3>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="roomType" className="form-label hotel-color">
                Room Type
              </Form.Label>
              <Form.Control
                type="text"
                id="roomType"
                name="roomType"
                value={room.roomType}
                onChange={handleRoomInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label
                htmlFor="roomPrice"
                className="form-label hotel-color"
              >
                Room Price
              </Form.Label>
              <Form.Control
                type="number"
                id="roomPrice"
                name="roomPrice"
                value={room.roomPrice}
                onChange={handleRoomInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label
                className="form-label hotel-color"
                htmlFor="description"
              >
                Room Description
              </Form.Label>
              <Form.Control
                as="textarea"
                required
                id="description"
                name="description"
                value={room.description}
                onChange={handleRoomInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="photo" className="form-label hotel-color">
                Photo
              </Form.Label>
              <Form.Control
                type="file"
                id="photo"
                name="photo"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Room preview"
                  style={{ maxWidth: "400px", maxHeight: "400" }}
                  className="mt-3"
                />
              )}
            </Form.Group>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <Link to="/existing-rooms" className="btn btn-info ml-5">
                Back
              </Link>
              <Button type="submit" className="btn btn-warning">
                Edit Room
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditRoom;
