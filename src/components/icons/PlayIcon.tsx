import Svg, { Polygon } from 'react-native-svg';

const PlayIcon = ({ color }: { color: string }) => (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Polygon points="6 3 20 12 6 21 6 3" />
    </Svg>
);

export default PlayIcon;
