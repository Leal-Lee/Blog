
import instance  from "./request";

export default async function getBanners(){
  const data = await instance.get("/api/banner")
 
  return data
}

