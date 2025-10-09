import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";

const initialPrograms = [
  { name: "Mental Wellness Session", start: "2025-10-10", description: "Group therapy and meditation session" },
  { name: "Yoga for Students", start: "2025-10-15", description: "Yoga for relaxation and stress relief" },
  { name: "Healthy Eating Talk", start: "2025-10-20", description: "Nutrition advice for better energy" },
];

export default function StuhealthWellness() {
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem("currentUser")) || null);
  const [section, setSection] = useState(currentUser ? "home" : "login");
  const [resources, setResources] = useState(() => JSON.parse(localStorage.getItem("resources")) || []);
  const [programs, setPrograms] = useState(() => JSON.parse(localStorage.getItem("programs")) || initialPrograms);
  const [articles, setArticles] = useState(() => JSON.parse(localStorage.getItem("articles")) || []);
  const [supportRequests, setSupportRequests] = useState(() => JSON.parse(localStorage.getItem("supportRequests")) || []);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => { localStorage.setItem("currentUser", JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem("resources", JSON.stringify(resources)); }, [resources]);
  useEffect(() => { localStorage.setItem("programs", JSON.stringify(programs)); }, [programs]);
  useEffect(() => { localStorage.setItem("articles", JSON.stringify(articles)); }, [articles]);
  useEffect(() => { localStorage.setItem("supportRequests", JSON.stringify(supportRequests)); }, [supportRequests]);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const role = e.target.role.value;
    if (!email) return;
    setCurrentUser({ email, role, joinedPrograms: [] });
    setSection("home");
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    setSection("login");
    setChatMessages([]);
  };

  const joinProgram = (index) => {
    if (!currentUser) return; // safeguard
    const prog = programs[index];
    if (!currentUser.joinedPrograms.some((p) => p.name === prog.name)) {
      const updatedUser = {
        ...currentUser,
        joinedPrograms: [...currentUser.joinedPrograms, { ...prog, completed: false }],
      };
      setCurrentUser(updatedUser);
  alert(`You joined ${prog.name}`);
    } else alert("Already joined this session.");
  };

  const markComplete = (name) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      joinedPrograms: currentUser.joinedPrograms.map((p) =>
        p.name === name ? { ...p, completed: true } : p
      ),
    };
    setCurrentUser(updatedUser);
  };

  const addResource = (e) => {
    e.preventDefault();
    const title = e.target.resourceTitle.value.trim();
    const category = e.target.resourceCategory.value;
    const description = e.target.resourceDesc.value.trim();
    if (title && description) {
      setResources([...resources, { title, category, description }]);
      e.target.reset();
      setSection("home");
    }
  };

  const addProgram = (e) => {
    e.preventDefault();
    const name = e.target.programName.value.trim();
    const start = e.target.startDate.value;
    const description = e.target.programDesc.value.trim();
    if (name && start && description) {
      setPrograms([...programs, { name, start, description }]);
      e.target.reset();
      setSection("sessions");
    }
  };

  const addArticle = (e) => {
    e.preventDefault();
    const title = e.target.articleTitle.value.trim();
    const content = e.target.articleContent.value.trim();
    if (title && content) {
      setArticles([...articles, { title, content }]);
      e.target.reset();
      setSection("articles");
    }
  };

  const addSupportRequest = (e) => {
    e.preventDefault();
    const message = e.target.supportMessage.value.trim();
    if (message && currentUser) {
      setSupportRequests([...supportRequests, { user: currentUser.email, message, status: "pending" }]);
      e.target.reset();
      alert("Support request submitted!");
    }
  };

  const sendMessage = () => {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return;
    setChatMessages([...chatMessages, { type: "user", text }]);
    input.value = "";
    setTimeout(() => {
      let reply = "I'm here to help! Stay positive and take care.";
      const msg = text.toLowerCase();
      if (msg.includes("stress")) reply = "Try deep breathing: inhale 4s, hold 4s, exhale 6s. 🌿";
      if (msg.includes("sleep")) reply = "Aim for 7–8 hours sleep. Avoid screens before bed. 😴";
      if (msg.includes("anxiety")) reply = "Focus on 5 things you see, 4 you feel, 3 you hear. 💙";
      setChatMessages((msgs) => [...msgs, { type: "bot", text: reply }]);
    }, 600);
  };

  if (section === "login") {
    return (
      <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
        <h2>Stuhealth & Wellness Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" required />
          <select name="role" defaultValue="student" style={{ marginTop: 8 }}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <button style={{ marginTop: 10 }} type="submit">Login</button>
        </form>
      </div>
    );
  }

  // Show dashboards after login
  if (section === "home" && currentUser) {
    if (currentUser.role === "admin") {
      return <AdminDashboard user={{ name: currentUser.email }} onLogout={logout} />;
    } else {
      return <StudentDashboard user={{ name: currentUser.email }} onLogout={logout} />;
    }
  }
  // You can add more sections here as needed
  return null;
}