import Svg, { Circle, Path } from "react-native-svg";

const ProfileIcon = ({ color }: { color: string }) => (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx={12} cy={8} r={5} />
        <Path d="M20 21a8 8 0 0 0-16 0" />
    </Svg>
);

export default ProfileIcon;