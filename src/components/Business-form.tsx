// --- Entire Updated File ---
import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaGlobe,
  FaBuilding,
  FaCheckCircle,
  FaWhatsapp,
  FaExclamationCircle,
  FaSpinner,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Type definition for our form data
interface BusinessFormData {
  businessName: string;
  location: string;
  branch: string;
  businessType: string;
  customBusinessType: string;
  branchCount: string;
  contactEmail: string;
  contactPhone: string;
  whatsapp: string;
  secondaryEmail: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  website: string;
  description: string;
}

export default function BusinessForm() {
  const [formData, setFormData] = useState<BusinessFormData>({
    businessName: "",
    location: "",
    branch: "",
    businessType: "",
    customBusinessType: "",
    branchCount: "",
    contactEmail: "",
    contactPhone: "",
    whatsapp: "",
    secondaryEmail: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    website: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Required fields for each step
  const requiredFields = [
    ["businessName", "location", "branch"],
    ["businessType", "branchCount"],
    ["contactEmail", "contactPhone"],
    [], // Social & Web step has no required fields
    ["description"],
  ];

  const validateStep = (step: number) => {
    const currentErrors: Record<string, string> = {};
    const fieldsToValidate = requiredFields[step];
    
    fieldsToValidate.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        currentErrors[field] = "This field is required";
      }
    });

    // Additional validation for specific fields
    if (step === 2) {
      // Email validation
      if (formData.contactEmail && !/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
        currentErrors.contactEmail = "Please enter a valid email";
      }
      
      // Phone validation (basic)
      if (formData.contactPhone && !/^[+]?[\d\s-]+$/.test(formData.contactPhone)) {
        currentErrors.contactPhone = "Please enter a valid phone number";
      }
      
      // WhatsApp validation (if provided)
      if (formData.whatsapp && !/^[+]?[\d\s-]+$/.test(formData.whatsapp)) {
        currentErrors.whatsapp = "Please enter a valid WhatsApp number";
      }
    }

    // Custom business type validation if "Other" is selected
    if (step === 1 && formData.businessType === "Other" && !formData.customBusinessType) {
      currentErrors.customBusinessType = "Please specify your business type";
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };

  const submitFormData = async (data: BusinessFormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://api.yourbackend.com/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization header if needed
          // 'Authorization': 'Bearer your-token-here',
        },
        body: JSON.stringify({
          ...data,
          businessType: data.businessType === "Other" ? data.customBusinessType : data.businessType,
          // Add any additional transformations here
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      const result = await response.json();
      setSubmitSuccess(true);
      console.log('Submission successful:', result);
      return result;
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation before submit
    let isValid = true;
    const finalErrors: Record<string, string> = {};
    
    requiredFields.flat().forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        finalErrors[field] = "This field is required";
        isValid = false;
      }
    });
    
    setErrors(finalErrors);
    
    if (isValid) {
      try {
        await submitFormData(formData);
        // On success, we'll show the success state in the UI
      } catch (error) {
        // Error is already handled in submitFormData
      }
    } else {
      // Jump to the first step with errors
      const firstErrorField = Object.keys(finalErrors)[0];
      const errorStep = requiredFields.findIndex(stepFields => 
        stepFields.includes(firstErrorField)
      );
      if (errorStep >= 0) {
        setStep(errorStep);
      }
    }
  };

  const steps = [
    {
      title: "Business Info",
      fields: [
        { 
          label: "Business Name", 
          name: "businessName", 
          placeholder: "My Company", 
          icon: <FaBuilding />,
          required: true
        },
        { 
          label: "Location", 
          name: "location", 
          placeholder: "City, State", 
          icon: <FaMapMarkerAlt />,
          required: true
        },
        { 
          label: "Branch", 
          name: "branch", 
          placeholder: "Branch Name", 
          icon: <FaMapMarkerAlt />,
          required: true
        },
      ],
    },
    {
      title: "Business Type & Count",
      fields: [
        {
          label: "Business Type",
          name: "businessType",
          type: "select",
          options: ["Retail", "Restaurant", "Service", "Tech", "Other"],
          required: true
        },
        ...(formData.businessType === "Other"
          ? [{ 
              label: "Custom Business Type", 
              name: "customBusinessType", 
              placeholder: "Specify your type",
              required: true
            }]
          : []),
        {
          label: "Branch Count",
          name: "branchCount",
          type: "select",
          options: ["1", "2-5", "6-10", "11+"],
          required: true
        },
      ],
    },
    {
      title: "Contact Info",
      fields: [
        { 
          label: "Email", 
          name: "contactEmail", 
          type: "email", 
          placeholder: "you@example.com", 
          icon: <FaEnvelope />,
          required: true
        },
        { 
          label: "Phone", 
          name: "contactPhone", 
          type: "tel", 
          placeholder: "+1 234 567 890", 
          icon: <FaPhone />,
          required: true
        },
        { 
          label: "WhatsApp", 
          name: "whatsapp", 
          type: "tel", 
          placeholder: "WhatsApp number", 
          icon: <FaWhatsapp className="text-green-500" />,
          required: false
        },
      ],
    },
    {
      title: "Social & Web",
      fields: [
        { 
          label: "Secondary Email", 
          name: "secondaryEmail", 
          placeholder: "team@example.com", 
          icon: <FaEnvelope />,
          required: false
        },
        { 
          label: "Facebook", 
          name: "facebook", 
          placeholder: "https://facebook.com/yourpage", 
          icon: <FaFacebook className="text-blue-600" />,
          required: false
        },
        { 
          label: "Instagram", 
          name: "instagram", 
          placeholder: "https://instagram.com/yourprofile", 
          icon: <FaInstagram className="text-pink-500" />,
          required: false
        },
        { 
          label: "LinkedIn", 
          name: "linkedin", 
          placeholder: "https://linkedin.com/company", 
          icon: <FaLinkedin className="text-blue-700" />,
          required: false
        },
        { 
          label: "Website", 
          name: "website", 
          placeholder: "https://yourcompany.com", 
          icon: <FaGlobe />,
          required: false
        },
      ],
    },
    {
      title: "About",
      fields: [
        { 
          label: "Short Description", 
          name: "description", 
          type: "textarea", 
          placeholder: "Describe your business...",
          required: true
        },
      ],
    },
  ];

  const fieldLabels: Record<string, string> = {
    businessName: "Business Name",
    location: "Location",
    branch: "Branch",
    businessType: "Business Type",
    customBusinessType: "Custom Type",
    branchCount: "Branch Count",
    contactEmail: "Email",
    contactPhone: "Phone",
    whatsapp: "WhatsApp",
    secondaryEmail: "Secondary Email",
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    website: "Website",
    description: "Description",
  };

  const renderField = (field: any) => {
    const { name, label, type, placeholder, icon, options, required } = field;
    const value = (formData as any)[name];
    const error = errors[name];
    
    return (
      <div key={name} className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {type === "select" ? (
          <div className="relative">
            <select
              name={name}
              value={value}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${error ? "border-red-500" : ""}`}
              required={required}
            >
              <option value="">--Select--</option>
              {options.map((opt: string) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {error && (
              <div className="absolute right-3 top-2.5 text-red-500">
                <FaExclamationCircle />
              </div>
            )}
          </div>
        ) : type === "textarea" ? (
          <div className="relative">
            <textarea
              name={name}
              value={value}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${error ? "border-red-500" : ""}`}
              placeholder={placeholder}
              required={required}
              rows={4}
            />
            {error && (
              <div className="absolute right-3 top-2.5 text-red-500">
                <FaExclamationCircle />
              </div>
            )}
          </div>
        ) : (
          <div className={`flex items-center border px-3 py-2 rounded ${error ? "border-red-500" : ""}`}>
            {icon && <span className="mr-2">{icon}</span>}
            <input
              name={name}
              type={type || "text"}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full outline-none bg-transparent"
              required={required}
            />
            {error && <span className="text-red-500 ml-2"><FaExclamationCircle /></span>}
          </div>
        )}
        {error && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            <FaExclamationCircle className="mr-1" /> {error}
          </p>
        )}
      </div>
    );
  };

  if (submitSuccess) {
    return (
      <div className="max-w-3xl mx-auto bg-white border p-6 shadow-md mt-10 rounded-lg text-center">
        <div className="text-green-500 text-6xl mb-4">
          <FaCheckCircle />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-green-700">Submission Successful!</h2>
        <p className="mb-6">Your business information has been successfully submitted.</p>
        <Link 
          to="/components/business/dashboard" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white border p-6 shadow-md mt-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-700">
        {reviewing ? "🎉 Review Your Details" : steps[step].title}
      </h2>

      {submitError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded flex items-center">
          <FaExclamationCircle className="mr-2" />
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {!reviewing ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              {steps[step].fields.map(renderField)}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                {step === steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep(step)) {
                        setReviewing(true);
                      }
                    }}
                    className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                  >
                    Review
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Next
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid gap-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData).map(([key, value]) => {
                  const show = value && (key !== "customBusinessType" || formData.businessType === "Other");
                  return show ? (
                    <div
                      key={key}
                      className="flex items-start border rounded-lg p-4 shadow-sm bg-gradient-to-br from-orange-50 to-white"
                    >
                      <div className="text-green-500 mt-1 mr-2">
                        <FaCheckCircle />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 font-medium">{fieldLabels[key]}</div>
                        <div className="text-gray-800 font-semibold">{value}</div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setReviewing(false)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <Link to="/components/business/dashboard">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center min-w-32"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Confirm & Submit"
                  )}
                </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}