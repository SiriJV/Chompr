import Svg, { Circle, Path } from "react-native-svg";

const SearchIcon = ({ color }: { color: string }) => (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="m21 21-4.34-4.34" />
        <Circle cx={11} cy={11} r={8} />
    </Svg>
);

export default SearchIcon;