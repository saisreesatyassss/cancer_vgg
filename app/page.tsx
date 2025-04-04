// "use client"

// // pages/index.tsx
// import { useState, useEffect } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import axios from 'axios';

// // Define TypeScript interfaces
// interface PredictionResult {
//   predicted_label: string;
//   confidence: number;
//   predicted_class_index: number;
//   all_probabilities: {
//     [key: string]: number;
//   };
// }

// const Home = () => {
//   // State variables
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [uploadedImage, setUploadedImage] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [result, setResult] = useState<PredictionResult | null>(null);
//   const [error, setError] = useState<string | null>(null);
  
//   // Sample test images
//   const testImages = [
//     { id: 'a1', name: 'Sample 1 - Normal', path: '/samples/a1.png' },
//     { id: 'a2', name: 'Sample 2 - Adenocarcinoma', path: '/samples/a2.png' },
//     { id: 'a3', name: 'Sample 3 - Large Cell', path: '/samples/a3.png' },
//     { id: 'a4', name: 'Sample 4 - Squamous Cell', path: '/samples/a4.png' },
//     { id: 'a5', name: 'Sample 5 - Normal', path: '/samples/a5.png' },
//     { id: 'a6', name: 'Sample 6 - Adenocarcinoma', path: '/samples/a6.png' },
//     { id: 'a7', name: 'Sample 7 - Large Cell', path: '/samples/a7.png' },
//     { id: 'a8', name: 'Sample 8 - Squamous Cell', path: '/samples/a8.png' },
//   ];

//   // Class information
//   const classInfo = {
//     'normal': {
//       description: 'Healthy lung tissue with no signs of cancer.',
//       color: 'bg-green-100 border-green-500'
//     },
//     'adenocarcinoma': {
//       description: 'A type of non-small cell lung cancer that forms in the glandular cells.',
//       color: 'bg-red-100 border-red-500'
//     },
//     'large.cell.carcinoma': {
//       description: 'An aggressive form of lung cancer characterized by large, abnormal cells.',
//       color: 'bg-purple-100 border-purple-500'
//     },
//     'squamous.cell.carcinoma': {
//       description: 'A type of non-small cell lung cancer that begins in the squamous cells of the lung.',
//       color: 'bg-orange-100 border-orange-500'
//     }
//   };

//   // Handle file upload
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setUploadedImage(file);
//       setSelectedImage(null);
      
//       // Create preview URL
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle sample image selection
//   const handleSampleSelect = (imagePath: string) => {
//     setSelectedImage(imagePath);
//     setUploadedImage(null);
//     setPreviewUrl(imagePath);
//   };

//   // Submit image for analysis
//   const analyzeImage = async () => {
//     setLoading(true);
//     setError(null);
//     setResult(null);
    
//     try {
//       let formData = new FormData();
//       let imageToSend: File | null = null;
      
//       if (uploadedImage) {
//         imageToSend = uploadedImage;
//       } else if (selectedImage) {
//         // Fetch the sample image and convert to File object
//         const response = await fetch(selectedImage);
//         const blob = await response.blob();
//         imageToSend = new File([blob], "samples/a1.png", { type: blob.type });
//       }
      
//       if (!imageToSend) {
//         throw new Error("No image selected");
//       }
      
//       formData.append('image', imageToSend);
      
//       // Replace with your actual API endpoint
//       const apiUrl = 'http://localhost:5000/predict';
//       const response = await axios.post(apiUrl, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       setResult(response.data);
//     } catch (err) {
//       console.error(err);
//       setError(err instanceof Error ? err.message : 'An unknown error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get confidence level color
//   const getConfidenceColor = (confidence: number) => {
//     if (confidence > 0.85) return 'text-green-600';
//     if (confidence > 0.7) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head>
//         <title>Lung CT Classification Tool</title>
//         <meta name="description" content="AI-powered lung CT scan analysis" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <header className="text-center mb-12">
//             <h1 className="text-4xl font-bold text-gray-800 mb-2">Lung CT Classification Tool</h1>
//             <p className="text-lg text-gray-600">
//               AI-powered analysis of lung CT images for cancer detection
//             </p>
//           </header>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Left side - Image selection & upload */}
//             <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold mb-4">Select Image</h2>
              
