import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility of the button
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Set the toggleVisibility function as the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <div className="fixed bottom-4 right-4">
        <button
          onClick={scrollToTop}
          className="p-3 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          {/* Arrow */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    )
  );
};

export default ScrollToTop;
