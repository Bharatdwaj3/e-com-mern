import { useState } from "react";
import axios from "axios";

const InsertDBEssentials = () => {
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [usage, setUsage] = useState("");
   const [power, setPower] = useState("");
  const [message, setMessage]=useState("");
  const [image, setImage]=useState(null);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

        try{

          const formData=new FormData();
            formData.append('type',type);
            formData.append('material',material);
            formData.append('color',color);
            formData.append('usage',usage);
            formData.append('brand',brand);
            formData.append('power',power);
            if(image) formData.append('image',image);
          const response= await axios.post(`http://localhost:4001/product/essential/`,formData,{
            headers:{
              'Content-type':'multipart/form-data'
            }
          });
          setMessage(response.data.message || "Essential Item Inserted successfully");
          setType("");
          setBrand("");
          setMaterial("");
          setColor("");
          setUsage("");
          setPower("");
          setImage(null);
        }catch(error){
          console.log("Error inserting Essential Item: ",error);
          setMessage("Failed to insert Essential Item");
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
            <label className="text-amber-100">brand: </label>
            <input 
              className="w-full p-1 mt-1"
              type="text" 
              placeholder="brand.."
              value={brand}
              onChange={(e)=>setBrand(e.target.value)}  
            />
          </div>
           <div>
            <label className="text-amber-100">material: </label>
            <input 
              className="w-full p-1 mt-1"
              type="text" 
              placeholder="material.."
              value={material}
              onChange={(e)=>setMaterial(e.target.value)}  
            />
          </div>
          <div>
            <label className="text-amber-100">color: </label>
            <input 
              className="w-full p-1 mt-1"
              type="text" 
              placeholder="color.."
              value={color}
              onChange={(e)=>setColor(e.target.value)}  
            />
          </div>
          <div>
            <label className="text-amber-100">usage: </label>
            <input 
              className="w-full p-1 mt-1"
              type="text" 
              placeholder="usage.."
              value={usage}
              onChange={(e)=>setUsage(e.target.value)}  
            />
          </div>
           
           <div>
            <label className="text-amber-100">power: </label>
            <select 
              className="w-full p-1 mt-1"
              value={power}
              onChange={(e)=>setPower(e.target.value)}  
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
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

export default InsertDBEssentials;
