import axios from "axios";


///get cards info to fetch and to rerender purpose

export const getCard = (setCardResult, userId) => {
    axios.get(`https://notebackend-qr35.onrender.com/card/cards/${userId}`)
    .then((result) => {
      setCardResult(result.data);
      return result.data;
    })
    .catch(() => {
      console.error("Error fetching cards:", 'user please login');
    });
};

export const getCheckList = (setCheckListResult, userId) => {
    axios.get(`https://notebackend-qr35.onrender.com/checklist/checklists/${userId}`)
    .then((result) => {
      setCheckListResult(result.data);
      return result.data;
    })
    .catch(() => {
      console.error("Error fetching cards:", 'user please login');
    });
};

export const getUser = (userId, setGetUsername, setAvatar, setLock) => {
  axios.get(`https://notebackend-qr35.onrender.com/auth/username/${userId}`,)
    .then((result) => {
        setLock(result.data.lock)
        setAvatar(result.data.avatar)
        setGetUsername(result.data.username.charAt(0).toUpperCase() + result.data.username.slice(1));
        return;
    })
    .catch((error) => {
        console.error("Error fetching username:", error.message);
    });
};

