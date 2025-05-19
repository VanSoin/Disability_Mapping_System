import { ChevronLast, ChevronFirst, LogOut, User, MessageCircle } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FeedbackForm from "./FeedbackForm";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  const navigate = useNavigate(); // For redirection

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  const fetchFeedback = () => {
    const savedFeedback = JSON.parse(localStorage.getItem("feedback")) || [];
    setFeedbackList(savedFeedback);
  };

  return (
    <>
      <aside className={`transition-[width] duration-280 ${expanded ? "w-[18.5%] h-full" : "w-[4.5%] h-screen"}`}>
        <nav className="h-full flex flex-col bg-black text-white border-r shadow-sm transition-all duration-300">
          <div className="p-4 pb-2 flex justify-between items-center">
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className={`p-1.5 transition-colors duration-300 ${
                expanded ? "rounded-l-lg bg-gradient-to-r from-[#ea67ff] to-[#d4c084]" : "rounded-r-lg bg-gradient-to-r from-[#e60202] to-[#d4c084]"
              }`}
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">
              {children}

              {/* Profile Button */}
              <SidebarItem icon={<User size={20} />} text="Profile" path="/profile" />

              {/* Feedback Button - Opens Form */}
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="flex items-center text-white px-3 py-2 hover:text-yellow-300 transition-all w-full"
              >
                <MessageCircle size={20} />
                {expanded && <span className="ml-3">Give Feedback</span>}
              </button>

              {/* View Feedback */}
              <button
                onClick={fetchFeedback}
                className="flex items-center text-white px-3 py-2 hover:text-green-300 transition-all w-full"
              >
                <MessageCircle size={20} />
                {expanded && <span className="ml-3">View Feedback</span>}
              </button>

              {/* Display Saved Feedback */}
              {feedbackList.length > 0 && (
                <div className="p-3 bg-gray-800 rounded mt-2">
                  <h3 className="text-white font-semibold mb-2">User Feedback</h3>
                  <ul className="max-h-40 overflow-y-auto">
                    {feedbackList.map((fb, index) => (
                      <li key={index} className="text-gray-300 text-sm border-b border-gray-700 p-2">
                        ⭐ {fb.rating} - {fb.review}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </ul>
          </SidebarContext.Provider>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-700">
            <button onClick={handleLogout} className="flex items-center text-white hover:text-red-400 transition-all">
              <LogOut size={20} />
              {expanded && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </nav>
      </aside>

      {showFeedbackForm && <FeedbackForm onClose={() => setShowFeedbackForm(false)} onSubmit={fetchFeedback} />}
    </>
  );
}

export function SidebarItem({ icon, text, path, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <button
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"
        }`}
      >
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
        {alert && <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400" />}
      </button>
    </Link>
  );
}
