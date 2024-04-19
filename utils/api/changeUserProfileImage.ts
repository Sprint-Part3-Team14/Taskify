export const changeUserProfileImage = async ({ imageURL }: { imageURL: string }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/users/me/image`, {
    method: 'POST',
    body: JSON.stringify(imageURL),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = response.json();
  return result;
};
