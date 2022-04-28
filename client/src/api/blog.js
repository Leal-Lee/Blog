import instance  from "./request";

// 分页获取博客

export  async function getBlogs({page,limit,categoryid} ){
 
  const data = await instance.get("/api/blog",{
    params:{
        page,limit,categoryid 
    }
  })
 
  return data
}

export async function getBlog(blogid ){
    const data = await instance.get(`/api/blog/${blogid}`)

    return data
  }


  export  async function getblogtype( ){
    const data = await instance.get('/api/blogtype')
   
    return data
  }


  export async function getComment({ page=1,limit=10,blogid=-1,keyword=''} ){
    const data = await instance.get(`/api/comment/${blogid}`,{
      params:{
          page,limit,blogid,keyword
      }
    })
 
    return data
  }


  export  async function postComment( ){
    const data = await instance.post('/api/comment',)
   
    return data
  }
