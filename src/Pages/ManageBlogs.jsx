import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { BASE_URL } from "../utils/config";
import "../styles/ManageBlogs.css";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    photo: "",
    comments: [],
    featured: false,
  });
  const user = localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null;

  // Fetch Blogs Data
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Toggle Modal and Reset Form
  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (!modalOpen) {
      setFormData({
        title: "",
        content: "",
        author: "",
        photo: "",
        comments: [],
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

  // Handle Add/Edit Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = formData._id ? "PUT" : "POST";
    const url = formData._id
      ? `${BASE_URL}/blogs/${formData._id}`
      : `${BASE_URL}/blogs`;

    const jsonPayload = {
      title: formData.title,
      content: formData.content,
      author: formData.author,
      photo: formData.photo,
      comments: formData.comments,
      featured: formData.featured,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonPayload),
      });
      const result = await response.json();

      if (formData._id) {
        setBlogs(blogs.map((blog) => (blog._id === formData._id ? result : blog)));
      } else {
        setBlogs([...blogs, result]);
      }

      toggleModal();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  // Handle Delete Blog
  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/blogs/${id}`, { method: "DELETE" });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="manage-blogs-container">
      <h3 className="page-title">Manage Blogs</h3>
      <div className="action-bar">
        <Button color="primary" style={{marginRight:"50px"}} onClick={toggleModal}>
          + Add Blog
        </Button>
      </div>

      {/* Cards for Blogs */}
      <div className="card-container">
        {blogs.map((blog) => (
          <Card key={blog._id} className="blog-card">
            {blog.photo && <CardImg top width="100%" src={blog.photo} alt={blog.title} className="blog-image" />}
            <CardBody>
              <CardTitle tag="h5">{blog.title}</CardTitle>
              <CardText>
                <strong>Author:</strong> {blog.author}
              </CardText>
              <CardText>
                <strong>Content:</strong> {blog.content.length > 100 ? blog.content.substring(0, 100) + "..." : blog.content}
              </CardText>
              <CardText>
                <strong>Featured:</strong> {blog.featured ? "Yes" : "No"}
              </CardText>
              <div className="card-actions">
                <Button
                  color="warning"
                  size="sm"
                  style={{marginRight:"20px"}}
                  onClick={() => {
                    setFormData(blog);
                    setModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(blog._id)}
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
          {formData._id ? "Edit Blog" : "Add Blog"}
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
              <Label for="content">Content</Label>
              <Input
                type="textarea"
                name="content"
                id="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input
                type="text"
                name="author"
                id="author"
                value={formData.author}
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
              {formData._id ? "Update Blog" : "Add Blog"}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ManageBlogs;
