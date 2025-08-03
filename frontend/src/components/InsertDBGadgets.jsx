import { useState } from "react";
import axios from "axios";

const InsertDBGadgets = () => {
  const [type, setType] = useState("");
  const [port, setPort] = useState("");
  const [wired, setWired] = useState("");
  const [display, setDisplay] = useState("");
  const [storage, setStorage] = useState("");
  const [message, setMessage]=useState("");
  const [image, setImage]=useState(null);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

        try{

          const formData=new FormData();
            formData.append('type',type);
            formData.append('wired',wired);
            formData.append('display',display);
            formData.append('storage',storage);
            formData.append('port',port);
            if(image) formData.append('image',image);
          const response= await axios.post(`http://localhost:4001/gadgets/`,formData,{
            headers:{
              'Content-type':'multipart/form-data'
            }
          });
          setMessage(response.data.message || "Gadget Inserted successfully");
          setType("");
          setPort("");
          setWired("");
          setDisplay("");
          setStorage("");
          setImage(null);
        }catch(error){
          console.log("Error inserting Gadget: ",error);
          setMessage("Failed to insert Gadget");
        }
  };

  return (
    <div className="bg-amber-700 h-[1200px] w-[800px] m-64 p-4 rounded">
        <h2 className="text-white mb-4">{message}</h2>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-amber-100">type: </label>
            <input 
              className="w-full p-1 mt-1"
              type="text" 
              placeholder="Device type !!... "
              value={type}
              onChange={(e)=>setType(e.target.value)}  
            />
          </div>
          <div>
            <label className="text-amber-100">Port: </label>
            <input 
              className="w-full p-1 mt-1"
              type="text" 
              placeholder="port.."
              value={port}
              onChange={(e)=>setPort(e.target.value)}  
            />
          </div>
          <div>
            <label className="text-amber-100">Wireless: </label>
            <select 
              className="w-full p-1 mt-1"
              value={wired}
              onChange={(e)=>setWired(e.target.value)}  
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
           <div>
            <label className="text-amber-100">Display: </label>
            <select 
              className="w-full p-1 mt-1"
              value={display}
              onChange={(e)=>setDisplay(e.target.value)}  
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
           <div>
            <label className="text-amber-100">Storage: </label>
            <input 
              className="w-full p-1 mt-1"
              type="storage" 
              placeholder="Storage..."
              value={storage}
              onChange={(e)=>setStorage(e.target.value)}  
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

export default InsertDBGadgets;
