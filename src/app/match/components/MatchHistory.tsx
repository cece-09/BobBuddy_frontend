import { Match } from '@/types/match';
import { Avatar, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

const MatchHistoryView = ({ matches }: { matches: Match[] }) => {
  return (
    <React.Fragment>
      {matches.map((each, idx) => {
        return (
          <Stack
            key={idx}
            padding='0.5rem'
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ backgroundColor: 'white', mb: 1, borderRadius: '0.5rem' }}
          >
            <Typography>{each.title}</Typography>
            <ProfileBox profiles={each.userprofiles} />
          </Stack>
        );
      })}
    </React.Fragment>
  );
};

export default MatchHistoryView;

const ProfileBox = ({ profiles }: { profiles: string[] }) => {
  return (
    <Grid
      container
      spacing={0}
      sx={{
        width: '60px',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
    >
      {profiles.map((profile, idx) => (
        <Grid item xs={6} key={idx}>
          <Avatar
            variant='square'
            key={idx}
            alt={profile}
            src={profile}
            sx={{
              width: '30px',
              height: '30px',
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};
