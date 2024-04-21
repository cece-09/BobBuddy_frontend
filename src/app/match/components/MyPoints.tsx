import { Box, Stack } from '@mui/material';

const MyPoints = ({ point }: { point: number }) => {
  return (
    <Stack
      direction='row'
      sx={{
        width: '100%',
        borderRadius: '0.5rem',
        backgroundColor: 'white',
        padding: '4rem 1rem 1rem 1rem',
        alignItems: 'end',
      }}
    >
      {[
        { width: point, color: 'blue' },
        { width: 1, color: 'red' },
        { width: 99 - point, color: 'gray' },
      ].map(({ width, color }, idx) => {
        if (idx === 1) {
          return (
            <Stack
              key={idx}
              sx={{
                width: `${0.5}%`,
                height: '5vh',
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Stack
                sx={{
                  width: '3rem',
                  borderRadius: '100%',
                  position: 'absolute',
                  bottom: '2.5rem',
                  aspectRatio: '1 / 1',
                  backgroundColor: 'red',
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {point}
              </Stack>
            </Stack>
          );
        } else {
          return (
            <Box
              key={idx}
              sx={{
                backgroundColor: color,
                width: `${width}%`,
                height: '2.5vh',
                borderRadius: '0.5rem',
              }}
            />
          );
        }
      })}
    </Stack>
  );
};

export default MyPoints;
