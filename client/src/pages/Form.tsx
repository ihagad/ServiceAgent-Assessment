import React, { useState } from 'react';

export default function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [complaint, setComplaint] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!name.trim() || !email.trim() || !complaint.trim()) {
            setError("Please fill out all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/complaints", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, complaint }),
            });

            if (response.ok) {
                setSuccess(true);
                setName("");
                setEmail("");
                setComplaint("");
            } else {
                setError("Failed to submit complaint. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div>
                <div >
                    <h2>Thank You!</h2>
                    <p>Your complaint has been successfully submitted.</p>
                    <button
                        onClick={() => setSuccess(false)}
                    >
                        Submit Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h1>Submit Complaint</h1>

                {error && (
                    <div >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>
                            Complaint
                        </label>
                        <textarea
                            id="complaint"
                            value={complaint}
                            onChange={e => setComplaint(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}