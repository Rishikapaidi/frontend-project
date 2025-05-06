import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get("/api/user/profile").then((res) => setProfile(res.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    axios.put("/api/user/profile", profile).then(() => setEditMode(false));
  };

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile || !e.target.files) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setProfile({ ...profile, profilePicture: url });
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
      <div className="flex flex-col items-center space-y-4">
        <img
          src={profile.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
        {editMode && <input type="file" onChange={handlePictureUpload} />}
      </div>
      <form className="mt-4 space-y-3">
        {["name", "email", "phone"].map((field) => (
          <input
            key={field}
            name={field}
            value={(profile as any)[field]}
            onChange={handleChange}
            readOnly={!editMode}
            className="w-full px-3 py-2 border rounded"
          />
        ))}
      </form>
      <div className="mt-4 text-center">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={editMode ? handleSave : () => setEditMode(true)}
        >
          {editMode ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
