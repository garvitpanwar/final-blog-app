
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { blogData } from "../../../lib/dummyData";
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
