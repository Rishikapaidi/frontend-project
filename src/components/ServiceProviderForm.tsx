import React, { useState } from "react";
import {
  MapPin,
  DollarSign,
  Info,
  Calendar,
  PlusCircle,
  Send,
} from "lucide-react";

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

function ServiceProviderForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    providerId: localStorage.getItem("serviceProviderId") || "",
    category: "",
    availability: "",
    contactEmail: "",
    contactPhone: "",
    schedule: [{ day: "Monday", startTime: "", endTime: "" }],
    serviceRadius: { distance: "", unit: "miles" as "miles" | "kilometers" },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleScheduleChange = (
    index: number,
    field: keyof Schedule,
    value: string
  ) => {
    const updated = [...formData.schedule];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, schedule: updated });
  };

  const addScheduleSlot = () => {
    setFormData({
      ...formData,
      schedule: [
        ...formData.schedule,
        { day: "monday", startTime: "", endTime: "" },
      ],
    });
  };

  const removeScheduleSlot = (index: number) => {
    setFormData({
      ...formData,
      schedule: formData.schedule.filter((_, i) => i !== index),
    });
  };

  const handleRadiusChange = (
    field: keyof typeof formData.serviceRadius,
    value: string
  ) => {
    setFormData({
      ...formData,
      serviceRadius: { ...formData.serviceRadius, [field]: value },
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Job title is required";
    else if (formData.title.length < 5)
      newErrors.title = "Title must be at least 5 characters";

    if (!formData.description.trim())
      newErrors.description = "Description is required";
    else if (formData.description.length < 50)
      newErrors.description = "Minimum 50 characters required";

    if (!formData.location.trim()) newErrors.location = "Location is required";

    if (!formData.price.trim()) newErrors.price = "Price is required";
    else if (!/^\d+(\.\d{0,2})?$/.test(formData.price))
      newErrors.price = "Enter valid price (e.g. 50.00)";

    if (!formData.category.trim()) newErrors.category = "Category is required";

    const hasValidSchedule = formData.schedule.every(
      (slot) => slot.startTime && slot.endTime && slot.startTime < slot.endTime
    );
    if (!hasValidSchedule)
      newErrors.schedule = "Each schedule must have valid start/end time";

    if (!formData.serviceRadius.distance.trim())
      newErrors.serviceRadius = "Service radius is required";
    else if (!/^\d+$/.test(formData.serviceRadius.distance))
      newErrors.serviceRadius = "Enter valid number";

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Email is invalid";
    }

    if (
      formData.contactPhone &&
      !/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.contactPhone)
    ) {
      newErrors.contactPhone = "Phone format: (123) 456-7890";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
      setSubmitSuccess(true);

      setTimeout(() => {
        setFormData({
          title: "",
          description: "",
          location: "",
          price: "",
          providerId: localStorage.getItem("serviceProviderId") || "",
          category: "",
          availability: "",
          contactEmail: "",
          contactPhone: "",
          schedule: [{ day: "monday", startTime: "", endTime: "" }],
          serviceRadius: { distance: "", unit: "miles" },
        });
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Home Repair",
    "Cleaning",
    "Landscaping",
    "Tutoring",
    "Personal Training",
    "Web Development",
    "Graphic Design",
    "Photography",
    "Other",
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Submit Job Listing
      </h1>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          Your job listing has been submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title, Category, Description */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Lawn Mowing"
            className={`w-full px-4 py-2 border rounded-md ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Location & Price */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              <MapPin className="inline-block w-4 h-4 mr-1" /> Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              <DollarSign className="inline-block w-4 h-4 mr-1" /> Price
            </label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price}</p>
            )}
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Availability
          </label>
          <input
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Schedule */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Calendar className="inline-block w-4 h-4 mr-1" /> Schedule
          </label>
          {formData.schedule.map((slot, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <select
                value={slot.day}
                onChange={(e) =>
                  handleScheduleChange(index, "day", e.target.value)
                }
                className="flex-1 px-2 py-1 border rounded-md"
              >
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <input
                type="time"
                value={slot.startTime}
                onChange={(e) =>
                  handleScheduleChange(index, "startTime", e.target.value)
                }
                className="flex-1 px-2 py-1 border rounded-md"
              />
              <input
                type="time"
                value={slot.endTime}
                onChange={(e) =>
                  handleScheduleChange(index, "endTime", e.target.value)
                }
                className="flex-1 px-2 py-1 border rounded-md"
              />
              {formData.schedule.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeScheduleSlot(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addScheduleSlot}
            className="flex items-center text-blue-600 hover:underline"
          >
            <PlusCircle className="w-4 h-4 mr-1" /> Add Schedule Slot
          </button>
          {errors.schedule && (
            <p className="text-sm text-red-500">{errors.schedule}</p>
          )}
        </div>

        {/* Service Radius */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Radius
          </label>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Distance"
              value={formData.serviceRadius.distance}
              onChange={(e) => handleRadiusChange("distance", e.target.value)}
              className={`w-20 px-2 py-1 border ${
                errors.serviceRadius ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            <span className="ml-2">miles</span>
          </div>
          {errors.serviceRadius && (
            <p className="text-sm text-red-500">{errors.serviceRadius}</p>
          )}
        </div>

        {/* Contact */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.contactEmail ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.contactEmail && (
              <p className="text-sm text-red-500">{errors.contactEmail}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Phone
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-md flex items-start">
          <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
          <p className="text-sm text-blue-700">
            Your job listing will be reviewed before being published. Make sure
            all information is accurate and follows our community guidelines.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? (
            "Processing..."
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" /> Submit Job Listing
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ServiceProviderForm;
