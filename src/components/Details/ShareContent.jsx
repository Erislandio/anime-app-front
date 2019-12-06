import React from "react";

import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  EmailShareButton
} from "react-share";

import {
  FaWhatsapp,
  FaFacebookSquare,
  FaTwitter,
  FaTelegramPlane,
  FaPinterestSquare,
  FaMailBulk
} from "react-icons/fa";

export const ShareContent = ({ anime }) => {
  const links = [
    {
      id: 1,
      title: "Whatsapp",
      content: (
        <WhatsappShareButton url={window.location.href}>
          <FaWhatsapp color="#25D366" size={30} />
          <h4>Whatsapp</h4>
        </WhatsappShareButton>
      )
    },
    {
      id: 2,
      title: "Facebook",
      content: (
        <FacebookShareButton url={window.location.href}>
          <FaFacebookSquare color="#4267B2" size={30} />
          <h4>Facebook</h4>
        </FacebookShareButton>
      )
    },
    {
      id: 3,
      title: "Twitter",
      content: (
        <TwitterShareButton url={window.location.href}>
          <FaTwitter color="#1DA1F2" size={30} />
          <h4>Twitter</h4>
        </TwitterShareButton>
      )
    },
    {
      id: 4,
      title: "Pinterest",
      content: (
        <PinterestShareButton
          url={window.location.href}
          media={anime.image_url}
        >
          <FaPinterestSquare color="#c8232c" size={30} />
          <h4>Pinterest</h4>
        </PinterestShareButton>
      )
    },
    {
      id: 5,
      title: "Telegram",
      content: (
        <TelegramShareButton url={window.location.href}>
          <FaTelegramPlane color="#0088cc" size={30} />
          <h4>Telegram</h4>
        </TelegramShareButton>
      )
    },
    {
      id: 6,
      title: "Email",
      content: (
        <EmailShareButton url={window.location.href}>
          <FaMailBulk color="#34495e" size={30} />
          <h4>Email</h4>
        </EmailShareButton>
      )
    }
  ];

  return (
    <div>
      {links.map(link => {
        return (
          <div key={link.id} className="share-content">
            {link.content}
          </div>
        );
      })}
    </div>
  );
};
