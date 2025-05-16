import React, { useState, useRef } from 'react';
import { FiEdit2, FiUpload } from 'react-icons/fi';
import { FaCheck, FaDesktop, FaStar, FaRegStar } from 'react-icons/fa';
import Sidebar from "./Sidebar";

const ReviewLinkSettings: React.FC = () => {
  // State for review link settings
  const [reviewLinkUrl, setReviewLinkUrl] = useState('https://go.reviewuplift.com/doner-hut');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState(reviewLinkUrl);
  
  // State for social preview
  const [socialPreviewTitle, setSocialPreviewTitle] = useState('Do you want to leave us a review?');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(socialPreviewTitle);
  
  // State for review gating
  const [isReviewGatingEnabled, setIsReviewGatingEnabled] = useState(true);
  
  // State for desktop preview customization
  const [businessName, setBusinessName] = useState('DONER HUT');
  const [previewText, setPreviewText] = useState('How was your experience with Doner Hut?');
  const [isEditingPreview, setIsEditingPreview] = useState(false);
  const [tempBusinessName, setTempBusinessName] = useState(businessName);
  const [tempPreviewText, setTempPreviewText] = useState(previewText);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle URL edit
  const handleUrlEdit = () => {
    if (isEditingUrl) {
      setReviewLinkUrl(tempUrl);
    }
    setIsEditingUrl(!isEditingUrl);
  };

  // Handle title edit
  const handleTitleEdit = () => {
    if (isEditingTitle) {
      setSocialPreviewTitle(tempTitle);
    }
    setIsEditingTitle(!isEditingTitle);
  };

  // Handle preview edit
  const handlePreviewEdit = () => {
    if (isEditingPreview) {
      setBusinessName(tempBusinessName);
      setPreviewText(tempPreviewText);
    }
    setIsEditingPreview(!isEditingPreview);
  };

  // Generate a new review link (simulated)
  const generateNewLink = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    const newLink = `https://go.reviewuplift.com/${randomString}`;
    setReviewLinkUrl(newLink);
    setTempUrl(newLink);
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle review submission based on rating
  const handleLeaveReview = () => {
    if (isReviewGatingEnabled) {
      if (rating > 3) {
        // Redirect to review link for positive reviews
        window.open(reviewLinkUrl, '_blank');
      } else {
        // Redirect to home page for negative reviews
        window.location.href = '/';
      }
    } else {
      // If review gating is disabled, always go to review link
      window.open(reviewLinkUrl, '_blank');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-base">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">Review Link</h1>
          <p className="text-gray-600 mb-6">
            Customize the behavior, text, and images of your Review Link. If only one integration is active, 
            customers will be sent directly to the review site, skipping the "Positive Experience" page.
          </p>

          <div className="space-y-6">
            {/* Review Link URL */}
            <div className="border-b pb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Edit Review Link URL</h2>
                <div className="flex gap-3">
                  {/* <button 
                    onClick={generateNewLink}
                    className="text-blue-600 text-sm px-3 py-1 border border-blue-600 rounded"
                  >
                    Generate New Link
                  </button> */}
                  <button 
                    onClick={handleUrlEdit}
                    className="text-blue-600 flex items-center text-sm"
                  >
                    <FiEdit2 className="mr-1" /> {isEditingUrl ? 'Save' : 'Edit'}
                  </button>
                </div>
              </div>
              {isEditingUrl ? (
                <div className="bg-gray-50 p-3 rounded">
                  <input
                    type="text"
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div className="flex items-center">
                    <span className="text-gray-700">{reviewLinkUrl}</span>
                    <span className="ml-4 text-gray-500">9/40</span>
                  </div>
                  <a 
                    href={reviewLinkUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm"
                  >
                    Test Link
                  </a>
                </div>
              )}
            </div>

            {/* Social Preview Title */}
            <div className="border-b pb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Social Preview Title</h2>
                <button 
                  onClick={handleTitleEdit}
                  className="text-blue-600 flex items-center text-sm"
                >
                  <FiEdit2 className="mr-1" /> {isEditingTitle ? 'Save' : 'Edit'}
                </button>
              </div>
              {isEditingTitle ? (
                <div className="bg-gray-50 p-3 rounded">
                  <input
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              ) : (
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-700">{socialPreviewTitle}</p>
                </div>
              )}
            </div>

            {/* Review Gating */}
            <div className="border-b pb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Review Gating (Star Filter)</h2>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isReviewGatingEnabled}
                    onChange={() => setIsReviewGatingEnabled(!isReviewGatingEnabled)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {isReviewGatingEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </label>
              </div>
              {isReviewGatingEnabled && (
                <div className="mt-2 flex items-center text-green-600 text-sm">
                  <FaCheck className="mr-1" />
                  <span>Enabled</span>
                </div>
              )}
            </div>

            {/* Preview Editor */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Preview Editor</h2>
                <button 
                  onClick={handlePreviewEdit}
                  className="text-blue-600 flex items-center text-sm"
                >
                  <FaDesktop className="mr-1" /> {isEditingPreview ? 'Save Preview' : 'Edit Preview'}
                </button>
              </div>
              {isEditingPreview && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className=" text-xl  font-semibold mb-3">Edit Preview Content</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-600 mb-1">Business Name</label>
                      <input
                        type="text"
                        value={tempBusinessName}
                        onChange={(e) => setTempBusinessName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Preview Text</label>
                      <input
                        type="text"
                        value={tempPreviewText}
                        onChange={(e) => setTempPreviewText(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Business Image</label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        onClick={triggerFileInput}
                        className="flex items-center gap-2 text-blue-600 border border-blue-600 rounded px-3 py-2 text-sm"
                      >
                        <FiUpload /> Upload Image
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Separate Desktop Preview Div */}
      <div className="hidden lg:block w-1/3 p-6 bg-gray-50 border-l">
        <div className="sticky top-6">
          <h2 className="text-xl font-semibold mb-4">Desktop Preview</h2>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200 h-auto min-h-[600px] flex flex-col">
            <div className="flex-grow">
              {previewImage && (
                <div className="mb-4">
                  <img 
                    src={previewImage} 
                    alt="Business Preview" 
                    className="w-full h-auto max-h-60 object-contain rounded mx-auto"
                  />
                </div>
              )}
              <h3 className="font-bold text-xl mb-3 text-center">{businessName}</h3>
              <p className="text-gray-700 mb-6 text-center">{previewText}</p>
              
              {/* Star Rating Display */}
              <div className="mb-6 text-center">
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      className="cursor-pointer text-2xl"
                      onClick={() => setRating(star)}
                    >
                      {star <= rating ? (
                        <FaStar className="text-yellow-400 inline" />
                      ) : (
                        <FaRegStar className="text-yellow-400 inline" />
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {rating > 0 ? `You selected ${rating} star${rating !== 1 ? 's' : ''}` : 'Rate your experience'}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={handleLeaveReview}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
              >
                Leave Review
              </button>
              <p className="text-xs text-gray-400 mt-3">Powered by reviewingHUT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewLinkSettings;