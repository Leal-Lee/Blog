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

    const data = await instance.get('/api/blogType')
   
    return data
  }


  export async function getComment({ page=1,limit=10,blogId=-1,keyword=''} ){

    const data = await instance.get(`/api/comment`,{
      params:{
          page,limit,blogId,keyword
      }
    })
   
    return data
  }


  export  async function postComment( data){
    
    const datas = await instance.post('/api/comment',
      data
    )

    return datas
  }
