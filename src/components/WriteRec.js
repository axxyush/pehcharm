// WriteRec.jsx
import React, { useState } from "react";
import axios from "axios";

export default function WriteRec({ username }) {
  const MAX = 1000;
  const [message, setMessage] = useState("");
  const charsLeft = MAX - message.length;

  const handleSubmit = async () => {
    if (!message.trim()) return;
    try {
      // adjust baseURL or axios instance as needed
      await axios.post(
        `/user/${username}/recommendation`,
        { content: message }
        // if you need auth: , { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("");

      // hide the modal via Bootstrap’s JS API
      const modalEl = document.getElementById("recModal");
      const bsModal = window.bootstrap.Modal.getInstance(modalEl);
      bsModal.hide();
    } catch (err) {
      console.error("Failed to post recommendation:", err);
    }
  };

  return (
    <div
      className="modal fade"
      id="recModal"
      tabIndex={-1}
      aria-labelledby="recModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title" id="recModalLabel">
              Recommend {username}
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
              maxLength={MAX}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your recommendation…"
            />
            <div
              className={
                "text-end " + (charsLeft < 50 ? "text-danger" : "text-muted")
              }
            >
              {charsLeft} characters left
            </div>
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
        </div>
      </div>
    </div>
  );
}
