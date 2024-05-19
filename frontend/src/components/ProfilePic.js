import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function ProfilePic({ changeProfile }) {

    const hiddenFileInput = useRef(null);
    const navigate = useNavigate();

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const notifyA = (msg)=> toast.error(msg);
    const notifyB = (msg)=> toast.success(msg);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const postDetails = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instagram");
        data.append("cloud_name", "shubh1234");
        fetch("https://api.cloudinary.com/v1_1/shubh1234/image/upload", {
            method: "post",
            body: data
        })
        .then(res =>res.json())
        .then(data => {
            if (data.url) {
                console.log(data.url);
                setUrl(data.url);
                // navigate('./');

            } else {
                console.log("URL not found in response", data);
            }
        })
        .catch(err => console.log(err));
    };

    const postPic = () => {
        fetch("http://localhost:5000/uploadProfilePic", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                pic: url
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            notifyB("Profile Pic Changed",);
            navigate('/');

        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        if (image) {
            postDetails();
        }
    }, [image]);

    useEffect(() => {
        if (url) {
            postPic();
        }
    }, [url]);


    return (
        <div className='profilePic darkBg'>
            <div className="changePic centered">
                <div>
                    <h2>Change Profile Pic</h2>
                </div>
                <div onClick={handleClick} style={{ borderTop: "1px solid #00000030" }}>
                    <button className='upload-btn' style={{ color: "blue", }}>Upload Photo</button>
                    <input ref={hiddenFileInput} 
                    type="file" 
                    accept='image/*' 
                    style={{ display: 'none' }} 
                    onChange={(e) => {setImage(e.target.files[0])}}/>
                </div>
                

                <div onClick={changeProfile} style={{ borderTop: "1px solid #00000030" }}>
                    <button className='upload-btn' style={{ background: 'none', border: 'none', cursor: "pointer", fontSize: "15px" }} >Cancel</button>
                </div>
            </div>
        </div>
    )
}
