import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

export default function WriteRec(props) {
  const [authUser] = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ← loading state

  const handleSubmit = async () => {
    if (!authUser) return;
    if (!message.trim()) return;
    if (props.toUser === props.fromUser) {
      toast.error("You cannot recommend yourself");
      return;
    }
    setLoading(true); // ← start spinner
    try {
      await axios.post(
        `http://localhost:4001/recommendations/addrec`,
        {
          content: message,
          toUser: props.toUser,
          fromUser: props.fromUser,
        }
      );
      toast.success("Recommendation posted!");
      setMessage("");
      const modalEl = document.getElementById("recModal");
      const bsModal = window.bootstrap.Modal.getInstance(modalEl);
      bsModal.hide();
    } catch (err) {
      console.error(err);
      toast.error("Failed to post recommendation.");
    } finally {
      setLoading(false); // ← stop spinner
    }
  };

  return (
    <>
      {authUser ? (
        <div
          className="modal fade"
          id="recModal"
          tabIndex={-1}
          aria-labelledby="recModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-light">
              {loading ? (
                <div
                  style={{ height: "20vh" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Posting...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="modal-header">
                    <h5 className="modal-title" id="recModalLabel">
                      Recommend {props.name}
                    </h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <textarea
                      className="form-control mb-2"
                      id="message-text"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your recommendation…"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={!message.trim()}
                      onClick={handleSubmit}
                    >
                      Post
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        toast.error("Sign in first")
      )}
    </>
  );
}