//               {/* Image upload */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Upload your own lung CT image
//                 </label>
//                 <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center">
//                   <input
//                     type="file"
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     onChange={handleFileChange}
//                     accept="image/*"
//                   />
//                   <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   <p className="mt-2 text-sm text-gray-500">Drag & drop or click to browse</p>
//                 </div>
//               </div>
              
//               {/* Sample images */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">Or select a sample image</h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   {testImages.map((img) => (
//                     <div 
//                       key={img.id}
//                       className={`cursor-pointer border-2 p-1 rounded hover:bg-blue-50 ${selectedImage === img.path ? 'border-blue-500' : 'border-gray-200'}`}
//                       onClick={() => handleSampleSelect(img.path)}
//                     >
//                       <div className="aspect-w-1 aspect-h-1 bg-gray-100 relative">
//                         <div className="w-full h-32 relative">
//                           <Image 
//                             src={img.path}
//                             alt={img.name}
//                             layout="fill" 
//                             objectFit="cover"
//                             className="rounded"
//                           />
//                         </div>
//                       </div>
//                       <p className="text-xs text-center mt-1 truncate">{img.name}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Analyze button */}
//               <button
//                 onClick={analyzeImage}
//                 disabled={!previewUrl || loading}
//                 className={`w-full mt-6 py-2 px-4 rounded font-medium ${
//                   !previewUrl || loading
//                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//               >
//                 {loading ? 'Analyzing...' : 'Analyze Image'}
//               </button>
//             </div>
            
//             {/* Center - Image preview */}
//             <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md flex flex-col">
//               <h2 className="text-xl font-semibold mb-4">Image Preview</h2>
              
//               <div className="flex-grow flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
//                 {previewUrl ? (
//                   <div className="relative w-full h-full max-h-80">
//                     <Image
//                       src={previewUrl}
//                       alt="Selected lung CT"
//                       layout="fill"
//                       objectFit="contain"
//                     />
//                   </div>
//                 ) : (
//                   <div className="text-center p-12 text-gray-500">
//                     <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <p className="mt-4">Select or upload an image to preview</p>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* Right side - Analysis results */}
//             <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
              
//               {loading && (
//                 <div className="flex flex-col items-center justify-center py-12">
//                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                   <p className="mt-4 text-gray-600">Analyzing image...</p>
//                 </div>
//               )}
              
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
//                   <p className="font-medium">Error</p>
//                   <p className="text-sm">{error}</p>
//                 </div>
//               )}
              
//               {result && !loading && (
//                 <div className="space-y-4">
//                   {/* Primary diagnosis */}
//                   <div className={`p-4 border-l-4 rounded-md ${classInfo[result.predicted_label as keyof typeof classInfo]?.color || 'bg-gray-100 border-gray-500'}`}>
//                     <p className="font-bold text-lg">{result.predicted_label.replace(/\./g, ' ')}</p>
//                     <p className="text-sm mb-2">{classInfo[result.predicted_label as keyof typeof classInfo]?.description || 'No description available'}</p>
//                     <div className="flex items-center">
//                       <span className="text-sm mr-2">Confidence:</span>
//                       <span className={`font-medium ${getConfidenceColor(result.confidence)}`}>
//                         {(result.confidence * 100).toFixed(1)}%
//                       </span>
//                     </div>
//                   </div>
                  
