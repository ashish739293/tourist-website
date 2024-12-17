import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { BASE_URL } from "../utils/config";
import "../styles/ManageTours.css";

const ManageTours = () => {
  const [tours, setTours] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    photo: "", // Changed to hold the photo URL
    desc: "",
    price: "",
    maxGroupSize: "",
    featured: false,
  });
  const user = localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null;

  // Fetch Tours Data
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tours`);
        const data = await response.json();
        setTours(data.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, []);

  // Toggle Modal and Reset Form
  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (!modalOpen) {
      setFormData({
        title: "",
        city: "",
        address: "",
        distance: "",
        photo: "", // Reset photo URL field
        desc: "",
        price: "",
        maxGroupSize: "",
        featured: false,
      });
    }
  };

  // Handle Form Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle Add/Edit Tour
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = formData._id ? "PUT" : "POST";
    const url = formData._id
      ? `${BASE_URL}/tours/${formData._id}`
      : `${BASE_URL}/tours`;

    const jsonPayload = {
      title: formData.title,
      city: formData.city,
      address: formData.address,
      distance: formData.distance,
      photo: formData.photo, // Sending the URL of the photo
      desc: formData.desc,
      price: formData.price,
      maxGroupSize: formData.maxGroupSize,
      featured: formData.featured,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json", // Sending JSON
        },
        body: JSON.stringify(jsonPayload), // Sending data as JSON
      });
      const result = await response.json();

      if (formData._id) {
        setTours(tours.map((tour) => (tour._id === formData._id ? result.data : tour)));
      } else {
        console.log(result)
        setTours([...tours, result]);
      }

      toggleModal();
    } catch (error) {
      console.error("Error saving tour:", error);
    }
  };

  // Handle Delete Tour
  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/tours/${id}`, { method: "DELETE" });
      setTours(tours.filter((tour) => tour._id !== id));
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  return (
    <div className="manage-tours-container">
      <h3 className="page-title">Manage Tours</h3>
      <div className="action-bar">
        <Button color="primary" onClick={toggleModal}>
          + Add Tour
        </Button>
      </div>

      {/* Cards for Tours */}
      <div className="card-container">
        {tours.map((tour) => (
          <Card key={tour._id} className="tour-card">
            {tour.photo && <CardImg top width="100%" src={tour.photo} alt={tour.title} />}
            <CardBody>
              <CardTitle tag="h5">{tour.title}</CardTitle>
              <CardText>
                <strong>City:</strong> {tour.city}
              </CardText>
              <CardText>
                <strong>Price:</strong> ${tour.price}
              </CardText>
              <CardText>
                <strong>Distance:</strong> {tour.distance} km
              </CardText>
              <CardText>
                <strong>Description:</strong> {tour.desc}
              </CardText>
              <CardText>
                <strong>Max Group Size:</strong> {tour.maxGroupSize}
              </CardText>
              <div className="card-actions">
                <Button
                  color="warning"
                  size="sm"
                  style={{marginRight:"20px"}}
                  onClick={() => {
                    setFormData(tour);
                    setModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(tour._id)}
                >
                  Delete
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {formData._id ? "Edit Tour" : "Add Tour"}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="distance">Distance (km)</Label>
              <Input
                type="number"
                name="distance"
                id="distance"
                value={formData.distance}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="photo">Photo URL</Label>
              <Input
                type="text"
                name="photo"
                id="photo"
                value={formData.photo}
                onChange={handleChange}
                placeholder="Enter photo URL"
              />
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description</Label>
              <Input
                type="textarea"
                name="desc"
                id="desc"
                value={formData.desc}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="maxGroupSize">Max Group Size</Label>
              <Input
                type="number"
                name="maxGroupSize"
                id="maxGroupSize"
                value={formData.maxGroupSize}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                Featured
              </Label>
            </FormGroup>
            <Button type="submit" color="success" block>
              {formData._id ? "Update Tour" : "Add Tour"}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ManageTours;
