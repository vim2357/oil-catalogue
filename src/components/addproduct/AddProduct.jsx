import React, { useState } from "react";
import './AddProduct.css'
import { db, storage} from "../../config/Config";

const AddProduct = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState(null)

    const [successUpload, setSuccessUpload] = useState('')
    const [errorUpload, setErrorUpload] = useState('')
    
    const [imgError, setImgError] = useState('')

    const types = [
        'image/jpg', 'image/jpeg', 'image/png', 'image/PNG'
    ]
    const handleProductImage = (e) => {
        let selected = e.target.files[0]
        if(selected) {
            if(selected&&types.includes(selected.type)) {
                setImage(selected)
                setImgError('')
            }
            else {
                setImage(null)
                setImgError('choose a valid type of image')
            }
        }
        else {
            console.log('upload please')
        }
    }

    const handleAddProduct=(e)=>{
        e.preventDefault();
        const uploadTask=storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',snapshot=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress);
        },error=>setErrorUpload(error.message),()=>{
            storage.ref('images').child(image.name).getDownloadURL().then(url=>{
                db.collection('Products').add({
                    title,
                    description,
                    price: Number(price),
                    url
                }).then(()=>{
                    setSuccessUpload('Product added succesfully');
                    setTitle('');
                    setDescription('');
                    setPrice('');
                    document.getElementById('upload-file').value='';
                    setImgError('');
                    setErrorUpload('');
                    setTimeout(()=>{
                        setSuccessUpload('');
                    },4000)
                }).catch(error=>setErrorUpload(error.message));
            })
        })
    }

    return (
        <div className="container">
            <h1>Add product</h1>
            <hr />
            {
                successUpload&& 
                <div className="success-message">{successUpload}</div>
            }
            <form className="form-group" onSubmit={handleAddProduct}>
                <label>Product Title</label>
                <input type="text" className="form-control" required
                onChange={(e)=>{setTitle(e.target.value)}} value={title} />
                <br />
                <label>Description</label>
                <input type="text" className="form-control" required
                onChange={(e)=>{setDescription(e.target.value)}} value={description}/>
                <br />
                <label>Price</label>
                <input type="number" className="form-control" required
                onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
                <br />
                <label>Upload Product Image</label>
                <input type="file" id="upload-file" className="form-control" required 
                onChange={handleProductImage}/>
                {imgError && <>
                <div className="error-message">{imgError}</div>
                </>}
                <br />
                <div className="btn-container">
                    <button type="submit" className="btn btn-success btn-md">SUBMIT</button>
                </div>
            </form>
            {errorUpload && <>
            <div className="error-msg">{errorUpload}</div></>}
        </div>
    )
}

export default AddProduct