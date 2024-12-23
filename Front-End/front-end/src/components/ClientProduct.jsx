import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2'; // SweetAlert2
import '../style/ClientProduct.css';

const ClientProductTable = () => {
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [newSale, setNewSale] = useState({ productId: '', clientId: '', quantity: 1 });
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [allClients, setAllClients] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch('http://localhost:6061/api/sales/all-sales');
                const data = await response.json();
                setSalesData(data);

                const uniqueClients = [...new Set(data.map(sale => sale.client.id))];
                const clientsList = uniqueClients.map(clientId => {
                    return data.find(sale => sale.client.id === clientId)?.client;
                });
                setClients(clientsList);
            } catch (error) {
                Swal.fire('Error', 'Error fetching sales data.', 'error');
            }
        };

        fetchSalesData();
    }, [salesData, selectedClientId]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:9999/api/clients');
                const data = await response.json();
                setAllClients(data);
            } catch (error) {
                Swal.fire('Error', 'Error fetching clients.', 'error');
            }
        };

        fetchClients();
    }, [selectedClientId]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:9090/api/products/');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                Swal.fire('Error', 'Error fetching products.', 'error');
            }
        };

        fetchProducts();
    }, [newSale.clientId, selectedClientId]);

    const handleNewSaleChange = (e) => {
        const { name, value } = e.target;
        setNewSale({ ...newSale, [name]: value });
    };

    const handleAddSale = async () => {
        if (newSale.clientId && newSale.productId && newSale.quantity > 0) {
            try {
                const saleData = {
                    clientId: newSale.clientId,
                    productId: newSale.productId,
                    quantity: newSale.quantity,
                };
                const response = await fetch('http://localhost:6061/api/sales/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(saleData),
                });

                if (response.ok) {
                    Swal.fire('Success', 'Sale added successfully.', 'success');
                    setNewSale({ productId: '', clientId: '', quantity: 1 });
                } else {
                    const errorData = await response.json();
                    console.error('Sale API error:', errorData);
                    Swal.fire('Error', 'Error adding sale.', 'error');
                }
            } catch (error) {
                console.error('Error sending sale data:', error);
                Swal.fire('Error', 'Error adding sale.', 'error');
            }
        } else {
            Swal.fire('Warning', 'Please select a client, product, and quantity.', 'warning');
        }
    };

    const filteredSalesData = salesData.filter(sale => sale.client.id === selectedClientId);

    const paginatedSales = filteredSalesData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredSalesData.length / itemsPerPage);

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const client = clients.find((client) => client.id === selectedClientId);

        doc.text('Invoice for ' + client?.name, 10, 10);

        doc.autoTable({
            head: [['Product', 'Brand', 'Price', 'Quantity', 'Total']],
            body: filteredSalesData.map((sale) => [
                sale.product.nom,
                sale.product.marque,
                `$${sale.product.prix.toFixed(2)}`,
                sale.sale.quantity,
                `$${(sale.product.prix * sale.sale.quantity).toFixed(2)}`,
            ]),
        });

        const totalPrice = filteredSalesData.reduce(
            (total, sale) => total + sale.product.prix * sale.sale.quantity,
            0
        );
        doc.text(`Total Price: $${totalPrice.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 10);

        doc.save('invoice.pdf');
    };

    const handleDeleteSale = async (saleId) => {
        try {
            const response = await fetch(`http://localhost:6061/api/sales/delete/${saleId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Swal.fire('Success', 'Sale deleted successfully.', 'success');
                // Remove the sale from the state
                setSalesData(salesData.filter((sale) => sale.sale.id !== saleId));
            } else {
                const errorData = await response.text();
                console.error('Error deleting sale:', errorData);
                Swal.fire('Error', 'Error deleting sale.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error', 'An error occurred while deleting the sale.', 'error');
        }
    };

    return (
        <div className="client-product-table">
            <h2>Client and Product Sales</h2>
            <div className="clients">
                {clients.map((client) => (
                    <div
                        key={client.id}
                        className={`client ${selectedClientId === client.id ? 'selected' : ''}`}
                        onClick={() => setSelectedClientId(client.id)}>
                        <h3>{client.name}</h3>
                        <p>{client.email}</p>
                    </div>
                ))}
            </div>

            <div className="add-sale">
                <h3>Add New Sale</h3>
                <form>
                    <select
                        name="clientId"
                        value={newSale.clientId || ''}
                        onChange={handleNewSaleChange}>
                        <option value="">Select Client</option>
                        {allClients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>

                    {newSale.clientId && (
                        <select
                            name="productId"
                            value={newSale.productId || ''}
                            onChange={handleNewSaleChange}>
                            <option value="">Select Product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.nom} - {product.marque} (${product.prix})
                                </option>
                            ))}
                        </select>
                    )}

                    {newSale.productId && (
                        <input
                            type="number"
                            name="quantity"
                            value={newSale.quantity}
                            min="1"
                            onChange={handleNewSaleChange}
                            className="quantity-input"
                        />
                    )}

                    <button type="button" onClick={handleAddSale} className="add-sale-btn">
                        Add Sale
                    </button>
                </form>
            </div>

            {selectedClientId && (
                <div className="client-details">
                    <h3>Sales for {clients.find((c) => c.id === selectedClientId)?.name}</h3>
                    {paginatedSales.length === 0 ? (
                        <p className="no-sales-message">
                            No sales records are currently available for this client. Please ensure that sales have been
                            recorded or try selecting another client.
                        </p>
                    ) : (
                        <>
                            <table>
                                <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Brand</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginatedSales.map((sale) => (
                                    <tr key={sale.sale.id}>
                                        <td>{sale.product.nom}</td>
                                        <td>{sale.product.marque}</td>
                                        <td>{sale.sale.quantity}</td>
                                        <td>{(sale.product.prix * sale.sale.quantity).toFixed(2)}</td>
                                        <td>{sale.sale.date}</td>
                                        <td>
                                            <button
                                                className="remove-btn"
                                                onClick={() => handleDeleteSale(sale.sale.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <div className="pagination">
                                <button
                                    className="pagination-btn"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}>
                                    Previous
                                </button>
                                <span>Page {currentPage} of {totalPages}</span>
                                <button
                                    className="pagination-btn"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}>
                                    Next
                                </button>
                                {selectedClientId && (
                                    <button onClick={handleDownloadPDF} className="download-pdf-btn">
                                        Download Invoice
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>

            )}
        </div>
    );
};

export default ClientProductTable;
