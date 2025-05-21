"use client"

import React, { useState, useRef } from "react"
import { Edit, Mountain, Star, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar"
import ConfirmDialog from "@/components/confirm-dialog"

interface ReviewPageSettings {
  businessName: string;
  previewText: string;
  previewImage: string | null;
  reviewLinkUrl: string;
  socialPreviewTitle: string;
  isReviewGatingEnabled: boolean;
  rating: number;
  googleReviewUrl: string;
}

export default function ReviewLinkPage() {
  const [settings, setSettings] = useState<ReviewPageSettings>({
    businessName: "DONER HUT",
    previewText: "How was your experience with Doner Hut?",
    previewImage: null,
    reviewLinkUrl: "https://go.reviewhut.com/doner-hut",
    socialPreviewTitle: "Do you want to leave us a review?",
    isReviewGatingEnabled: true,
    rating: 0,
    googleReviewUrl: "https://www.google.com/search?q=doner+hut+reviews"
  });

  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingPreview, setIsEditingPreview] = useState(false);
  const [showGatingConfirm, setShowGatingConfirm] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const [tempSettings, setTempSettings] = useState<ReviewPageSettings>({...settings});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlEdit = () => {
    if (isEditingUrl) {
      setSettings({...settings, reviewLinkUrl: tempSettings.reviewLinkUrl});
    }
    setIsEditingUrl(!isEditingUrl);
  }

  const handleTitleEdit = () => {
    if (isEditingTitle) {
      setSettings({...settings, socialPreviewTitle: tempSettings.socialPreviewTitle});
    }
    setIsEditingTitle(!isEditingTitle);
  }

  const handlePreviewEdit = () => {
    if (isEditingPreview) {
      setSettings({
        ...settings,
        businessName: tempSettings.businessName,
        previewText: tempSettings.previewText,
        previewImage: tempSettings.previewImage,
        googleReviewUrl: tempSettings.googleReviewUrl
      });
    } else {
      setTempSettings({...settings});
    }
    setIsEditingPreview(!isEditingPreview);
  }

  const generateNewLink = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    const newLink = `https://go.reviewhut.com/${randomString}`;
    setSettings({...settings, reviewLinkUrl: newLink});
    setTempSettings({...tempSettings, reviewLinkUrl: newLink});
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempSettings({...tempSettings, previewImage: event.target.result as string});
        }
      }
      reader.readAsDataURL(file);
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  }

  const handleRatingChange = (rating: number) => {
    setSettings({...settings, rating});
    setSubmitted(false);
  }

  const handleSubmitFeedback = () => {
    console.log("Feedback submitted:", feedback);
    setSubmitted(true);
  };

  const handleLeaveReview = () => {
    if (settings.isReviewGatingEnabled) {
      if (settings.rating > 3) {
        window.open(settings.googleReviewUrl, "_blank");
      } else {
        // For negative reviews, show feedback form
        if (submitted) {
          window.location.href = "/";
        }
      }
    } else {
      window.open(settings.googleReviewUrl, "_blank");
    }
  }

  const handleToggleReviewGating = () => {
    if (settings.isReviewGatingEnabled) {
      setShowGatingConfirm(true);
    } else {
      setSettings({...settings, isReviewGatingEnabled: true});
    }
  }

  const confirmDisableGating = () => {
    setSettings({...settings, isReviewGatingEnabled: false});
    setShowGatingConfirm(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isAdmin={false} />

      <div className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Review Link</h1>
          <p className="text-muted-foreground mb-8">
            Customize the behavior, text, and images of your Review Link. Changes made here will appear on your public review page.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Review Link URL */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Edit Review Link URL</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleUrlEdit}
                      aria-label={isEditingUrl ? "Save URL" : "Edit URL"}
                    >
                      <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
                      {isEditingUrl ? "Save" : "Edit"}
                    </Button>
                  </div>
                  <CardDescription>This is the URL you'll share with customers to collect reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditingUrl ? (
                    <div className="space-y-4">
                      <Input
                        value={tempSettings.reviewLinkUrl}
                        onChange={(e) => setTempSettings({...tempSettings, reviewLinkUrl: e.target.value})}
                        aria-label="Review link URL"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateNewLink}
                        aria-label="Generate new review link"
                      >
                        Generate New Link
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-muted p-3 rounded">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{settings.reviewLinkUrl}</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={settings.reviewLinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Test review link in new window"
                        >
                          Test Link
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Social Preview Title */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Social Preview Title</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleTitleEdit}
                      aria-label={isEditingTitle ? "Save title" : "Edit title"}
                    >
                      <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
                      {isEditingTitle ? "Save" : "Edit"}
                    </Button>
                  </div>
                  <CardDescription>This title appears when your review link is shared on social media</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditingTitle ? (
                    <Input
                      value={tempSettings.socialPreviewTitle}
                      onChange={(e) => setTempSettings({...tempSettings, socialPreviewTitle: e.target.value})}
                      aria-label="Social preview title"
                    />
                  ) : (
                    <div className="bg-muted p-3 rounded">
                      <p className="text-sm font-medium">{settings.socialPreviewTitle}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Review Gating */}
              <Card>
                <CardHeader>
                  <CardTitle>Review Gating (Star Filter)</CardTitle>
                  <CardDescription>
                    When enabled, only customers with positive experiences (4-5 stars) will be directed to leave public
                    reviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="review-gating">{settings.isReviewGatingEnabled ? "Enabled" : "Disabled"}</Label>
                      {settings.isReviewGatingEnabled && (
                        <p className="text-sm text-muted-foreground">
                          Negative reviews will be sent to your feedback form instead
                        </p>
                      )}
                    </div>
                    <Switch
                      id="review-gating"
                      checked={settings.isReviewGatingEnabled}
                      onCheckedChange={handleToggleReviewGating}
                      aria-label="Toggle review gating"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Preview Editor */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Preview Editor</CardTitle>
                    <Button
                      variant="outline"
                      onClick={handlePreviewEdit}
                      aria-label={isEditingPreview ? "Save preview" : "Edit preview"}
                    >
                      {isEditingPreview ? "Save Preview" : "Edit Preview"}
                    </Button>
                  </div>
                  <CardDescription>Customize how your review collection page looks to customers</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditingPreview ? (
                    <div className="space-y-6">
                      <div className="border rounded-lg p-6 bg-white">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-semibold">Webpage Design</h2>
                          <Button variant="ghost" size="sm" onClick={() => setIsEditingPreview(false)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="business-name">Business Name</Label>
                            <Input
                              id="business-name"
                              value={tempSettings.businessName}
                              onChange={(e) => setTempSettings({...tempSettings, businessName: e.target.value})}
                              aria-label="Business name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="preview-text">Welcome Message</Label>
                            <Input
                              id="preview-text"
                              value={tempSettings.previewText}
                              onChange={(e) => setTempSettings({...tempSettings, previewText: e.target.value})}
                              aria-label="Preview text"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Business Logo/Image</Label>
                            <div className="flex items-center gap-4">
                              {tempSettings.previewImage ? (
                                <div className="relative">
                                  <img
                                    src={tempSettings.previewImage}
                                    alt="Business Preview"
                                    className="w-20 h-20 object-cover rounded"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white border"
                                    onClick={() => setTempSettings({...tempSettings, previewImage: null})}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                                  <Mountain className="h-8 w-8 text-gray-400" />
                                </div>
                              )}
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                                aria-label="Upload business image"
                              />
                              <Button variant="outline" onClick={triggerFileInput}>
                                <Upload className="h-4 w-4 mr-2" />
                                {tempSettings.previewImage ? "Change Image" : "Upload Image"}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="google-url">Google Review URL</Label>
                            <Input
                              id="google-url"
                              value={tempSettings.googleReviewUrl}
                              onChange={(e) => setTempSettings({...tempSettings, googleReviewUrl: e.target.value})}
                              aria-label="Google review URL"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Color Theme</Label>
                            <div className="flex gap-2">
                              {['primary', 'blue', 'green', 'red', 'purple', 'orange'].map((color) => (
                                <button
                                  key={color}
                                  className={`w-8 h-8 rounded-full bg-${color}-500 border-2 border-transparent hover:border-gray-300`}
                                  aria-label={`Select ${color} theme`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsEditingPreview(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handlePreviewEdit}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Click "Edit Preview" to customize your review collection page
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Desktop Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>How customers will see your review page</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white p-6 border rounded-lg min-h-[500px] flex flex-col">
                      <div className="flex-grow">
                        {settings.previewImage ? (
                          <div className="mb-4">
                            <img
                              src={settings.previewImage}
                              alt="Business Preview"
                              className="w-full h-auto max-h-40 object-contain rounded mx-auto"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mountain className="h-8 w-8 text-orange" aria-hidden="true" />
                          </div>
                        )}
                        <h3 className="font-bold text-xl mb-3 text-center">{settings.businessName}</h3>
                        <p className="text-muted-foreground mb-6 text-center">{settings.previewText}</p>

                        {/* Star Rating Display */}
                        <div className="mb-6 text-center">
                          <div className="flex justify-center space-x-1" role="group" aria-label="Rate your experience">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                className="focus:outline-none"
                                onClick={() => handleRatingChange(star)}
                                aria-label={`${star} star${star !== 1 ? "s" : ""}`}
                                aria-pressed={star <= settings.rating}
                              >
                                {star <= settings.rating ? (
                                  <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                                ) : (
                                  <Star className="h-8 w-8 text-gray-300" aria-hidden="true" />
                                )}
                              </button>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {settings.rating > 0
                              ? `You selected ${settings.rating} star${settings.rating !== 1 ? "s" : ""}`
                              : "Rate your experience"}
                          </p>
                        </div>

                        {/* Review Gating Logic */}
                        {settings.rating > 0 && settings.isReviewGatingEnabled && settings.rating <= 3 && !submitted && (
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

                        {settings.rating > 0 && (
                          (!settings.isReviewGatingEnabled || settings.rating > 3 || submitted) && (
                            <div className="text-center">
                              {settings.rating > 3 && (
                                <p className="text-green-600 font-medium mb-2">
                                  We're glad you enjoyed it! Please leave us a public review:
                                </p>
                              )}
                              {submitted && (
                                <p className="text-green-600 font-medium mb-2">
                                  Thank you for your feedback!
                                </p>
                              )}
                              <Button 
                                onClick={handleLeaveReview} 
                                disabled={settings.rating === 0 || 
                                  (settings.isReviewGatingEnabled && 
                                   settings.rating <= 3 && 
                                   !submitted)}
                              >
                                {settings.rating > 3 || !settings.isReviewGatingEnabled 
                                  ? "Leave Review" 
                                  : "Continue"}
                              </Button>
                            </div>
                          )
                        )}
                      </div>

                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mt-3">Powered by ReviewHUT</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog for Disabling Review Gating */}
      <ConfirmDialog
        isOpen={showGatingConfirm}
        onClose={() => setShowGatingConfirm(false)}
        onConfirm={confirmDisableGating}
        title="Disable Review Gating"
        description="Are you sure you want to disable review gating? All customers will be directed to leave public reviews regardless of their rating."
        confirmText="Disable"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}