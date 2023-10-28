import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
const Table = ({ users, tutor, student }) => {
  const [requestLength, setRequestLength] = useState({});
  const fetchRequests = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/requests/student/${id}`
      );
      const { data } = response;
      const length = data.length;
      return data.length;
      // dispatch(requestActions.addRequest(data));
    } catch (error) {
      console.error("Error fetching requests:", error);
      return 0;
    }
  }, []);
  useEffect(() => {
    if (student) {
      const fetchRequestsLength = async () => {
        const lengths = {};
        for (const user of users) {
          const length = await fetchRequests(user?.id);
          lengths[user?.id] = length;
        }
        setRequestLength(lengths);
      };
      fetchRequestsLength();
    }
  }, [fetchRequests, student, users]);
  return (
    <>
      <table className="min-w-full table-auto m-3">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            {tutor && <th className="py-2">Balance</th>}
            {student && <th className="py-2">Total Requests</th>}
          </tr>
        </thead>
        <tbody>
          {/* Map through your students data and generate rows */}
          {users.map((user, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : ""}>
              <td className="py-2 px-4 font-semibold text-center">
                {user?.username}
              </td>
              <td className="py-2 px-4 font-semibold text-center">
                {user?.email}
              </td>
              {tutor && (
                <td className="py-2 px-4 font-semibold text-center">
                  Rs. {user?.balance}
                </td>
              )}
              {student && (
                <td className="py-2 px-4 font-semibold text-center">
                  {requestLength[user?.id]}
                </td>
              )}

              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
