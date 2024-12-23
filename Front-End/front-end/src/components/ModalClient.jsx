import React, { useState, useEffect } from 'react';
import '../style/ModalClient.css'; // Import the corresponding styles for the modal

const UpdateClientModal = ({ isOpen, onClose, client, onUpdate }) => {
    const [updatedClient, setUpdatedClient] = useState({
        id: '',
        name: '',
        username: '',
        phone: '',
        email: '',
    });

    useEffect(() => {
        if (client) {
            setUpdatedClient(client); // Set the selected client data to be edited
        }
    }, [client]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedClient((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (onUpdate) {
            onUpdate(updatedClient); // Pass the updated client data back to the parent
        }
        onClose(); // Close the modal after submission
    };

    if (!isOpen) return null; // Do not render the modal if it's not open

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Update Client</h3>
                    <button className="close-button" onClick={onClose}>
                        ×
                    </button>
                </div>
                <form onSubmit={handleUpdateSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={updatedClient.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={updatedClient.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                value={updatedClient.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={updatedClient.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="submit-button">
                            Update
                        </button>
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateClientModal;
