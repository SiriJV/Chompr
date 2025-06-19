import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

type DifficultyChooserProps = {
    visible: boolean;
    selectedDifficulty: 'Easy' | 'Medium' | 'Hard';
    onSelectDifficulty: (level: 'Easy' | 'Medium' | 'Hard') => void;
    onPlay: () => void;
};

const funnyNames = {
    Easy: 'ez 🥱',
    Medium: 'mid',
    Hard: 'goat-mode',
};

const DifficultyChooser = ({ visible, selectedDifficulty, onSelectDifficulty, onPlay }: DifficultyChooserProps) => {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Choose your difficulty</Text>
                    <Picker selectedValue={selectedDifficulty} onValueChange={(itemValue) => onSelectDifficulty(itemValue)} style={{ color: 'white', backgroundColor: '#353535', borderRadius: 8 }} dropdownIconColor="white">
                        {(['Easy', 'Medium', 'Hard'] as const).map(level => (
                            <Picker.Item key={level} label={funnyNames[level]} value={level} />
                        ))}
                    </Picker>
                    <TouchableOpacity style={[ styles.playButton, !selectedDifficulty && { backgroundColor: 'gray' }, ]} onPress={onPlay}>
                        <Text style={styles.playButtonText}>Choose</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default DifficultyChooser;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 25,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  difficultyButton: {
    backgroundColor: '#353535',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  difficultyButtonSelected: {
    backgroundColor: 'coral',
  },
  difficultyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  difficultyTextSelected: {
    color: '#121212',
  },
  playButton: {
    marginTop: 15,
    backgroundColor: 'hotpink',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    opacity: 1,
  },
  playButtonText: {
    color: '#121212',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});