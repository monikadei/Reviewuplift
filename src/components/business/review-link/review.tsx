"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar";

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const business = {
    name: "Pizza Palace",
    googleReviewUrl: "https://www.google.com/search?q=pizza+palace+reviews"
  };

  const handleRating = (value: number) => {
    setRating(value);
    setSubmitted(false); // Reset if user changes rating
  };

  const handleSubmitFeedback = () => {
    // TODO: Send feedback to backend or email
    console.log("Feedback submitted:", feedback);
    setSubmitted(true);
  };

  const handleRedirect = () => {
    window.open(business.googleReviewUrl, "_blank");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isAdmin={false} />

      <div className="flex-1 md:ml-64 p-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center mb-4">
            How was your experience with {business.name}?
          </h1>

          <div className="flex justify-center space-x-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                aria-label={`${star} star`}
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {rating > 0 && rating <= 3 && !submitted && (
            <div className="space-y-4">
              <p className="text-red-600 font-medium">
                We're sorry to hear that. Please let us know what went wrong:
              </p>
              <Textarea
                placeholder="Share your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <Button onClick={handleSubmitFeedback} disabled={!feedback}>
                Submit Feedback
              </Button>
            </div>
          )}

          {rating > 3 && (
            <div className="text-center">
              <p className="text-green-600 font-medium mb-2">
                We're glad you enjoyed it! Please leave us a public review:
              </p>
              <Button onClick={handleRedirect}>Leave a Google Review</Button>
            </div>
          )}

          {submitted && (
            <div className="text-center mt-4 text-green-600 font-semibold">
              Thank you for your feedback!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
