import { useState, useRef } from "react";

export const useFormHandling = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimeout = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    debounceTimeout.current = setTimeout(() => {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    });
  };
  return { formData, setFormData, isLoading, setIsLoading, error, setError, handleChange };
};
