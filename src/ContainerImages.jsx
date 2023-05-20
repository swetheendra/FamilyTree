
const DisplayImagesFromContainer = ({blobList, id}) => {
    let matchingProfile = blobList.find(item => item.name.startsWith(`${id}.`));
    if(!!!matchingProfile) {
        matchingProfile = blobList.find(item => item.name === "0.png");
    }
    return (
        <img src={matchingProfile.url} alt={matchingProfile.name} height="200" />
    )};

  export default DisplayImagesFromContainer;