import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

function Notifications() {
  const [authUser] = useAuth();
  const [recs, setRecs] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:4001/recommendations/getrec`, {
        params: { toUser: authUser.username, status: "pending" },
      })
      .then((res) => setRecs(res.data))
      .catch((err) => console.error("Failed to load recs:", err));
  }, [authUser.username]);

  const updateRec = async (recId, show) => {
    try {
      await axios.patch(
        `http://localhost:4001/recommendations/${recId}`,
        { show }
      );
      // remove it from the pending list
      setRecs((rs) => rs.filter((r) => r._id !== recId));
      if (show === true) {
        toast.success("Recommendation Accepted successfully!");
      } else {
        toast.success("Recommendation Rejected!");
      }
      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRec = async (recId) => {
    try {
      await axios.delete(`http://localhost:4001/recommendations/${recId}`);
      // remove it from the pending list
      setRecs((rs) => rs.filter((r) => r._id !== recId));
      toast.success("Recommendation deleted successfully!");
      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete recommendation");
    }
  };

  const notificationCount = recs.length;

  return (
    <>
      <div
        style={{
          marginTop: "10vh",
          marginBottom: "4vh",
          height: "78vh",
        }}
        className="d-flex justify-content-center flex-column align-items-center"
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.22)",
            height: "78vh",
            width: "90%",
            borderRadius: "50px",
            overflow: "scroll",
          }}
          className="d-flex p-4 texts text-light flex-column"
        >
          {recs.length === 0 && (
            <p className="text-center">
              You have {notificationCount} new notifications!
            </p>
          )}

          {recs.map((r) => (
            <div key={r._id} className="mb-4">
              <p className="mt-2">
                <b>{r.fromUser} posted a Recommendation for you</b> - "
                {r.content}"{" "}
                <button
                  type="button"
                  onClick={() => updateRec(r._id, true)}
                  className="btn btn-outline-success btn-sm texts"
                >
                  Accept
                </button>{" "}
                <button
                  type="button"
                  onClick={() => deleteRec(r._id)}
                  className="btn btn-outline-danger btn-sm texts"
                >
                  Reject
                </button>
              </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Notifications;
