import React from 'react'
import img from '../images/1.webp'

export const handleImageUpload = (e, setImages, setLoading) => {
    setLoading(true)
    let file;
    if (e.target.files.length === 1) {
        file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'mernchatapp');
            formData.append('cropping', true)
            fetch(`https://api.cloudinary.com/v1_1/daadraj4k/image/upload/`, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data, 'img obt from cloudinary')
                    setImages((prevImages) => [...prevImages,
                    {
                        secure_url: data.secure_url,
                        public_id: data.public_id
                    }
                    ]);
                    setLoading(false)
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                    setLoading(false)
                });
        }
    }
    else {
        let arr = []
        Array.from(e.target.files).map((file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'mernchatapp');

            fetch(`https://api.cloudinary.com/v1_1/daadraj4k/image/upload`, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    setImages((prevImages) => [...prevImages,
                    {
                        secure_url: data.secure_url,
                        public_id: data.public_id
                    }
                    ]);
                    setLoading(false)
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                    setLoading(false)
                });
        })

    }

};

export const handleImageRemove = (publicId, setImages, setLoading) => {
    setImages((prevImages) =>
        prevImages.filter((image) => image.public_id !== publicId)
    );
};

