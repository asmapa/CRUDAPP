import * as clientService from "../services/clientServices.js"

export const getClients = async (req, res) => {
    try {
        const clients = await clientService.getClients();
        res.status(200).json(clients);
    } catch (err) {
        console.error('Error fetching clients:', err);
    }
}

export const createClient = async (req, res) => {
    try {
        const clientData = await req.body;
        const newClient = await clientService.createClient(clientData);
        res.status(200).json(newClient);
        res.status(200).json(clients);
    } catch (err) {
        console.error('Error fetching clients:', err);
    }
}

export const updateClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const clientData = req.body;
        const updateClient = await clientService.updateClient(clientId, clientData);
        if (!updateClient) {
            return res.status(404).json({message:'Client not found !!!'});
        }
        res.status(200).json(updateClient);
    } catch (err) {
        console.error('Error fetching clients:', err);
    }
}

export const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const deleted = await clientService.deleteClient(clientId);
        if (!deleted) {
            return res.status(404).json({message:'client not found'});
        }
    } catch(err) {
        console.error('Error deleting client:', err);
    }
}

export const searchClient = async (req, res) => {
    try {
        const searchItem = req.query.q;
        const clients = await clientService.searchClient(searchItem);
        res.status(200).json(clients);
        
    } catch (err) {
          console.error('Error searching client:', err);
        
    }
}