// import React, { useEffect, useState } from "react";
// import API from "../services/api";
// import ProjectCard from "../components/ProjectCard";
// import { motion } from "framer-motion";
// import { GitBranch, User, Loader2, Edit, Save } from "lucide-react";

// const container = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
// };
// const item = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
// };

// export default function Dashboard() {
//   const [portfolio, setPortfolio] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [syncing, setSyncing] = useState(false);
//   const [isEditingAbout, setIsEditingAbout] = useState(false);
//   const [aboutText, setAboutText] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         const r = await API.get("/api/me");
//         setPortfolio(r.data.portfolio);
//         setAboutText(r.data.portfolio?.about || "");
//       } catch (err) {
//         console.error("Error fetching portfolio:", err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const syncGithub = async () => {
//     try {
//       setSyncing(true);
//       await new Promise((r) => setTimeout(r, 1000));
//       await API.post("/api/sync-github");
//       const res = await API.get("/api/me");
//       setPortfolio(res.data.portfolio);
//     } catch (err) {
//       console.error("Error syncing GitHub:", err);
//     } finally {
//       setSyncing(false);
//     }
//   };

//   const handleSaveAbout = async () => {
//     try {
//       setPortfolio({ ...portfolio, about: aboutText });
//       setIsEditingAbout(false);
//       // Optionally: await API.put("/api/portfolio/about", { about: aboutText });
//     } catch (error) {
//       console.error("Failed to save about section:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-lg text-cyan-400">
//         <Loader2 className="w-6 h-6 mr-2 animate-spin" />
//         Loading your dashboard...
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       variants={container}
//       initial="hidden"
//       animate="visible"
//       className="max-w-7xl mx-auto px-6 py-12 space-y-10 text-white"
//     >
//       {/* Hero Section */}
//       <motion.div
//         variants={item}
//         className="bg-gradient-to-r from-cyan-600/20 via-violet-600/10 to-indigo-600/20 p-8 rounded-3xl border border-white/10 shadow-lg backdrop-blur-xl text-center md:text-left"
//       >
//         <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 flex items-center justify-center md:justify-start gap-2">
//           <User className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
//           Welcome Back, Developer 👋
//         </h1>
//         <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto md:mx-0">
//           Manage your AI-enhanced portfolio, projects, and insights—all in one sleek dashboard.
//         </p>

//         <motion.button
//           onClick={syncGithub}
//           disabled={syncing}
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           className={`mt-6 flex items-center mx-auto md:mx-0 space-x-2 px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ${
//             syncing
//               ? "bg-slate-700 text-slate-400 cursor-not-allowed"
//               : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white"
//           }`}
//         >
//           {syncing ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               <span>Syncing...</span>
//             </>
//           ) : (
//             <>
//               <GitBranch className="w-4 h-4" />
//               <span>Sync GitHub Projects</span>
//             </>
//           )}
//         </motion.button>
//       </motion.div>

//       {/* About Section */}
//       <motion.div
//         variants={item}
//         className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl transition-all duration-300 hover:border-cyan-400/30"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-cyan-300">About You</h2>
//           <button
//             onClick={() => (isEditingAbout ? handleSaveAbout() : setIsEditingAbout(true))}
//             className="flex items-center space-x-1 text-sm text-gray-300 hover:text-cyan-400 transition-colors"
//           >
//             {isEditingAbout ? (
//               <>
//                 <Save className="w-4 h-4" />
//                 <span>Save</span>
//               </>
//             ) : (
//               <>
//                 <Edit className="w-4 h-4" />
//                 <span>Edit</span>
//               </>
//             )}
//           </button>
//         </div>

//         {isEditingAbout ? (
//           <textarea
//             value={aboutText}
//             onChange={(e) => setAboutText(e.target.value)}
//             onBlur={handleSaveAbout}
//             className="w-full h-40 bg-slate-900/70 border border-cyan-500/30 rounded-xl p-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 resize-none"
//             placeholder="Tell the world about yourself..."
//           />
//         ) : (
//           <p
//             className={`text-gray-300 leading-relaxed ${
//               !aboutText && "italic text-gray-500"
//             }`}
//           >
//             {aboutText ||
//               "No About section yet. Click 'Edit' to add your professional summary."}
//           </p>
//         )}
//       </motion.div>

//       {/* Projects Section */}
//       <motion.div
//         variants={item}
//         className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl transition-all duration-300 hover:border-cyan-400/30"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-cyan-300">Synced Projects</h2>

//         {portfolio?.projects?.length ? (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {portfolio.projects.map((p, index) => (
//               <motion.div
//                 key={p.repoId}
//                 variants={item}
//                 whileHover={{ y: -6, scale: 1.02 }}
//                 transition={{ duration: 0.25 }}
//               >
//                 <ProjectCard project={p} />
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center h-48 text-center text-gray-500 border border-dashed border-cyan-400/20 rounded-lg p-8">
//             <GitBranch className="w-8 h-8 mb-3 text-cyan-500/60" />
//             <p className="text-lg font-medium">No projects found.</p>
//             <p className="text-sm mt-1">
//               Click the <strong>Sync GitHub Projects</strong> button above to fetch your repositories.
//             </p>
//           </div>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// }
