import { useState } from "react";
import axios from "axios";

const InsertDBClothing = () => {
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [message, setMessage]=useState("");
  const [image, setImage]=useState(null);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

        try{

          const formData=new FormData();
            formData.append('type',type);
            formData.append('brand',brand);
            formData.append('color',color);
            formData.append('material',material);
            formData.append('size',size);
            if(image) formData.append('image',image);
          const response= await axios.post(`http://localhost:4001/product/clothing/`,formData,{
            headers:{
              'Content-type':'multipart/form-data'
            }
          });
          setMessage(response.data.message || "Gadget Inserted successfully");
          setType("");
          setSize("");
          setBrand("");
          setColor("");
          setMaterial("");
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
              placeholder="Clothing type !!... "
              value={type}
              onChange={(e)=>setType(e.target.value)}  
            />
          </div>
          <div>
            <label className="text-amber-100">size: </label>
            <input 
              className="w-full p-1 mt-1"
              type="text" 
              placeholder="size.."
              value={size}
              onChange={(e)=>setSize(e.target.value)}  
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
            <label className="text-amber-100">brand: </label>
            <input 
              className="w-full p-1 mt-1"
              type="text" 
              placeholder="size.."
              value={brand}
              onChange={(e)=>setBrand(e.target.value)}  
            />
          </div>
           <div>
            <label className="text-amber-100">Material: </label>
            <input 
              className="w-full p-1 mt-1"
              type="material" 
              placeholder="material..."
              value={material}
              onChange={(e)=>setMaterial(e.target.value)}  
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

export default InsertDBClothing;
