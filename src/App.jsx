import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/Components/Navbar.jsx";
import Hero from "./assets/Components/Hero.jsx";
import Uploadbox from "./assets/Components/Uploadbox.jsx";
import HowItWorks from "./assets/Components/HowItWorks.jsx";
import Pricing from "./assets/Components/Pricing.jsx";
import Contact from "./assets/Components/Contact.jsx";
import Footer from "./assets/Components/Footer.jsx";
import Auth from "./assets/pages/Auth.jsx";
import Dashboard from "./assets/pages/Dashboard.jsx";
import Admin from "./assets/pages/Admin.jsx";
import AdminLogin from "./assets/pages/AdminLogin.jsx";




export default function App(){
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  // called when new files are chosen (FileList)
  function handleFiles(newFiles){
    const arr = Array.from(newFiles).slice(0, 10);
    setFiles(arr);
  }

  // remove a file by index
  function removeFile(index){
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  // clear all files
  function clearFiles(){
    setFiles([]);
  }

  useEffect(() => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => observer.observe(el));

  return () => observer.disconnect();
}, []);


 return (
  <>
    <Navbar />

    <Routes>
      {/* HOME PAGE */}
      <Route
        path="/"
        element={
          <>
            <main className="container glass-frame">
              <div className="reveal">
                <Hero />
              </div>

              <section className="section reveal">
                <Uploadbox
                  inputRef={inputRef}
                  onFiles={handleFiles}
                  files={files}
                  onRemoveFile={removeFile}
                  onClearAll={clearFiles}
                />
              </section>

              <section className="section reveal">
                <HowItWorks />
              </section>

              <section className="section reveal">
                <Pricing />
              </section>

              <section className="section reveal">
                <Contact />
              </section>
            </main>

            <Footer />
          </>
        }
      />

      {/* AUTH PAGE */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin-login" element={<AdminLogin />} />

    </Routes>
  </>
);

}
