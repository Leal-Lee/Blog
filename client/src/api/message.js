import instance  from "./request";
export async function getMessage({ page=1,limit=10,keyword=''} ){
    const data = await instance.get(`/api/message`,{
      params:{
          page,limit,keyword
      }
    })

    return data
  }


  export  async function postMessage( ){
    const data = await instance.post('/api/message',)
   
    return data
  }
