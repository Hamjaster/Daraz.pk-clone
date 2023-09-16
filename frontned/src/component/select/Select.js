import React, { useEffect, useState } from 'react'
import Select from 'react-select';


export default function SelectInput({ data, selectedOption, setSelectedOption, placeholder }) {

    useEffect(() => {
        console.log(data)
    }, [data])


    return (
        <div>
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={data}
                placeholder={placeholder}
                styles={{
                    container: (provided) => ({
                        ...provided,
                        width: "100%",
                        border: '0px solid',
                        borderRadius: "0px", // Set a custom width
                        height: '60px',
                        fontSize: '1.1rem'
                    }),
                    input: (provided) => (
                        {
                            ...provided,
                            width: '100%',
                            border: '0px solid',
                            borderRadius: "0px",
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            forcedColorAdjust: 'black',

                        })

                }}
            />
        </div>
    )
}
