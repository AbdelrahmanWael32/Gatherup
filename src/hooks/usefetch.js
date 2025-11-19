import React from "react";
import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [event, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, [url]);

  return { event, loading };
};

export default useFetch;
