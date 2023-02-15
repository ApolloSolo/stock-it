import { useState, useEffect } from "react";

const Profile = () => {
  const [stockProfile, setStockProfile] = useState(null);

  useEffect(() => {
    const symbol = window.location.pathname.split("/")[2];

    async function getProfileData(symbol) {
      const url = `https://mboum-finance.p.rapidapi.com/qu/quote/asset-profile?symbol=${symbol}`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
        },
      };

      let response = await fetch(url, options);
      let data = await response.json();
      console.log(data.assetProfile);
      setStockProfile(data.assetProfile);
    }

    getProfileData(symbol);
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {stockProfile ? (
        <div>{JSON.stringify(stockProfile, null, 2)}</div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
