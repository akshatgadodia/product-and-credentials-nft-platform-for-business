import baseURL from "@/app/constants/baseURL";

export const uploadImage = async (file)=>{
    const formData = new FormData();
    formData.append("image", file);
    const result = await fetch(`${baseURL}/image`,
    {
      method:"POST",
      body: formData,
      headers:{
        // "Content-Type": 'multipart/form-data'
      },
      credentials: "include"
    })
    const resultData = await result.json();
    return {
      "success": 1,
      "file": {
        "url": `${baseURL}${resultData.data.url}`
      }
    }
  }
