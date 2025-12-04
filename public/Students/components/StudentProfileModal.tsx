import React, { useState, useEffect } from "react";

const StudentProfileModal = ({ isOpen, onClose, profileData, onSave }) => {
  if (!isOpen) return null;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");

  // Pre-fill fields safely
  useEffect(() => {
    if (profileData) {
      setName(profileData.name || "");
      setPhone(
        profileData.phone && profileData.phone !== "no number"
          ? profileData.phone
          : ""
      );
      setCollege(profileData.college || "");
      setEmail(profileData.email || "");
    }
  }, [profileData]);

  // Save
  const handleSave = async () => {
    // enforce 10-digit phone number if entered
    if (phone && phone.trim() !== "" && phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    const finalName =
      name && name.trim() !== "" ? name.trim() : profileData.username;

    const finalPhone =
      phone && phone.trim() !== "" ? phone.trim() : "no number";

    const finalCollege = college || "";
    const finalEmail = email.trim();

    // Prepare final object
    const finalData = {
      name: finalName,
      phone: finalPhone,
      college: finalCollege,
      email: finalEmail,
    };

    // update DB
    const res = await fetch("/api/student/auth/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: profileData.id || profileData._id,
        ...finalData,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Update failed");
      return;
    }

    // send updated data back to App.tsx
    onSave({
      ...profileData,
      ...finalData,
      firstLogin: false,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>

        {/* Full Name */}
        <label className="block mb-2">Full Name</label>
        <input
          className="w-full border p-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter full name"
        />

        {/* Phone */}
        <label className="block mb-2">Contact Number</label>
        <input
          className="w-full border p-2 mb-4"
          value={phone}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val) && val.length <= 10) {
              setPhone(val);
            }
          }}
          placeholder="10-digit number"
          maxLength={10}
        />

        {/* College */}
        <label className="block mb-2">College</label>
        <input
          className="w-full border p-2 mb-4"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          placeholder="College Name"
        />

        {/* Email */}
        <label className="block mb-2">Email</label>
        <input
          className="w-full border p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileModal;
