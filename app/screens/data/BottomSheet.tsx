import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, Modal, PanResponder, View} from 'react-native';
import {DataScreenStyle} from './data.style';

/// This is a React Native component that renders a modal with a draggable and dismissible popup.
/// The popup can be dragged up and down on the screen using the PanResponder API,
/// and can be dismissed by swiping down or by clicking outside the popup.
// @ts-ignore
export default props => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });
  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 500,
    useNativeDriver: true,
  });
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const handleDismiss = () => closeAnim.start(props.onDismiss);

  useEffect(() => {
    resetPositionAnim.start();
  }, [resetPositionAnim]);
  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, {dy: panY}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 0 && gs.vy > 2) {
          return handleDismiss();
        }
        return resetPositionAnim.start();
      },
    }),
  ).current;

  return (
    <Modal
      animationType="fade"
      visible={props.visible}
      transparent
      onRequestClose={handleDismiss}>
      <View style={DataScreenStyle.overlay}>
        <Animated.View
          style={[
            DataScreenStyle.popUp,
            {transform: [{translateY: translateY}]},
          ]}
          {...panResponders.panHandlers}>
          {props.children}
        </Animated.View>
      </View>
    </Modal>
  );
};
