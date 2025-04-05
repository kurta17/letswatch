# LetsWatch 🎬

LetsWatch is an intelligent movie recommendation web application that leverages machine learning techniques to provide personalized viewing suggestions based on user preferences.

## ✨ Key Features

- **Smart Recommendation Engine** - Utilizes cosine similarity algorithms to suggest movies similar to user searches
- **Responsive Design** - Seamless experience across desktop and mobile devices with React and Tailwind CSS
- **RESTful API** - Backend Flask API that handles recommendation requests efficiently
- **Containerized Architecture** - Fully dockerized for easy deployment and consistent environments
- **Data-Driven Insights** - Leverages Pandas for sophisticated data manipulation and analysis

## 🛠️ Technology Stack

### Backend

- **Flask** - Lightweight Python web framework for API endpoints
- **Pandas** - Powerful data manipulation and analysis
- **Machine Learning** - Implementation of cosine similarity for recommendation algorithms
- **Docker** - Containerization for consistent deployment

### Frontend

- **React** - Dynamic and responsive user interface
- **Tailwind CSS** - Utility-first CSS framework for modern designs
- **JavaScript** - Interactive user experience

## 🏗️ Architecture

LetsWatch employs a modern microservices architecture:

- **Recommendation Service** - Core ML algorithm using cosine similarity to match movies
- **User Interface Layer** - React-based frontend providing an intuitive browsing experience
- **API Layer** - RESTful endpoints for communication between frontend and backend

## 🔍 Technical Implementation

- Movie data is vectorized and processed using Pandas for efficient similarity calculations
- Cosine similarity algorithms measure the similarity between movies based on various features
- Personalized recommendations are generated in real-time based on user queries
- Docker ensures consistent environment across development and production

## 📁 Project Structure

```plaintext
letswatch/  
├── backend/              # Flask backend code  
│   ├── app.py            # Main application script with recommendation engine
│   ├── requirements.txt  # Python dependencies 
│   ├── data/             # Movie datasets and processed vectors
│
├── frontend/             # React frontend code  
│   ├── src/              # React components and hooks
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│
├── Dockerfile            # Backend Dockerfile  
├── docker-compose.yml    # Compose file for multi-container setup  
```

## 🚀 Getting Started

1. Clone the repository

```bash
git clone https://github.com/kurta17/letswatch.git
```

2. Start the application using Docker Compose

```bash
cd letswatch
docker-compose up
```

3. Access the application at http://localhost:3000

## 👨‍💻 Development Process

The development of LetsWatch involved:

- Data acquisition and preprocessing for the recommendation engine
- Implementation of cosine similarity algorithms for accurate recommendations
- Development of a responsive and intuitive user interface
- Integration of backend and frontend components
- Containerization for scalable deployment

## 🔗 Links

- [GitHub Repository](https://github.com/kurta17/letswatch)
- [Live Demo](https://letswatch-demo.herokuapp.com) (Coming soon)

---

Developed with ❤️ by [Giorgi Kurtanidze](https://github.com/kurta17)
