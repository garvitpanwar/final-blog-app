// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Page({ params: paramsPromise, searchParams }) {
//   const [params, setParams] = useState(null);
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const {category} = searchParams;

//   useEffect(() => {
//     // Unwrap the params Promise
//     paramsPromise.then((resolvedParams) => setParams(resolvedParams));

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://newsapi.org/v2/everything?q=${category}&language=en&apiKey=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
//         );
//         setData(
//           response.data.articles.map((item, index) => ({
//             ...item,
//             id: index.toString(),
//           }))
//         );
//         setIsLoading(false); 
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [paramsPromise, category]);

//   if (!params) {
//     return <div>Loading...</div>;
//   }

//   const article = data.find((item) => item.id === params.id);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!article) {
//     return <div>Article not found</div>;
//   }

//   return (
//     <div>
//       <h1>{article.title}</h1>
//       <p>{article.content}</p>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { blogData } from "@/lib/dummyData";
import Image from "next/image";

export default function BlogDetails({ params: paramsPromise }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [params, setParams] = useState(null);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    paramsPromise.then((resolvedParams) => setParams(resolvedParams));
  }, [paramsPromise]);

  useEffect(() => {
    if (!params || !category) return;

    const selectedCategory = blogData.categories.find(
      (cat) => cat.name === category
    );
    if (selectedCategory) {
      const selectedArticle = selectedCategory.blogs.find(
        (blog) => blog.id === parseInt(params.id)
      );
      setArticle(selectedArticle);
    }
  }, [params, category]);

  if (!params) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Article not found.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center  min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden ">
        <div className="relative w-full h-64 mt-20">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{article.title}</h1>
          <p className="text-gray-600 leading-7 mb-6">{article.longDescription}</p>
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Back to Blog List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
