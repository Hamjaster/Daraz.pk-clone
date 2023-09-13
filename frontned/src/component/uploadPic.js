import axios from 'axios';
import React from 'react'

export const uploadPic = async (pic) => {

    try {
        if (pic === undefined) {
            console.log("No pic found");
        } else {
            const Fdata = new FormData()
            Fdata.append('file', pic)
            Fdata.append('upload_preset', 'mernchatapp')
            Fdata.append('cloud_name', 'daadraj4k')
            const { data } = await axios.post('https://api.cloudinary.com/v1_1/daadraj4k/image/upload', Fdata)
            return {
                publicId: data?.public_id,
                url: data?.secure_url
            }
        }
    } catch (error) {
        console.log(error);
    }

}
