import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ProfileForm from './components/ProfileForm';
import EmailPreview from './components/EmailPreview';
import { generateEmail } from './services/groqService';
import { parseLinkedInProfile } from './utils/profileParser';
import { LinkedInProfile, EmailTemplate } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<EmailTemplate | null>(null);

  const handleSubmit = async (profileContent: string) => {
    setIsLoading(true);
    try {
      const profile = parseLinkedInProfile(profileContent);
      const email = await generateEmail(profile);
      setGeneratedEmail(email);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate email. Please try again.');
      console.error('Error generating email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#0A2463]">LINK<span className="text-[#00B32C]">COASTERS</span></span>
            </div>
            <button className="bg-[#00B32C] text-white px-6 py-2 rounded-md hover:bg-[#009424] transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0A2463] mb-4">
            Generate Personalized Outreach Emails
          </h1>
          <p className="text-xl text-gray-600">
            Create highly effective, personalized emails for your link-building campaigns
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-8">
              <ProfileForm onSubmit={handleSubmit} isLoading={isLoading} />
              {generatedEmail && <EmailPreview email={generatedEmail} />}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A2463] text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>© 2024 Linkcoasters. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <Toaster position="top-right" />
    </div>
  );
}