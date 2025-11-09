import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Code } from "lucide-react";
import CourseCard from "../components/CourseCard";

interface HomePageProps {
  onNavigate: (page: string, course?: any) => void;
  user?: any;
}

export default function HomePage({ onNavigate, user }: HomePageProps) {
  const courses = [
    {
      id: "1",
      title: "Web Development Fundamentals",
      description: "Learn HTML, CSS, and JavaScript from scratch.",
      image_url:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600",
      level: "beginner",
      students_enrolled: 1200,
    },
    {
      id: "2",
      title: "React Advanced Patterns",
      description: "Master React hooks, context, and state management.",
      image_url:
        "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600",
      level: "advanced",
      students_enrolled: 950,
    },
    {
      id: "3",
      title: "Python for Data Science",
      description: "Analyze and visualize data using Python and libraries.",
      image_url:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
      level: "intermediate",
      students_enrolled: 1350,
    },
    {
      id: "4",
      title: "AWS Cloud Mastery",
      description:
        "Deploy, scale, and secure cloud applications with AWS tools.",
      image_url:
        "https://images.pexels.com/photos/3862634/pexels-photo-3862634.jpeg?auto=compress&cs=tinysrgb&w=600",
      level: "intermediate",
      students_enrolled: 980,
    },
    {
      id: "5",
      title: "TailwindCSS for Developers",
      description:
        "Design stunning, responsive UIs quickly using TailwindCSS.",
      image_url:
        "https://images.pexels.com/photos/3584991/pexels-photo-3584991.jpeg?auto=compress&cs=tinysrgb&w=600",
      level: "beginner",
      students_enrolled: 740,
    },
    {
      id: "6",
      title: "Next.js Full Stack Bootcamp",
      description:
        "Build production-grade apps with Next.js, APIs, and deployment.",
      image_url:
        "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
      level: "advanced",
      students_enrolled: 860,
    },
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div ref={ref} className="bg-white text-gray-900 overflow-hidden">
      {/* 🌟 HERO SECTION */}
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-white to-white">
        {/* 🌌 Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#00c46a]/20"
            style={{
              width: Math.random() * 8 + 3,
              height: Math.random() * 8 + 3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 50 - 25],
              x: [0, Math.random() * 50 - 25],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Glows */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-[#004d26]/10 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4ade80]/20 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Hero Content */}
        <motion.div
          style={{ y, opacity }}
          className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-extrabold leading-tight mb-6">
              Learn, Build & <br />
              <span className="text-[#004d26]">Launch Your Career</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Gain hands-on experience with interactive courses designed by
              professionals. Master in-demand tech skills and future-proof your
              career.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => onNavigate(user ? "explore" : "signup")}
                className="px-8 py-3 bg-[#004d26] text-white rounded-lg font-semibold hover:bg-[#046c3d] transition-all flex items-center justify-center shadow-md hover:shadow-xl"
              >
                {user ? "Explore Courses" : "Get Started Free"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
              {!user && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onNavigate("login")}
                  className="px-8 py-3 border-2 border-[#004d26] text-[#004d26] rounded-lg font-semibold hover:bg-[#f5faf8] transition-all"
                >
                  Login
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative bg-[#004d26] text-white rounded-3xl shadow-2xl flex items-center justify-center py-16 overflow-hidden"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute w-96 h-96 border border-white/20 rounded-full"
            />
            <div className="relative text-center z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Code className="w-24 h-24 mx-auto mb-4 text-white opacity-90" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">
                Start Your Learning Journey
              </h3>
              <p className="text-white/80 text-lg">Upgrade your skills daily.</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 🌊 Floating Ribbon Divider */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-32 overflow-hidden z-[1]"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 1440 320" className="w-full h-full">
            <motion.path
              fill="url(#gradient)"
              fillOpacity="0.3"
              d="M0,224L40,197.3C80,171,160,117,240,128C320,139,400,213,480,213.3C560,213,640,139,720,101.3C800,64,880,64,960,74.7C1040,85,1120,107,1200,122.7C1280,139,1360,149,1400,154.7L1440,160L1440,320L0,320Z"
              animate={{
                d: [
                  "M0,224L40,197.3C80,171,160,117,240,128C320,139,400,213,480,213.3C560,213,640,139,720,101.3C800,64,880,64,960,74.7C1040,85,1120,107,1200,122.7C1280,139,1360,149,1400,154.7L1440,160L1440,320L0,320Z",
                  "M0,240L60,208C120,176,240,112,360,106.7C480,101,600,155,720,181.3C840,208,960,208,1080,197.3C1200,187,1320,165,1380,154.7L1440,144L1440,320L0,320Z",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ff99" />
                <stop offset="100%" stopColor="#004d26" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </section>

      {/* 🧩 Courses We Offer */}
{/* Continuous Scrolling Tech Logos */}
{/* 🚀 Continuous Scrolling Tech Logos */}
<div className="relative overflow-hidden py-8 bg-gradient-to-b from-gray-50 to-white">
  <motion.div
    className="flex items-center gap-20 whitespace-nowrap will-change-transform"
    animate={{ x: ["0%", "-100%"] }}
    transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
  >
    {/* Row 1 — 26 technologies */}
    {[
      { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "TailwindCSS", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
      { name: "AWS", img: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
      { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "GraphQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
      { name: "Firebase", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Kubernetes", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "Redux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "Vercel", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "HTML5", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Express", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Azure", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    ].map((tech, i) => (
      <div
        key={i}
        className="flex flex-col items-center justify-center mx-8"
      >
        <img
          src={tech.img}
          alt={tech.name}
          className="w-16 h-16 mb-2 transition-transform duration-300 hover:scale-110"
        />
        <p className="text-gray-700 text-sm font-medium">{tech.name}</p>
      </div>
    ))}

    {/* Duplicate for seamless loop */}
    {[
      { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "TailwindCSS", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
      { name: "AWS", img: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
      { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "GraphQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
      { name: "Firebase", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Kubernetes", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "Redux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "Vercel", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "HTML5", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Express", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Azure", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    ].map((tech, i) => (
      <div
        key={`dup-${i}`}
        className="flex flex-col items-center justify-center mx-8"
      >
        <img
          src={tech.img}
          alt={tech.name}
          className="w-16 h-16 mb-2 transition-transform duration-300 hover:scale-110"
        />
        <p className="text-gray-700 text-sm font-medium">{tech.name}</p>
      </div>
    ))}
  </motion.div>
</div>



      {/* 🧠 Featured Courses */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Featured Courses
          </h2>
          <p className="text-lg text-gray-600">
            Hand-picked courses to supercharge your learning journey.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <CourseCard
                course={course}
                onClick={() => onNavigate("course-detail", course)}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 🌟 Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-50 py-24"
      >
        <div className="max-w-6xl mx-auto px-6 text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Trusted by 10,000+ Learners
          </h2>
          <p className="text-gray-600">
            Hear what our students say about their journey with TechKnots.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
            {
              name: "Praveen M",
              review:
                "Amazing experience! Clear explanations and hands-on projects helped me land my first job.",
              company: "@Google",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Reshma Banu",
              review:
                "Loved the structure! The React course made me confident in building complex UIs.",
              company: "@Trustpilot",
              img: "https://randomuser.me/api/portraits/women/12.jpg",
            },
            {
              name: "Syed Imran",
              review:
                "After completing the Full Stack program, I joined a startup as a frontend engineer!",
              company: "@Microsoft",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
            },
          ].map((student, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={student.img}
                  alt={student.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-500">{student.company}</p>
                </div>
              </div>
              <p className="text-gray-600">{student.review}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 🚀 CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#004d26] text-white py-20 text-center relative overflow-hidden"
      >
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your Future?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Learn the skills that matter. Get certified and stand out in the
            industry.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => onNavigate(user ? "explore" : "signup")}
            className="px-10 py-4 bg-white text-[#004d26] rounded-lg font-semibold shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all"
          >
            {user ? "Explore Courses" : "Start Free Today"}
          </motion.button>
        </div>
      </motion.section>

      {/* 🦶 Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-gray-600">
        <p>&copy; 2025 TechKnots Academy LLP. All rights reserved.</p>
      </footer>
    </div>
  );
}
