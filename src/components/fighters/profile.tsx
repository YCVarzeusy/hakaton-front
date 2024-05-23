import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Grid,
  Typography,
  Rating,
  Box,
  Avatar,
  AvatarGroup
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { techiniqueInterface } from '@/interface/technique';
import { StyledAccordion, StyledAvatarGroup } from '@/styles/styledComponets';
import { levelInterface } from '@/interface/level';
import TechniqueModal from './modalLevel';
import { fighterInterface } from '@/interface/fighters';
import { toast } from 'sonner';
import { insertLevelToFighter } from '@/api/fighters';
import AvatarCustom from '../shared/avatar';
import StarIcon from '@mui/icons-material/Star';


interface profileFighterProps {
  fighter?: fighterInterface;
}



export default function ProfileFighter (props: profileFighterProps ) {
    const { fighter } = props;
    let totalStars = 0;
    let totalAbove70 = 0;
    
  if (fighter) {
      totalStars = fighter!.level.reduce((acc, lvl) => acc + (lvl.power / 20), 0);
      totalAbove70 = fighter!.level.filter(lvl => lvl.power > 70).length * 5; 
  }

    return (
        <Grid container>
            <Grid item xs={12} sx={{padding: "1rem"   }}>
                <Box   sx={{backgroundColor: "gray.main",  height: "calc(50vh - 2rem)", padding:"1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"}} >
                   {
                    fighter && (
                        <AvatarCustom imageUrl={fighter!.avatar_url} width='75%' />
                    )
                   }
                </Box>
            </Grid>

            <Grid item xs={12} sx={{padding: "1rem"   }}>
                <Box   sx={{backgroundColor: "gray.main",  height: "calc(50vh - 2rem)", padding:"1rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"}} >
                    <Typography variant="h4" color="white" align="center" gutterBottom>
                        {fighter?.name}{" "}{fighter?.last_name}
                    </Typography>
                    <Typography variant="h5" color="white" align="center" gutterBottom>
                            {totalAbove70}k
                    </Typography>
                    {
                    fighter && (
                        <StyledAvatarGroup
                            renderSurplus={(surplus) =>  
                            <span>+{surplus.toString()}</span>
                            }
                            spacing={8}
                            total={totalStars}
                            max={3}
                            >
                           {Array.from({ length: Math.min(totalStars, 5) }).map((_, i) => (
                                <Avatar key={i}>
                                <StarIcon sx={{ color: 'darkblue.main' }} />
                                </Avatar>
                            ))}   
                        </StyledAvatarGroup>
                    )
                   }
                </Box>
            </Grid>
        </Grid>

    )
}