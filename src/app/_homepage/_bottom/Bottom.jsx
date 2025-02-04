"use client";
import React, { useState } from "react";
import { Card } from "../../../components/Card";
import { Button } from "@headlessui/react";
import { blogData } from "../../../lib/dummyData";

export const Bottom = () => {
  const [category, setCategory] = useState(blogData.categories[0].name); // Default to the first category
  const [data, setData] = useState(blogData.categories[0].blogs); // Default to the first category's blogs

  const handleCategory = (catName) => {
    setCategory(catName);
    const selectedCategory = blogData.categories.find(
      (item) => item.name === catName
    );
    setData(selectedCategory.blogs);
  };

  return (
    <div className="w-full mx-auto">
      {/* Category Buttons */}
      <div className="flex justify-center">
        {blogData.categories.map((item) => (
          <div
            key={item.id}
            className="my-20 bg-gray-700 text-white border-2 border-gray-500"
          >
            <Button
              onClick={() => handleCategory(item.name)}
              className={`px-20 py-4 ${category === item.name ? "bg-white text-black" : ""
                }`}
            >
              {item.name}
            </Button>
          </div>
        ))}
      </div>

      {/* Articles List */}
      <div className="grid grid-cols-2 gap-20 mx-[25%] mt-6">
        {data.map((item) => (
          <div key={item.id}>
            <Card
              imageSrc={item.image}
              description={item.shortDescription}
              title={item.title}
              id={item.id}
              category={category}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
