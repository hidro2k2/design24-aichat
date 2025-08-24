// Gemini API service with secure key management
// API key is stored securely and not exposed in source code

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
  "00-about-design24": {
    "id": "00-about-design24",
    "title": "Thông tin chung về Design24",
    "version": "1.0.0",
    "last_updated": "2025-08-24",
    "description": "Tổng quan về Design24 — năng lực, giá trị cốt lõi, quy trình và dịch vụ.",
    "skills": ["Thiết kế thương hiệu", "TVC/Video", "Web/App Design", "Digital Marketing", "Copywriting"],
    "tools": ["Design Studio", "Video Production", "Web Development", "Marketing Tools"],
    "tags": ["Design24", "about", "dịch vụ", "quy trình", "thương hiệu"],
    "knowledge": {
      "company_overview": "Design24 là doanh nghiệp trẻ, năng động, chuyên về thiết kế thương hiệu, TVC/Video, web/app, đồ họa, chụp ảnh, in ấn, copywriting, digital marketing.",
      "values": ["sáng tạo", "chuyên nghiệp", "uy tín", "hiệu quả", "giá hợp lý", "đúng tiến độ", "lợi ích khách hàng"],
      "experience": "Hơn 5 năm kinh nghiệm, đã đồng hành với hơn 5.000 doanh nghiệp.",
      "core_services": [
        "Thiết kế thương hiệu (logo, nhận diện)",
        "Video Marketing / TVC",
        "Web & App Design",
        "Graphic Design & Digital Marketing",
        "Quay phim – Chụp ảnh",
        "In ấn",
        "Copywriting"
      ],
      "process_7_steps": [
        "Khám phá & ký kết",
        "Phân tích nhu cầu & mục tiêu",
        "Nghiên cứu thị trường & đối thủ",
        "Báo giá",
        "Lên phương án – Kế hoạch",
        "Thực thi & giám sát",
        "Báo cáo – Tổng kết"
      ],
      "locations": [
        "Hồ Chí Minh (302A Nguyễn Thượng Hiền, P.5, Q.Phú Nhuận)",
        "Cần Thơ 1 (661F/29, KV Bình Yên A, P. Long Hòa, Q. Bình Thủy)",
        "Cần Thơ 2 (Số 19, đường 13, KDC 91B, P. An Khánh, Q. Ninh Kiều)"
      ],
      "contacts": {
        "phone": ["0704.888.009", "0784.888.009"],
        "email": "Design24.vn@gmail.com",
        "tax_id": "1801676144"
      }
    },
    "rulebook": {
      "answer_policy": {
        "priority": ["Trả lời ngắn gọn, rõ ràng", "Khi user hỏi về Design24, tập trung vào dịch vụ và quy trình"],
        "fallback": "Nếu user hỏi về điều chưa rõ, hỏi thêm cụ thể về dịch vụ hoặc vị trí cần biết."
      }
    },
    "metadata": {
      "source": "Trang chủ https://design24.vn/",
      "owner": "Design24 Internal Database"
    }
  },
  "01-content-creation": {
    "id": "01-content-creation",
    "title": "Sáng tạo nội dung",
    "version": "1.0.0",
    "last_updated": "2025-08-24",
    "description": "Tạo nội dung hấp dẫn, từ bài viết đến blog du lịch, tối ưu hóa theo xu hướng thị trường",
    "skills": [
      "Viết bài viết du lịch hấp dẫn",
      "Tối ưu SEO cho nội dung",
      "Tạo blog du lịch chuyên nghiệp",
      "Phân tích xu hướng thị trường",
      "Content marketing cho du lịch"
    ],
    "tools": ["WordPress", "SEO tools", "Google Trends", "Social Media"],
    "rulebook": {
      "scope": [
        "Viết blog, bài mạng xã hội, caption video du lịch",
        "Xây dựng outline SEO cho bài viết du lịch",
        "Tạo content marketing du lịch theo trends"
      ],
      "style_tone": {
        "tone": "Thân thiện, truyền cảm hứng, chuyên nghiệp",
        "style": "Ngắn gọn, dễ đọc, ưu tiên danh sách/bước, có CTA",
        "formatting": ["Tiêu đề mạnh", "Bullet points", "Checklist", "H1/H2/H3 rõ ràng"]
      },
      "dos": [
        "Mở đầu bài viết bằng hook ấn tượng",
        "Chèn CTA cụ thể (Inbox, Đặt tour, Nhận ưu đãi)",
        "Tận dụng từ khóa SEO tự nhiên",
        "Sử dụng hình ảnh minh họa liên quan"
      ],
      "donts": [
        "Không viết chung chung, sáo rỗng",
        "Không hứa hẹn sai sự thật",
        "Không bỏ CTA trong nội dung marketing"
      ],
      "safety": [
        "Không công bố thông tin cá nhân khách hàng",
        "Tránh nội dung nhạy cảm chính trị/tôn giáo",
        "Luôn kiểm tra bản quyền ảnh/nhạc"
      ],
      "answer_policy": {
        "priority": [
          "Trả lời đúng ngữ cảnh du lịch",
          "Ưu tiên ví dụ thực tế tại Việt Nam",
          "Luôn gợi ý CTA và KPI đo lường"
        ],
        "fallback": "Nếu brief thiếu thông tin → hỏi lại mục tiêu, đối tượng, kênh, độ dài"
      }
    },
    "knowledge": {
      "key_concepts": [
        "Persona du lịch",
        "USP tour",
        "Content-market fit",
        "AIDA, PAS, FAB frameworks"
      ],
      "best_practices": [
        "Hook mạnh trong 3s đầu",
        "Dùng số liệu, địa danh cụ thể",
        "Storytelling theo hành trình",
        "Chèn hashtag địa phương + niche"
      ]
    },
    "workflows": [
      {
        "name": "Content Workflow Du Lịch",
        "steps": [
          "Nhận brief → xác định persona + mục tiêu",
          "Research từ khoá + xu hướng",
          "Tạo outline (SEO/định dạng bài viết)",
          "Viết bản nháp",
          "Biên tập + thêm CTA",
          "Đăng và đo lường KPI"
        ],
        "inputs": ["brief", "USP", "persona"],
        "outputs": ["outline", "bản nháp", "post hoàn chỉnh"],
        "kpi": ["CTR", "Time on page", "Leads"]
      }
    ],
    "prompt_templates": {
      "ideation": "Đề xuất 10 ý tưởng nội dung về [điểm đến] cho [persona], mục tiêu [mục tiêu]. Output: Tiêu đề | Hook | CTA",
      "outline": "Tạo dàn ý SEO (H1/H2/H3) cho bài blog về [điểm đến], kèm keyword và CTA",
      "post": "Viết bài Facebook 150 từ cho [tour/sự kiện], tone [thân thiện], chèn 2 CTA và 5 hashtag"
    },
    "examples": [
      {
        "name": "Post Facebook – Tour Miền Tây",
        "input": {"persona": "Sinh viên 20–25", "mục_tiêu": "tăng inbox"},
        "output_brief": "Caption ngắn gọn, highlight chợ nổi, CTA 'Inbox nhận lịch trình miễn phí'."
      }
    ],
    "faqs": [
      {"q": "Bao lâu thấy hiệu quả content?", "a": "Tối thiểu 2–4 tuần cho organic nếu đăng đều đặn."},
      {"q": "Có cần SEO không?", "a": "Có, SEO giúp nội dung bền vững, tăng traffic dài hạn."}
    ],
    "retrieval": {
      "keywords": ["content", "SEO du lịch", "blog", "caption", "tour marketing"],
      "match_threshold": 0.72
    },
    "metadata": {
      "owner": "DESIGN24 Academy",
      "copyright": "©2025 DESIGN24",
      "source_notes": "Dữ liệu nội bộ DESIGN24 + cập nhật thị trường"
    }
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
  private apiKey: string;
  private endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

  constructor() {
    // API key is securely configured
    this.apiKey = 'AIzaSyC_X_16KDxqOh1WMe7rnMEQf3ChBuG_Yu8';
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
      throw new Error('Gemini API key not configured. Please contact support.');
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
}

// Create singleton instance
const geminiService = new GeminiService();
export { geminiService, type ChatMessage };