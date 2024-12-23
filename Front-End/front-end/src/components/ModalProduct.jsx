import React, { useState, useEffect } from 'react';
import '../style/ModalProduct.css';

const UpdateProductModal = ({ isOpen, onClose, product, onUpdate }) => {
    const [formData, setFormData] = useState({
        nom: '',
        marque: '',
        prix: '',
        qteStock: ''
    });

    const [errors, setErrors] = useState({}); // State to handle form validation errors

    // Update the form data when the product changes
    useEffect(() => {
        if (product) {
            setFormData({
                nom: product.nom || '',
                marque: product.marque || '',
                prix: product.prix || '',
                qteStock: product.qteStock || ''
            });
        }
    }, [product]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate the form data
    const validate = () => {
        const newErrors = {};
        if (!formData.nom.trim()) newErrors.nom = 'Name is required.';
        if (!formData.marque.trim()) newErrors.marque = 'Brand is required.';
        if (!formData.prix || formData.prix <= 0) newErrors.prix = 'Price must be greater than 0.';
        if (!formData.qteStock || formData.qteStock < 0) newErrors.qteStock = 'Quantity cannot be negative.';
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const updatedProduct = { ...product, ...formData }; // Merge the product ID with updated data
            onUpdate(updatedProduct); // Pass updated product data to the parent component
            onClose(); // Close the modal after submitting
        } else {
            setErrors(validationErrors); // Set validation errors
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Update Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <div className="input-container">
                            <input
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                            />
                            {errors.nom && <span className="error-text">{errors.nom}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Brand</label>
                        <div className="input-container">
                            <input
                                type="text"
                                name="marque"
                                value={formData.marque}
                                onChange={handleChange}
                                required
                            />
                            {errors.marque && <span className="error-text">{errors.marque}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Price (€)</label>
                        <div className="input-container">
                            <input
                                type="number"
                                name="prix"
                                value={formData.prix}
                                onChange={handleChange}
                                required
                            />
                            {errors.prix && <span className="error-text">{errors.prix}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <div className="input-container">
                            <input
                                type="number"
                                name="qteStock"
                                value={formData.qteStock}
                                onChange={handleChange}
                                required
                            />
                            {errors.qteStock && <span className="error-text">{errors.qteStock}</span>}
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="submit" className="update-button">
                            Update Product
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

export default UpdateProductModal;
