import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

interface GameOverModalProps {
    visible: boolean;
    score?: number;
    onRestart: () => void;
    onChooseNew: () => void;
}

const GameOverModal = ({ visible, score, onRestart, onChooseNew }: GameOverModalProps) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Game Over</Text>
                    {score !== undefined && <Text style={styles.score}>Your score: {score}</Text>}
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={[styles.button, styles.chooseButton]} onPress={onChooseNew}>
                        <Text style={styles.chooseText}>Choose new</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.restartButton]} onPress={onRestart}>
                        <Text style={styles.restartText}>Try again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default GameOverModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(18, 18, 18, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: '#121212',
    borderRadius: 12,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  score: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 28,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  restartButton: {
    backgroundColor: "hotpink",
  },
  restartText: {
    color: '#121212',
    fontWeight: '600',
    fontSize: 16,
  },
  chooseButton: {
    borderWidth: 1,
    borderColor: "hotpink",
  },
  chooseText: {
    color: "hotpink",
    fontWeight: '600',
    fontSize: 16,
  },
});
