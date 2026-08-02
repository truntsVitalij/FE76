import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useSearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchTerm = searchParams.get("q") || "";

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    } else {
      navigate("/blog");
    }
  };

  const clearSearch = () => {
    navigate("/blog");
    setIsSearchOpen(false);
  };

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isSearchOpen]);
  return {
    isSearchOpen,
    searchTerm,
    handleSearch,
    clearSearch,
    toggleSearch,
  };
};
