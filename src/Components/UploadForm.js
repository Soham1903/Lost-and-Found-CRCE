import React, { useState } from "react";
import "../UploadForm.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function UploadForm() {
  const [itemName, setItemName] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemContact, setItemContact] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("description", itemDescription);
    formData.append("location", itemLocation);
    formData.append("contact", itemContact);
    formData.append("image", selectedImage); // selectedImage should be a File object

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setAlert({
          show: true,
          message: "Item uploaded successfully!",
          type: "success",
        });
      } else {
        const errorData = await response.json();
        setAlert({
          show: true,
          message: `Error uploading item: ${errorData.error}`,
          type: "danger",
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to upload item. Please try again.",
        type: "danger",
      });
      console.error("Failed to fetch:", error);
    }
  };

  return (
    <div className="upload-form-container">
      <div className="upload-form">
        {alert.show && (
          <div
            className={`alert alert-${alert.type} alert-visible`}
            role="alert"
          >
            {alert.message}
          </div>
        )}
        <h2>Upload Item</h2>
        <input
          type="text"
          placeholder="Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={itemLocation}
          onChange={(e) => setItemLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        <PhoneInput
          className="number"
          country={"in"}
          value={itemContact}
          onChange={(phone) => setItemContact(phone)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default UploadForm;
