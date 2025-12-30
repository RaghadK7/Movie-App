const PROJECT_ID = import.meta.env.VITE.APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE.APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE.APPWRITE_COLLECTION_ID 



export const updateSearchTermCount = async ()=>{
console.log(PROJECT_ID , DATABASE_ID , COLLECTION_ID)

}