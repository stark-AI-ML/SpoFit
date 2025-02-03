import React from 'react';
import { Svg, Line } from 'react-native-svg';

const AnalyticsIcon = ({ color }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Line x1="4" y1="20" x2="4" y2="10" stroke={color} strokeWidth="2" />
        <Line x1="10" y1="20" x2="10" y2="5" stroke={color} strokeWidth="2" />
        <Line x1="16" y1="20" x2="16" y2="8" stroke={color} strokeWidth="2" />
        <Line x1="22" y1="20" x2="22" y2="2" stroke={color} strokeWidth="2" />
    </Svg>
);

export default AnalyticsIcon;
