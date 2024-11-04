import React from 'react';
import { EmailTemplate } from '../types';

interface EmailPreviewProps {
  email: EmailTemplate | null;
}

export default function EmailPreview({ email }: EmailPreviewProps) {
  if (!email) return null;

  return (
    <div className="mt-8 bg-[#F8F9FA] rounded-lg p-6">
      <h2 className="text-2xl font-bold text-[#0A2463] mb-6">Generated Email</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#0A2463] mb-2">Preview Text</h3>
          <p className="text-gray-600 bg-white p-4 rounded-lg border border-gray-200">
            {email.preview}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#0A2463] mb-2">Email Body</h3>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            {email.body.split('\n').map((line, index) => (
              <p key={index} className="text-gray-600 mb-2">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => navigator.clipboard.writeText(email.body)}
            className="flex items-center space-x-2 bg-[#0A2463] text-white px-6 py-2 rounded-lg hover:bg-[#083057] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span>Copy to Clipboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}