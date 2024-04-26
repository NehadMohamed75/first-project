import React from "react"

import { Tag } from "antd";

interface CustomTagProps{
    text: string
}

export const CustomTag: React.FC<CustomTagProps> = ({text}) => {
  return (
    <Tag color="processing">
        {text}
    </Tag>
);
}
