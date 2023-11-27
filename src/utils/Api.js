const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

// GET Items
export const getItems = () => {
  const getItems = fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer  ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
  return getItems;
};

// POST Items
export const newItem = ({ name, imageUrl, weather }) => {
  const addItem = fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer  ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);

  return addItem;
};

// DELETE Items
export const deleteItem = (selectedCard) => {
  const deleteItem = fetch(`${baseUrl}/items/${selectedCard.id} `, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer  ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
  return deleteItem;
};
export const addCardLike = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => checkResponse(res));
};

export const removeCardLike = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => checkResponse(res));
};
