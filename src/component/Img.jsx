import React, { useState } from 'react'

export const Img = () => {
    const [url , setUrl] = useState("./character.webp")
    const [idx, setIdx] = useState(1);
    const pic = [
        "./character.webp",
        "./tps2.webp"
    ]
    const isMirrored = url === "./tps2.webp";
    const handleClick = ()=>{
        setIdx(prev=> ++prev%2);
        setUrl(pic[idx]);
        
    }

    return (
        <>
            <img src={url}
                alt="Tapash Roy portfolio illustration"
                className={`w-full h-full object-cover ${isMirrored ? "scale-x-[-1]" : ""}`}
                decoding="async"
                fetchPriority="high"
                onClick={handleClick} />
        </>
    )
}
