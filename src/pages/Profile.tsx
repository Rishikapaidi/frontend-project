import React from 'react';

const Profile: React.FC = () => {
  // Static for now; expand based on auth context
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Profile</h2>
      <p>Name: Gamma Baby</p>
      <p>Email: gamma@gmail.com</p>
      <p>Role: Service Provider</p>
    </div>
  );
};

export default Profile;
