import React, { useState, useRef } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const scrollViewRef = useRef();

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / windowWidth);
    setActiveIndex(currentIndex);
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width: windowWidth, height: 300 }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { opacity: index === activeIndex ? 1 : 0.5 }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'black',
    marginHorizontal: 4,
  },
});

export default Carousel;
