import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

const LandingPage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(() => {
    return localStorage.getItem("lastSearch") || "";
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const fetchRecipes = async (query) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const jsonData = await res.json();

      setData(jsonData.meals || []);
      setMsg(jsonData.meals ? "" : "No recipes found");
    } catch (error) {
      setMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const myFun = () => {
    if (search.trim() === "") {
      setMsg("Please Enter Something");
      return;
    }

    localStorage.setItem("lastSearch", search);
    fetchRecipes(search);
  };

  //  auto-fetch on refresh if last search exists
  useEffect(() => {
    if (search) {
      fetchRecipes(search);
    }
  }, []);

  return (
    <>
      <h1 className="head">FOOD RECIPE APP</h1>

      <div className="container">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Enter Dish"
            value={search}
            onChange={handleInput}
          />
          <button onClick={myFun}>Search</button>
        </div>

        {loading && <h4 className="msg">Loading...</h4>}
        {!loading && <h4 className="msg">{msg}</h4>}

        <div>
          <RecipeCard detail={data} />
        </div>
      </div>
    </>
  );
};

export default LandingPage;