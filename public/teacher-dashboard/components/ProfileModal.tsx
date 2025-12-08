import React, { useState, useEffect } from "react";
import type { TeacherProfile } from "../types";
import { CloseIcon, SaveIcon } from "./icons";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: TeacherProfile) => void;
  profileData: TeacherProfile;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  profileData,
}) => {
  const [formData, setFormData] = useState<any>({});



  useEffect(() => {
    if (profileData) {
      setFormData({
        ...profileData,
        id: profileData.id,
      });
    }
  }, [profileData, isOpen]);



  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Phone validation
    if (name === "phone") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData((prev) => ({ ...prev, phone: value }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (formData.phone && formData.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    const payload = {
      id: formData.id, // REQUIRED
      name: formData.name,
      prefix: formData.prefix,
      phone: formData.phone,
      college: formData.college,
      email: formData.email,
    };

    console.log("Sending update payload:", payload); // debug

    const res = await fetch("/api/teacher/auth/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Update failed");
      return;
    }

    onSave(data.teacher);
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-fade-in-down">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <form className="space-y-4">
            {/* Prefix + Name */}
            <div className="flex gap-4">
              <div className="w-1/4">
                <label className="block text-sm font-medium text-gray-700">
                  Prefix
                </label>
                <input
                  type="text"
                  name="prefix"
                  value={formData.prefix || ""}
                  onChange={handleChange}
                  placeholder="Prof."
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md py-2 px-3"
                />
              </div>

              <div className="w-3/4">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md py-2 px-3"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="10-digit number"
                maxLength={10}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md py-2 px-3"
              />
            </div>

            {/* College */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                College
              </label>
              <input
                type="text"
                name="college"
                value={formData.college || ""}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md py-2 px-3"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md py-2 px-3"
              />
            </div>
          </form>
        </div>

        <div className="flex justify-end p-4 bg-gray-50 border-t gap-3">
          <button
            onClick={onClose}
            className="py-2 px-4 border rounded bg-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="py-2 px-4 rounded bg-blue-600 text-white flex items-center gap-2"
          >
            <SaveIcon className="w-5 h-5" /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
