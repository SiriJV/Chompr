import Svg, { Circle, Line } from "react-native-svg";

const SpeedIcon = ({ color }: { color: string }) => (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Line x1="10" x2="14" y1="2" y2="2"/>
        <Line x1="12" x2="15" y1="14" y2="11"/>
        <Circle cx="12" cy="14" r="8"/>
    </Svg>
);

export default SpeedIcon;