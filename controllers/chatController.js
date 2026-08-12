// Simple keyword-based chat assistant — no external AI API needed.
// Matches user message against known topics and returns a canned reply.

const knowledgeBase = [
  {
    keywords: ['service', 'services', 'what do you offer', 'what can you do'],
    reply: "We offer: Website Development, E-Commerce Development, Custom Web Applications, Custom Software Development, Admin Panel & CRM Development, Desktop Application Development, AI Solutions & Automation, API & Third-Party Integration, Cloud Deployment & Hosting, Website Maintenance & Support, Bug Fixing & Performance Optimization, and UI/UX Design. Ask me about any of these for more detail!",
  },
  {
    keywords: ['website development', 'web development', 'build a website', 'new website'],
    reply: "We build fast, responsive, SEO-friendly websites tailored to your business — from simple business sites to complex multi-page platforms, using React and modern web technologies.",
  },
  {
    keywords: ['e-commerce', 'ecommerce', 'online store', 'shopping website'],
    reply: "We build complete e-commerce platforms — product catalogs, cart, secure payment gateway integration (like Razorpay), order tracking, and admin panels to manage everything.",
  },
  {
    keywords: ['web application', 'web app', 'custom application'],
    reply: "We develop custom web applications using the MERN stack (MongoDB, Express, React, Node.js) — built around your specific business workflow, not generic templates.",
  },
  {
    keywords: ['custom software'],
    reply: "We build custom software solutions designed around your exact business processes, from internal tools to full management systems.",
  },
  {
    keywords: ['admin panel', 'crm', 'dashboard'],
    reply: "We build secure admin panels and CRM dashboards for managing users, orders, content, and business data — with role-based access control.",
  },
  {
    keywords: ['desktop application', 'desktop app', 'desktop software'],
    reply: "We build desktop applications (Windows/offline-capable) using Electron and React — useful for businesses that need software without relying on the internet.",
  },
  {
    keywords: ['ai solution', 'ai automation', 'chatbot', 'automation'],
    reply: "We build AI-powered solutions and automation tools — including chatbots like this one — to help streamline your business operations.",
  },
  {
    keywords: ['api', 'integration', 'third party', 'third-party'],
    reply: "We integrate third-party APIs into your systems — payment gateways, SMS/email services, maps, and more — to extend your website or app's functionality.",
  },
  {
    keywords: ['cloud', 'hosting', 'deployment', 'deploy'],
    reply: "We handle cloud deployment and hosting setup for your website or application, ensuring it's fast, secure, and reliably available.",
  },
  {
    keywords: ['maintenance', 'support', 'after launch', 'update my website'],
    reply: "We offer ongoing website maintenance and support — updates, fixes, and improvements — even after your project goes live.",
  },
  {
    keywords: ['bug', 'fix', 'performance', 'slow website', 'optimization'],
    reply: "We offer bug fixing and performance optimization services — if your existing website or app has issues or is running slow, we can help diagnose and fix it.",
  },
  {
    keywords: ['ui/ux', 'ui ux', 'design', 'user interface', 'user experience'],
    reply: "We design clean, modern, user-friendly interfaces (UI/UX) — from wireframes to polished visual design — focused on making your product easy and enjoyable to use.",
  },
  {
    keywords: ['technology', 'tech stack', 'which technologies', 'what stack', 'programming language'],
    reply: "We primarily work with the MERN stack — MongoDB, Express.js, React, and Node.js — along with modern tools like Vite, Three.js for interactive experiences, and cloud deployment platforms.",
  },
  {
    keywords: ['source code', 'own the code', 'ownership', 'do i own'],
    reply: "Yes — once your project is delivered and finalized, you receive full ownership of the source code. It's your project, built for you.",
  },
  {
    keywords: ['communication', 'how do you communicate', 'updates during project', 'stay in touch'],
    reply: "We keep you updated throughout the project via WhatsApp and email — sharing progress, previews, and getting your feedback at each milestone.",
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'charge', 'budget'],
    reply: "Pricing depends on your project's scope and requirements. Please reach out via our Contact page with your project details, and we'll get back to you with a quote.",
  },
  {
    keywords: ['time', 'timeline', 'how long', 'duration', 'when will it be done'],
    reply: "Project timelines vary based on complexity. Please share your project details on our Contact page, and we'll give you an accurate timeline.",
  },
  {
    keywords: ['hi', 'hello', 'hey', 'namaste'],
    reply: "Hello! Welcome to AISPL. I can tell you about our services — website development, e-commerce, custom apps, and more. What would you like to know?",
  },
];

const fallbackReply =
  "I'm not sure about that specific question, but I'd be happy to help! You can ask me about our services, technology stack, or reach out through our Contact page for anything project-specific.";

const findReply = (message) => {
  const lower = message.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.reply;
    }
  }
  return fallbackReply;
};

// @desc    Handle chat message (public)
// @route   POST /api/chat
// @access  Public
const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const reply = findReply(message);

    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

module.exports = { handleChat };