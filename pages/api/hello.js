// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const fetchDog = async () => {
    const request = await fetch("https://dog.ceo/api/breeds/image/random").then(
      (res) => res.json()
    );

    return request;
  };

  const data = await fetchDog();
  res.status(200).json({ data });
}
