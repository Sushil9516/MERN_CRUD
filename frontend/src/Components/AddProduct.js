import React,{useState} from "react";
 
const AddProduct= ()=>{
    const [name, setName]= useState("");
    const [price, setPrice]= useState("");
    const [category, setCategory]= useState("");
    const [company, setCompany]= useState("");
    const [error, setError]=useState(false);
   const addProduct= async() =>{
    if(!name || ! price || ! category || !company)
    {
        setError(true);
        return false;
    }
    console.log(name, price, category, company);
    const userId =  JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch("http://localhost:5000/add-product", {
        method:"post",
        body: JSON.stringify({name, price, category, company}),
        headers:{
            "Content-Type":"application/json"
        }
    });
    result= await result.json();
    console.log(result);
   } 
    return(
        <div className="product">
            <h1>please Add Product</h1> 
            <input type="text" className="inputBox" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter Product Name"/>
            {(error && !name) ? <span className="invalid-input">Enter Valid Name</span> : true  }
            
            <input type="text" className="inputBox" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter Product Price"/>
            {(error && !price) ? <span className="invalid-input">Enter Valid Price</span> : true  }

            <input type="text" className="inputBox" value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder="Enter Product Category"/> 
            {(error && !category) ? <span className="invalid-input">Enter Valid Category</span> : true  }

            <input type="text" className="inputBox" value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder="Enter Product Company"/>
            {(error && !company) ? <span className="invalid-input">Enter Valid Company</span> : true  }

            <button onClick={addProduct} className="appButton">Add Product</button>
        </div>
    )
}

export default AddProduct;