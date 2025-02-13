import React, { useState, useEffect } from "react";
import axios from "axios";

const TableList = ({ handleOpen, searchTerm }) => {
  const [tableData, setTableData] = useState([]); // Stores fetched data
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/clients");
        setTableData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async(id) => {
    try {
      await axios.delete(`http://localhost:3000/api/clients/${id}`);
      setTableData((prevData) => prevData.filter((client) => client.id !== id));
      console.log("Client deleted successfully");
    } catch (err) {
      console.log("Error in Fetching Data !!", err);
    }
  }

  // Filtering based on searchTerm
  const filterData = tableData.filter((client) =>
    searchTerm === "" || client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Rate</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Display filtered data */}
            {filterData.map((client, index) => (
              <tr className="bg-base-200" key={client.id || index}>
                <td>{index + 1}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.job}</td>
                <td>{client.rate}</td>
                <td>
                  <button
                    className={`btn rounded-2xl w-30 ${
                      client.isactive ? "btn-primary" : "btn-outline-primary"
                    }`}
                  >
                    {client.isactive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleOpen("edit", client)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button className="btn btn-secondary bg-red-700"
                  onClick={() => handleDelete(client.id)} >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Show error if fetching fails */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default TableList;
