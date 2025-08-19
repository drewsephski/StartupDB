"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card"; // Assuming Card is a UI component you want to wrap

interface ClickableCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  link: string;
  children: React.ReactNode;
}

const ClickableCard: React.FC<ClickableCardProps> = ({ link, children, ...props }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(link);
  };

  return (
    <Card onClick={handleClick} {...props}>
      {children}
    </Card>
  );
};

export default ClickableCard;