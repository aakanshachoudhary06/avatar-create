@@ .. @@
                   <MessageCircle className="w-4 h-4" />
                   Chat
                 </button>
+                <button
+                  onClick={() => setShowChat(true)}
+                  className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-all duration-300 border border-purple-500/30"
+                >
+                  <MessageCircle className="w-4 h-4" />
+                  AI Voice Call
+                </button>
               </div>
             </div>
           </div>
@@ .. @@
       {showChat && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-gray-900 rounded-xl border border-purple-500/30 w-full max-w-md h-96 flex flex-col">
             <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
-              <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
+              <div className="flex items-center gap-4">
+                <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
+                <button
+                  onClick={() => {
+                    setShowChat(false);
+                    window.location.href = '/voice-call';
+                  }}
+                  className="flex items-center gap-2 px-3 py-1 bg-purple-600/20 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-all duration-300 text-sm"
+                >
+                  AI Voice Call
+                </button>
+              </div>
               <button
                 onClick={() => setShowChat(false)}
                 className="text-gray-400 hover:text-white transition-colors"