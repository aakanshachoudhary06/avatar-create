@@ .. @@
 import React, { useState } from 'react';
 import Navbar from './components/Navbar';
 import Hero from './components/Hero';
 import Features from './components/Features';
 import Pricing from './components/Pricing';
 import Footer from './components/Footer';
+import VoiceCallPage from './components/VoiceCallPage';

 function App() {
+  const [currentPage, setCurrentPage] = useState<'home' | 'voice-call'>('home');
+
+  // Handle routing
+  React.useEffect(() => {
+    const handlePopState = () => {
+      const path = window.location.pathname;
+      if (path === '/voice-call') {
+        setCurrentPage('voice-call');
+      } else {
+        setCurrentPage('home');
+      }
+    };
+
+    // Handle initial load
+    handlePopState();
+
+    // Listen for browser navigation
+    window.addEventListener('popstate', handlePopState);
+    
+    // Override link clicks
+    const handleLinkClick = (e: Event) => {
+      const target = e.target as HTMLElement;
+      if (target.tagName === 'A' || target.closest('a')) {
+        const link = target.closest('a') as HTMLAnchorElement;
+        if (link.href.includes('/voice-call')) {
+          e.preventDefault();
+          window.history.pushState({}, '', '/voice-call');
+          setCurrentPage('voice-call');
+        }
+      }
+    };
+
+    document.addEventListener('click', handleLinkClick);
+
+    return () => {
+      window.removeEventListener('popstate', handlePopState);
+      document.removeEventListener('click', handleLinkClick);
+    };
+  }, []);
+
+  if (currentPage === 'voice-call') {
+    return (
+      <VoiceCallPage 
+        onBack={() => {
+          window.history.pushState({}, '', '/');
+          setCurrentPage('home');
+        }} 
+      />
+    );
+  }
+
   return (
     <div className="min-h-screen bg-gray-900">
       <Navbar />
@@ .. @@
       <Features />
       <Pricing />
       <Footer />
     </div>
   );
 }

 export default App;