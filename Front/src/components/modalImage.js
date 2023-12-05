import React, { useEffect } from "react";
import { View, Image, Button } from "react-native";

const ModalImage = ({ url, onChangePhoto }) => {
  const _handlePhotoBtnPress = async () => {
    // Your existing code for selecting an image
  };

  // useEffect to update when the url changes
  useEffect(() => {
    // If the url is not empty, prefetch the image
    if (url) {
      Image.prefetch(url).then(() => {
        console.log("Image is updated:", url);
      });
    }
  }, [url]);

  return (
    <View>
      {/* Display the image if the URL is not empty */}
      {url ? (
        <Image
          key={url}
          source={{ uri: url }}
          style={{ width: "85%", height: 300, }}
        />
      ) : (
        // If the URL is empty, you can customize the placeholder or display a message
        <View>
          <Text>No Image Selected</Text>
          <Button title="Select Image" onPress={_handlePhotoBtnPress} />
        </View>
      )}
    </View>
  );
};

export default ModalImage;
