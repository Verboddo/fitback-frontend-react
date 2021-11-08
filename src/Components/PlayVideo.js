import ReactPlayer from "react-player/lazy";
import axios from "axios";
import {useEffect, useState} from "react";

function PlayVideo( { fileId }) {
    const [urlLink, setUrlLink] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")

        async function getVideo() {
            setUrlLink({video: false})
            try {
                const result = await axios(`http://localhost:8080/api/file/${fileId}`, {
                    responseType: 'arraybuffer',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    setUrlLink(url)
                })
                    .catch((error) => console.log(error));
            } catch (e) {
                console.log(e)
            }
        }

        getVideo()
    }, [])


    return (
        <>
            {urlLink !== null &&
            <ReactPlayer url={urlLink} width="800px" height="400px" controls={true}/>
            }
        </>
    )
}

export default PlayVideo