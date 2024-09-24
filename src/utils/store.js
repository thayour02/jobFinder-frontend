
 import axios  from "axios"

let API_URL = 'https://jobfinder-backend-1.onrender.com/api';



export const API = axios.create({
   baseURL: API_URL,
   responseType:'json'
})

export const apiRequest = async({url,method,data,token})=>{
  try {
    const result = await API(url,{
        data:data,
        method:method || "GET",
          headers:{
            "Content-Type":"application/json",
            Authorization: token ? `Bearer ${token}` : ""
          }
    })
    return result?.data
  } catch (error) {
   const err = error.response.data
    return {status:err.success, message:err.message}
  }
}

//upload file to online data
export const handleFileUpload = async (uploadFile)=>{
  const formData = new FormData();
  formData.append('file', uploadFile)
  formData.append('upload_preset', "job_Finder");
  try {
      const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dph03t5st/image/upload/",
          formData
      );
      return response.data.secure_url
  } catch (error) {
      return error
  }
}


export const updateUrl = ({
  pageNum,
  query,
  cmpLoc,
  sort,
  navigate,
  location,
  jType,
  exp,
}) => {
  const params = new URLSearchParams();
  if(pageNum && pageNum >1){
      params.set("page", pageNum);
  }
  if(query){
      params.set("search", query)
  }
  if(cmpLoc){
      params.set("location",cmpLoc)
  }
  if(sort){
      params.set("sort", sort)
  }
  if(jType){
      params.set("jType", jType)
  }
  if(exp){
      params.set("exp", exp)
  }

  const newURL = `${location.pathname}?${params.toString()}`;
  navigate(newURL,{replace:true})
  return newURL;
};