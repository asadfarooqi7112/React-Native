import ViewShot from 'react-native-view-shot';
import RNBootSplash from 'react-native-bootsplash';

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Alert, Text } from 'react-native';
import TreeStructure from './components/TreeStructureComponent';
import InputModal from './components/InputModalComponent';
import StartScreen from './screens/StartScreen';
import ResultScreen from './screens/ResultScreen';
import Button from './components/ButtonComponent';

interface DataEntry {
  Name: string;
  DOB: string;
  DOD: string;
  Count: number;
  uri: string;
  gender: string;
  prevCount?: number[] | undefined;
}

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<DataEntry[]>([]);
  const [wholeData, setWholeData] = useState<DataEntry[][]>([]);
  const [nodeImageUri, setNodeImageUri] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [dod, setDod] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  const [prevCount, setPrevCount] = useState<number>(1);

  const [finalTreeImageUri, setFinalTreeImageUri] = useState('');

  const ref = useRef(null);

  useEffect(() => {
    const hideSplashScreen = async () => {
      setTimeout(async () => {
        await RNBootSplash.hide({ fade: true });
      }, 2000);
    };

    hideSplashScreen();
  }, []);

  function handleStart() {
    setIsStarted(true);
    setModalVisible(true);
  }

  function onAncestor() {
    setModalVisible(true);
    setPrevCount(count);
    setWholeData(prev => ([data.map(item => ({ ...item, prevCount: [count, prevCount] })), ...prev]));
    setData([]);
    setCount(1);
    setIsShowResult(false);
  }

  function handleAdd() {
    if (name && dob && selectedGender) {
      if (count % 2 === 0)
        setData(prev => [...prev, { Name: name, DOB: dob, DOD: dod, gender: selectedGender, uri: nodeImageUri, Count: count }]);
      else {
        setData(prev => [{ Name: name, DOB: dob, DOD: dod, gender: selectedGender, uri: nodeImageUri, Count: count }, ...prev]);
      }
      setName('');
      setDob('');
      setDod('');
      setNodeImageUri('');
      setCount(prev => prev + 1);
      setModalVisible(false);
      setSelectedGender('');
      setIsShowResult(false);
    } else {
      Alert.alert('Error', 'Please fill in the fields.');
    }
  }

  const treeArray = data.map((item, index) => (
    <View key={index}>
      <TreeStructure
        Name={item.Name}
        DOB={item.DOB}
        DOD={item.DOD}
        gender={item.gender}
        uri={item.uri}
        count={item.Count}
      />
    </View>
  ));
  const wholeTreeArray = wholeData.map(element => {
    return (
      element.map((item, index) => (
        <View key={index}>
          <TreeStructure
            Name={item.Name}
            DOB={item.DOB}
            DOD={item.DOD}
            gender={item.gender}
            uri={item.uri}
            count={item.Count}
            prevCount={item.prevCount}
          />
        </View>
      ))
    );
  });

  return (
    isStarted ? (
      !isDone ? (
        <View style={styles.container}>
          <ScrollView style={styles.allScroll}>
            <ScrollView horizontal style={{ padding: 20 }}>
              <ViewShot
                style={{ backgroundColor: '#F5F5F5', padding: 20 }}
                ref={ref}
              >
                <FlatList
                  contentContainerStyle={styles.horizontalScroll}
                  data={wholeTreeArray}
                  renderItem={({ item }) => <View style={styles.arrayList}>{item}</View>}
                  keyExtractor={(item, index) => index.toString()}
                />
              </ViewShot>
            </ScrollView>
            <ScrollView horizontal style={{ marginTop: -150 }}>
              <View style={styles.arrayList}>
                {treeArray}
              </View>
            </ScrollView>
          </ScrollView>
          <Button style={styles.addButton} onPress={() => setModalVisible(true)} title="Add a Sibling" />
          <Button style={styles.addButton} onPress={onAncestor} title="Add Ancestor" />
          {!isShowResult && <Button style={styles.doneButton}
            onPress={() => {
              setPrevCount(count);
              setWholeData(prev => ([data.map(item => ({ ...item, prevCount: [count, prevCount] })), ...prev]));
              setData([]);
              setCount(1);
              setIsShowResult(true);
            }}
            title="Done"
          />}
          {isShowResult && (
            <Button style={styles.showResultButton}
              onPress={() => {
                ref.current.capture().then((uri: string) => {
                  console.log('do something with ', uri);
                  setFinalTreeImageUri(uri);
                  setIsDone(true);
                });
              }}
              title="Show Result"
            />
          )}
          <InputModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setNodeImageUri={setNodeImageUri}
            setName={setName}
            setDob={setDob}
            setDod={setDod}
            name={name}
            dob={dob}
            dod={dod}
            handleAdd={handleAdd}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
          />
        </View>
      ) :
        <ResultScreen
          finalTreeImageUri={finalTreeImageUri}
          setIsDone={setIsDone}
          setIsShowResult={setIsShowResult}
          setWholeData={setWholeData}
          setData={setData}
          setModalVisible={setModalVisible}
        />
    ) :
      <StartScreen handleStart={handleStart} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F5F5F5",
  },
  addButton: {
    backgroundColor: "#1034A6",
  },
  doneButton: {
    backgroundColor: "green",
  },
  showResultButton: {
    backgroundColor: '#FFA500',
  },
  arrayList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 220,
  },
  horizontalScroll: {
    display: "flex",
    justifyContent: 'center',
  },
  allScroll: {
    backgroundColor: '#F5F5F5',
  },
});

export default App;
