// Note: In a real implementation, the API key should be handled securely
// This is a client-side demo - in production, use environment variables and a backend proxy

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface ChatMessage {
  message: string;
  isUser: boolean;
}

// Course database for context
const COURSE_DATABASE = {
  "digital_marketing": {
    "title": "Digital Marketing for Tourism",
    "description": "Master social media, content creation, and online promotion strategies for tourism businesses",
    "skills": ["Social Media Management", "Content Creation", "SEO Basics", "Online Advertising"],
    "tools": ["Facebook", "Instagram", "TikTok", "Google Ads", "Canva"]
  },
  "photography": {
    "title": "Photography & Visual Storytelling",
    "description": "Learn professional photography techniques and visual storytelling for tourism content",
    "skills": ["Composition", "Lighting", "Photo Editing", "Storytelling"],
    "tools": ["DSLR Camera", "Smartphone Photography", "Lightroom", "Photoshop"]
  },
  "ai_tools": {
    "title": "AI Tools for Content Creation",
    "description": "Utilize AI-powered tools to enhance content creation and customer service",
    "skills": ["AI Writing", "Image Generation", "Voice Synthesis", "Chatbot Development"],
    "tools": ["ChatGPT", "Midjourney", "Canva AI", "Google Bard"]
  },
  "data_analysis": {
    "title": "Data Analysis for Tourism",
    "description": "Learn to collect, analyze, and interpret tourism data for better decision making",
    "skills": ["Excel Analytics", "Google Analytics", "Data Visualization", "Trend Analysis"],
    "tools": ["Excel", "Google Analytics", "Tableau", "Power BI"]
  },
  "customer_service": {
    "title": "Digital Customer Service Excellence",
    "description": "Master online customer service and relationship management techniques",
    "skills": ["Live Chat Management", "Email Marketing", "CRM Usage", "Customer Feedback"],
    "tools": ["Zendesk", "WhatsApp Business", "Mailchimp", "HubSpot"]
  },
  "content_creation": {
    "title": "Content Creation & Storytelling",
    "description": "Create engaging content across multiple platforms to attract tourists",
    "skills": ["Video Editing", "Blog Writing", "Podcast Creation", "Live Streaming"],
    "tools": ["Adobe Premiere", "WordPress", "Anchor", "OBS Studio"]
  },
  "virtual_tours": {
    "title": "Virtual & Augmented Reality Tours",
    "description": "Create immersive virtual experiences for remote tourists",
    "skills": ["360° Photography", "VR Content Creation", "AR Development", "3D Modeling"],
    "tools": ["360 Camera", "Unity", "Blender", "Google Earth VR"]
  },
  "language_tech": {
    "title": "Language Technology & Translation",
    "description": "Use AI-powered translation and language learning tools effectively",
    "skills": ["Real-time Translation", "Language Learning", "Voice Recognition", "Cultural Adaptation"],
    "tools": ["Google Translate", "DeepL", "Duolingo", "Speechify"]
  },
  "booking_systems": {
    "title": "Online Booking & Payment Systems",
    "description": "Manage digital booking platforms and payment processing efficiently",
    "skills": ["Booking Management", "Payment Processing", "Inventory Control", "Pricing Strategy"],
    "tools": ["Booking.com", "Airbnb", "Stripe", "PayPal", "Square"]
  },
  "sustainability": {
    "title": "Sustainable Tourism Technology",
    "description": "Implement eco-friendly technology solutions in tourism operations",
    "skills": ["Carbon Footprint Tracking", "Sustainable Marketing", "Green Technology", "Impact Measurement"],
    "tools": ["Sustainability Apps", "Carbon Calculators", "Green Certification Platforms", "Impact Dashboards"]
  }
};

class GeminiService {
  private apiKey: string | null = null;
  private endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

  constructor() {
    // In a real app, this would be securely handled
    this.apiKey = prompt('Please enter your Gemini API key:') || null;
  }

  private getSystemPrompt(): string {
    return `You are an AI assistant for DESIGN24's "AI Skills for Tour Guides" course. You help tour guides learn and apply AI technologies in their work.

Course Information:
${Object.entries(COURSE_DATABASE).map(([key, course]) => 
  `${course.title}: ${course.description}\nSkills: ${course.skills.join(', ')}\nTools: ${course.tools.join(', ')}`
).join('\n\n')}

Guidelines:
- Be helpful, professional, and encouraging
- Provide practical advice related to tourism and AI skills
- Reference specific course modules when relevant
- Keep responses concise but informative
- Focus on actionable insights for tour guides
- Maintain a friendly, expert tone

Always aim to help tour guides understand how AI can enhance their work and improve tourist experiences.`;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async sendMessage(messages: ChatMessage[], userMessage: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not provided. Please refresh and enter your API key.');
    }

    try {
      // Build conversation context
      const conversationHistory = messages
        .slice(-10) // Limit context to last 10 messages
        .map(msg => `${msg.isUser ? 'User' : 'Assistant'}: ${msg.message}`)
        .join('\n');

      const fullPrompt = `${this.getSystemPrompt()}

${conversationHistory ? `Previous conversation:\n${conversationHistory}\n` : ''}

User: ${userMessage}

Please provide a helpful response:`;

      const requestBody = {
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${this.endpoint}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response from Gemini API');
      }

      const responseText = data.candidates[0].content.parts[0]?.text || 'Sorry, I could not generate a response.';
      return this.escapeHtml(responseText);

    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return 'Sorry, the request timed out. Please try again.';
        }
        console.error('Gemini API Error:', error);
        return `I apologize, but I encountered an error: ${error.message}. Please try again.`;
      }
      return 'An unexpected error occurred. Please try again.';
    }
  }

  // Method to check if API key is configured
  isConfigured(): boolean {
    return this.apiKey !== null && this.apiKey.trim() !== '';
  }

  // Method to update API key
  updateApiKey(newKey: string): void {
    this.apiKey = newKey;
  }
}

// Create singleton instance
const geminiService = new GeminiService();
export { geminiService, type ChatMessage };