import { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  padding-left: 50px;
  font-size: 20px;
  max-height: 150px;
  resize: none;
  border-radius: 20px;
  outline: none;
  border: 2px solid #dfdfdf;
  ::-webkit-scrollbar {
    display: none;
  }
`;

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  [key: string]: any;
}

export function Textarea({ value, onChange, ...props }: TextareaProps) {
  const areaRef = useRef<HTMLTextAreaElement>(null);

  const handleResize = () => {
    if (areaRef.current) {
      areaRef.current.style.height = "auto";
      areaRef.current.style.height = `${areaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleResize();
  }, [value]);

  return (
    <StyledTextarea
      ref={areaRef}
      rows={1}
      value={value}
      onChange={(e) => {
        handleResize();
        onChange(e);
      }}
      {...props}
    />
  );
}
