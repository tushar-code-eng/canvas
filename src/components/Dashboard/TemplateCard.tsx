import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

interface TemplateCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, description, icon }) => {
  const router = useRouter();
  const [uniqueId, setUniqueId] = useState("")

  useEffect(() => {
    const uuid = uuidv4();
    setUniqueId(uuid)
  }, [])

  const handleClick = async () => {
    router.push(`/design/${uniqueId}`);
  }

  return (
    <div onClick={() => handleClick()} className="group bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-sm cursor-pointer transition-all duration-300">
      <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <h3 className="font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default TemplateCard;

export { TemplateCard }