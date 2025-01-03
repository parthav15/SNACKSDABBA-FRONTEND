import React, { useEffect, useState } from "react";
import { BASE_URL } from "config";
import "./top_categories.css";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}api/list_categories/`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      setError("An error occurred while fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="top-categories mt-4">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-gray-900 inline-block relative">
          <span className="text-rose-500">Top</span>{" "}
          <span className="absolute left-0 bottom-0 w-full border-b-2 border-rose-500"></span>
          Categories
        </h1>
        <p className="text-sm text-gray-600">
          Browse through our top categories.
        </p>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="categories-container">
        {categories.map((category) => (
          <article className="card" key={category.id}>
            <img
              className="card__background"
              src={`${BASE_URL}media/${category.image}`}
              alt={category.name}
            />
            <div className="card__content flow">
              <div className="card__content--container flow">
                <h2 className="card__title">{category.name}</h2>
                <p
                  className="card__description"
                  dangerouslySetInnerHTML={{ __html: category.description }}
                ></p>
              </div>
              <button className="card__button">Explore</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;

