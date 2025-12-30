import React, { useState } from 'react'

export const Img = () => {
    const [url , setUrl] = useState("./character.webp")
    const [idx, setIdx] = useState(1);
    const pic = [
        "./character.webp",
        "./tps2.webp"
    ]
    const handleClick = ()=>{
        setIdx(prev=> ++prev%2);
        setUrl(pic[idx]);
        
    }

    return (
        <>
            <img src={url}
                alt="anime character eating noodles"
                className="w-full h-full object-cover"
                onClick={handleClick} />
        </>
    )
}
