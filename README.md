# LangTalker - AI German Language Learning Platform 🇩🇪

LangTalker is an innovative AI-powered platform designed to help users learn German through natural conversations. Featuring an AI tutor trained with Goethe-Institute-level expertise, it provides personalized, interactive German language learning experiences.

![LangTalker Demo](src/assets/images/helga-avatar.jpg)

## ✨ Features

### 🤖 AI Language Tutor

- Personalized conversations with an AI tutor
- Real-time feedback on grammar and pronunciation
- Contextual learning through natural dialogue
- Support for both German and English inputs

### 📚 Learning Experience

- Progressive difficulty levels (A1 to C2)
- Interactive chat interface with real-time responses
- Character-by-character text streaming for natural conversation flow
- Structured learning path with practical examples

### 🎯 Key Capabilities

- Natural language processing for accurate responses
- Contextual memory for personalized learning
- Multi-level conversation support
- Real-time message streaming
- Responsive and intuitive UI

### 🔐 User Features

- Secure authentication via Supabase
- Personal progress tracking
- Chat history persistence
- Customizable learning experience

## 🛠️ Technical Stack

### Frontend

- React + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons

### Backend Services

- Supabase for authentication and data storage
- Sensay API for AI conversation
- Environment variable management for security

### Key Libraries

- @supabase/supabase-js for authentication
- axios for API requests
- react-hot-toast for notifications
- @tailwindcss/typography for enhanced text formatting

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AdithyahNair/langtalker.git
cd langtalker
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SENSAY_API_VERSION=your_sensay_api_version
VITE_SENSAY_ORGANIZATION_SECRET=your_sensay_org_secret
VITE_SENSAY_REPLICA_UUID=your_sensay_replica_uuid
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Chat/            # Chat-related components
│   └── Layout/          # Layout components
├── services/            # API services
├── assets/             # Static assets
└── types/              # TypeScript type definitions
```

### Key Components

- `ChatDashboard`: Main chat interface
- `ChatMessages`: Message display and formatting
- `ChatInput`: User input handling
- `Greeting`: Dynamic welcome messages
- `DashboardNavbar`: Navigation and level selection

## 🔒 Authentication

The application uses Supabase for authentication:

- Email/password authentication
- User profile management
- Secure session handling
- Protected routes

## 🌐 API Integration

### Sensay API

- Real-time chat completions
- Message history management
- User context preservation
- Error handling and retry logic

## 🎨 Styling

- Tailwind CSS for utility-first styling
- Custom typography configuration
- Responsive design
- Dark mode optimization
- Smooth animations and transitions

## 🧪 Development Features

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Hot module replacement
- Environment variable management

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## ✨ Acknowledgments

- Thanks to all contributors who have helped shape LangTalker
- Special thanks to the Sensay team for their powerful API
- Inspired by the Goethe-Institute's teaching methodologies
