import React from 'react';
import { useState } from 'react';

export const SpinnerSm = () => {
    const [imgL] = useState("https://www.bing.com/th/id/OGC.e26d873ee68fbcd9dc1c40d8b0c6b3b4?pid=1.7&rurl=http%3a%2f%2fgifimage.net%2fwp-content%2fuploads%2f2017%2f08%2fspinner-gif-12.gif&ehk=3rnmLsMGOrJsi9scsdnKy7iz0nzHR8Xc%2b%2b7wRQPMxqE%3d")
    const [imgLink] = useState("https://www.bing.com/th/id/OGC.8b9a5cd1abdf533be8bf4a1af84fa3ee?pid=1.7&rurl=http%3a%2f%2fgifimage.net%2fwp-content%2fuploads%2f2018%2f05%2fspinner-gif-transparent-background-5.gif&ehk=tBXHzWuDeAiZHg0Gi3y03Ff9y98zhHhWc5eesriG1VE%3d")

    return (
        <div>
            <img src={imgLink} className='spinnerSm' alt="Loading..." />
        </div>
    );
};


export const SpinnerLg = () => {
    const [imgL] = useState("https://th.bing.com/th/id/R.f9a33b90ca38ac9660e6b9f1d82b8b85?rik=lwwF5STJVv1BmQ&pid=ImgRaw&r=0")

    return (
        <div>
            <center>
                <img src={imgL} alt="Loading..." />

            </center>
        </div>
    );
};