//                   {/* All probabilities */}
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-700 mb-2">All detected conditions:</h3>
//                     {Object.entries(result.all_probabilities).map(([label, probability]) => (
//                       <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100">
//                         <span className="text-sm">{label.replace(/\./g, ' ')}</span>
//                         <div className="flex items-center">
//                           <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
//                             <div 
//                               className="bg-blue-600 h-2 rounded-full" 
//                               style={{ width: `${probability * 100}%` }}
//                             ></div>
//                           </div>
//                           <span className="text-xs text-gray-600">{(probability * 100).toFixed(1)}%</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               {!result && !loading && !error && (
//                 <div className="flex flex-col items-center justify-center py-12 text-gray-500">
//                   <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="mt-4">Select an image and click "Analyze Image" to see results</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* How it works section */}
//           <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">How It Works</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="flex flex-col items-center text-center">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
//                   <span className="text-xl font-bold">1</span>
//                 </div>
//                 <h3 className="text-lg font-medium mb-2">Upload CT Image</h3>
//                 <p className="text-gray-600">Upload a lung CT scan image or select one of our sample images for analysis.</p>
//               </div>
              
//               <div className="flex flex-col items-center text-center">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
//                   <span className="text-xl font-bold">2</span>
//                 </div>
//                 <h3 className="text-lg font-medium mb-2">AI Analysis</h3>
//                 <p className="text-gray-600">Our deep learning model processes the image and identifies potential abnormalities.</p>
//               </div>
              
//               <div className="flex flex-col items-center text-center">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
//                   <span className="text-xl font-bold">3</span>
//                 </div>
//                 <h3 className="text-lg font-medium mb-2">View Results</h3>
//                 <p className="text-gray-600">Review the detailed analysis showing the likelihood of different lung conditions.</p>
//               </div>
//             </div>
            
//             <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
//               <h3 className="text-lg font-medium mb-2">Important Disclaimer</h3>
//               <p className="text-gray-700">
//                 This tool is for educational and research purposes only. It is not a substitute for professional medical diagnosis. 
//                 Always consult with a qualified healthcare provider for proper diagnosis and treatment.
//               </p>
//             </div>
//           </div>
          
//           {/* Class information section */}
//           <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-6">Understanding Classification Results</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {Object.entries(classInfo).map(([className, info]) => (
//                 <div 
//                   key={className} 
//                   className={`p-4 border-l-4 rounded-md ${info.color}`}
//                 >
//                   <h3 className="font-bold text-lg mb-1">{className.replace(/\./g, ' ')}</h3>
//                   <p className="text-gray-700">{info.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>

//       <footer className="bg-gray-800 text-white mt-12 py-8">
//         <div className="container mx-auto px-4 text-center">
//           <p>&copy; {new Date().getFullYear()} Lung CT Classification Tool</p>
//           <p className="mt-2 text-gray-400 text-sm">
//             Powered by TensorFlow and Next.js
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;


"use client"

// pages/index.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';

// Define TypeScript interfaces
interface PredictionResult {
  predicted_label: string;
  confidence: number;
  predicted_class_index: number;
  all_probabilities: {
    [key: string]: number;
  };
}

