// export const CloseIcon = () => (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 20 20-"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M12.4517 4.51617C12.8977 4.95217 12.9327 5.55917 12.4517 6.09217L8.70468 10.0002L12.4517 13.9082C12.9327 14.4412 12.8977 15.0492 12.4517 15.4822C12.0067 15.9182 11.2547 15.8902 10.8367 15.4822C10.4187 15.0762 6.33468 10.7872 6.33468 10.7872C6.22883 10.685 6.14464 10.5626 6.08714 10.4272C6.02964 10.2919 6 10.1463 6 9.99917C6 9.85208 6.02964 9.7065 6.08714 9.57111C6.14464 9.43572 6.22883 9.31331 6.33468 9.21118C6.33468 9.21118 10.4187 4.92417 10.8367 4.51617C11.2547 4.10717 12.0067 4.08017 12.4517 4.51617V4.51617Z"
//       fill="white"
//     />
//   </svg>

import { motion, MotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ProgressRing } from "../VideoProgressCursor/ProgressRing";

// );
export const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z"
      fill="white"
    />
  </svg>
);

export const BackIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block h-[1em] w-[1em] leading-[1em] mr-2 -mt-1"
  >
    <path
      d="M12.9998 8L6 14L12.9998 21"
      stroke="white"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984"
      stroke="white"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const ScrollUpDot = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_917_887)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 2C10 1.46957 9.78929 0.960859 9.41421 0.585786C9.03914 0.210714 8.53043 0 8 0C7.46957 0 6.96086 0.210714 6.58579 0.585786C6.21071 0.960859 6 1.46957 6 2C6 2.53043 6.21071 3.03914 6.58579 3.41421C6.96086 3.78929 7.46957 4 8 4C8.53043 4 9.03914 3.78929 9.41421 3.41421C9.78929 3.03914 10 2.53043 10 2Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_917_887">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const ScrollUpArrow = ({ progress }: { progress: MotionValue }) => {
  const yPos = useTransform(progress, [0, 1], [10, 0]);
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0 right-0"
    >
      <motion.path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.7792 10.841C11.6386 10.9815 11.4479 11.0603 11.2492 11.0603C11.0504 11.0603 10.8598 10.9815 10.7192 10.841L8.74918 8.871V15.25C8.74918 15.4489 8.67016 15.6397 8.52951 15.7803C8.38885 15.921 8.19809 16 7.99918 16C7.80026 16 7.6095 15.921 7.46885 15.7803C7.32819 15.6397 7.24918 15.4489 7.24918 15.25V8.871L5.27918 10.841C5.21052 10.9147 5.12771 10.9738 5.03572 11.0148C4.94372 11.0558 4.8444 11.0778 4.7437 11.0796C4.643 11.0814 4.54297 11.0628 4.44958 11.0251C4.35619 10.9874 4.27136 10.9313 4.20014 10.86C4.12892 10.7888 4.07278 10.704 4.03505 10.6106C3.99733 10.5172 3.97881 10.4172 3.98059 10.3165C3.98236 10.2158 4.0044 10.1165 4.0454 10.0245C4.08639 9.93246 4.14549 9.84966 4.21918 9.781L7.46918 6.531L7.99918 6L8.52918 6.53L11.7792 9.78C11.8489 9.84965 11.9042 9.93235 11.9419 10.0234C11.9796 10.1144 11.999 10.212 11.999 10.3105C11.999 10.409 11.9796 10.5066 11.9419 10.5976C11.9042 10.6886 11.8489 10.7713 11.7792 10.841Z"
        fill="white"
        style={{
          y: yPos,
        }}
      />
    </svg>
  );
};

export const ScrollUpIcon = ({ progress }: { progress: MotionValue }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const unobserve = progress.onChange((val) => {
      setScrollProgress(val * 100);
    });

    return () => {
      unobserve();
    };
  }, []);

  return (
    <div className="inline-block relative h-[1em] w-[1em] leading-[1em] mr-2 -mt-4 top-[-.05em] left-[-.26em]">
      {/* <ScrollUpDot />
    <ScrollUpArrow progress={progress} /> */}
      <ProgressRing
        progress={scrollProgress}
        strokeColor={"white"}
        stroke={2}
        radius={12}
      />
    </div>
  );
};
