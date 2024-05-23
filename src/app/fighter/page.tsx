
"use client"

import { useEffect, useRef, useState } from 'react';
import styles from "../page.module.css";
import { 
    Drawer, List, ListItem, ListItemText, IconButton, 
    Hidden, Divider, Box, Container, Grid, Card, CardContent,
    Typography, Avatar, AvatarGroup, InputAdornment, TextField
} from '@mui/material';
import Show from '@/components/shared/show';
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { listFighters, listLevelByIdFighter, listTechnique } from '@/api/fighters';
import { techiniqueInterface } from '@/interface/technique';
import { fighterInterface } from '@/interface/fighters';
import AvatarCustom from '@/components/shared/avatar';
import StarIcon from '@mui/icons-material/Star';
import { StyledAvatarGroup } from '@/styles/styledComponets';
import SearchIcon from '@mui/icons-material/Search';
import TechniqueDashboard from '@/components/fighters/TechniqueDashboard';
import { levelInterface } from '@/interface/level';
import ProfileFighter from '@/components/fighters/profile';




export default function FighterHome()  {
    const [loadingF, setLoadingF] = useState(false);
    const [techniqueList, setTechniqueList] = useState([] as any[]);
    const [fightersList, setFightersList] = useState([] as fighterInterface[]);
    const initialized =  useRef(false);
    const [fighterSelected, setFighter] = useState<fighterInterface|undefined>(undefined);
    const [dataLevel, setLevel] = useState([] as levelInterface[]);
    
    useEffect(() => {
        const fetchData = async () => {
            toast.loading('Cargando Peleadores ...', {
                position: 'top-right',
            });
            try {
                setLoadingF(true); 
                const {data, error} = await listTechnique();
                if(data) setTechniqueList(data as techiniqueInterface[]) 

                const fighters = await listFighters();
                if(fighters.data) setFightersList(fighters.data as fighterInterface[]) 

            } catch (error) {
                toast.error('Error al verificar datos' ,{duration: 3000});
            } finally {
                toast.dismiss();
                setLoadingF(false)
            }
        };
        !initialized.current && fetchData();
        initialized.current = true
    }, []);

    const selectFighter = async (fighter:fighterInterface) => {

        toast.loading('Cargando Nivel de pelea ...', {
            position: 'top-right',
        });
        try {
            setFighter(fighter);
            setLoadingF(true); 
            const {data, error} = await listLevelByIdFighter(fighter.id);
            if(data) setLevel(data as levelInterface[]) 

        } catch (error) {
            toast.error('Error al verificar datos' ,{duration: 3000});
        } finally {
            toast.dismiss();
            setLoadingF(false)
        }
    }

    const updateListFighter = async () => {

        toast.loading('Actualizando nivel de pelea ...', {
            position: 'top-right',
        });
        try {
            const fighters = await listFighters();
            if(fighters.data) setFightersList(fighters.data as fighterInterface[]) 

        } catch (error) {
            toast.error('Error al verificar datos' ,{duration: 3000});
        } finally {
            toast.dismiss();
            setLoadingF(false)
        }
    }



    return (
            <Grid container  sx={{  backgroundColor: "darkblue.main", with: "100vw", height:"100vh",}}>
              <Grid item xs={12} container >
                    <Grid item xs={6} sm={6} md={3} >
                        <Box  sx={{padding: "1rem"  }}>
                            <Grid container className="scroll" sx={{backgroundColor: "gray.main", height: "calc(100vh - 2rem)", overflowX:"auto",}}>
                                <Grid  item xs={12} >
                                    <TextField
                                        color='secondary'
                                        label="Peleador"
                                        id="standard-start-adornment"
                                        sx={{
                                        m: 1,
                                        width: '94%',
                                        borderRadius: "4px 4px 0 0",
                                        backgroundColor: 'white', // Establece el fondo a blanco
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'white', // Asegura que el fondo del input sea blanco
                                        },
                                        }}
                                        InputProps={{
                                        endAdornment: <InputAdornment position="start">
                                            <SearchIcon/>
                                        </InputAdornment>,
                                        }}
                                        variant="filled"
                                    />
                                </Grid>
                                
                                {fightersList.map((fighter:fighterInterface, index:number) => 
                                {
                                    const totalStars = Math.ceil(fighter!.level.reduce((acc, lvl) => acc + (lvl.power / 20), 0));
                                    const totalAbove70 = fighter.level.filter(lvl => lvl.power > 70).length * 5; 
                                    return (
                                    <Grid 
                                        key={index} item xs={12} sx={{ padding: "0.5rem", borderRadius: "1rem"}}  
                                    >
                                        <Card  sx={{
                                                backgroundColor: "darkblue.main", cursor:"pointer",
                                                boxShadow: "0px 2px 1px -1px rgba(255,255,255,0.2),1px 1px 1px 0px rgba(255,255,255,0.14),0px 1px 3px 0px rgba(255,255,255,0.12)",
                                                borderRadius: "0.5rem"
                                            }}  onClick={() => selectFighter(fighter)} >
                                            <CardContent sx={{padding:"1rem"}} >
                                                <Grid container>
                                                    <Grid item xs={3} >
                                                        <AvatarCustom imageUrl={fighter.avatar_url} />
                                                    </Grid>
                                                    <Grid item xs={9} container justifyContent={"center"} alignItems="center" >
                                                        <Grid item xs={10} >
                                                            <Typography variant="subtitle2" color="white" align="center" gutterBottom>
                                                            {fighter.name}{" "}{fighter.last_name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}  >
                                                            <StyledAvatarGroup
                                                                renderSurplus={(surplus) =>  
                                                                <span>+{surplus.toString()}</span>
                                                                }
                                                                spacing={8}
                                                                total={totalStars}
                                                                max={2}
                                                                >
                                                                {Array.from({ length: Math.min(totalStars, 5) }).map((_, i) => (
                                                                    <Avatar key={i}>
                                                                    <StarIcon sx={{ color: 'darkblue.main' }} />
                                                                    </Avatar>
                                                                ))}  
                                                            </StyledAvatarGroup>
                                                        </Grid>
                                                        <Grid item  xs={12} sm={4}  >
                                                            <Typography variant="h5" color="white" align="center" gutterBottom>
                                                                {totalAbove70}k
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )})}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} >
                        <Box  sx={{padding: "1rem"  }}>
                            <Grid container className="scroll" sx={{backgroundColor: "gray.main", height: "calc(100vh - 2rem)", overflowX:"auto",}}>
                                <TechniqueDashboard 
                                    techniques={techniqueList} 
                                    levels={dataLevel} 
                                    fighter={fighterSelected} 
                                    selectFighter={selectFighter} 
                                    updateListFighter={updateListFighter}
                                />
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} >
                       <ProfileFighter fighter={fighterSelected} />
                    </Grid>
              </Grid>
            </Grid>
    )

}
