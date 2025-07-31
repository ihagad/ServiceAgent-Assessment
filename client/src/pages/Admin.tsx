import React, { useState, useEffect } from 'react';

interface Complaint {
  id: number;
  name: string;
  email: string;
  complaint: string;
  created_at: string;
  status?: string;
}

export default function Admin() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch("http://localhost:3001/complaints");
      if (response.ok) {
        const data = await response.json();
        setComplaints(data);
      } else {
        setError("Failed to fetch complaints");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/complaints/${id}`, {
        method: "PATCH",
      });
      if (response.ok) {
        fetchComplaints();
      } else {
        setError("Failed to update status");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  const deleteComplaint = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/complaints/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchComplaints();
      } else {
        setError("Failed to delete complaint");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString() + ' ' + 
           new Date(dateString).toLocaleTimeString();
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (statusFilter === "all") return true;
    return complaint.status === statusFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading complaints...</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>
          <div>
            <h1>Complaints Dashboard</h1>
            <div>
              <label>Filter by status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          {error && (
            <div>
              {error}
            </div>
          )}

          {filteredComplaints.length === 0 ? (
            <div>
              No complaints found.
            </div>
          ) : (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>
                      Name
                    </th>
                    <th>
                      Email
                    </th>
                    <th>
                      Complaint
                    </th>
                    <th>
                      Date
                    </th>
                    <th>
                      Status
                    </th>
                    <th>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((complaint) => (
                    <tr key={complaint.id}>
                      <td>
                        {complaint.name}
                      </td>
                      <td>
                        {complaint.email}
                      </td>
                      <td>
                        {complaint.complaint}
                      </td>
                      <td>
                        {formatDate(complaint.created_at)}
                      </td>
                      <td>
                        <span>
                          {complaint.status || 'Pending'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleStatus(complaint.id)}
                        >
                          {complaint.status === 'Resolved' ? 'Mark Pending' : 'Mark Resolved'}
                        </button>
                        <button
                          onClick={() => deleteComplaint(complaint.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}