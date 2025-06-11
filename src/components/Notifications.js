import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const [authUser] = useAuth();
  const navigate = useNavigate();
  const [recs, setRecs] = React.useState([]);
  const [viewers, setViewers] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:4001/recommendations/getrec`, {
        params: { toUser: authUser.username, status: "pending" },
      })
      .then((res) => setRecs(res.data))
      .catch((err) => console.error("Failed to load recs:", err));
  }, [authUser.username]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:4001/user/${authUser.username}`)
      .then((res) => {
        setViewers(res.data.viewers || []);
      })
      .catch((err) => console.error("Failed to load viewers:", err));
  }, [authUser.username]);

  const updateRec = async (recId, show) => {
    try {
      await axios.patch(`http://localhost:4001/recommendations/${recId}`, {
        show,
      });
      // remove it from the pending list
      setRecs((rs) => rs.filter((r) => r._id !== recId));

      toast.success(
        show ? "Recommendation accepted!" : "Recommendation rejected!"
      );
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
      setRecs((rs) => rs.filter((r) => r._id !== recId));
      toast.success("Recommendation deleted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete recommendation");
    }
  };

  const notificationCount = recs.length + viewers.length;

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
          {notificationCount === 0 && (
            <p className="text-center">
              You have {notificationCount} new notifications!
            </p>
          )}

          {/* ————— Viewers Section ————— */}
          {viewers.map((viewerUsername, idx) => (
            <div key={`${viewerUsername}-${idx}`} className="mb-4">
              <p className="mt-2">
                <b>{viewerUsername} viewed your profile!</b>{" "}
                <button
                  type="button"
                  onClick={() => navigate(`/${viewerUsername}`)}
                  className="btn btn-outline-primary btn-sm texts"
                >
                  View {viewerUsername}’s profile
                </button>{" "}
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm texts"
                  onClick={async () => {
                    try {
                      await axios.delete(
                        `http://localhost:4001/user/${authUser.username}/viewers/${idx}`,
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                        }
                      );
                      setViewers((vs) => vs.filter((_, i) => i !== idx));
                      toast.success(`Notification deleted!`);
                    } catch (err) {
                      console.error(err);
                      toast.error("Failed to delete viewer");
                    }
                  }}
                >
                  Delete
                </button>
              </p>
              <hr />
            </div>
          ))}

          {/* ————— Recommendations Section ————— */}
          {recs.map((r) => (
            <div key={r._id} className="mb-4">
              {r.type === "request" ? (
                <p className="mt-2">
                  <b>{r.fromUser} is requesting a recommendation from you!</b>
                  <a
                    href={`/${r.fromUser}`}
                    className="btn btn-outline-info btn-sm texts ms-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Profile
                  </a>
                  <button
                    type="button"
                    onClick={() => deleteRec(r._id)}
                    className="btn btn-outline-danger btn-sm texts ms-2"
                  >
                    Dismiss
                  </button>
                </p>
              ) : (
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
              )}
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Notifications;
