import instance  from "./request";

export default async function getSetting(){
  const data = await instance.get("/api/setting")

  return data
}