const Home = () => {
  // State variables
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Effect to detect dark mode preference
  useEffect(() => {
    // Check if user prefers dark mode
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);
    
    // Add listener for changes
    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener('change', listener);
    
    return () => darkModeQuery.removeEventListener('change', listener);
  }, []);
  
  // Sample test images
  const testImages = [
    { id: 'a1', name: 'Sample 1 - Normal', path: '/samples/a1.png' },
    { id: 'a2', name: 'Sample 2 - Adenocarcinoma', path: '/samples/a2.png' },
    { id: 'a3', name: 'Sample 3 - Large Cell', path: '/samples/a3.png' },
    { id: 'a4', name: 'Sample 4 - Squamous Cell', path: '/samples/a4.png' },
    { id: 'a5', name: 'Sample 5 - Normal', path: '/samples/a5.png' },
    { id: 'a6', name: 'Sample 6 - Adenocarcinoma', path: '/samples/a6.png' },
    { id: 'a7', name: 'Sample 7 - Large Cell', path: '/samples/a7.png' },
    { id: 'a8', name: 'Sample 8 - Squamous Cell', path: '/samples/a8.png' },
  ];

  // Class information
  const classInfo = {
    'normal': {
      description: 'Healthy lung tissue with no signs of cancer.',
      color: isDarkMode ? 'bg-green-900 border-green-500 text-green-100' : 'bg-green-100 border-green-500'
    },
    'adenocarcinoma': {
      description: 'A type of non-small cell lung cancer that forms in the glandular cells.',
      color: isDarkMode ? 'bg-red-900 border-red-500 text-red-100' : 'bg-red-100 border-red-500'
    },
    'large.cell.carcinoma': {
      description: 'An aggressive form of lung cancer characterized by large, abnormal cells.',
      color: isDarkMode ? 'bg-purple-900 border-purple-500 text-purple-100' : 'bg-purple-100 border-purple-500'
    },
    'squamous.cell.carcinoma': {
      description: 'A type of non-small cell lung cancer that begins in the squamous cells of the lung.',
      color: isDarkMode ? 'bg-orange-900 border-orange-500 text-orange-100' : 'bg-orange-100 border-orange-500'
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedImage(file);
      setSelectedImage(null);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle sample image selection
  const handleSampleSelect = (imagePath: string) => {
    setSelectedImage(imagePath);
    setUploadedImage(null);
    setPreviewUrl(imagePath);
  };

  // Toggle dark mode manually
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Submit image for analysis
  const analyzeImage = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      let formData = new FormData();
      let imageToSend: File | null = null;
      
      if (uploadedImage) {
        imageToSend = uploadedImage;
      } else if (selectedImage) {
        // Fetch the sample image and convert to File object
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        imageToSend = new File([blob], "sample.png", { type: blob.type });
      }
      
      if (!imageToSend) {
        throw new Error("No image selected");
      }
      
      formData.append('image', imageToSend);
      
      // Replace with your actual API endpoint
      const apiUrl = 'http://localhost:5000/predict';
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Get confidence level color
  const getConfidenceColor = (confidence: number) => {
    if (isDarkMode) {
      if (confidence > 0.85) return 'text-green-400';
      if (confidence > 0.7) return 'text-yellow-400';
      return 'text-red-400';
    } else {
      if (confidence > 0.85) return 'text-green-600';
      if (confidence > 0.7) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  // Dynamic classes based on dark mode
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const textColorSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const highlightBg = isDarkMode ? 'bg-blue-900' : 'bg-blue-50';
  const labelColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const footerBg = isDarkMode ? 'bg-gray-950' : 'bg-gray-800';
  const footerText = isDarkMode ? 'text-gray-300' : 'text-white';
  const buttonBg = !previewUrl || loading
    ? (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-500')
    : (isDarkMode ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700');
  const selectedBorder = isDarkMode ? 'border-blue-400' : 'border-blue-500';
  const unselectedBorder = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const placeholderBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  const placeholderText = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const inputBorder = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const probBarBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
  const probBarFill = isDarkMode ? 'bg-blue-500' : 'bg-blue-600';
  const disclaimerBg = isDarkMode ? 'bg-yellow-900' : 'bg-yellow-50';
  const disclaimerBorder = isDarkMode ? 'border-yellow-700' : 'border-yellow-400';
  const disclaimerText = isDarkMode ? 'text-yellow-100' : 'text-gray-700';
  const stepBg = isDarkMode ? 'bg-blue-900' : 'bg-blue-100';
  const stepColor = isDarkMode ? 'text-blue-300' : 'text-blue-600';

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      <Head>
        <title>Lung CT Classification Tool</title>
        <meta name="description" content="AI-powered lung CT scan analysis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with dark mode toggle */}
          <header className="text-center mb-12 relative">
            <div className="absolute right-0 top-0">
              <button 
                onClick={toggleDarkMode} 
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
            <h1 className={`text-4xl font-bold ${textColor} mb-2`}>Lung CT Classification Tool</h1>
            <p className={`text-lg ${textColorSecondary}`}>
              AI-powered analysis of lung CT images for cancer detection
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Image selection & upload */}
            <div className={`lg:col-span-1 ${cardBg} p-6 rounded-lg shadow-lg border ${borderColor}`}>
              <h2 className={`text-xl font-semibold mb-4 ${textColor}`}>Select Image</h2>
              
              {/* Image upload */}
              <div className="mb-6">
                <label className={`block text-sm font-medium ${labelColor} mb-2`}>
                  Upload your own lung CT image
                </label>
                <div className={`relative border-2 border-dashed ${inputBorder} rounded-lg p-6 flex flex-col items-center hover:border-blue-500 transition-colors duration-200`}>
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <svg className={`w-10 h-10 ${placeholderText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className={`mt-2 text-sm ${placeholderText}`}>Drag & drop or click to browse</p>
                </div>
              </div>
              
              {/* Sample images */}
              <div>
                <h3 className={`text-sm font-medium ${labelColor} mb-2`}>Or select a sample image</h3>
                <div className="grid grid-cols-2 gap-2">
                  {testImages.map((img) => (
                    <div 
                      key={img.id}
                      className={`cursor-pointer border-2 p-1 rounded hover:${highlightBg} transition-all duration-200 transform hover:scale-105 ${selectedImage === img.path ? selectedBorder : unselectedBorder}`}
                      onClick={() => handleSampleSelect(img.path)}
                    >
                      <div className={`aspect-w-1 aspect-h-1 ${placeholderBg} relative`}>
                        <div className="w-full h-32 relative">
                          <Image 
                            src={img.path}
                            alt={img.name}
                            layout="fill" 
                            objectFit="cover"
                            className="rounded"
                          />
                        </div>
                      </div>
                      <p className={`text-xs text-center mt-1 truncate ${textColorSecondary}`}>{img.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Analyze button */}
              <button
                onClick={analyzeImage}
                disabled={!previewUrl || loading}
                className={`w-full mt-6 py-2 px-4 rounded font-medium transition-colors duration-200 shadow-md ${buttonBg}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : 'Analyze Image'}
              </button>
            </div>
            
            {/* Center - Image preview */}
            <div className={`lg:col-span-1 ${cardBg} p-6 rounded-lg shadow-lg border ${borderColor} flex flex-col`}>
              <h2 className={`text-xl font-semibold mb-4 ${textColor}`}>Image Preview</h2>
              
              <div className={`flex-grow flex items-center justify-center ${placeholderBg} rounded-lg border ${borderColor}`}>
                {previewUrl ? (
                  <div className="relative w-full h-full max-h-80">
                    <Image
                      src={previewUrl}
                      alt="Selected lung CT"
                      layout="fill"
                      objectFit="contain"
                      className="rounded"
                    />
                  </div>
                ) : (
                  <div className={`text-center p-12 ${placeholderText}`}>
                    <svg className={`w-12 h-12 mx-auto ${placeholderText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-4">Select or upload an image to preview</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right side - Analysis results */}
            <div className={`lg:col-span-1 ${cardBg} p-6 rounded-lg shadow-lg border ${borderColor}`}>
              <h2 className={`text-xl font-semibold mb-4 ${textColor}`}>Analysis Results</h2>
              
              {loading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  <p className={`mt-4 ${textColorSecondary}`}>Analyzing image...</p>
                </div>
              )}
              
              {error && (
                <div className={`${isDarkMode ? 'bg-red-900 border-red-700 text-red-100' : 'bg-red-50 border-red-200 text-red-600'} border rounded-md p-4`}>
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}
              
              {result && !loading && (
                <div className="space-y-4">
                  {/* Primary diagnosis */}
                  <div className={`p-4 border-l-4 rounded-md ${classInfo[result.predicted_label as keyof typeof classInfo]?.color || 'bg-gray-100 border-gray-500'}`}>
                    <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : ''}`}>{result.predicted_label.replace(/\./g, ' ')}</p>
                    <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : ''}`}>{classInfo[result.predicted_label as keyof typeof classInfo]?.description || 'No description available'}</p>
                    <div className="flex items-center">
                      <span className={`text-sm mr-2 ${isDarkMode ? 'text-gray-300' : ''}`}>Confidence:</span>
                      <span className={`font-medium ${getConfidenceColor(result.confidence)}`}>
                        {(result.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  {/* All probabilities */}
                  <div>
                    <h3 className={`text-sm font-medium ${labelColor} mb-2`}>All detected conditions:</h3>
                    {Object.entries(result.all_probabilities).map(([label, probability]) => (
                      <div key={label} className={`flex justify-between items-center py-2 border-b ${borderColor}`}>
                        <span className={`text-sm ${textColor}`}>{label.replace(/\./g, ' ')}</span>
                        <div className="flex items-center">
                          <div className={`w-32 ${probBarBg} rounded-full h-2 mr-2`}>
                            <div 
                              className={`${probBarFill} h-2 rounded-full transition-all duration-500 ease-out`} 
                              style={{ width: `${probability * 100}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs ${textColorSecondary}`}>{(probability * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!result && !loading && !error && (
                <div className={`flex flex-col items-center justify-center py-12 ${placeholderText}`}>
                  <svg className={`w-12 h-12 ${placeholderText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-4">Select an image and click "Analyze Image" to see results</p>
                </div>
              )}
            </div>
          </div>

          {/* How it works section */}
          <div className={`mt-12 ${cardBg} p-8 rounded-lg shadow-lg border ${borderColor}`}>
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${stepBg} rounded-full flex items-center justify-center ${stepColor} mb-4 shadow-md transform transition-transform duration-300 hover:scale-110`}>
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${textColor}`}>Upload CT Image</h3>
                <p className={textColorSecondary}>Upload a lung CT scan image or select one of our sample images for analysis.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${stepBg} rounded-full flex items-center justify-center ${stepColor} mb-4 shadow-md transform transition-transform duration-300 hover:scale-110`}>
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${textColor}`}>AI Analysis</h3>
                <p className={textColorSecondary}>Our deep learning model processes the image and identifies potential abnormalities.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${stepBg} rounded-full flex items-center justify-center ${stepColor} mb-4 shadow-md transform transition-transform duration-300 hover:scale-110`}>
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${textColor}`}>View Results</h3>
                <p className={textColorSecondary}>Review the detailed analysis showing the likelihood of different lung conditions.</p>
              </div>
            </div>
            
            <div className={`mt-8 p-4 ${disclaimerBg} border-l-4 ${disclaimerBorder} rounded-md`}>
              <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-yellow-200' : 'text-gray-800'}`}>Important Disclaimer</h3>
              <p className={disclaimerText}>
                This tool is for educational and research purposes only. It is not a substitute for professional medical diagnosis. 
                Always consult with a qualified healthcare provider for proper diagnosis and treatment.
              </p>
            </div>
          </div>
          
          {/* Class information section */}
 {/* Class information section */}
<div
  className={`mt-8 p-8 rounded-lg shadow-lg border ${
    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
  }`}
>
  <h2
    className={`text-2xl font-bold mb-6 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}
  >
    Understanding Classification Results
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {Object.entries(classInfo).map(([className, info]) => (
      <div
        key={className}
        className={`p-4 border-l-4 rounded-md ${info.color} shadow-md transition-transform duration-300 hover:scale-102 ${
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <h3 className="font-bold text-lg mb-1">{className.replace(/\./g, ' ')}</h3>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{info.description}</p>
      </div>
    ))}
  </div>
</div>
</div>

      </main>

      <footer className={`${footerBg} ${footerText} mt-12 py-8`}>
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Lung CT Classification Tool</p>
          <p className="mt-2 text-gray-400 text-sm">
            Powered by TensorFlow and Next.js
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;