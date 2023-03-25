import { useState } from "react";

const Nopost = () => {
    const [imgLink] = useState("https://th.bing.com/th/id/OIP.XDr1PFfOATMn3ZCS8TO3QwHaHj?w=178&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7")

    return (
        <div className="mt-4">
            <center>
                <h5>NO POSTS YET...</h5>
                <img src={imgLink} alt="..." />
            </center>
        </div>
    );
}

export default Nopost;