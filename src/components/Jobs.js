import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const jobsPerPage = 10;
  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [jobType, setJobType] = useState(""); // "Internship" or "Full time"
  const [location, setLocation] = useState(""); // "US", "Canada", "Europe", "Asia"

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a job title");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://jooble.org/api/7ad722d0-bb77-43fe-b927-50b09c0c28bd",
        {
          keywords: searchQuery,
          page: currentPage
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.jobs) {
        const limitedJobs = response.data.jobs.slice(0, 20);
        setJobs(limitedJobs);
        setTotalPages(2); // Always 2 pages (10 jobs each)
        toast.success("Jobs found successfully!");
      } else {
        toast.error("No jobs found");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filtering logic
  const getFilteredJobs = () => {
    let filtered = jobs;
    if (jobType) {
      filtered = filtered.filter((job) =>
        job.type && job.type.toLowerCase().includes(jobType.toLowerCase())
      );
    }
    if (location) {
      filtered = filtered.filter((job) => {
        if (!job.location) return false;
        if (location === "US") return job.location.match(/\bUS|United States\b/i);
        if (location === "Canada") return job.location.match(/\bCanada\b/i);
        if (location === "Europe") return job.location.match(/Europe|Germany|France|UK|Italy|Spain|Netherlands|Sweden|Norway|Finland|Switzerland|Denmark|Belgium|Austria|Ireland|Portugal|Poland|Czech|Hungary|Romania|Greece|Bulgaria|Slovakia|Slovenia|Estonia|Latvia|Lithuania|Luxembourg|Croatia|Serbia|Ukraine|Russia/i);
        if (location === "Asia") return job.location.match(/Asia|India|China|Japan|Singapore|Hong Kong|Malaysia|Thailand|Vietnam|Indonesia|Philippines|Pakistan|Bangladesh|Sri Lanka|Nepal|South Korea|Taiwan|UAE|Saudi Arabia|Qatar|Kuwait|Oman|Israel|Turkey/i);
        return false;
      });
    }
    return filtered;
  };

  const filteredJobs = getFilteredJobs();

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "16vh",
        backgroundColor: "rgba(255, 255, 255, 0.22)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h1 className="text-center text-light mb-4">Find Your Dream Job</h1>
            <div className="search-bar-container mx-3" style={{ width: "100%" }}>
              <form onSubmit={handleSearch} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#181824',
                  borderRadius: '16px',
                  padding: '0.5rem 1rem',
                  boxShadow: '0 2px 16px 0 rgba(0,0,0,0.15)',
                  width: '100%'
                }}
              >
                <span className="search-icon" style={{ color: '#fff', marginRight: 12 }}>
                  <svg
                    height={20}
                    width={20}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.53,20.47l-5-5a8,8,0,1,0-1.06,1.06l5,5a.75.75,0,0,0,1.06-1.06ZM4,10A6,6,0,1,1,10,16,6,6,0,0,1,4,10Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <input
                  placeholder="Search for jobs..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={loading}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '1.2rem',
                    outline: 'none',
                  }}
                />
                {/* Filter Button */}
                <button
                  type="button"
                  className="btn"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    fontWeight: 600,
                    borderRadius: '8px',
                    marginLeft: 16,
                    padding: '0.5rem 1.5rem',
                    fontSize: '1.1rem',
                    border: '1px solid #22c55e',
                    boxShadow: '0 2px 8px 0 rgba(34,197,94,0.10)',
                  }}
                  onClick={() => setShowFilters((prev) => !prev)}
                >
                  Filters
                </button>
                <button
                  type="submit"
                  className="btn"
                  style={{
                    background: '#22c55e',
                    color: '#fff',
                    fontWeight: 600,
                    borderRadius: '8px',
                    marginLeft: 16,
                    padding: '0.5rem 1.5rem',
                    fontSize: '1.1rem',
                    border: 'none',
                    boxShadow: '0 2px 8px 0 rgba(34,197,94,0.15)',
                  }}
                  disabled={loading}
                >
                  Search
                </button>
                {/* Filter Dropdown */}
                {showFilters && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '60px',
                      right: '40px',
                      zIndex: 10,
                      background: 'rgba(0,0,0,0.85)',
                      color: '#fff',
                      borderRadius: '14px',
                      boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)',
                      padding: '1.5rem',
                      minWidth: '260px',
                      border: '1px solid #22c55e',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                  >
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ fontWeight: 600, color: '#22c55e' }}>Job Type</label>
                      <div>
                        <label style={{ marginRight: 16 }}>
                          <input
                            type="radio"
                            name="jobType"
                            value="Internship"
                            checked={jobType === "Internship"}
                            onChange={() => setJobType("Internship")}
                          /> Internship
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="jobType"
                            value="Full time"
                            checked={jobType === "Full time"}
                            onChange={() => setJobType("Full time")}
                          /> Full time
                        </label>
                        <label style={{ marginLeft: 16 }}>
                          <input
                            type="radio"
                            name="jobType"
                            value=""
                            checked={jobType === ""}
                            onChange={() => setJobType("")}
                          /> Any
                        </label>
                      </div>
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, color: '#22c55e' }}>Location</label>
                      <div>
                        <label style={{ marginRight: 16 }}>
                          <input
                            type="radio"
                            name="location"
                            value="US"
                            checked={location === "US"}
                            onChange={() => setLocation("US")}
                          /> US
                        </label>
                        <label style={{ marginRight: 16 }}>
                          <input
                            type="radio"
                            name="location"
                            value="Canada"
                            checked={location === "Canada"}
                            onChange={() => setLocation("Canada")}
                          /> Canada
                        </label>
                        <label style={{ marginRight: 16 }}>
                          <input
                            type="radio"
                            name="location"
                            value="Europe"
                            checked={location === "Europe"}
                            onChange={() => setLocation("Europe")}
                          /> Europe
                        </label>
                        <label style={{ marginRight: 16 }}>
                          <input
                            type="radio"
                            name="location"
                            value="Asia"
                            checked={location === "Asia"}
                            onChange={() => setLocation("Asia")}
                          /> Asia
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="location"
                            value=""
                            checked={location === ""}
                            onChange={() => setLocation("")}
                          /> Any
                        </label>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', marginTop: '1.5rem' }}>
                      <button
                        className="btn"
                        style={{
                          background: '#22c55e',
                          color: '#fff',
                          fontWeight: 600,
                          borderRadius: '8px',
                          padding: '0.5rem 1.5rem',
                          fontSize: '1.1rem',
                          border: 'none',
                          boxShadow: '0 2px 8px 0 rgba(34,197,94,0.15)',
                        }}
                        onClick={() => setShowFilters(false)}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Job Listings */}
            <div className="mt-4">
              {loading ? (
                <div className="text-center text-light">Loading...</div>
              ) : (
                <>
                  {filteredJobs
                    .slice((currentPage - 1) * 10, currentPage * 10)
                    .map((job) => (
                      <div
                        key={job.id}
                        className="card mb-3"
                        style={{
                          borderRadius: '18px',
                          overflow: 'hidden',
                          border: '1px solid rgba(255,255,255,0.08)',
                          background: 'rgba(0,0,0,0.45)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)',
                          color: '#fff',
                        }}
                      >
                        <div className="card-body" style={{ padding: '1.5rem' }}>
                          <div className="d-flex align-items-center mb-3">
                            {job.company_logo && (
                              <img
                                src={job.company_logo}
                                alt={job.company}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  marginRight: "15px",
                                  objectFit: "contain",
                                  background: '#23263a',
                                  borderRadius: '8px',
                                  padding: 4,
                                }}
                              />
                            )}
                            <div>
                              <h5 className="card-title mb-0" style={{ color: '#fff' }}>{job.title}</h5>
                              <h6 className="card-subtitle" style={{ color: '#c7bfff' }}>{job.company}</h6>
                            </div>
                          </div>
                          <p className="card-text" style={{ color: '#e0e0e0' }}>
                            <strong style={{ color: '#22c55e' }}>Location:</strong> {job.location}
                            <br />
                            {job.type && (
                              <>
                                <strong style={{ color: '#22c55e' }}>Type:</strong> {job.type}
                                <br />
                              </>
                            )}
                            {job.salary && (
                              <>
                                <strong style={{ color: '#22c55e' }}>Salary:</strong> {job.salary}
                                <br />
                              </>
                            )}
                            <strong style={{ color: '#22c55e' }}>Posted:</strong> {job.date}
                            <br />
                            <strong style={{ color: '#22c55e' }}>Description:</strong>{" "}
                            {job.description?.substring(0, 200)}...
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <a
                              href={job.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn"
                              style={{
                                background: 'rgba(34,197,94,0.95)',
                                color: '#fff',
                                fontWeight: 600,
                                borderRadius: '8px',
                                padding: '0.5rem 1.5rem',
                                fontSize: '1.1rem',
                                border: 'none',
                                boxShadow: '0 2px 8px 0 rgba(34,197,94,0.15)',
                                transition: 'background 0.2s',
                              }}
                            >
                              Apply Now
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Pagination */}
                  {filteredJobs.length > 0 && (
                    <nav aria-label="Page navigation" className="mt-4">
                      <ul className="pagination justify-content-center" style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '12px', padding: '0.5rem 1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                        {[1, 2].map((pageNum) => (
                          <li
                            key={pageNum}
                            className={`page-item ${currentPage === pageNum ? "active" : ""}`}
                          >
                            <button
                              className="page-link"
                              style={{
                                background: currentPage === pageNum ? 'rgba(34,197,94,0.95)' : 'transparent',
                                color: currentPage === pageNum ? '#fff' : '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                margin: '0 0.5rem',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                padding: '0.5rem 1.2rem',
                                transition: 'background 0.2s',
                              }}
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs; 