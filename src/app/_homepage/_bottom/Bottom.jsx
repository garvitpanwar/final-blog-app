// "use client";
// import { Card } from "@/components/Card";
// import { Button } from "@headlessui/react";
// import axios from "axios";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// export const Bottom = () => {
//   const [category, setCatory] = useState("Web Development");
//   const [data, setData] = useState([]);
//   const categories = [
//     {
//       id: 1,
//       name: "Web Development",
//     },
//     {
//       id: 2,
//       name: "Artifical Intelligence",
//     },
//     {
//       id: 3,
//       name: "Cloud",
//     },
//     {
//       id: 4,
//       name: "Data Science",
//     },
//   ];

//   const handleCategory = (cat) => {
//     // console.log(cat);
//     setCatory(cat.name);
//   };

//   useEffect(() => {
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
//         // console.log(response.data.data[0]?.title);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [category]);

//   console.log(data);

//   return (
//     <div className="w-full mx-auto">
//       <div className="flex justify-center">
//         {categories.map((item) => (
//           <div
//             key={item.id}
//             className="my-20 bg-gray-700 text-white border-2 border-gray-500"
//           >
//             <Button
//               onClick={() => handleCategory(item)}
//               className={`px-20 py-4 ${
//                 category == item.name && "bg-white text-black"
//               }`}
//             >
//               {item.name}
//             </Button>
//           </div>
//         ))}
//       </div>
//       {/* <div className="mt-4 text-center">Selected Category: {category}</div> */}
//       <div className="grid grid-cols-2 gap-20 mx-[25%] mt-6">
//         {data.map((item, idx) => (
//           <div key={idx} className="">
//             <Card
//               imageSrc={item.urlToImage}
//               description={item.description}
//               title={item.title}
//               id={item.id}
//               category={category}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


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
