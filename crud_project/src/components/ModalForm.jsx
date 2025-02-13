import React, { useEffect, useRef, useState } from "react";

const ModalForm = ({ isOpen, onClose, mode, onSubmit, clientData }) => {
    const modalRef = useRef(null);

    const [rate, setRate] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (clientData) {
            setName(clientData.name || "");
            setEmail(clientData.email || "");
            setJob(clientData.job || "");
            setRate(clientData.rate ? String(clientData.rate) : "");
            setStatus(clientData.isactive || false);
        }
    }, [clientData]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value === "Active");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newClientData = {
                name,
                email,
                job,
                rate: Number(rate),
                isactive: status,
            };
            await onSubmit(newClientData);
        } catch (err) {
            console.error("Submit error:", err);
        }
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box">
                <h3 className="font-bold py-4 text-lg">
                    {mode === "edit" ? "Edit Client" : "Client Details"}
                </h3>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <label className="input flex items-center mt-7">
                        Name
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    {/* Email */}
                    <label className="input flex items-center mt-7">
                        Email
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    {/* Job */}
                    <label className="input flex items-center mt-7">
                        Job
                        <input
                            type="text"
                            placeholder="Job"
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                        />
                    </label>

                    {/* Rate */}
                    <div className="flex-col mt-7">
                        <label className="input flex items-center mt-7">
                            Rate
                            <input
                                type="number"
                                placeholder="Rate"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                            />
                        </label>

                        {/* Status Dropdown */}
                        <select
                            value={status ? "Active" : "Inactive"}
                            className="select select-bordered w-full max-w-x5 my-7"
                            onChange={handleStatusChange}
                        >
                            <option>Inactive</option>
                            <option>Active</option>
                        </select>
                    </div>

                    {/* Close button */}
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                    {/* Submit button */}
                    <button className="btn btn-success">
                        {mode === "edit" ? "Save Changes" : "Add Client"}
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default ModalForm;
