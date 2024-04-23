import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";


const UpdatePage = () => {
    let navigate=useNavigate();
    let {id}= useParams();

    const [Existing,SetExisting]=useState(null)

    const ExistingInfo=async (id)=>{
        let res=await axios.get(`/api/ReadByID/${id}`)
        SetExisting(res.data['row'][0])
    }

    useEffect(() => {
        (async ()=>{
            await ExistingInfo(id)
        })()
    }, []);


    const UpdateData=async (event)=>{

        event.preventDefault();

        let formData=new FormData(event.target);
        let title=formData.get("title");
        let price=formData.get("price");
        let discount=formData.get("discount");
        let discount_price=formData.get("discount_price");


        await axios.post(`/api/Update/${id}`,{
            title:title,
            price:parseFloat(price),
            discount:discount,
            discount_price:parseFloat(discount_price)
        })

        navigate("/")


    }




    return (
        <div className="container mt-5">
            <form onSubmit={UpdateData}>
                <div className="row">
                    <div className="col-md-3">
                        <label>Title</label>
                        <input defaultValue={Existing!==null?(Existing['title']):("")} className="form-control form-control-sm" name="title" type="text" placeholder="title"/>
                    </div>
                    <div className="col-md-3">
                        <label>Price</label>
                        <input defaultValue={Existing!==null?(Existing['price']):("")} className="form-control form-control-sm" name="price" type="text" placeholder="title"/>
                    </div>
                    <div className="col-md-3">
                        <label>Discount</label>
                        <select  className="form-select form-select-sm" name="discount">
                            <option  value="">Select Option</option>
                            <option selected={Existing!==null && Existing['discount']==="Yes" } value="Yes">Yes</option>
                            <option selected={Existing!==null && Existing['discount']==="No" } value="No">No</option>
                        </select>

                    </div>

                    <div className="col-md-3">
                        <label>Discount Price</label>
                        <input defaultValue={Existing!==null?(Existing['discount_price']):("")} className="form-control form-control-sm" name="discount_price" type="text" placeholder="title"/>
                    </div>

                </div>
                <button type="submit" className="btn btn-sm mt-3 btn-success">Update</button>
            </form>
        </div>
    );
};

export default UpdatePage;