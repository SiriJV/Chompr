import React from 'react';
import { TouchableOpacity } from 'react-native';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';

type PauseToggleProps = {
    paused: boolean;
    onToggle: () => void;
    color?: string;
};

const PauseToggle = ({ paused, onToggle, color = 'black' }: PauseToggleProps) => {
    return (
        <TouchableOpacity onPress={onToggle}>
            {paused ? <PlayIcon color={color} /> : <PauseIcon color={color} />}
        </TouchableOpacity>
    );
};

export default PauseToggle;