import React, { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaPhone,
  FaEnvelope,
  FaCheck,
  FaTrash,
  FaLocationDot,
} from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Sidebar from "./Sidebar";

// Types
type Review = {
  id: number;
  name: string;
  rating: number;
  date: string;
  message: string;
  location: string;
  email?: string;
  phone?: string;
};

// Initial Data
const reviewsData: Review[] = [
  {
    id: 1,
    name: "Vishnu Vardhan S",
    rating: 1,
    date: "May 14, 2025",
    message: "Bad Taste",
    location: "Doner Hut",
    email: "vishnu@example.com",
    phone: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Aravind",
    rating: 5,
    date: "May 8, 2025",
    message: "Amazing food!",
    location: "Doner Hut",
  },
  {
    id: 3,
    name: "Chandran K",
    rating: 5,
    date: "Mar 20, 2025",
    message: "Loved it!",
    location: "Doner Hut",
  },
];

// Star Renderer
const renderStars = (rating: number) => (
  <div className="flex text-yellow-500">
    {[...Array(5)].map((_, index) =>
      index < rating ? <FaStar key={index} /> : <FaRegStar key={index} />
    )}
  </div>
);

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState(reviewsData);
  const [replied, setReplied] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("All");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((review) => review.id !== id));
    }
  };

  const toggleReply = (id: number) => {
    setReplied((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleReplyClick = (review: Review) => {
    if (review.rating < 3) {
      setSelectedReview(review);
    } else {
      window.open("https://www.google.com/search?q=google+review", "_blank");
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterOption === "All" ||
      (filterOption === "Above 3" && review.rating >= 3) ||
      (filterOption === "Below 3" && review.rating < 3) ||
      (filterOption === "Replied" && replied.includes(review.id)) ||
      (filterOption === "Not Replied" && !replied.includes(review.id)) ||
      (selectedReview && review.id === selectedReview.id);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-[#fbf8f5]">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your reviews</h2>
          <div className="flex gap-4 items-center">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="border border-gray-300 rounded pl-10 pr-3 py-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search users"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            {/* Filter */}
            <label htmlFor="filter-select" className="sr-only">
              Filter reviews
            </label>
            <select
              id="filter-select"
              className="border border-gray-300 rounded px-3 py-1"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option>All</option>
              <option>Above 3</option>
              <option>Below 3</option>
              <option>Replied</option>
              <option>Not Replied</option>
              {selectedReview && <option>{selectedReview.date}</option>}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col gap-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-gray-500 text-sm">{review.date}</div>
                  </div>
                  {renderStars(review.rating)}
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <FaLocationDot />
                  {review.location}
                </div>
              </div>

              <div className="text-gray-700">{review.message}</div>

              {review.rating < 3 && (
                <div className="flex gap-4 mt-2">
                  {/* Email Hover */}
                  <div className="relative group">
                    <FaEnvelope className="text-gray-500 cursor-pointer" />
                    <div className="absolute left-8 bottom-1 bg-white text-sm border rounded shadow px-2 py-1 hidden group-hover:block z-10">
                      {review.email}
                    </div>
                  </div>
                  {/* Phone Hover */}
                  <div className="relative group">
                    <FaPhone className="text-gray-500 cursor-pointer" />
                    <div className="absolute left-8 bottom-1 bg-white text-sm border rounded shadow px-2 py-1 hidden group-hover:block z-10">
                      {review.phone}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-3">
                <button
                  className={`px-4 py-2 rounded-full transition text-white ${
                    replied.includes(review.id)
                      ? "bg-green-600 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  }`}
                  disabled={replied.includes(review.id)}
                  onClick={() => handleReplyClick(review)}
                >
                  {replied.includes(review.id)
                    ? "Replied"
                    : review.rating < 3
                    ? "Reply Privately"
                    : "Reply"}
                </button>
                <div className="flex gap-4 text-gray-500 text-lg items-center">
                  <div className="relative group">
                    <FaCheck
                      className="cursor-pointer hover:text-green-600"
                      onClick={() => toggleReply(review.id)}
                    />
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-sm border rounded shadow px-2 py-1 hidden group-hover:block z-10">
                      {replied.includes(review.id)
                        ? "Unmark as replied"
                        : "Mark as replied"}
                    </div>
                  </div>

                  <div className="relative group">
                    <FaTrash
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => handleDelete(review.id)}
                    />
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-sm border rounded shadow px-2 py-1 hidden group-hover:block z-10">
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;