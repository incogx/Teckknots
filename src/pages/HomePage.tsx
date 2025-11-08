import { ArrowRight, Code, Zap, Users } from "lucide-react";
import CourseCard from "../components/CourseCard";

interface HomePageProps {
  onNavigate: (page: string, course?: any) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const courses = [
    {
      id: "1",
      title: "Web Development Fundamentals",
      description: "Learn HTML, CSS, and JavaScript from scratch.",
      image_url:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600",
      level: "beginner",
      students_enrolled: 1250,
    },
    {
      id: "2",
      title: "React Advanced Patterns",
      description: "Master React hooks, context, and state management.",
      image_url:
        "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
      level: "advanced",
      students_enrolled: 856,
    },
    {
      id: "3",
      title: "Python for Data Science",
      description: "Explore data analysis and visualization with Python.",
      image_url:
        "https://images.pexels.com/photos/1374144/pexels-photo-1374144.jpeg?auto=compress&cs=tinysrgb&w=600",
      level: "intermediate",
      students_enrolled: 932,
    },
    {
      id: "4",
      title: "Full Stack Development",
      description: "Build complete web apps using modern tech stacks.",
      image_url:
        "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=600",
      level: "intermediate",
      students_enrolled: 748,
    },
    {
      id: "5",
      title: "Cloud & DevOps Basics",
      description: "Deploy applications using AWS, Docker, and Kubernetes.",
      image_url:
        "https://images.pexels.com/photos/3182819/pexels-photo-3182819.jpeg?auto=compress&cs=tinysrgb&w=600",
      level: "advanced",
      students_enrolled: 612,
    },
    {
      id: "6",
      title: "Mobile App Development",
      description: "Create iOS and Android apps using React Native.",
      image_url:
        "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600",
      level: "intermediate",
      students_enrolled: 654,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* 🟢 Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Intro */}
          <div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Learn Tech Skills{" "}
              <span className="text-[#004d26] dark:text-[#00ff99]">
                That Matter
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Master in-demand programming skills with hands-on courses
              designed by industry experts. Start learning today and
              accelerate your tech career.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate("signup")}
                className="px-8 py-3 bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900 rounded-lg hover:bg-[#003d1f] dark:hover:bg-[#00cc80] font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              <button
                onClick={() => onNavigate("explore")}
                className="px-8 py-3 border-2 border-[#004d26] dark:border-[#00ff99] text-[#004d26] dark:text-[#00ff99] rounded-lg hover:bg-[#f0f9f7] dark:hover:bg-gray-800 transition-colors font-semibold"
              >
                Explore Courses
              </button>
            </div>
          </div>

          {/* Right Side: Hero Visual */}
          <div className="relative h-96 bg-gradient-to-br from-[#004d26] to-[#1a7735] dark:from-[#00ff99] dark:to-[#00cc80] rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 flex items-center justify-center">
              <div className="text-8xl font-bold text-white/30">&lt;/&gt;</div>
            </div>
            <div className="relative text-center">
              <Code className="w-24 h-24 text-white mb-4 mx-auto opacity-90" />
              <p className="text-white text-lg font-semibold">
                Start Your Learning Journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🌿 Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-7 h-7 text-[#004d26] dark:text-[#00ff99]" />,
                title: "Expert-Led Courses",
                text: "Learn from industry professionals with real-world experience.",
              },
              {
                icon: <Zap className="w-7 h-7 text-[#004d26] dark:text-[#00ff99]" />,
                title: "Learn at Your Pace",
                text: "Flexible schedule with lifetime access to materials.",
              },
              {
                icon: <Users className="w-7 h-7 text-[#004d26] dark:text-[#00ff99]" />,
                title: "Community Support",
                text: "Connect with learners and mentors in our active community.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-[#e8f5f0] dark:bg-[#00ff9930] rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧠 Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Start with one of our most popular courses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => onNavigate("course-detail", course)} // 👈 Click to open detail
            />
          ))}
        </div>
      </section>

      {/* 🌟 CTA Section */}
      <section className="bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900 py-20 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students already learning on TechKnots Academy.
          </p>
          <button
            onClick={() => onNavigate("signup")}
            className="px-8 py-3 bg-white dark:bg-gray-900 text-[#004d26] dark:text-[#00ff99] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-semibold shadow-lg hover:shadow-xl"
          >
            Start Free Today
          </button>
        </div>
      </section>

      {/* 🦶 Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2025 TechKnots Academy LLP. All rights reserved.</p>
      </footer>
    </div>
  );
}
