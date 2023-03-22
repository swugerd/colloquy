import React from 'react';
import s from './Preloader.module.scss';

type PreloaderProps = {
  className?: string;
};

const Preloader: React.FC<PreloaderProps> = ({ className }) => {
  return (
    <div className={`${s['preloader']} ${className ? s[className] : ''}`}>
      <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="path1" d="M11 6L6 11L11 16L16 11L11 6Z" fill="white">
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="2s"
            repeatCount="indefinite"
          />
        </path>
        <path id="path2" d="M5 12L0 17L5 22L10 17L5 12Z" fill="white">
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="1s"
            begin="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="4s"
            repeatCount="indefinite"
          />
        </path>
        <path id="path3" d="M11 18L6 23L11 28L16 23L11 18Z" fill="white">
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="1s"
            begin="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="6s"
            repeatCount="indefinite"
          />
        </path>
        <path id="path4" d="M23 18L18 23L23 28L28 23L23 18Z" fill="white">
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="1s"
            begin="6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="8s"
            repeatCount="indefinite"
          />
        </path>
        <path id="path5" d="M29 12L24 17L29 22L34 17L29 12Z" fill="white">
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="1s"
            begin="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="10s"
            repeatCount="indefinite"
          />
        </path>
        <path id="path5" d="M23 6L18 11L23 16L28 11L23 6Z" fill="white">
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="1s"
            begin="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="10s"
            repeatCount="indefinite"
          />
        </path>
        <path id="path6" d="M17 0L12 5L17 10L22 5L17 0Z" fill="white">
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="1s"
            begin="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="10s"
            repeatCount="indefinite"
          />
        </path>
        <path id="path7" d="M17 12L12 17L17 22L22 17L17 12Z" fill="white">
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="1s"
            begin="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="10s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default Preloader;
