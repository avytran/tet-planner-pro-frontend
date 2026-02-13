import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const StyledText = styled('text')((props) => ({
    fill: props.color,
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    fontSize: props.fontSize,
    fontWeight: 'normal',
}));

export default function PieCenterLabel({ children, color, fontSize }) {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText
            x={left + width / 2}
            y={top + height / 2}
            color={color || '#000000'}
            fontSize={fontSize || 13}
        >
            {children}
        </StyledText>
    );
}