import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2 for alerts
import UpdateProductModal from './ModalProduct'; // Import modal
import '../style/TableProducts.css';

const ProduitTable = () => {
    const [produits, setProduits] = useState([]); // State for products
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newProduct, setNewProduct] = useState({ nom: '', marque: '', prix: '', qteStock: '' });
    const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product in modal
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error handling

    // Fetch products when component mounts or products change
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:6565/api/products/');
            setProduits(response.data);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [produits]); // Fetch products on component mount

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Toggle product add form visibility
    const handleAddProductClick = () => {
        setShowForm(!showForm);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Add product function with SweetAlert2
    const handleAddProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:6565/api/products/add', newProduct);

            // Update state with new product
            setProduits((prevProducts) => [...prevProducts, response.data]);

            // Reset form fields
            setNewProduct({ nom: '', marque: '', prix: '', qteStock: '' });

            // Close form
            setShowForm(false);

            // Show success message
            Swal.fire('Success', 'Product added successfully!', 'success');
        } catch (err) {
            // Show error message
            Swal.fire('Error', 'Failed to add product.', 'error');
            console.error("Error adding product:", err);
        }
    };


    // Handle product update modal visibility
    const handleUpdateProductClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    // Update product function with SweetAlert2
    const handleProductUpdate = async (updatedProduct) => {
        try {
            await axios.put(`http://localhost:6565/api/products/update/${updatedProduct.id}`,updatedProduct);
            setProduits((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                )
            );
            setShowModal(false);
            Swal.fire('Success', 'Product updated successfully!', 'success');
        } catch (err) {
            Swal.fire('Error', 'Failed to update product.', 'error');
        }
    };

    // Handle product deletion with SweetAlert2
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:6565/api/products/delete/${id}`);
            setProduits((prevProducts) => prevProducts.filter((product) => product.id !== id));
            await Swal.fire('Success', 'Product deleted successfully!', 'success');
        } catch (err) {
            await Swal.fire('Error', 'Failed to delete product.', 'error');
        }
    };

    // Filter products based on search query
    const filteredProduits = produits.filter((produit) =>
        produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produit.marque.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="table-container">
            <div className="action-container">
                <div className="add-product-container">
                    <button className="add-button" onClick={handleAddProductClick}>
                        {showForm ? 'Cancel' : 'Add Product'}
                    </button>
                    {showForm && (
                        <form className="add-product-form" onSubmit={handleAddProductSubmit}>
                            <input
                                type="text"
                                name="nom"
                                value={newProduct.nom}
                                onChange={handleInputChange}
                                placeholder="Nom"
                                required
                            />
                            <input
                                type="text"
                                name="marque"
                                value={newProduct.marque}
                                onChange={handleInputChange}
                                placeholder="Marque"
                                required
                            />
                            <input
                                type="number"
                                name="prix"
                                value={newProduct.prix}
                                onChange={handleInputChange}
                                placeholder="Prix"
                                required
                            />
                            <input
                                type="number"
                                name="qteStock"
                                value={newProduct.qteStock}
                                onChange={handleInputChange}
                                placeholder="Quantité en Stock"
                                required
                            />
                            <button type="submit" className="submit-button">
                                Add Product
                            </button>
                        </form>
                    )}
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-bar"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search Products"
                    />
                </div>
            </div>

            <table className="produit-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Marque</th>
                    <th>Prix (€)</th>
                    <th>Quantité en Stock</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredProduits.map((produit) => (
                    <tr key={produit.id}>
                        <td>{produit.id}</td>
                        <td>{produit.nom}</td>
                        <td>{produit.marque}</td>
                        <td>{produit.prix.toFixed(2)}</td>
                        <td>{produit.qteStock}</td>
                        <td>
                            <button
                                className="update-button"
                                onClick={() => handleUpdateProductClick(produit)}
                            >
                                Update
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteProduct(produit.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Update Product Modal */}
            {showModal && (
                <UpdateProductModal
                    isOpen={showModal}
                    onClose={handleModalClose}
                    product={selectedProduct}
                    onUpdate={handleProductUpdate}
                />
            )}
        </div>
    );
};

export default ProduitTable;
