/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Photos.css';

// const axios = require('axios');

const UnsplashImage = ({ url, key }) => (
    <div className="image-item" key={key}>
        <img src={url} alt="img" />
    </div>
);

export default function ProfilePhotos() {
    const [images, setImages] = React.useState([]);
    // const [loaded, setIsLoaded] = React.useState(false);

    // React.useEffect(() => {
    //     fetchImages();
    // }, []);

    // const fetchImages = (count = 10) => {
    //     const apiRoot = 'https://api.unsplash.com';
    //     const accessKey =
    //         'a22f61e98da4efa25d8860e77a91a596867dd335ecdf7feb12e086943db9565a';

    //     axios.get(PROFILE_IMAGES).then((res) => {
    //         setImages([...images, ...res.data]);
    //         setIsLoaded(true);
    //     });
    // };

    return (
        <InfiniteScroll
            dataLength={images}
            // next={() => fetchImages(5)}
            // hasMore={true}
            // loader={
            //     <img
            //         src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
            //         alt="loading"
            //     />
            // }
        >
            {/* <div className="image-grid" style={{ marginTop: '30px' }}>
                {loaded
                    ? images.map((image, index) => (
                          <UnsplashImage url={image.urls.regular} key={index} />
                      ))
                    : ''}
            </div> */}
            <div className="image-grid" style={{ marginTop: '30px' }}>
                {PROFILE_IMAGES.map((image, index) => (
                    <UnsplashImage url={image} key={index} />
                ))}
            </div>
        </InfiniteScroll>
    );
}

const PROFILE_IMAGES = [
    'https://baynature.org/wp-content/uploads/2019/12/200118-SQUARE-1600x1600.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/66/Square_Panorama_of_Aru_Valley%2C_Jammu_and_Kashmir%2C_India.jpg',
    'https://mk0paperlessmovn94k7.kinstacdn.com/wp-content/uploads/2019/09/o2dvsv2pnhe-683x1024.jpg',
    'https://www.gettingsmart.com/wp-content/uploads/2017/06/Program-Code-Feature-Image.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU4TMUBRJsYJkAVgYTR5TWibVji2B8FU1kLQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNLx7Ly59I6yE6FiVanuAPlJR4PQHTEQFIg&usqp=CAU',
    'https://qph.fs.quoracdn.net/main-qimg-4830eeb05a0e818ae77b1007a627719a',
    'https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/8/10/8103bef5-a83b-5926-8261-dc6d3eafb6da/5cb0c9bb83298.image.jpg?resize=500%2C630',
    'https://static.toiimg.com/photo/73024443.cms?imglength=48948',
    'https://i.pinimg.com/originals/3d/bb/6c/3dbb6cb3f0b7c878b1bc4f2448a0e27d.jpg',
    'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQI9DLlq2mb_vElKkftDh5IU-8UKVoFzky1w&usqp=CAU',
    'https://images.fineartamerica.com/images-medium-large/nature-square--saddleback-dragonfly-carol-groenen.jpg',
    'https://static.toiimg.com/photo/69369840.cms',
];
