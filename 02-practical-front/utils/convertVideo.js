export const convertVideo = (video) => {
    if (video.includes("youtube.com/watch?v=")) {
        const videoId = video.split("v=")[1];
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return video; 
}