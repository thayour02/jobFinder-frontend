
 import axios  from "axios"

const API_URL = import.meta.env.VITE_BASE_URL || 'https://jobfinder-backend-1.onrender.com/api'

export const API = axios.create({
   baseURL: API_URL,
   responseType:'json'
})


export const apiRequest = async ({ url, method, data, token }) => {
  try {
    const result = await API(url, {
      data: data,
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const body = result?.data;
    if (typeof body !== "object" || body === null) {
      return { success: true, message: "", data: body };
    }
    return { success: body.success ?? true, message: body.message ?? "", ...body };
  } catch (error) {
    const body = error?.response?.data;
    if (typeof body === "object" && body !== null) {
      return { success: false, message: body.message ?? "Something went wrong", ...body };
    }
    return {
      success: false,
      message:
        typeof body === "string" && body
          ? body
          : error?.message || "Network error. Please try again.",
    };
  }
};

/**
 * Upload a file to Cloudinary and return its delivery URL.
 *
 * `resourceType`:
 *   - "image" (default) for profile pictures / logos.
 *   - "raw" for documents (PDF / DOC CVs). PDFs uploaded as "image"/"auto" are
 *     blocked from delivery by Cloudinary's default PDF restriction (401), so
 *     CVs must go up as "raw" to be viewable/downloadable.
 */
export const handleFileUpload = async (uploadFile, resourceType = "image")=>{
  const formData = new FormData();
  formData.append('file', uploadFile)
  formData.append('upload_preset', "job_Finder");
  try {
      const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dph03t5st/${resourceType}/upload/`,
          formData
      );
      return response.data.secure_url
  } catch (error) {
      return ""
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
  if(pageNum){
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