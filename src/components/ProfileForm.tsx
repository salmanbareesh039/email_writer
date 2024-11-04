import React, { useState } from 'react';

interface ProfileFormProps {
  onSubmit: (profileContent: string) => void;
  isLoading: boolean;
}

export default function ProfileForm({ onSubmit, isLoading }: ProfileFormProps) {
  const [profileContent, setProfileContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profileContent);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#F8F9FA] p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-[#0A2463] mb-4">LinkedIn Profile Content</h2>
        <div className="mb-4">
          <div className="text-gray-600 space-y-2">
            <p>To generate a personalized email, please provide:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Full name and current position</li>
              <li>Company and industry details</li>
              <li>Recent activities and posts</li>
              <li>Professional interests and achievements</li>
            </ul>
          </div>
        </div>
        <textarea
          id="profileContent"
          value={profileContent}
          onChange={(e) => setProfileContent(e.target.value)}
          rows={8}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00B32C] focus:ring-[#00B32C] transition-colors"
          placeholder="Paste the LinkedIn profile content here..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#00B32C] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#009424] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Email...
          </span>
        ) : (
          'Generate Personalized Email'
        )}
      </button>
    </form>
  );
}