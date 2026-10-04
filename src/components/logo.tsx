import React from "react";

interface LogoProps extends React.SVGAttributes<SVGSVGElement> {
  className?: string;
}

export const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="24" height="24" rx="5" fill="#FF2B2B" />
      <path
        d="M13.1237 11.5355L12.1237 7.53552L11.1237 11.5355L7.12373 12.5355L11.1237 13.5355L12.1237 17.5355L13.1237 13.5355L17.1237 12.5355L13.1237 11.5355Z"
        fill="#F5FBFF"
      />
    </svg>
  );
};

export default Logo;
