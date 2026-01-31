"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// React
import { useState } from "react";

// React Icons
import { RiMailSendLine } from "react-icons/ri";


const ContactMsg = () => {
  const [Message, setMessage] = useState({
    userName: "",
    email: "",
    subject: "",
    comment: "",
  });
  return (
    <div className="bg-slate-50 p-4 rounded-2xl shadow-lg">
      <header className="text-2xl font-bold mb-7 ">Send us a Message</header>
      <form className="space-y-6">
        {/* user name */}
        <div className="grid gap-2">
          <Label htmlFor="user">UserName</Label>
          <Input
            id="user"
            type={"text"}
            value={Message.userName}
            onChange={(e) =>
              setMessage({
                ...Message,
                userName: e.target.value,
              })
            }
            placeholder="Enter your UserName"
          />
        </div>
        {/* email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type={"email"}
            value={Message.email}
            onChange={(e) =>
              setMessage({
                ...Message,
                email: e.target.value,
              })
            }
            placeholder="Enter your email address"
          />
        </div>
        {/*subject */}
        <div className="grid gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            type={"text"}
            id="subject"
            value={Message.subject}
            onChange={(e) =>
              setMessage({
                ...Message,
                subject: e.target.value,
              })
            }
            placeholder="What is this about?"
          />
        </div>
        {/* message */}
        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            placeholder="Type your message here..."
            id="message"
            className="h-40"
            value={Message.comment}
            onChange={(e) =>
              setMessage({
                ...Message,
                comment: e.target.value,
              })
            }
          />
        </div>
        <Button className="w-full py-6">
          <RiMailSendLine /> Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactMsg;
