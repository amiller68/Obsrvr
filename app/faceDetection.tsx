import {Component} from "react";
import {Camera} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector'
import * as React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {RNCamera} from "react-native-camera";


class MyFaceDetector extends Component{
    handleFacesDetected(){
        return
    }
//     if (this.state.page == 'init') {
//     return(
// <View style={styles.container}>
// <Text>Hi there!</Text>
// <RNCamera
//     ref={ref => {
//         this.camera = ref;
//     }}
//     onCameraReady={this.snap}
// />
// <TouchableOpacity
//     onPress={() => {
//         this.snap().then((uri) => console.log(uri))
//     }}
// >
//     <Text>
//         Let's Begin
//     </Text>
// </TouchableOpacity>
// </View>
// );
// }
//     snap = async (): Promise<string> => {
//         console.log("snaP")
//         if (!this.camera) return ''
//         console.log("hmm")
//         //await this.camera.onCameraReady()
//         let pic_uri = 'juj'
//         await this.camera.capture().then((photo) =>
//             console.log("Took a picture")
//         )
//         return pic_uri
//     }
    render() {
        return(
            <Camera
                // other props
                onFacesDetected={this.handleFacesDetected}
                faceDetectorSettings={{
                    mode: FaceDetector.FaceDetectorMode.fast,
                    detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                    runClassifications: FaceDetector.FaceDetectorClassifications.none,
                    minDetectionInterval: 100,
                    tracking: true,
                }}
            />
        )
    }
}

//Export them here
export default MyFaceDetector;
