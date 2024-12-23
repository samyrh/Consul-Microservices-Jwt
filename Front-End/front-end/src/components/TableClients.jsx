import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../style/TableUsers.css';
import UpdateClientModal from './ModalClient'; // Corrected the import

const ClientTable = () => {
    const [clients, setClients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newClient, setNewClient] = useState({ name: '', username: '', phone: '', email: '', password: '' });
    const [selectedClient, setSelectedClient] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch clients when component mounts
    const fetchClients = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:6565/api/clients');
            setClients(response.data);
        } catch (err) {
            setError('Failed to fetch clients');
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch clients once
    useEffect(() => {
        fetchClients();
    }, [clients]); // Empty dependency array to only fetch on mount

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleAddClientClick = () => {
        setShowForm(!showForm);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddClientSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:6565/api/clients/add', newClient);
            setClients((prevClients) => [...prevClients, response.data]);
            setNewClient({ name: '', username: '', phone: '', email: '', password: '' });
            setShowForm(false);
            Swal.fire('Success!', 'Client added successfully.', 'success');
        } catch (err) {
            Swal.fire('Error!', 'Failed to add client.', 'error');
        }
    };

    const handleUpdateClientClick = (client) => {
        setSelectedClient(client);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleClientUpdate = async (updatedClient) => {
        try {
            await axios.put(`http://localhost:6565/api/clients/update/${updatedClient.id}`, updatedClient);
            setClients((prevClients) =>
                prevClients.map((client) => (client.id === updatedClient.id ? updatedClient : client))
            );
            setShowModal(false);
            Swal.fire('Success!', 'Client updated successfully.', 'success');
        } catch (err) {
            Swal.fire('Error!', 'Failed to update client.', 'error');
        }
    };

    const handleDeleteClient = async (id) => {
        try {
            await axios.delete(`http://localhost:6565/api/clients/delete/${id}`);
            setClients((prevClients) => prevClients.filter((client) => client.id !== id));
            Swal.fire('Deleted!', 'Client deleted successfully.', 'success');
        } catch (err) {
            Swal.fire('Error!', 'Failed to delete client.', 'error');
        }
    };

    const filteredClients = clients.filter((client) => {
        const name = client.name?.toLowerCase() || '';
        const username = client.username?.toLowerCase() || '';
        const email = client.email?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();

        return name.includes(query) || username.includes(query) || email.includes(query);
    });

    return (
        <div className="table-container">
            <div className="action-container">
                <button className="add-button" onClick={handleAddClientClick}>
                    {showForm ? 'Cancel' : 'Add Client'}
                </button>
                {showForm && (
                    <form className="add-client-form" onSubmit={handleAddClientSubmit}>
                        <input type="text" name="name" value={newClient.name} onChange={handleInputChange} placeholder="Name" required />
                        <input type="text" name="username" value={newClient.username} onChange={handleInputChange} placeholder="Username" required />
                        <input type="text" name="phone" value={newClient.phone} onChange={handleInputChange} placeholder="Phone" required />
                        <input type="email" name="email" value={newClient.email} onChange={handleInputChange} placeholder="Email" required />
                        <input type="password" name="password" value={newClient.password} onChange={handleInputChange} placeholder="Password" required />
                        <button type="submit" className="submit-button">Add Client</button>
                    </form>
                )}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search Clients"
                    className="search-bar"
                />
            </div>
            <table className="client-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredClients.length === 0 ? (
                    <tr>
                        <td colSpan="6">No clients found</td>
                    </tr>
                ) : (
                    filteredClients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.username}</td>
                            <td><span className="email-span">{client.phone}</span></td>
                            <td><span className="email-span">{client.email}</span></td>
                            <td>
                                <button className="update-button" onClick={() => handleUpdateClientClick(client)}>Update</button>
                                <button className="delete-button" onClick={() => handleDeleteClient(client.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
            {showModal && <UpdateClientModal isOpen={showModal} onClose={handleModalClose} client={selectedClient} onUpdate={handleClientUpdate} />}
        </div>
    );
};

export default ClientTable;
