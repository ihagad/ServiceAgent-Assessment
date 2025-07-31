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
        // Refresh the complaints list
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Complaints Dashboard</h1>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filter by status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="all">All</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          {filteredComplaints.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No complaints found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Complaint
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredComplaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {complaint.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {complaint.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {complaint.complaint}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(complaint.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          complaint.status === 'Resolved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {complaint.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => toggleStatus(complaint.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {complaint.status === 'Resolved' ? 'Mark Pending' : 'Mark Resolved'}
                        </button>
                        <button
                          onClick={() => deleteComplaint(complaint.id)}
                          className="text-red-600 hover:text-red-900"
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