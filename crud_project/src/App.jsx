import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TableList from "./components/TableList";
import ModalForm from "./components/ModalForm";
import axios from "axios";

function App() {
  const [isOpen, setIsopen] = useState(false);
  const [ModalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);

  const handleOpen = (mode, data = null) => {
    setIsopen(true);
    setModalMode(mode);
    setClientData(data);
  };

  const handleSubmit = async (newClientData) => {
    try {
      if (ModalMode === "add") {
        const response = await axios.post("http://localhost:3000/api/clients", newClientData);
        console.log("Client added:", response.data);
      } else if (ModalMode === "edit" && clientData) {
        const response = await axios.put(
          `http://localhost:3000/api/clients/${clientData.id}`,
          newClientData
        );
        console.log("Client updated:", response.data);
      }
    } catch (err) {
      console.error("Error submitting client:", err);
    }
    setIsopen(false);
  };

  return (
    <>
      <Navbar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      <TableList handleOpen={(mode, client) => handleOpen(mode, client)} searchTerm={searchTerm} />
      <ModalForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={() => setIsopen(false)}
        mode={ModalMode}
        clientData={clientData}
      />
    </>
  );
}

export default App;
