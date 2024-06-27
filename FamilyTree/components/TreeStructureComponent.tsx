import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface TreeStructureComponentProps {
  prevCount?: number[];
  count: number;
  uri?: string;
  gender: string;
  Name: string;
  DOB: string;
  DOD?: string;
}

const TreeStructureComponent: React.FC<TreeStructureComponentProps> = (props) => {

  const renderImage = () => {
    if (props.uri) {
      return <Image source={{ uri: props.uri }} style={styles.image} />;
    }
    return props.gender === 'Male' ? (
      <Image source={require('../images/unknownMale.jpg')} style={styles.image} />
    ) : (
      <Image source={require('../images/unknownFemale.png')} style={styles.image} />
    );
  };

  const renderText = () => (
    <>
      <Text style={styles.text}>Name: {props.Name}</Text>
      <Text style={styles.text}>DOB: {props.DOB}</Text>
      <Text style={styles.text}>DOD: {props.DOD || '---'}</Text>
    </>
  );

  if (props.count === 1 && props.prevCount !== undefined) {
    if (props.prevCount[0] === 3 && props.prevCount[1] !== 1 && props.prevCount[1] !== props.prevCount[0]) {
      if (props.prevCount[1] % 2 !== 0) {
        return (
          <View style={styles.container1}>
            <View style={styles.dataContainer}>
              {renderImage()}
              {renderText()}
            </View>
            <View style={styles.upwardLine}></View>
            <View style={styles.downwardLine}>
              <View style={styles.joiningCircle}></View>
            </View>
          </View>
        );
      }
      return (
        <View style={styles.container1}>
          <View style={styles.dataContainer}>
            {renderImage()}
            {renderText()}
          </View>
          <View style={styles.upwardLine}></View>
          <View style={styles.downwardLine}>
            <View style={styles.connectingLineRight}>
              <View style={styles.joiningCircleRightConnectingLine}></View>
            </View>
          </View>
        </View>
      );
    }
    if (props.prevCount[0] === 2 && props.prevCount[1] !== 1 && props.prevCount[1] !== props.prevCount[0]) {
      if (props.prevCount[1] % 2 === 0) {
        return (
          <View style={styles.container1}>
            <View style={styles.dataContainer}>
              {renderImage()}
              {renderText()}
            </View>
            <View style={styles.upwardLine}></View>
            <View style={styles.downwardLine}>
              <View style={styles.joiningCircle}></View>
            </View>
          </View>
        );
      }
      return (
        <View style={styles.container1}>
          <View style={styles.dataContainer}>
            {renderImage()}
            {renderText()}
          </View>
          <View style={styles.upwardLine}></View>
          <View style={styles.downwardLine}>
            <View style={styles.connectingLineLeft}>
              <View style={styles.joiningCircleLeftConnectingLine}></View>
            </View>
          </View>
        </View>
      );
    }
    if ((props.prevCount[0] % 2 === 0 && props.prevCount[1] % 2 === 0 && props.prevCount[1] !== 1) || (props.prevCount[0] % 2 !== 0 && props.prevCount[1] % 2 !== 0 && props.prevCount[1] !== 1)) {
      if (props.prevCount[0] === 2 || props.prevCount[0] === 3) {
        return (
          <View style={styles.container1}>
            <View style={styles.dataContainer}>
              {renderImage()}
              {renderText()}
            </View>
            <View style={styles.upwardLine}></View>
            <View style={styles.downwardLine}>
             <View style={styles.joiningCircle}></View>
            </View>
          </View>
        );
      }
      return (
        <View style={styles.container1}>
          <View style={styles.leftLine}></View>
          <View style={styles.dataContainer}>
            {renderImage()}
            {renderText()}
          </View>
          <View style={styles.upwardLine}></View>
          <View style={styles.downwardLine}>
            <View style={styles.joiningCircle}></View>
          </View>
        </View>
      );
    }
    if (props.prevCount[0] % 2 === 0 && props.prevCount[1] % 2 !== 0 && props.prevCount[1] !== 1) {
      return (
        <View style={styles.container1}>
          <View style={styles.leftLine}></View>
          <View style={styles.dataContainer}>
            {renderImage()}
            {renderText()}
          </View>
          <View style={styles.upwardLine}></View>
          <View style={styles.downwardLine}>
            <View style={styles.connectingLineLeft}>
               <View style={styles.joiningCircleLeftConnectingLine}></View>
            </View>
          </View>
        </View>
      );
    }
    if (props.prevCount[0] % 2 !== 0 && props.prevCount[1] % 2 === 0 && props.prevCount[1] !== 1) {
      return (
        <View style={styles.container1}>
          <View style={styles.leftLine}></View>
          <View style={styles.dataContainer}>
            {renderImage()}
            {renderText()}
          </View>
          <View style={styles.upwardLine}></View>
          <View style={styles.downwardLine}>
            <View style={styles.connectingLineRight}>
              <View style={styles.joiningCircleRightConnectingLine}></View>
            </View>
          </View>
        </View>
      );
    }
    if (props.prevCount[0] % 2 === 0 && props.prevCount[1] === 1) {
      if (props.count === props.prevCount[0] - 1) {
        return (
          <View style={styles.container1}>
            <View style={styles.dataContainer}>
              {renderImage()}
              {renderText()}
            </View>
            <View style={styles.upwardLine}></View>
            <View style={styles.downwardLine}>
              <View style={styles.joiningCircle}></View>
            </View>
          </View>
        );
      }
      return (
        <View style={styles.container1}>
          <View style={styles.leftLine}></View>
          <View style={styles.dataContainer}>
            {renderImage()}
            {renderText()}
          </View>
          <View style={styles.upwardLine}></View>
          <View style={styles.downwardLine}>
            <View style={styles.joiningCircle}></View>
          </View>
        </View>
      );
    }
    if (props.prevCount[0] !== 2 && props.prevCount[1] !== 1) {
      return (
        <View style={styles.container1}>
          <View style={styles.leftLine}></View>
          <View style={styles.dataContainer}>
            {renderImage()}
            {renderText()}
          </View>
          <View style={styles.upwardLine}></View>
          <View style={styles.downwardLine}>
            <View style={styles.joiningCircle}></View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container1}>
        <View style={styles.dataContainer}>
          {renderImage()}
          {renderText()}
        </View>
        <View style={styles.upwardLine}></View>
        <View style={styles.downwardLine}>
          <View style={styles.joiningCircle}></View>
        </View>
      </View>
    );
  }

  if (props.prevCount !== undefined && props.prevCount[0] % 2 === 0 && props.count === props.prevCount[0] - 1) {
    return (
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          {renderImage()}
          {renderText()}
        </View>
      </View>
    );
  }

  if (props.prevCount !== undefined && props.prevCount[0] % 2 !== 0 && props.count === props.prevCount[0] - 2) {
    return (
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          {renderImage()}
          {renderText()}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftLine}></View>
      <View style={styles.dataContainer}>
        {renderImage()}
        {renderText()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: -10,
    height: 300,
  },
  dataContainer: {
    backgroundColor: '#4682B4',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    width: 220,
    height: 350,
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  leftLine: {
    backgroundColor: 'black',
    width: 200,
    height: 5,
    alignContent: 'center',
  },
  upwardLine: {
    position: 'relative',
    right: 100,
    bottom: 230,
    backgroundColor: 'black',
    width: 5,
    height: 112,
  },
  
  downwardLine: {
    position: 'relative',
    right: 105,
    top: 224,
    backgroundColor: 'black',
    width: 5,
    height: 100,
  },
  connectingLineLeft: {
    position: 'relative',
    right: 210,
    top: 95,
    backgroundColor: 'black',
    width: 210,
    height: 5,
  },
  connectingLineRight: {
    position: 'relative',
    top: 95,
    backgroundColor: 'black',
    width: 210,
    height: 5,
  },
  joiningCircleRightConnectingLine:{
    position: 'relative',
    bottom: 11,
    left: 194,
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  joiningCircleLeftConnectingLine:{
    position: 'relative',
    bottom: 12,
    right: 10,
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  joiningCircle: {
    position: 'relative',
    right: 12,
    top: 90,
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 20,

  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default TreeStructureComponent;
