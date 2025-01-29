import { MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export const Card = ({ imageSrc, title, description, category, id }) => {
  return (
    <div className="border-2 border-white-500 text-center">
      <Link href={{ pathname: `/blogs/${id}`, query: { category } }}>
        <div className="relative w-full h-56 mt-5">
          <Image
            src={imageSrc || "/noImg.png"}
            alt="cardImg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="text-black font-bold text-lg my-10 p-4">{title}</div>
        <div className="text-black text-left mb-5 p-4">{description}</div>
      </Link>

      <div className="flex gap-3 p-4 justify-end">
        <TwitterShareButton url={`http://localhost:3000/blog/${id}?category=Web+Development`}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={`/blog/${id}`}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <MailIcon size={32} />
      </div>
    </div>
  );
};
