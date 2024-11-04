import axios from 'axios';
import { LinkedInProfile } from '../types';

const LINKEDIN_API_URL = 'https://api.linkedin.com/v2';

interface LinkedInAPIConfig {
  accessToken: string;
}

export class LinkedInService {
  private config: LinkedInAPIConfig;

  constructor(config: LinkedInAPIConfig) {
    this.config = config;
  }

  async getProfileByUrl(profileUrl: string): Promise<LinkedInProfile> {
    try {
      // Extract LinkedIn ID or vanity URL from the profile URL
      const profileId = this.extractProfileId(profileUrl);
      
      // Get basic profile information
      const profileResponse = await axios.get(`${LINKEDIN_API_URL}/people/${profileId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      // Get additional profile details
      const [activities, interests] = await Promise.all([
        this.getRecentActivities(profileId),
        this.getInterests(profileId)
      ]);

      return {
        name: `${profileResponse.data.localizedFirstName} ${profileResponse.data.localizedLastName}`,
        jobTitle: profileResponse.data.positions?.values?.[0]?.title || '',
        company: profileResponse.data.positions?.values?.[0]?.company?.name || '',
        recentActivities: activities,
        interests: interests,
        achievements: profileResponse.data.summary || ''
      };
    } catch (error) {
      console.error('Error fetching LinkedIn profile:', error);
      throw new Error('Failed to fetch LinkedIn profile. Please check the URL and try again.');
    }
  }

  private extractProfileId(profileUrl: string): string {
    const match = profileUrl.match(/linkedin\.com\/in\/([^\/]+)/);
    if (!match) {
      throw new Error('Invalid LinkedIn profile URL');
    }
    return match[1];
  }

  private async getRecentActivities(profileId: string): Promise<string> {
    try {
      const response = await axios.get(`${LINKEDIN_API_URL}/people/${profileId}/networkupdates`, {
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });
      return response.data.values?.map((activity: any) => activity.updateContent).join('\n') || '';
    } catch (error) {
      console.warn('Failed to fetch activities:', error);
      return '';
    }
  }

  private async getInterests(profileId: string): Promise<string> {
    try {
      const response = await axios.get(`${LINKEDIN_API_URL}/people/${profileId}/following`, {
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });
      return response.data.values?.map((interest: any) => interest.name).join(', ') || '';
    } catch (error) {
      console.warn('Failed to fetch interests:', error);
      return '';
    }
  }
}