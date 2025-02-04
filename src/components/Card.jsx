import { MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export const Card = ({ imageSrc, title, description, category, id }) => {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);


  if (!baseUrl) return null;


  const blogUrl = `${baseUrl}/blog/${id}?category=${category}`;


  const tweetText = `Check out this blog post: ${title}\n\n${description}\n\nRead more here: ${blogUrl}`;


  const encodedTweetText = encodeURIComponent(tweetText);


  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTweetText}`;


  const subject = "Check out this blog post";
  const body = `I found this blog post interesting: ${blogUrl}`;

  const encodedBody = encodeURIComponent(body);
  const encodedSubject = encodeURIComponent(subject);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodedSubject}&body=${encodedBody}`;
  const whatsappText = `Check out this blog post: ${title}\n\n${description}\n\nRead more here: ${blogUrl}`;
  const encodedWhatsappText = encodeURIComponent(whatsappText);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedWhatsappText}`;
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

        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <TwitterIcon size={32} round={true} />
        </a>


        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <WhatsappIcon size={32} round={true} />
        </a>


        <a href={gmailUrl} target="_blank" rel="noopener noreferrer">
          <MailIcon size={32} />
        </a>
      </div>
    </div>
  );
};
