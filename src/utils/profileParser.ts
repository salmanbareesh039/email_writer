import { LinkedInProfile } from '../types';

export function parseLinkedInProfile(content: string): LinkedInProfile {
  if (!content.trim()) {
    throw new Error('Please paste the LinkedIn profile content');
  }

  // Split content into lines for better parsing
  const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
  
  // Get the first non-empty line as name
  const name = lines[0] || 'Unknown Name';

  // Look for job title and company in the first few lines
  let jobTitle = 'Unknown Position';
  let company = 'Unknown Company';
  
  for (let i = 1; i < Math.min(5, lines.length); i++) {
    const line = lines[i].toLowerCase();
    
    // Common job title indicators
    if (line.includes('engineer') || 
        line.includes('manager') || 
        line.includes('director') ||
        line.includes('developer') ||
        line.includes('designer') ||
        line.includes('consultant') ||
        line.includes('specialist') ||
        line.includes('lead') ||
        line.includes('architect')) {
      jobTitle = lines[i];
    }
    
    // Company indicators
    if (line.includes('at ') || line.includes('@')) {
      company = lines[i].split(/(?:at |@)/i)[1] || company;
    }
  }

  // Get recent activities (last few lines that look like activities)
  const recentActivities = lines
    .filter(line => 
      line.toLowerCase().includes('liked') ||
      line.toLowerCase().includes('shared') ||
      line.toLowerCase().includes('commented') ||
      line.toLowerCase().includes('posted'))
    .slice(-3)
    .join(' ');

  // Look for interests section
  const interestsSection = content.toLowerCase().indexOf('interests');
  const interests = interestsSection !== -1 
    ? content.slice(interestsSection).split('\n').slice(1, 4).join(' ')
    : '';

  // Look for achievements (lines with numbers)
  const achievements = lines
    .filter(line => 
      /\d+/.test(line) && 
      (line.toLowerCase().includes('year') ||
       line.toLowerCase().includes('project') ||
       line.toLowerCase().includes('client') ||
       line.toLowerCase().includes('award') ||
       line.toLowerCase().includes('certification')))
    .join(' ');

  return {
    name: name.replace(/[^\w\s.-]/g, '').trim(),
    jobTitle: jobTitle.trim(),
    company: company.replace(/[^\w\s&.-]/g, '').trim(),
    recentActivities: recentActivities || 'No recent activities found',
    interests: interests || 'No specific interests found',
    achievements: achievements || 'No specific achievements found'
  };
}