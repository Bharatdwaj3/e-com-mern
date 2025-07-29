import { useState } from "react";
import axios from "axios";

const InsertDB = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [dob, setDob] = useState("");
  const [dod, setDod] = useState("");
  const [alive, setAlive] = useState("");
  const [religion, setReligion] = useState("");
  const [image, setImage]=useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

        try{

          const formData=new FormData();
            formData.append('name',name);
            formData.append('dob',dob);
            formData.append('dod',dod);
            formData.append('alive',alive);
            formData.append('title',title);
            formData.append('religion',religion);
            if(image) formData.append('image',image);
          const response= await axios.post("http://localhost:4000/monarchs/",formData,{
            headers:{
              'Content-Type':'multipart/form-data'
            }
          });
          setMessage(response.data.message || "monarch Inserted successfully");
          setName("");
          setTitle("");
          setDob("");
          setDod("");
          setAlive("");
          setReligion("");
          setImage(null);
        }catch(error){
          console.log("Error inserting monarch: ",error);
          setMessage("Failed to insert monarch");
        }
  };

  return (
    <div className="bg-amber-700 h-[1200px] w-[800px] m-64 p-4 rounded">
        <h2 className="text-white mb-4">{message}</h2>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-amber-100">Name: </label>
            <input 
              className="w-full p-1 mt-1"
              type="text" 
              placeholder="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}  
            />
          </div>
          <div>
            <label className="text-amber-100">Title: </label>
            <input 
              className="w-full p-1 mt-1"
              type="text" 
              placeholder="Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}  
            />
          </div>
          <div>
            <label className="text-amber-100">Birth: </label>
            <input 
              className="w-full p-1 mt-1"
              type="date" 
              placeholder="Birth..."
              value={dob}
              onChange={(e)=>setDob(e.target.value)}  
            />
          </div>
          <div>
            <label className="text-amber-100">Death: </label>
            <input 
              className="w-full p-1 mt-1"
              type="date" 
              placeholder="Death..."
              value={dod}
              onChange={(e)=>setDod(e.target.value)}  
            />
          </div>
          <div>
            <label className="text-amber-100">Alive: </label>
            <select 
              className="w-full p-1 mt-1"
              value={alive}
              onChange={(e)=>setAlive(e.target.value)}  
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          
          <div>
            <label className="text-amber-100">Religion: </label>
            <input 
              className="w-full p-1 mt-1"
              type="text" 
              placeholder="Religion"
              value={religion}
              onChange={(e)=>setReligion(e.target.value)}  
            />
          </div>
          <div>
            <label className="text-amber-100">Image: </label>
            <input 
              className="w-full p-1 mt-1"
              type="file" 
              accept="image/*"
              onChange={(e)=>setImage(e.target.files[0])}  
            />
          </div>
          <button 
            className="bg-white text-amber-700 p-2 rounded"
            type="submit">
              Sumbit
          </button>
        </form>
    </div>
  );
};

export default InsertDB;
