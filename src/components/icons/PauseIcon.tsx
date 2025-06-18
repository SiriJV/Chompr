import Svg, { Rect } from 'react-native-svg';

const PauseIcon = ({ color }: { color: string }) => (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Rect x={14} y={4} width={4} height={16} rx={1} />
        <Rect x={6} y={4} width={4} height={16} rx={1} />
    </Svg>
);

export default PauseIcon;
