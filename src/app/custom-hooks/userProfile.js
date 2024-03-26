import { fetchData } from "next-auth/client/_utils";
import { useEffect, useState } from "react";

const userProfile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const responseData = await response.json();
        if (!responseData) {
          throw new Error("Invalid JSON response structure");
        }
        setData(responseData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchData]);

  return { data, loading };
};

export default userProfile;
